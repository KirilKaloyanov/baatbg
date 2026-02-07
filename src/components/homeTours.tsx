"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import hospitalityImage from '../../public/images/home/hospitality.jpg';
import Button from "./button";

interface HomeLodgesProps {
  locale: string;
}

export const HomeTours = ({ locale }: HomeLodgesProps) => {
  const isEn = locale === "en";

  const heading = isEn ? "Currated Tours" : "Авторски пътувания";
  const buttonText = isEn ? "Our tours" : "Пътувания";
  const linkHref = isEn ? "/en/tours" : "/bg/tours";

  /**
   * Animation Variant
   * We use 'as const' on the transition to fix the TS2322 error 
   * regarding the ease: number[] type mismatch.
   */
  const slideFromLeft = {
    initial: { x: -100, opacity: 0 },
    whileInView: { x: 0, opacity: 1 },
    viewport: { once: true },
    transition: { 
      duration: 1.2, 
      ease: [0.16, 1, 0.3, 1] as const 
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch w-full min-h-150 bg-white overflow-hidden">
      
      {/* LEFT COLUMN: 2/3 - The Hero Visual */}
      <div className="relative md:w-2/3 bg-stone-100 overflow-hidden group">
        <motion.div
          {...slideFromLeft}
          className="relative h-full min-h-100"
        >
          <Image
            src={hospitalityImage}
            alt={heading}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
            priority
          />
          {/* Stark overlay to match the template colors */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </motion.div>
      </div>

      {/* RIGHT COLUMN: 1/3 - Branding & Navigation */}
      <div className="flex flex-col justify-center items-start bg-white md:w-1/3 p-10 relative overflow-hidden">
        <div className="w-full z-10">
          <div className="overflow-hidden mb-12">
            <motion.h2
              initial={slideFromLeft.initial}
              whileInView={slideFromLeft.whileInView}
              viewport={slideFromLeft.viewport}
              transition={{ ...slideFromLeft.transition, delay: 0.2 }}
              className="text-4xl lg:text-5xl xl:text-7xl leading-[0.85] tracking-tighter uppercase"
            >
              {heading}
            </motion.h2>
          </div>

          <motion.div
            initial={slideFromLeft.initial}
            whileInView={slideFromLeft.whileInView}
            viewport={slideFromLeft.viewport}
            transition={{ ...slideFromLeft.transition, delay: 0.4 }}
          >
            <a href={linkHref}>
              <Button text={buttonText} classes={"px-8 py-3 lg:px-12 lg:py-4 font-bold lg:text-xl "}/>
            </a>
          </motion.div>
        </div>

        {/* Sharp corner detail - follows the branding template */}
        {/* <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-black m-4 hidden md:block opacity-100" /> */}
      </div>
    </div>
  );
};