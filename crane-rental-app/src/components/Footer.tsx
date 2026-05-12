"use client";

import { Globe, Send, Phone, MapPin } from "lucide-react";
import { companyInfo } from "@/constants";
import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations("Footer");
  const navT = useTranslations("Navbar");

  return (
    <footer className="bg-background pt-24 pb-12 overflow-hidden border-t border-brand-primary/10">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          <div>
             <div className="flex items-center gap-2 mb-8 group cursor-pointer">
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform">
                 <span className="text-black font-black text-xl">A</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-foreground">
                AUTOKRAN<span className="text-brand-primary">.UZ</span>
              </span>
            </div>
            <p className="text-foreground/60 leading-relaxed mb-8">
              {t('description')}
            </p>
            <div className="flex gap-4">
               <a href={companyInfo.telegram} target="_blank" className="p-4 bg-brand-surface rounded-2xl hover:bg-brand-primary group transition-all border border-brand-primary/5">
                  <Send size={24} className="text-foreground group-hover:text-black transition-colors" />
               </a>
               <a href={companyInfo.instagram} target="_blank" className="p-4 bg-brand-surface rounded-2xl hover:bg-brand-primary group transition-all border border-brand-primary/5">
                  <Globe size={24} className="text-foreground group-hover:text-black transition-colors" />
               </a>
            </div>
          </div>

          <div>
             <h4 className="text-xl font-black text-foreground mb-8">{t('links')}</h4>
             <ul className="space-y-4">
                <li><a href="#about" className="text-foreground/60 hover:text-brand-primary transition-colors">{navT('about')}</a></li>
                <li><a href="#fleet" className="text-foreground/60 hover:text-brand-primary transition-colors">{navT('fleet')}</a></li>
                <li><a href="#partners" className="text-foreground/60 hover:text-brand-primary transition-colors">{navT('partners')}</a></li>
                <li><a href="#" className="text-foreground/60 hover:text-brand-primary transition-colors">{t('faq')}</a></li>
             </ul>
          </div>

          <div>
             <h4 className="text-xl font-black text-foreground mb-8">{t('contact')}</h4>
             <ul className="space-y-6">
                <li className="flex items-start gap-4">
                   <div className="p-3 bg-brand-surface rounded-xl border border-brand-primary/5"><Phone size={20} className="text-brand-primary" /></div>
                   <div>
                      <span className="block text-foreground/40 text-xs font-bold uppercase tracking-widest mb-1">{t('phoneLabel')}</span>
                      <a href={`tel:+998${companyInfo.phoneRaw}`} className="text-foreground font-bold hover:text-brand-primary transition-colors">
                        +998 {companyInfo.phoneRaw}
                      </a>
                   </div>
                </li>
                <li className="flex items-start gap-4">
                   <div className="p-3 bg-brand-surface rounded-xl border border-brand-primary/5"><MapPin size={20} className="text-brand-primary" /></div>
                   <div>
                       <span className="block text-foreground/40 text-xs font-bold uppercase tracking-widest mb-1">{t('addressLabel')}</span>
                       <span className="text-foreground font-bold">{companyInfo.address}</span>
                   </div>
                </li>
             </ul>
          </div>

        </div>

        <div className="border-t border-brand-primary/5 pt-12 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-foreground/40 uppercase tracking-widest" suppressHydrationWarning>
           <p>© {new Date().getFullYear()} {companyInfo.shortName}. {t('rights')}</p>
           <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className="hover:text-brand-primary transition-colors">{t('privacy')}</a>
              <a href="#" className="hover:text-brand-primary transition-colors">{t('terms')}</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

