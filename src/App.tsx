import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AerodynamicsSpecs } from './components/AerodynamicsSpecs';
import { VehicleConfigurator } from './components/VehicleConfigurator';
import { RangeSimulator } from './components/RangeSimulator';
import { SoundSimulatorModal } from './components/SoundSimulatorModal';
import { PreOrderModal } from './components/PreOrderModal';
import { Footer } from './components/Footer';
import { ColorVariant, ConfiguratorState } from './types';

export default function App() {
  const [selectedColor, setSelectedColor] = useState<ColorVariant>('vantablack');
  const [isSoundSimOpen, setIsSoundSimOpen] = useState(false);
  const [isReserveOpen, setIsReserveOpen] = useState(false);

  // Configurator state synced with color picker
  const [config, setConfig] = useState<ConfiguratorState>({
    paint: 'vantablack',
    wheels: 'aero-carbon',
    interior: 'alcantara-purple',
    trackPackage: false,
    carbonCeramicBrakes: false,
    totalPrice: 2850000,
  });

  const handleSelectColor = (color: ColorVariant) => {
    setSelectedColor(color);
    setConfig((prev) => ({ ...prev, paint: color }));
  };

  const handleUpdateConfig = (newConfig: Partial<ConfiguratorState>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      if (newConfig.paint) {
        setSelectedColor(newConfig.paint);
      }
      return updated;
    });
  };

  const scrollToConfigurator = () => {
    const el = document.getElementById('configurator');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#020204] text-white selection:bg-purple-600 selection:text-white font-jakarta relative overflow-x-hidden">
      {/* Floating Header */}
      <Header
        onOpenReserve={() => setIsReserveOpen(true)}
        onOpenConfigurator={scrollToConfigurator}
        onOpenSoundSim={() => setIsSoundSimOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        selectedColor={selectedColor}
        onSelectColor={handleSelectColor}
        onOpenSoundSim={() => setIsSoundSimOpen(true)}
        onOpenReserve={() => setIsReserveOpen(true)}
        onOpenConfigurator={scrollToConfigurator}
      />

      {/* Interactive Specs & Aerodynamics Section */}
      <AerodynamicsSpecs />

      {/* Interactive Vehicle Configurator Widget */}
      <VehicleConfigurator
        config={config}
        onChangeConfig={handleUpdateConfig}
        onOpenReserveWithConfig={() => setIsReserveOpen(true)}
      />

      {/* Range & Performance Simulator */}
      <RangeSimulator />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <SoundSimulatorModal
        isOpen={isSoundSimOpen}
        onClose={() => setIsSoundSimOpen(false)}
      />

      <PreOrderModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        config={config}
      />
    </div>
  );
}
