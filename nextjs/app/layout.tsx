import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Portal Educa - Gestão Escolar Inteligente',
  description:
    'Plataforma completa alimentada por IA que transforma a experiência educacional',
  keywords: ['educação', 'IA', 'gestão escolar', 'portal educa'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

