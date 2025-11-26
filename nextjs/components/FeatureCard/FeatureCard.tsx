'use client';

import { Feature } from '@/types';

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
      <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100 group-hover:text-blue-50 transition-colors">
        {feature.number}
      </div>
      
      <div className="relative z-10">
        <div className="w-16 h-16 mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
          {feature.icon}
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
        <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
        
        <a
          href="#"
          className="inline-flex items-center gap-2 text-blue-600 font-semibold group/link"
        >
          <span>Saiba mais</span>
          <svg
            className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

