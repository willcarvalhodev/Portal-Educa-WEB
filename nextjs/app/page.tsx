'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const versions = [
    {
      id: 'basic',
      name: 'Versão Básica',
      description:
        'Um site simples e funcional criado com IA. Perfeito para quem quer algo direto ao ponto.',
      href: '/basic',
      icon: '📄',
      features: [
        'Design limpo e minimalista',
        'Carregamento rápido',
        'Fácil navegação',
        'Responsivo',
      ],
    },
    {
      id: 'modern',
      name: 'Versão Moderna',
      description:
        'Um site avançado com animações, efeitos visuais e interatividade. Mostra o poder da IA moderna.',
      href: '/modern',
      icon: '✨',
      features: [
        'Animações suaves',
        'Efeitos visuais avançados',
        'Interatividade completa',
        'Design premium',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center max-w-6xl w-full animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Image
            src="/images/icon.ico"
            alt="Portal Educa"
            width={80}
            height={80}
            className="object-contain"
          />
          <span className="text-3xl font-bold text-white">Portal Educa</span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Escolha sua Versão
        </h1>
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
          Veja como a IA pode criar sites incríveis. Compare as duas versões:
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {versions.map((version) => (
            <Link
              key={version.id}
              href={version.href}
              className="group bg-white/95 backdrop-blur-md rounded-3xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              
              <div className="text-6xl mb-6">{version.icon}</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {version.name}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {version.description}
              </p>
              
              <ul className="space-y-2 mb-6 text-left">
                {version.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold group-hover:shadow-lg transition-all">
                Ver {version.name} →
              </div>
            </Link>
          ))}
        </div>

        <p className="text-white/80 text-sm">
          💡 <strong>Dica:</strong> Ambas as versões foram criadas com IA. Compare e
          veja as possibilidades!
        </p>
      </div>
    </div>
  );
}

