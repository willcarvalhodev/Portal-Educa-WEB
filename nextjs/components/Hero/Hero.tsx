'use client';

import Link from 'next/link';
import { handleHashClick } from '@/lib/utils/scroll';

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-white">Powered by AI</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-gray-900">Gestão Escolar</span>
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Inteligente
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Plataforma completa alimentada por IA que transforma a experiência
              educacional. Conecte professores, alunos e gestores em um único
              ecossistema inteligente.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all group"
              >
                <span>Fazer Login</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <a
                href="#recursos"
                onClick={handleHashClick}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                Saiba Mais
              </a>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Floating Cards */}
              <div className="absolute -top-10 -left-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl animate-float">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-sm font-semibold">Analytics</div>
              </div>
              <div className="absolute -top-5 -right-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl animate-float delay-300">
                <div className="text-3xl mb-2">🤖</div>
                <div className="text-sm font-semibold">IA</div>
              </div>
              <div className="absolute -bottom-10 left-1/4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl animate-float delay-500">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-sm font-semibold">Rápido</div>
              </div>

              {/* Main Visual Screen */}
              <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {[60, 80, 45, 90].map((height, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-t from-blue-600 to-purple-600 rounded-lg animate-pulse"
                      style={{
                        height: `${height}px`,
                        animationDelay: `${idx * 200}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

