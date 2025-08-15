"use client";

import Image from "@/components/ui/image";

import CardLogoDark from "@/assets/images/cards.svg";

const Footer = () => {
  return (
    <div className="py-6 mx-auto mt-6 sm:mt-8 xl:mt-12 2xl:mt-16 border-gray-200 border-t dark:border-input-light-dark w-full">
      <Image
        className="mx-auto"
        src={CardLogoDark}
        alt="cards logo"
        width={250}
        height={150}
      />
      <p className="pt-4 text-xs tracking-tighter mx-auto text-center">
        © 2025 Vision Engine AI | All rights reserved
      </p>
      <p className="pt-2 text-xs tracking-tighter mx-auto text-center">
        ANTEROSIA LTD (№ 14539966) - 41 Devonshire Street, Ground Floor, London,
        United Kingdom, W1G 7AJ
      </p>
    </div>
  );
};

export default Footer;
