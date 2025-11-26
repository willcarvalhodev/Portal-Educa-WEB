import { Metadata } from 'next';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import Link from 'next/link';
import { Features } from '@/components/Features/Features';
import { About } from '@/components/About/About';
import { CTA } from '@/components/CTA/CTA';

export const metadata: Metadata = {
  title: 'Versão Básica - Portal Educa',
  description: 'Versão básica do Portal Educa - design limpo e funcional',
};

function BasicHero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Gestão Escolar Inteligente</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Plataforma completa alimentada por IA que transforma a experiência educacional.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Fazer Login
          </Link>
          <a
            href="#recursos"
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
          >
            Saiba Mais
          </a>
        </div>
      </div>
    </section>
  );
}

export default function BasicPage() {
  return (
    <>
      <Header />
      <main>
        <BasicHero />
        <Features />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

