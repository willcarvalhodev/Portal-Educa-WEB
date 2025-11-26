'use client';

import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { AboutCard } from '../AboutCard/AboutCard';

const aboutCards = [
  {
    id: '1',
    avatar: '👨‍🏫',
    name: 'Professores',
    role: 'Economia de Tempo',
    value: 70,
    unit: '%',
  },
  {
    id: '2',
    avatar: '🎓',
    name: 'Alunos',
    role: 'Satisfação',
    value: 95,
    unit: '%',
  },
  {
    id: '3',
    avatar: '📊',
    name: 'Precisão',
    role: 'IA',
    value: 98,
    unit: '%',
  },
];

export function About() {
  const schools = useAnimatedCounter(10, 2000, ' Mil');
  const users = useAnimatedCounter(500, 2000, ' Mil');
  const uptime = useAnimatedCounter(99, 2000, '%');

  const stats = [
    { value: schools, label: 'Escolas' },
    { value: users, label: 'Usuários' },
    { value: uptime, label: 'Uptime' },
  ];

  return (
    <section id="sobre" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
              <span className="w-10 h-0.5 bg-blue-600" />
              Sobre
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Plataforma Omnichannel
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              O Portal Educa é uma solução completa que integra todos os aspectos da gestão
              escolar. Nossa plataforma conecta professores, alunos e gestores em um ecossistema
              unificado.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {aboutCards.map((card) => (
              <AboutCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

