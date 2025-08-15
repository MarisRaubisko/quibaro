"use client";

import Button from "@/components/ui/button/index";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  currencies,
  currenciesRate,
  Currency,
  GENERATIONS_PRICE,
} from "@/constants";
import {
  Checkbox,
  Field,
  Input,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, useUser } from "@clerk/nextjs";
import { useModal } from "@/components/modal-views/context";

const formSchema = z.object({
  generations: z
    .number()
    .positive({ message: "Generations count must be positive" })
    .min(1, { message: "At least one generation is required" }),
  currency: z.enum(currencies),
  policies: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export default function TopUp() {
  const router = useRouter();
  const { userId } = useAuth();
  const { user } = useUser();
  const { closeModal } = useModal();
  const [loading, setLoading] = useState(false);
  const [generationPrice, setGenerationPrice] = useState(GENERATIONS_PRICE);
  const [activeButton, setActiveButton] = useState(50);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      generations: 50,
      currency: "EUR",
      policies: false,
    },
  });

  const onSubmit = async () => {
    try {
      setLoading(true);
      submitPayment();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleCurrencyChange = (currency: Currency) => {
    setValue("currency", currency);
    setGenerationPrice(GENERATIONS_PRICE * currenciesRate[currency]);
  };

  const handleButtonClick = (value: number) => {
    setActiveButton(value);
    setValue("generations", value); // Обновляем значение в форме
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value > 0) {
      setValue("generations", value); // Обновляем значение в форме
    } else {
      setValue("generations", 1); // Установите значение по умолчанию, если значение некорректно
    }
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setActiveButton(999);
    if ((e.target as HTMLInputElement).value) {
      const value = Number((e.target as HTMLInputElement).value);
      if (!isNaN(value)) {
        setValue("generations", value); // Обновляем значение в форме
      }
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setValue("policies", checked); // Обновляем значение в форме
  };

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement("script");
      script.src = "https://js.networxpay.com/widget/be_gateway.js";
      script.async = true;
      document.body.appendChild(script);
    };

    loadScript();
  }, []);

  const submitPayment = () => {
    const params = {
      checkout_url: "https://checkout.networxpay.com",
      checkout: {
        iframe: true,
        transaction_type: "payment",
        public_key: process.env.NEXT_PUBLIC_SHOP_PUBLIC_KEY || "",
        order: {
          amount: (watch("generations") * (GENERATIONS_PRICE * 100)).toFixed(0),
          currency: "EUR",
          description: `Vision Engine AI Top Up (${watch(
            "generations"
          )} Generations)`,
          tracking_id: userId,
        },
        customer: {
          email: user?.emailAddresses[0].emailAddress || "",
        },
        settings: {
          notification_url: "https://visionengineai.com/api/webhooks/payment",
        },
      },

      closeWidget: function (status: any) {
        if (status === "successful") {
          router.refresh();
          toast.success("Generations added successfully");
          closeModal();
        }
      },
    };

    if (window.BeGateway) {
      new window.BeGateway(params).createWidget();
    } else {
      console.error("BeGateway script is not loaded");
    }
  };

  return (
    <div className="relative z-50 mx-auto w-[500px] max-w-full rounded-lg bg-white px-8 py-8 dark:bg-light-dark">
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        Buy More Generations
      </h2>
      <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        Multiply your creativity with extra generations and unlock endless ways
        to explore your imagination.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full items-center gap-1.5 text-gray-600 dark:text-gray-400 pt-4 lg:pt-8">
          <div className="grid grid-cols-2">
            <p className="text-sm font-medium leading-sm">Price</p>
            <div className="flex gap-2 items-center justify-end">
              <p className="text-sm font-medium leading-sm text-end">
                {(watch("generations") * generationPrice).toFixed(2)}
              </p>
              <Listbox
                {...register("currency")}
                value={watch("currency")}
                onChange={handleCurrencyChange}
                disabled={loading}
              >
                <div className="relative">
                  <ListboxButton className="w-[60px] h-[24px] text-center text-case-inherit letter-space-inherit rounded-md sm:rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-600 outline-none transition-shadow duration-200 hover:border-gray-900 hover:ring-1 hover:ring-gray-900 dark:border-input-light-dark dark:bg-light-dark dark:text-gray-400 dark:hover:border-white/60 dark:hover:ring-white/60 flex items-center justify-center">
                    {watch("currency")}
                  </ListboxButton>
                  <ListboxOptions className="absolute left-0 z-10 mt-1 grid w-full origin-top-right gap-0.5 rounded-md sm:rounded-lg border border-gray-200 bg-white p-1 shadow-large outline-none dark:border-input-light-dark dark:bg-light-dark">
                    {currencies.map((currency, idx) => (
                      <ListboxOption
                        key={idx}
                        className={({ active }) =>
                          `flex cursor-pointer items-center justify-center rounded-md text-sm text-gray-600 transition dark:text-gray-400 ${
                            active
                              ? "bg-gray-200/70 font-medium dark:bg-gray-400/60"
                              : "hover:bg-gray-100 dark:hover:bg-gray-700/70"
                          }`
                        }
                        value={currency}
                      >
                        {currency}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          </div>
          <div className="grid grid-cols-2 pt-1">
            <p className="text-sm font-medium leading-sm">Generations</p>
            <p className="text-sm font-medium leading-sm text-end">
              {watch("generations")} Generations
            </p>
          </div>

          <label
            htmlFor="generations"
            className="block text-sm font-medium pt-4 lg:pt-8"
          >
            Choose generations option
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-2">
            {[50, 100, 500].map((value) => (
              <button
                type="button"
                key={value}
                disabled={loading}
                onClick={() => handleButtonClick(value)}
                className={`px-2 py-1 text-sm font-medium border  rounded-md sm:rounded-lg dark:bg-accent  ${
                  activeButton === value
                    ? "text-gray-900 border-white/60 border-2 dark:text-white"
                    : "text-inherit border-gray-300 dark:border-input-light-dark"
                }`}
              >
                {value}
              </button>
            ))}
            <Input
              disabled={loading}
              type="number"
              id="generations"
              placeholder="Other"
              {...register("generations", { valueAsNumber: true })}
              onChange={handleInputChange}
              onClick={handleInputClick}
              className={`block w-full rounded-md sm:rounded-lg border border-gray-200 bg-white px-2 py-1 text-sm placeholder-gray-400 transition-shadow duration-200 invalid:border-red-500 invalid:text-red-600 focus:border-gray-900 focus:outline-none focus:ring-0 focus:ring-gray-900 focus:invalid:border-red-500 focus:invalid:ring-red-500 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 dark:bg-light-dark  dark:focus:border-white/60 dark:focus:ring-white/60 sm:h-10 text-center 
                ${
                  activeButton === 999
                    ? "text-gray-900 dark:text-white border-white/60 border-2"
                    : "text-inherit border-gray-300 dark:border-input-light-dark"
                }`}
            />
          </div>
          {errors.generations && (
            <p className="text-red-600 text-sm pt-1">
              {errors.generations.message}
            </p>
          )}
        </div>
        <div className="mt-6">
          <Field className="flex items-center gap-2">
            <Checkbox
              {...register("policies")} // Теперь используем register правильно
              checked={watch("policies")} // Отслеживаем значение чекбокса
              onChange={handleCheckboxChange} // Обрабатываем изменение состояния чекбокса
              className="group block size-4 rounded border border-gray-400 dark:border-input-light-dark"
            >
              <svg
                className="stroke-gray-800 dark:stroke-gray-400 opacity-0 group-data-[checked]:opacity-100"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M3 8L6 11L11 3.5"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Checkbox>
            <Label
              className={
                "text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400"
              }
            >
              I agree to the{" "}
              <Link
                href="/terms-and-conditions"
                className="text-gray-700 hover:text-gray-700 hover:underline hover:underline-offset-4 dark:text-gray-300 dark:hover:text-gray-200"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy-policy"
                className="text-gray-700 hover:text-gray-700 hover:underline hover:underline-offset-4 dark:text-gray-300 dark:hover:text-gray-200"
              >
                Privacy Policy
              </Link>
              .
            </Label>
          </Field>
          {errors.policies && (
            <p className="text-red-600 text-sm">{errors.policies.message}</p>
          )}
        </div>
        <div className="mt-6">
          <Button
            className="w-full"
            shape="rounded"
            disabled={loading}
            type="submit"
          >
            Buy Generations
          </Button>
        </div>
        <div className="mt-6">
          <p className="text-center text-xs leading-loose tracking-tight text-gray-600 dark:text-gray-400">
            ANTEROSIA LTD - 41 Devonshire Street, <br />
            Ground Floor, London, United Kingdom, W1G 7AJ
          </p>
        </div>
      </form>
    </div>
  );
}
