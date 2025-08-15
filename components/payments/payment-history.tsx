"use client";
import { Transaction } from "@prisma/client";

interface FarmsProps {
  patmentHistory: Transaction[];
}

export default function Farms({ patmentHistory }: FarmsProps) {
  console.log(patmentHistory.length);
  return (
    <div className="grid pt-8 sm:pt-12 lg:px-8 xl:px-10 2xl:px-0">
      <div className="relative z-10 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <h2 className="text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-2xl">
          Payment History
        </h2>
      </div>
      {patmentHistory.length === 0 ? (
        <p className="text-center mt-64">
          No payments yet—but stay tuned! Once you make a transaction, it’ll
          show up here.
        </p>
      ) : (
        <div className="mx-auto w-full">
          <div className="mb-3 hidden grid-cols-5 gap-6 rounded-lg border border-input-light-dark shadow-card bg-light-dark sm:grid lg:grid-cols-5">
            <span className="px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
              ID
            </span>
            <span className="px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
              Date
            </span>
            <span className="px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
              Amount
            </span>
            <span className="px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
              Currency
            </span>
            <span className="hidden px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300 sm:block">
              Status
            </span>
          </div>
          {patmentHistory.map((payment: Transaction) =>
            payment.id &&
            payment.amount &&
            payment.paid_at &&
            payment.currency &&
            payment.status ? (
              <div
                key={payment.id}
                className="relative mb-3 overflow-hidden bg-white border border-input-light-dark shadow-card transition-all last:mb-0 hover:shadow-large dark:bg-light-dark"
              >
                <div className="relative grid h-auto grid-cols-6 items-center gap-3 py-4 sm:h-20 sm:grid-cols-5 sm:gap-6 sm:py-0 lg:grid-cols-5 px-3">
                  <div className="col-span-3 sm:col-auto sm:px-6 xl:px-4">
                    {payment.id.slice(-8)}
                  </div>
                  <div
                    className="col-span-3 sm:col-auto text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-6 sm:text-sm"
                    suppressHydrationWarning
                  >
                    <span className="mb-1 block font-medium text-gray-600 dark:text-gray-400 ">
                      Date
                    </span>
                    {new Intl.DateTimeFormat("ru-RU", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(payment.paid_at))}
                  </div>
                  <div className="col-span-2 sm:col-auto text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-6 sm:text-sm">
                    <span className="mb-1 block font-medium text-gray-600 dark:text-gray-400 ">
                      Amount
                    </span>
                    {(payment.amount / 100).toFixed(2)}
                  </div>
                  <div className="col-span-2 sm:col-auto text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-6 sm:text-sm">
                    <span className="mb-1 block font-medium text-gray-600 dark:text-gray-400 ">
                      Currency
                    </span>
                    {payment.currency.toUpperCase()}
                  </div>
                  <div className="col-span-2 sm:col-auto text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-6 sm:text-sm">
                    <span className="mb-1 block font-medium text-gray-600 dark:text-gray-400 ">
                      Status
                    </span>
                    {payment.status}
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
