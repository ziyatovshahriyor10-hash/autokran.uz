"use client";

import { motion } from "framer-motion";
import { companyInfo } from "@/constants";
import { useTranslations } from "next-intl";

export const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 bg-brand-primary/10 border border-brand-primary/20 rounded-full mb-6">
            <span className="text-brand-primary font-bold text-sm tracking-widest uppercase">{t('badge')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-foreground leading-none mb-8 tracking-tighter">
            {t('title1')} <br/> 
            {t('title2')} <br/>
            <span className="text-brand-primary">{t('title3')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/60 max-w-xl mb-12 leading-relaxed">
            {companyInfo.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#fleet" className="bg-brand-primary text-black px-10 py-4 rounded-full font-black text-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-primary/20">
              {t('viewFleet')}
            </a>
            <a href={`tel:+998${companyInfo.phoneRaw}`} className="border-2 border-foreground/20 text-foreground px-10 py-4 rounded-full font-black text-lg hover:border-brand-primary hover:text-brand-primary transition-all">
              {t('contact')}
            </a>
          </div>
          
          <div className="mt-16 flex items-center gap-12 text-sm text-foreground/40 font-bold tracking-widest uppercase border-t border-foreground/5 pt-12">
            <div>
              <span className="block text-3xl font-black text-foreground mb-1 tracking-tighter">12+</span>
              {t('expYears')}
            </div>
            <div>
              <span className="block text-3xl font-black text-foreground mb-1 tracking-tighter">24/7</span>
              {t('service')}
            </div>
            <div>
              <span className="block text-3xl font-black text-foreground mb-1 tracking-tighter">100%</span>
              {t('safety')}
            </div>
          </div>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
           animate={{ opacity: 1, scale: 1, rotate: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent blur-3xl rounded-full" />
          <img 
            src="https://sc04.alicdn.com/kf/Hc1c12a033c894207b8b695e3ad5a4257x.jpg" 
            alt="Autokran Rental" 
            className="w-full h-auto object-cover rounded-3xl rotate-2 hover:rotate-0 transition-all duration-700 shadow-2xl relative z-10"
          />

        </motion.div>
      </div>
    </section>
  );
};

