"use client";

import { useTranslations } from "next-intl";

export const About = () => {
  const t = useTranslations("About");

  return (
    <section id="about" className="py-32 border-t border-brand-primary/10 bg-brand-surface/20">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
         <div className="relative group">
            <div className="absolute -inset-4 bg-brand-primary/10 blur-[60px] rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative p-12 bg-brand-surface rounded-[40px] border border-brand-primary/10 shadow-2xl">
               <h3 className="text-4xl font-black text-foreground mb-8 tracking-tighter uppercase italic">
                  {t.rich('featuresTitle', {
                    br: () => <br />,
                    span: (chunks) => <span className="text-brand-primary">{chunks}</span>
                  })}
               </h3>
               <div className="space-y-12">
                 <div className="flex gap-6 group/item">
                    <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center shrink-0 group-hover/item:rotate-6 transition-transform">
                       <span className="text-black font-black text-2xl tracking-tighter">01</span>
                    </div>
                    <div>
                       <h4 className="text-xl font-black text-foreground mb-2 group-hover/item:text-brand-primary transition-colors uppercase">{t('features.f1.title')}</h4>
                       <p className="text-foreground/50 font-medium leading-relaxed">{t('features.f1.desc')}</p>
                    </div>
                 </div>
                 <div className="flex gap-6 group/item">
                    <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center shrink-0 group-hover/item:rotate-6 transition-transform">
                       <span className="text-black font-black text-2xl tracking-tighter">02</span>
                    </div>
                    <div>
                       <h4 className="text-xl font-black text-foreground mb-2 group-hover/item:text-brand-primary transition-colors uppercase">{t('features.f2.title')}</h4>
                       <p className="text-foreground/50 font-medium leading-relaxed">{t('features.f2.desc')}</p>
                    </div>
                 </div>
                 <div className="flex gap-6 group/item">
                    <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center shrink-0 group-hover/item:rotate-6 transition-transform">
                       <span className="text-black font-black text-2xl tracking-tighter">03</span>
                    </div>
                    <div>
                       <h4 className="text-xl font-black text-foreground mb-2 group-hover/item:text-brand-primary transition-colors uppercase">{t('features.f3.title')}</h4>
                       <p className="text-foreground/50 font-medium leading-relaxed">{t('features.f3.desc')}</p>
                    </div>
                 </div>
               </div>
            </div>
         </div>
         
         <div>
            <span className="text-brand-primary font-bold tracking-widest text-sm uppercase mb-4 block">{t('badge')}</span>
            <h2 className="text-5xl font-black text-foreground mb-8 tracking-tighter leading-tight">
               {t.rich('title', {
                 br: () => <br />,
                 span: (chunks) => <span className="text-gradient">{chunks}</span>
               })}
            </h2>
            <p className="text-xl text-foreground/50 mb-12 leading-relaxed italic">
               {t('description')}
            </p>
            
            <div className="grid grid-cols-2 gap-8">
               <div className="p-8 bg-brand-surface rounded-3xl border border-brand-primary/10 hover:border-brand-primary/20 transition-all group">
                  <span className="block text-5xl font-black text-brand-primary mb-2 group-hover:scale-110 transition-transform">500+</span>
                  <span className="text-sm font-bold text-foreground/40 uppercase tracking-widest">{t('projects')}</span>
               </div>
               <div className="p-8 bg-brand-surface rounded-3xl border border-brand-primary/10 hover:border-brand-primary/20 transition-all group">
                  <span className="block text-5xl font-black text-brand-primary mb-2 group-hover:scale-110 transition-transform">20+</span>
                  <span className="text-sm font-bold text-foreground/40 uppercase tracking-widest">{t('experience')}</span>
               </div>
            </div>
         </div>
      </div>
    </section>
  );
};
