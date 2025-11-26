import Link from 'next/link';
import { Logo } from '../Logo/Logo';

export function Footer() {
  const footerLinks = {
    produto: [
      { href: '#recursos', label: 'Recursos' },
      { href: '#sobre', label: 'Sobre' },
      { href: '#contato', label: 'Preços' },
    ],
    empresa: [
      { href: '#', label: 'Blog' },
      { href: '#', label: 'Carreiras' },
      { href: '#', label: 'Contato' },
    ],
    legal: [
      { href: '#', label: 'Privacidade' },
      { href: '#', label: 'Termos' },
      { href: '#', label: 'LGPD' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Logo />
            </div>
            <p className="text-gray-400 text-sm">
              Gestão escolar inteligente alimentada por IA
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2">
              {footerLinks.produto.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; 2024 Portal Educa. Todos os direitos reservados. |{' '}
            <Link
              href="/"
              className="hover:text-white transition-colors underline"
            >
              Voltar ao Início
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

