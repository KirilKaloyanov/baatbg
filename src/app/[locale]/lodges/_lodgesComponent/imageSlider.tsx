"use client";

import React, { useState } from "react";
import Image from "next/image";

import { motion, AnimatePresence, wrap } from "framer-motion";

// import { IMarker } from "@/interfaces/Marker";
import CustomLink from "@/components/navigation/customLink";
import { LodgeSimpleDTO } from "@/interfaces/LodgeSimpleDTO";

// We use a custom variant to control the direction of the slide (1 for next, -1 for previous)
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 0,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

// This function calculates the distance to drag before triggering a slide
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

function ImageSlider({
  locale,
  markers,
  selectedMarker,
  onMarkerClick,
}: {
  locale: string;
  markers: LodgeSimpleDTO[];
  onMarkerClick: (marker: LodgeSimpleDTO) => void;
  selectedMarker: LodgeSimpleDTO;
}) {
  const selectedMarkerIdx = markers.indexOf(selectedMarker);

  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    const newIdx = wrap(0, markers.length, selectedMarkerIdx + newDirection);
    onMarkerClick(markers[newIdx]);
  };

  const imageIndex = wrap(0, markers.length, selectedMarkerIdx);
  const currentMarker = markers[imageIndex];

  return (
    <div className="bg-stone-300 flex flex-col items-center justify-center">
      <div className="relative h-[400px] md:h-[500px] w-full max-w-4xl overflow-hidden">
        {/* AnimatePresence ensures that the exiting component animates out */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={selectedMarkerIdx} // Key must change to trigger the exit/enter animation
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            // Enable dragging for mobile swiping
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                // Swipe left -> Go to next image
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                // Swipe right -> Go to previous image
                paginate(-1);
              }
            }}
            className="absolute inset-0 cursor-grab"
          >
            {/* Image Container */}
            <Image
              src={currentMarker.imgHero}
              alt={currentMarker.name[locale]}
              fill
              className="object-cover"
              onDragStart={(e) => e.preventDefault()}
            />

            {/* Text Overlay */}
            <div className="absolute top-65 md:top-72 bottom-10 left-1/4 md:left-1/2 right-5 md:right-10 xl:right-15 bg-stone-900 opacity-80 flex flex-col items-start justify-end p-2 md:p-10 lg:p-4">
              <p className="text-white m-0 md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold">
                <CustomLink href={`lodges/${currentMarker.id}`} className="block leading-6 md:leading-7 hover:text-accent-100">{currentMarker.name[locale]}</CustomLink>
                <span className="block leading-6 md:leading-10 text-xs font-light tracking-wide text-background">
                  {currentMarker.community[locale]}
                </span>
              </p>
            </div>
            
          </motion.div>
        </AnimatePresence>

        {/* --- 3. Navigation Controls (Handlers) --- */}

        {/* Right Arrow */}
        <button
          className="bg-base-900 absolute top-1/2 right-0 z-0 -translate-y-1/2 p-4 text-white"
          onClick={() => paginate(1)}
          aria-label="Next Image"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>

        {/* Left Arrow */}
        <button
          className="bg-base-900 absolute top-1/2 left-0 z-0 -translate-y-1/2 p-4 text-white"
          onClick={() => paginate(-1)}
          aria-label="Previous Image"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 z-0 flex -translate-x-1/2 transform space-x-2">
          {markers.map((_, idx) => {
            const currentIdx = wrap(0, markers.length, selectedMarkerIdx);
            const activeDotStyle =
              idx === currentIdx ? "w-5 bg-background" : "bg-stone-400";
            return (
              <div
                key={idx}
                className={`h-3 w-3 cursor-pointer rounded-full transition-all ${activeDotStyle}`}
                onClick={() => {
                  paginate(idx > currentIdx ? 1 : -1);
                }}
                aria-label={`Go to slide ${idx + 1}`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ImageSlider;
