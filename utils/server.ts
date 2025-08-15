import { PrismaClient, Transaction } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import { editingOptions, generationOptions } from "@/constants";
import { v2 as cloudinary } from "cloudinary";

const prismadb = new PrismaClient();

export const getUserGenerations = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const user = await prismadb.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    return 0;
  }

  return user.generations;
};

export const getUserInformation = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const user = await prismadb.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  if (!user) {
    return null;
  }

  const userInformation = {
    email: user.email,
    photo: user.photo,
    firstName: user.firstName,
    lastName: user.lastName,
    generations: user.generations,
  };

  return userInformation;
};

export async function fetchPosts(query?: string) {
  try {
    if (query) {
      const posts = await prismadb.post.findMany({
        where: {
          AND: [
            {
              shared: true,
            },
            {
              OR: [
                {
                  author: {
                    firstName: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  author: {
                    lastName: {
                      contains: query,
                      mode: "insensitive",
                    },
                  },
                },
                {
                  prompt: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              ],
            },
          ],
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              photo: true,
            },
          },
        },
      });
      return posts;
    } else {
      const posts = await prismadb.post.findMany({
        where: {
          shared: true,
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              photo: true,
            },
          },
        },
        orderBy: {
          id: "desc",
        },
        take: 20,
      });
      return posts;
    }
  } catch (error) {
    console.error("[FETCH_POSTS_ERROR]", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function fetchUserPosts(query?: string) {
  try {
    const { userId } = auth();

    if (!userId) {
      return [];
    }

    const user = await prismadb.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return [];
    }

    if (query) {
      const posts = await prismadb.post.findMany({
        where: {
          authorId: user.id,
          prompt: {
            contains: query,
            mode: "insensitive",
          },
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              photo: true,
            },
          },
        },
      });
      return posts;
    } else {
      const posts = await prismadb.post.findMany({
        where: {
          authorId: user.id,
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
              photo: true,
            },
          },
        },
        orderBy: {
          id: "desc",
        },
      });
      return posts;
    }
  } catch (error) {
    console.error("[FETCH_POSTS_ERROR]", error);
    throw new Error("Failed to fetch posts");
  }
}

export async function fetchPaymentHistory(): Promise<Transaction[] | null> {
  try {
    const { userId } = auth();

    if (!userId) {
      return null;
    }
    const transactions = await prismadb.transaction.findMany({
      where: {
        userId: userId,
      },
    });
    return transactions;
  } catch (error) {
    // console.error("[FETCH_PAYMENT_HISTORY_ERROR]", error);
    // throw new Error("Failed to fetch payment history");
    return null;
  }
}

export const calculateGenerationsPrice = (
  model: string,
  size: string,
  quality: string = "standard",
  style: string = "vivid"
) => {
  const modelOption = generationOptions.models.find((m) => m.value === model);
  const resolutionOption = generationOptions.resolutions[model].find(
    (r) => r.value === size
  );
  const qualityOption = generationOptions.qualities.find(
    (q) => q.value === quality
  );
  const styleOption = generationOptions.styles.find((s) => s.value === style);

  let basePrice = 0;

  if (modelOption) basePrice += modelOption.price;
  if (resolutionOption) basePrice += resolutionOption.price;
  if (model === "dall-e-3") {
    if (qualityOption) basePrice += qualityOption.price;
    if (styleOption) basePrice += styleOption.price;
  }

  return basePrice;
};

export const calculateEditingPrice = (style: string) => {
  const stylePrice = editingOptions.style.find((item) => item.value === style);
  if (stylePrice?.price) {
    return stylePrice.price;
  } else {
    return NaN;
  }
};
