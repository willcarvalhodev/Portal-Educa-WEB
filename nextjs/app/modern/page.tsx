import { Metadata } from 'next';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { Hero } from '@/components/Hero/Hero';
import { Features } from '@/components/Features/Features';
import { About } from '@/components/About/About';
import { CTA } from '@/components/CTA/CTA';

export const metadata: Metadata = {
  title: 'Versão Moderna - Portal Educa',
  description: 'Versão moderna do Portal Educa com animações e efeitos visuais avançados',
};

export default function ModernPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

