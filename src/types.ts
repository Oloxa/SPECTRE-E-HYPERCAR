export type ColorVariant = 'vantablack' | 'violet' | 'titanium' | 'crimson';

export interface PaintOption {
  id: ColorVariant;
  name: string;
  hex: string;
  accentHex: string;
  price: number;
  bgGradient: string;
  imageUrl: string;
}

export interface WheelOption {
  id: string;
  name: string;
  size: string;
  price: number;
  description: string;
}

export interface InteriorOption {
  id: string;
  name: string;
  material: string;
  price: number;
}

export interface ConfiguratorState {
  paint: ColorVariant;
  wheels: string;
  interior: string;
  trackPackage: boolean;
  carbonCeramicBrakes: boolean;
  totalPrice: number;
}

export interface PreOrderForm {
  step: number;
  tier: 'founders' | 'performance' | 'stealth';
  fullName: string;
  email: string;
  phone: string;
  region: string;
  paymentMethod: 'card' | 'wire' | 'crypto';
  termsAccepted: boolean;
  isSubmitted: boolean;
  reservationId?: string;
}
