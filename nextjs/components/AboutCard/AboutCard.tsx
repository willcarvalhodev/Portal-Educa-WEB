'use client';

import { AboutCard as AboutCardType } from '@/types';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface AboutCardProps {
  card: AboutCardType;
}

export function AboutCard({ card }: AboutCardProps) {
  const count = useAnimatedCounter(card.value, 2000);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 group">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{card.avatar}</div>
          <div>
            <div className="font-bold text-lg text-gray-900">{card.name}</div>
            <div className="text-sm text-gray-600">{card.role}</div>
          </div>
        </div>
      </div>
      <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {count}
        {card.unit}
      </div>
    </div>
  );
}

