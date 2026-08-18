# SPECTRE E-HYPERCAR — Developer Documentation

Welcome to the **SPECTRE E-HYPERCAR** codebase. This repository contains the source code for an interactive digital showcase, bespoke vehicle configurator, audio simulation suite, and VIP allocation pipeline for the SPECTRE all-electric ultra-luxury hypercar.

---

## ⚡ Product Overview

The SPECTRE experience is designed around a **Dark Hypersonic Spatial Aesthetic**, blending motorsport-grade telemetry, luxury automotive design language, real-time client-side calculations, and a Web Audio API motor sound synthesizer.

### Key Metrics
- **Power Output:** 1,920 HP (Quad-Motor Inverter Architecture)
- **Acceleration:** 0–60 MPH in 1.74s
- **Top Speed:** 255+ MPH
- **Max Range:** 520+ Miles (140 kWh 800V Silicon-Anode Battery)
- **Base MSRP:** $2,850,000 USD (Production limited to 100 units)

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | React 19 (`react`, `react-dom`) with TypeScript |
| **Build Tooling** | Vite 6 |
| **Styling & Design** | Tailwind CSS v4 (`@tailwindcss/vite`), Custom Glassmorphism, CSS Glows |
| **Iconography** | Lucide React (`lucide-react`) |
| **Audio Engine** | Web Audio API Custom Multi-Oscillator Synthesizer (`HypercarSoundEngine`) |
| **Typography** | Google Fonts: *Syne* (Headlines), *Plus Jakarta Sans* (Body), *Space Grotesk* (Metrics/Telemetry) |

---

## 📂 Project Architecture

```
├── index.html                   # HTML template loading Google Fonts & meta tags
├── metadata.json                # AI Studio application metadata
├── package.json                 # Project scripts and dependencies
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
└── src/
    ├── main.tsx                 # React application entry point
    ├── App.tsx                  # Master application layout, state orchestrator
    ├── index.css                # Tailwind import, font definitions, glass & glow styles
    ├── types.ts                 # TypeScript data contracts & interfaces
    ├── data/
    │   └── carData.ts           # Exterior finishes, wheels, interiors, aero specs & quotes
    ├── lib/
    │   └── soundSynth.ts        # Web Audio API quad-motor acceleration synthesizer
    └── components/
        ├── Header.tsx           # Floating blurred glass navigation & quick actions
        ├── Hero.tsx             # Main visual showcase, metric pills & quick color swatches
        ├── AerodynamicsSpecs.tsx# Interactive CFD & chassis feature hotspot tabs
        ├── VehicleConfigurator.tsx # Live studio customizer with real-time MSRP calculations
        ├── RangeSimulator.tsx   # Real-time aerodynamic drag & thermal range calculator
        ├── SoundSimulatorModal.tsx # 0-60 MPH launch control UI with live tachometer & G-force
        ├── PreOrderModal.tsx    # 3-step VIP allocation & reservation lead capture workflow
        └── Footer.tsx           # Media accolades, concierge bulletin subscription & legal links
```

---

## 🚀 Core Features & Modules

### 1. Web Audio Quad-Motor Sound Synthesizer (`src/lib/soundSynth.ts`)
Synthesizes real-time high-voltage motor whine and low-frequency inverter harmonics without relying on static MP3 files:
- **`primaryOsc`**: Sawtooth wave ramping from 110 Hz to 1450 Hz for electromagnetic motor whine.
- **`subOsc`**: Sub-bass sine wave ramping from 55 Hz to 320 Hz for structural torque hum.
- **`harmonicsOsc`**: Triangle wave ramping from 220 Hz to 2900 Hz for high-frequency turbine resonance.
- **`filterNode`**: Swept resonant low-pass filter (300 Hz → 8000 Hz with Q factor 4).
- **Telemetry Loop**: Provides granular `(speed, rpm)` updates to UI gauges over the 1.74-second acceleration curve.

### 2. Bespoke Vehicle Configurator (`src/components/VehicleConfigurator.tsx`)
Enables visitors to customize their hypercar in real time:
- **Exterior Paint**: Vantablack Stealth, Electric Violet, Liquid Titanium, Solar Crimson.
- **Wheels**: 21" Aero Carbon Turbine, 22" Titanium Monoblock, 21" Stealth Center-Lock.
- **Interior Theme**: Obsidian Alcantara, Arctic White Semi-Aniline Leather, Solar Crimson Racing Buckets.
- **Performance Packages**: Track Aerodynamic Package (+$120k), Carbon Ceramic Matrix Brakes (+$45k).
- **Synchronized State**: Changing colors anywhere updates the entire site (Hero, Configurator, Pre-Order summary).

### 3. Dynamic Range & Performance Calculator (`src/components/RangeSimulator.tsx`)
Calculates estimated range based on real-world physics formulas:
- **Velocity Resistance**: Power consumption scales with aerodynamic drag ($P \propto v^{2.1}$).
- **Thermal Efficiency**: Accounts for ambient temperature deviations from optimal 70°F.
- **Drive Modes**: Toggles between *GT Aero Cruiser* and *Track Velocity* modes.
- **Telemetry Outputs**: Dynamic Range (miles), Energy Consumption (Wh/mi), Continuous Power (kW), and Drag Coefficient ($C_d$).

### 4. 3-Step VIP Allocation Workflow (`src/components/PreOrderModal.tsx`)
- **Step 1 (Tier Selection)**: Choose between Founders Series (#001/#100) or SPECTRE GT.
- **Step 2 (Client Details)**: Legal name, contact email, phone, and delivery region.
- **Step 3 (Refundable Deposit)**: Bank Wire, Credit Card, or Crypto Concierge for $25,000 USD reservation deposit.
- **Confirmation**: Issues a unique VIP reservation serial code (`SPECTRE-VIP-XXXXXX`).

---

## 💻 Developer Setup & Commands

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
Starts the Vite development server on `http://localhost:3000`:
```bash
npm run dev
```

### Production Build
Compiles TypeScript and bundles assets for deployment:
```bash
npm run build
```

### Type Checking & Linting
Runs TypeScript compiler in `noEmit` mode to catch type errors:
```bash
npm run lint
```

---

## 🎨 Design System Guide

### Color Palette
- **Vantablack Void (Background)**: `#020204`
- **Electric Purple (Primary Accent)**: `#A855F7` / `rgba(168, 85, 247, 1)`
- **Aero Cyan (Secondary Accent)**: `#06B6D4` / `rgba(6, 182, 212, 1)`
- **Glass Card Background**: `rgba(10, 10, 18, 0.65)` with `backdrop-filter: blur(16px)`
- **Border Accents**: `rgba(168, 85, 247, 0.18)` to `rgba(168, 85, 247, 0.45)`

### Typography Classes
- **Display Headlines**: `font-syne` (Syne 700/800)
- **Body & Form Copy**: `font-jakarta` (Plus Jakarta Sans 400/500/600)
- **Metrics, Counters & HUD**: `font-space` (Space Grotesk 600/700) or `font-mono`

---

## 🔧 How to Extend

1. **Add a New Paint / Finish**:
   Update `PAINT_OPTIONS` in `src/data/carData.ts` with the new color id, name, hex code, price, and image URL.

2. **Add Custom Audio Profiles**:
   Modify or add sound modes in `src/lib/soundSynth.ts` by adjusting oscillator base frequencies and filter envelope ramps.

3. **Add Telemetry Variables**:
   Update `calculateMetrics()` in `src/components/RangeSimulator.tsx` to incorporate additional parameters such as elevation, battery degradation, or tire compound coefficients.
