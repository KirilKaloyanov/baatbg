"use client"

import { motion } from "framer-motion";
import Button from "./button";

export const SplitHero = ({ locale }) => {

  const heading = locale === "en" ? "We are Bulgarian Association for Alternative Tourism" : "Ние сме Българска асоциация за алтернативен туризъм"
  
  const bodyText = locale === 'bg'
    ? `Искаме да направим България значима и интригуваща дестинация за алтернативен туризъм. Насърчаваме развитието на партньорства, за да направим България заедно по-добро място за живот и бизнес. Присъединете се към каузата на БААТ за устойчиво развитие на туризма в България. Станете един от нас, за да подпомогнем заедно малкия туристически бизнес в България.`
    : `We encourage and support partnerships for the sustainable development of alternative forms of tourism at a regional and local level in order to preserve our natural, cultural and historical heritage and help Bulgaria become a better place for living and doing business. Join BAAT's mission for sustainable tourism development in Bulgaria. Be one of our members and together we will help the small business in Bulgaria.`
  
  const words = bodyText.split("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-100 w-full gap-8 items-center mt-3 md:mt-0 md:py-8">
      
      {/* Left Side: Heading emerging from left */}
      <div className="overflow-hidden">
        <motion.h2
          initial={{ y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="lg:text-5xl leading-[1.1] tracking-tighter uppercase"
        >
          {heading}
        </motion.h2>
      </div>

      {/* Right Side: Chatbot Typewriter Text */}
      <div className="bg-stone-50 p-6 shadow-inner min-h-37.5">
        <motion.p className="text-lg font-mono text-gray-800">
          {words.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.01,
                delay: index * 0.003, // Adjust speed here
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.p>
        <motion.div
          initial={{ opacity: 0}}
          whileInView={{ opacity: 1}}
          viewport={{once: true}}
          transition={{
          duration: 1,
          delay: words.length * 0.003
          }}
        >
          <Button text={locale === "bg" ? "Присъедини се" : "Join us"} classes="px-6 py-2 lg:px-8 lg:py-3" />
        </motion.div>
      </div>
      
    </div>
  );
};