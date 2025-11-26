import Link from 'next/link';

export function CTA() {
  return (
    <section
      id="contato"
      className="relative py-20 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Pronto para começar?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Junte-se a milhares de escolas que já transformaram sua gestão educacional
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all group"
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
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all"
          >
            Agendar Demo
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Sem cartão de crédito
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Teste grátis 30 dias
          </span>
          <span className="flex items-center gap-2">
            <span className="text-green-400">✓</span>
            Suporte 24/7
          </span>
        </div>
      </div>
    </section>
  );
}

