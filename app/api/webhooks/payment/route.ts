import prismadb from "@/lib/prismadb";
import { generateReceiptPdf } from "@/utils/receiptGeneration";
import { createPublicKey, verify } from "crypto";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Функция для форматирования публичного ключа
function chunkSplit(str: string, length: number) {
  const chunked = [];
  for (let i = 0; i < str.length; i += length) {
    chunked.push(str.slice(i, i + length));
  }
  return chunked.join("\n");
}

export async function POST(req: Request) {
  try {
    const headersList = headers();
    const shopPublicKey = process.env.SHOP_PUBLIC_KEY;

    if (!shopPublicKey) {
      throw new Error("Please add SHOP_PUBLIC_KEY to .env or .env.local");
    }

    const signature = headersList.get("content-signature");

    if (!signature) {
      return NextResponse.json(
        { success: false, error: "Missing signature." },
        { status: 403 }
      );
    }

    // Форматирование публичного ключа
    const formattedPublicKey = `-----BEGIN PUBLIC KEY-----\n${chunkSplit(
      shopPublicKey,
      64
    )}\n-----END PUBLIC KEY-----`;
    const publicKey = createPublicKey(formattedPublicKey);

    // Получение необработанного тела запроса
    const rawBody = await req.text();

    const isVerified = verify(
      "sha256",
      Buffer.from(rawBody), // Используем тело как строку, а не JSON
      publicKey,
      Buffer.from(signature, "base64")
    );

    if (isVerified) {
      const body = JSON.parse(rawBody); // Теперь можем парсить тело
      if (body?.transaction?.status === "successful") {
        const userId = body?.transaction?.tracking_id;

        const user = await prismadb.user.findUnique({
          where: {
            clerkId: userId,
          },
          select: {
            generations: true,
          },
        });

        if (!user) {
          return NextResponse.json(
            { success: false, message: "User not found." },
            { status: 403 }
          );
        }

        const text = body?.transaction?.description;
        const match = text.match(/\((\d+)\sGenerations\)/);
        if (!match) {
          return NextResponse.json(
            { success: false, message: "Generations not found." },
            { status: 403 }
          );
        }
        const number = parseInt(match[1]);

        await prismadb.user.update({
          where: {
            clerkId: userId,
          },
          data: {
            generations: user?.generations + number,
          },
        });

        const transaction = body.transaction;

        await prismadb.transaction.create({
          data: {
            tracking_id: transaction.tracking_id,
            userId: userId,
            status: transaction.status,
            amount: transaction.amount,
            currency: transaction.currency,
            description: transaction.description,
            type: transaction.type,
            payment_method_type: transaction.payment_method_type,
            message: transaction.message,
            paid_at: transaction.paid_at ? new Date(transaction.paid_at) : null,
            receipt_url: transaction.receipt_url,
          },
        });

        try {
          const pdfBuffer = await generateReceiptPdf(
            String(body.transaction.uid).split("-").pop() ?? "",
            body.transaction.customer.email,
            new Date(Date.now()).toLocaleDateString("ru-RU", {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            }),
            number,
            body.transaction.description,
            body.transaction.amount,
            body.transaction.currency
          );

          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

          await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: body.transaction.customer.email,
            subject: `VisionEngineAI Token Purchase – Receipt #${
              String(body.transaction.uid).split("-").pop() || "42f7fj3u48rh"
            }`,
            text: `Dear Customer,
    
Thank you for your recent purchase at visionengineai.com — we sincerely appreciate your support!

Attached to this message, you’ll find your receipt for this transaction. Please keep it for your records.

If you have any questions about your purchase, token balance, or need assistance with image generation, feel free to contact us anytime at support@visionengineai.com — we’re here to help.

Thanks once again for choosing VisioneEngineAI as your creative partner.

Best regards,
The VisioneEngineAI
visionengineai.com
support@visionengineai.com`,
            attachments: [
              {
                filename:
                  `receipt-${String(body.transaction.uid)
                    .split("-")
                    .pop()}.pdf` || "receipt.pdf",
                content: pdfBuffer,
                contentType: "application/pdf",
              },
            ],
          });
        } catch (emailError) {
          console.error("Failed to send receipt email:", emailError);
        }

        return NextResponse.json(
          { success: true, message: "Success Response" },
          { status: 200 }
        );
      } else {
        console.log("Transaction was not successful.");
        return NextResponse.json(
          { success: false, message: "Transaction was not successful" },
          { status: 200 }
        );
      }
    } else {
      console.log("Invalid signature.");
      return NextResponse.json(
        { success: false, message: "Invalid signature." },
        { status: 403 }
      );
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { success: false, error: "Internal Error." },
      { status: 500 }
    );
  }
}
