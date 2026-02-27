<div align="center">
  <img width="1200" alt="HashPay Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
  
  # 💳 HashPay
  ### **The Next-Generation Payment & Escrow Protocol on Sui**
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Sui Network](https://img.shields.io/badge/Network-Sui-blue)](https://sui.io/)
  [![Built with Gemini](https://img.shields.io/badge/AI-Powered%20by%20Gemini-orange)](https://ai.google.dev/)

  ---
</div>

## 🚀 Overview

**HashPay** is a comprehensive financial application built on the **Sui Blockchain**. It bridges the gap between traditional fiat payments and decentralized finance (DeFi), offering a seamless, secure, and AI-enhanced user experience. Whether you're managing crypto assets, executing on-chain escrows, or swapping fiat for crypto, HashPay provides the tools for the modern financial era.

## ✨ Core Features

- **🌐 Hybrid Fiat-Crypto Gateway**: Integrated with Afriex for real-world fiat transactions and on-chain liquidity.
- **🛡️ Secure On-Chain Escrow**: Native Sui-based escrow signing for trustless peer-to-peer commerce.
- **🤖 AI Voice Assistant**: Powered by **Google Gemini**, interact with your wallet and execute transactions using natural language.
- **📷 Advanced QR Scanning**: High-speed QR scanner for instant payments and contact sharing.
- **🏦 Vault & Savings**: Specialized vault containers with lock-up periods and yield opportunities.
- **⚡ Zero-Knowledge Layer**: Enhanced privacy via zk-SNARKs for sensitive transactional metadata.
- **📱 Mobile-First Design**: A premium, responsive UI built with **Framer Motion** for smooth, app-like interactions.

## 🛠️ Technology Stack

- **Frontend**: [React 19](https://react.dev/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Blockchain**: [Sui SDK (@mysten/sui)](https://sdk.mystenlabs.com/typescript)
- **AI/LLM**: [Google Gemini Pro (@google/genai)](https://ai.google.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: Modern Vanilla CSS with high-fidelity glassmorphism themes
- **Utilities**: [html2canvas](https://html2canvas.hertzen.com/), [jsQR](https://github.com/cozmo/jsQR)

## 📦 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Sui Wallet extension (e.g., [Sui Wallet](https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmccihmbglisocjlieokhkghcbe))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Martinsandre007/HashPay.git
   cd HashPay
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_AFRIEX_SECRET_KEY=your_afriex_key_here
   ```

4. **Launch the development server:**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

- `screens/`: Feature-rich UI components (Auth, Dashboard, Escrow, etc.)
- `components/`: Reusable UI elements and layouts.
- `api/`: API clients for Afriex, Sui, and Gemini.
- `move/`: Sui Move smart contracts.
- `WalletContext.tsx`: Global state management for blockchain interactions.

## 📄 License

Distributed under the MIT License. See `LICENSE` (if applicable) for more information.

---

<div align="center">
  Built with ❤️ by the HashPay Team for the Sui Ecosystem.
</div>
