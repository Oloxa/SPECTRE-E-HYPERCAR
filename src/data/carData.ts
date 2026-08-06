import { PaintOption, WheelOption, InteriorOption } from '../types';

export const PAINT_OPTIONS: PaintOption[] = [
  {
    id: 'vantablack',
    name: 'Vantablack Stealth',
    hex: '#09090b',
    accentHex: '#A855F7',
    price: 0,
    bgGradient: 'from-zinc-950 via-purple-950/20 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'violet',
    name: 'Electric Violet',
    hex: '#7e22ce',
    accentHex: '#d8b4fe',
    price: 45000,
    bgGradient: 'from-purple-950 via-slate-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'titanium',
    name: 'Liquid Titanium',
    hex: '#94a3b8',
    accentHex: '#06B6D4',
    price: 65000,
    bgGradient: 'from-slate-900 via-cyan-950/20 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'crimson',
    name: 'Solar Crimson',
    hex: '#dc2626',
    accentHex: '#f87171',
    price: 85000,
    bgGradient: 'from-red-950 via-zinc-950 to-black',
    imageUrl: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1600&q=80',
  },
];

export const WHEEL_OPTIONS: WheelOption[] = [
  {
    id: 'aero-carbon',
    name: '21" Aero Carbon Turbine',
    size: '21" Front / 22" Rear',
    price: 0,
    description: 'Forged carbon aero blade wheels optimized for low drag coefficient.',
  },
  {
    id: 'titanium-forged',
    name: '22" Titanium Monoblock',
    size: '22" All-Around',
    price: 32000,
    description: 'Ultra-lightweight aerospace titanium grade 5 3D-printed spokes.',
  },
  {
    id: 'stealth-black',
    name: '21" Stealth Center-Lock',
    size: '21" Track Spec',
    price: 28000,
    description: 'Motorsport-derived single center-lock nut with active cooling channels.',
  },
];

export const INTERIOR_OPTIONS: InteriorOption[] = [
  {
    id: 'alcantara-purple',
    name: 'Obsidian & Purple Stitch Alcantara',
    material: 'Ultrasuede & Laser-perforated Leather',
    price: 0,
  },
  {
    id: 'nappa-white',
    name: 'Arctic White Semi-Aniline Leather',
    material: 'Hydrophobic Aerospace Leather & Brushed Titanium',
    price: 24000,
  },
  {
    id: 'crimson-track',
    name: 'Solar Crimson Racing Bucket Shells',
    material: 'Pre-preg Carbon Fiber Shells & Fire-resistant Nomex',
    price: 38000,
  },
];

export const AERO_FEATURES = [
  {
    id: 'monocoque',
    title: 'Carbon-Titanium Monocoque',
    subtitle: 'AEROSPACE ARCHITECTURE',
    stat: '42,000 Nm/deg',
    statLabel: 'Torsional Rigidity',
    description:
      'Seamless single-piece carbon-titanium weave with integrated battery cell structure. Delivers motorsport safety standards at an unprecedented dry weight under 1,980 kg.',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=80',
    tags: ['Carbon Weave', 'Structural Battery', 'FIA Crash Tested'],
  },
  {
    id: 'torque-vectoring',
    title: 'Quad-Motor Torque Vectoring',
    subtitle: 'INTELLIGENT DYNAMICS',
    stat: '1,920 HP / 2,360 Nm',
    statLabel: 'Combined Output',
    description:
      'Independent high-rpm permanent magnet synchronous motor at each wheel. Computes surface grip 10,000 times per second to deliver surgical cornering vectoring and zero-lag response.',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1000&q=80',
    tags: ['4 Motors', '10kHz Grip Calc', '22,000 RPM Max'],
  },
  {
    id: 'active-aero',
    title: 'Active Rear Wing & Venturi Aero',
    subtitle: 'AIRFLOW CONTROL',
    stat: '1,200 KG',
    statLabel: 'Downforce @ 200 MPH',
    description:
      'Hydraulic dual-element active wing adjusts angle of attack in 20ms for air-braking and high-speed stability. Underbody active venturi tunnels create ground-effect vacuum.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
    tags: ['Active DRS', 'Ground Effect', '20ms Airbrake'],
  },
];

export const MEDIA_QUOTES = [
  {
    outlet: 'Robb Report',
    quote: 'SPECTRE obliterates the line between hypercar performance and aerospace science. The response is instantaneous and breathtaking.',
    badge: 'Hypercar of the Year',
  },
  {
    outlet: 'Top Gear',
    quote: '1,920 horsepower executed with absolute surgical precision. This is the new pinnacle benchmark of electric automotive engineering.',
    badge: '10/10 Rating',
  },
  {
    outlet: 'Car and Driver',
    quote: '0 to 60 MPH in 1.74 seconds redefines human perception of speed. A masterpiece in aerodynamics and electric powertrain dynamics.',
    badge: 'Design Excellence Award',
  },
];
