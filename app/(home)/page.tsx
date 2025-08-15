import React from "react";
import Curveline from "@/assets/images/curveline.svg";
import Image1 from "@/assets/images/home-1.png";
import Image2 from "@/assets/images/home-2.png";
import Image3 from "@/assets/images/home-3.png";
import Image4 from "@/assets/images/home-4.png";
import Image from "next/image";
import Link from "next/link";

const MainPage = () => {
  return (
    <>
      <section className="">
        <div className="grid max-w-screen-xl px-4 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto order-1 lg:order-0 place-self-center lg:col-span-7">
            <h1 className="lg:max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white relative">
              Create Stunning <br className="hidden lg:block" />
              Images with AI{" "}
              <span className="absolute hidden md:block -bottom-5 md:-right-10 lg:left-36 xl:left-56">
                <Image
                  src={Curveline.src}
                  width={Curveline.width}
                  height={Curveline.height}
                  alt={"Curveline"}
                />
              </span>
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-lg dark:text-gray-400">
              Unleash creativity with Vision Engine AI. Transform descriptions
              into breathtaking visuals in seconds. Bring your ideas to life for
              personal projects or marketing!
            </p>
          </div>
          <div className="flex order-0 lg:order-1 lg:mt-0 lg:col-span-5 ">
            <Image
              src={Image1.src}
              width={1000}
              height={700}
              alt="hero image"
            />
          </div>
        </div>
      </section>
      <section className="">
        <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
          <div className="items-center lg:gap-8 grid lg:grid-cols-2 xl:gap-16">
            <Image
              className="w-full mb-4 rounded-lg lg:mb-0 flex"
              src={Image2.src}
              alt="dashboard feature image"
              height={700}
              width={1000}
            ></Image>
            <div className=" text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                AI Image Generation Made Simple
              </h2>
              <p className="mb-8 font-light lg:text-xl">
                Turn ideas into stunning visuals with the power of AI. Whether
                you&apos;re a designer, marketer, or just exploring creativity,
                we provide seamless, high-quality results.
              </p>

              <ul
                role="list"
                className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-input-light-dark"
              >
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-brand"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Fast and intuitive interface
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-brand"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Share your creations with others
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-brand"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Discover and get inspired by community designs
                  </span>
                </li>
              </ul>
              <p className="mb-8 font-light lg:text-xl">
                Bring your imagination to life and connect with a creative
                community through Vision Engine AI!
              </p>
            </div>
          </div>

          <div className="items-center lg:gap-8 grid lg:grid-cols-2 xl:gap-16">
            <div className="order-1 lg:order-0 text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                AI-Powered Creativity
              </h2>
              <p className="mb-8 font-light lg:text-xl">
                Our platform harnesses advanced AI technology to help you
                transform your concepts into stunning visuals without the hefty
                price tag.
              </p>

              <ul
                role="list"
                className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-input-light-dark"
              >
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-brand"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Competitive Pricing
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-brand"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Cutting-Edge Generation Models
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-brand"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Customizable Generation Settings
                  </span>
                </li>
                <li className="flex space-x-3">
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-brand"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    Vibrant Creative Community
                  </span>
                </li>
              </ul>
              <p className="font-light lg:text-xl">
                See how Vision Engine AI can enhance your creativity with
                accessible, customizable, and inspiring image generation!
              </p>
            </div>
            <Image
              className="order-0 lg:order-1 flex w-full mb-4 rounded-lg lg:mb-0"
              src={Image3.src}
              alt="feature image 2"
              width={1000}
              height={700}
            />
          </div>
        </div>
      </section>
      <section className="">
        <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
          <div className="col-span-2 mb-8">
            <p className="text-lg font-medium text-brand">Vision Engine AI</p>
            <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">
              Trusted by over 10.000 users and 50 teams
            </h2>
            <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
              Join the countless users who have made us their preferred choice
              for image generation!
            </p>
            <div className="pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-input-light-dark">
              <div>
                <Link
                  href="/showcase"
                  className="inline-flex items-center text-base font-medium text-brand hover:text-gray-400"
                >
                  Explore Community Showcase
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
              <div>
                <Link
                  href="/dashboard/images/generate"
                  className="inline-flex items-center text-base font-medium text-brand hover:text-gray-400"
                >
                  Start Image Generation
                  <svg
                    className="w-5 h-5 ml-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
            <div>
              <svg
                className="w-10 h-10 mb-2 text-brand md:w-12 md:h-12"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                3K+ Generations
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Created images daily.
              </p>
            </div>
            <div>
              <svg
                className="w-10 h-10 mb-2 text-brand md:w-12 md:h-12"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                10K+ Users
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Trusted by over 10 thousand users around the world
              </p>
            </div>
            <div>
              <svg
                className="w-10 h-10 mb-2 text-brand md:w-12 md:h-12 "
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                100+ countries
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Used in 100+ countries.
              </p>
            </div>
            <div>
              <svg
                className="w-10 h-10 mb-2 text-brand md:w-12 md:h-12 "
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                x="0px"
                y="0px"
                width="512px"
                height="512px"
                viewBox="0 0 512 512"
                enableBackground="new 0 0 512 512"
              >
                <polygon
                  strokeWidth="37.6152"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeMiterlimit="10"
                  points="  259.216,29.942 330.27,173.919 489.16,197.007 374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08   29.274,197.007 188.165,173.919 "
                />
              </svg>
              <h3 className="mb-2 text-2xl font-bold dark:text-white">
                95% Satisfaction
              </h3>
              <p className="font-light text-gray-500 dark:text-gray-400">
                Users report high satisfaction with their generated visuals.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
          <figure className="max-w-screen-md mx-auto">
            <svg
              className="h-12 mx-auto mb-3 text-brand"
              viewBox="0 0 24 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                fill="currentColor"
              />
            </svg>
            <blockquote>
              <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
                &quot;Artificial intelligence has the potential to become a new
                kind of artistic co-creator, helping artists to create
                masterpieces and go beyond their own limitations. Itcs not a
                replacement for creativity, it&quot;ss an enhancement of
                it.&quot;
              </p>
            </blockquote>
            <figcaption className="flex items-center justify-center mt-6 space-x-3">
              <Image
                className="w-6 h-6 rounded-full"
                src={Image4.src}
                width={24}
                height={24}
                alt="profile picture"
              />
              <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                <div className="pr-3 font-medium text-gray-900 dark:text-white">
                  Ray Kurzweil
                </div>
                <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                  Futurist, engineer.
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
};

export default MainPage;
