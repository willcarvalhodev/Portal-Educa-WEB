'use client';

import { FeatureCard } from '../FeatureCard/FeatureCard';
import { Feature } from '@/types';

const features: Feature[] = [
  {
    id: '1',
    number: '01',
    title: 'Correção Automática',
    description:
      'IA que corrige provas e trabalhos com precisão de 95%, economizando horas de trabalho.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 2L20.09 11.26L30 12.27L22.5 19.14L24.18 29.02L16 24.77L7.82 29.02L9.5 19.14L2 12.27L11.91 11.26L16 2Z" />
      </svg>
    ),
  },
  {
    id: '2',
    number: '02',
    title: 'Assistente Virtual',
    description:
      'Chat 24/7 disponível para alunos e professores, respondendo dúvidas instantaneamente.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 2C8.27 2 2 8.27 2 16C2 23.73 8.27 30 16 30C23.73 30 30 23.73 30 16C30 8.27 23.73 2 16 2Z" />
      </svg>
    ),
  },
  {
    id: '3',
    number: '03',
    title: 'Analytics Avançado',
    description:
      'Dashboards inteligentes com insights em tempo real sobre desempenho e engajamento.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor">
        <path d="M4 4H28V28H4V4Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 12H28" strokeWidth="2" />
        <path d="M12 4V28" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: '4',
    number: '04',
    title: 'Notas Transparentes',
    description:
      'Alunos acompanham notas e feedback em tempo real com explicações detalhadas.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 2L20.09 11.26L30 12.27L22.5 19.14L24.18 29.02L16 24.77L7.82 29.02L9.5 19.14L2 12.27L11.91 11.26L16 2Z" />
      </svg>
    ),
  },
  {
    id: '5',
    number: '05',
    title: 'Planejamento Inteligente',
    description:
      'Gere planos de aula personalizados baseados no currículo e necessidades dos alunos.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 2C8.27 2 2 8.27 2 16C2 23.73 8.27 30 16 30C23.73 30 30 23.73 30 16C30 8.27 23.73 2 16 2Z" />
      </svg>
    ),
  },
  {
    id: '6',
    number: '06',
    title: 'Integração Total',
    description:
      'Conecte-se com todas as ferramentas que você já usa através de API aberta.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
        <path d="M16 2L20.09 11.26L30 12.27L22.5 19.14L24.18 29.02L16 24.77L7.82 29.02L9.5 19.14L2 12.27L11.91 11.26L16 2Z" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="recursos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
            <span className="w-10 h-0.5 bg-blue-600" />
            Recursos
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="block">Tudo que</span>
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              você precisa
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ferramentas poderosas projetadas para simplificar e otimizar a gestão
            educacional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

