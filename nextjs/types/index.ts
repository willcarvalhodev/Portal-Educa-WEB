import React from 'react';

export interface Feature {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface AboutCard {
  id: string;
  avatar: string;
  name: string;
  role: string;
  value: number;
  unit: string;
}

export interface Version {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: string;
  features: string[];
}

