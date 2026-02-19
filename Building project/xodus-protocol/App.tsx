
import React, { useState, useEffect } from 'react';
import { Sector } from './types';
import LandingScreen from './screens/LandingScreen';
import CommandScreen from './screens/CommandScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import DossierScreen from './screens/DossierScreen';
import LobbyScreen from './screens/LobbyScreen';
import ForgeScreen from './screens/ForgeScreen';
import LoungeScreen from './screens/LoungeScreen';
import DenScreen from './screens/DenScreen';
import SafehouseScreen from './screens/SafehouseScreen';
import ProfileScreen from './screens/ProfileScreen';
import HUDScreen from './screens/HUDScreen';
import MasteryScreen from './screens/MasteryScreen';
import ResultScreen from './screens/ResultScreen';
import WalletScreen from './screens/WalletScreen';
import ArcadeScreen from './screens/ArcadeScreen';
import MarketScreen from './screens/MarketScreen';
import { GameProvider, useGame } from './GameContext';

const AppContent: React.FC = () => {
  const { state, navigateTo } = useGame();
  const { currentSector } = state;

  const renderSector = () => {
    switch (currentSector) {
      case Sector.LANDING: return <LandingScreen onEnter={() => navigateTo(Sector.REGISTRATION)} />;
      case Sector.REGISTRATION: return <RegistrationScreen onComplete={() => navigateTo(Sector.COMMAND)} />;
      case Sector.COMMAND: return <CommandScreen />;
      case Sector.DOSSIER: return <DossierScreen />;
      case Sector.LOBBY: return <LobbyScreen onReady={() => navigateTo(Sector.HUD)} />;
      case Sector.FORGE: return <ForgeScreen />;
      case Sector.LOUNGE: return <LoungeScreen />;
      case Sector.DEN: return <DenScreen />;
      case Sector.SAFEHOUSE: return <SafehouseScreen />;
      case Sector.PROFILE: return <ProfileScreen />;
      case Sector.HUD: return <HUDScreen onComplete={() => navigateTo(Sector.RESULT)} />;
      case Sector.MASTERY: return <MasteryScreen />;
      case Sector.RESULT: return <ResultScreen onReturn={() => navigateTo(Sector.FORGE)} />;
      case Sector.WALLET: return <WalletScreen />;
      case Sector.ARCADE: return <ArcadeScreen />;
      case Sector.MARKET: return <MarketScreen />;
      default: return <LandingScreen onEnter={() => navigateTo(Sector.REGISTRATION)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-white flex flex-col font-display relative">
      <div className="flex-1 flex flex-col">
        {renderSector()}
      </div>

      {![Sector.LANDING, Sector.HUD, Sector.RESULT].includes(currentSector) && (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background-dark/95 border-t border-primary/20 backdrop-blur-xl px-4 py-3 flex items-center justify-around">
          <button
            onClick={() => navigateTo(Sector.COMMAND)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentSector === Sector.COMMAND ? 'text-primary' : 'text-primary/40 hover:text-primary'}`}
          >
            <span className="material-symbols-outlined">map</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Map</span>
          </button>
          <button
            onClick={() => navigateTo(Sector.FORGE)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentSector === Sector.FORGE ? 'text-primary' : 'text-primary/40 hover:text-primary'}`}
          >
            <span className="material-symbols-outlined">hub</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Forge</span>
          </button>
          <button
            onClick={() => navigateTo(Sector.MARKET)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentSector === Sector.MARKET ? 'text-primary' : 'text-primary/40 hover:text-primary'}`}
          >
            <span className="material-symbols-outlined">storefront</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Market</span>
          </button>
          <button
            onClick={() => navigateTo(Sector.WALLET)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentSector === Sector.WALLET ? 'text-primary' : 'text-primary/40 hover:text-primary'}`}
          >
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Wallet</span>
          </button>
          <button
            onClick={() => navigateTo(Sector.PROFILE)}
            className={`flex flex-col items-center gap-1 transition-colors ${currentSector === Sector.PROFILE ? 'text-primary' : 'text-primary/40 hover:text-primary'}`}
          >
            <span className="material-symbols-outlined">person</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
          </button>
        </nav>
      )}
    </div>
  );
};

import { SuiProvider } from './SuiProvider';

const App: React.FC = () => (
  <SuiProvider>
    <GameProvider>
      <AppContent />
    </GameProvider>
  </SuiProvider>
);

export default App;
