import { useState, useEffect, type FC } from 'react';
import * as React from 'react';
import { AppScreen } from './types';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import AuthScreen from './screens/AuthScreen';
import DashboardScreen from './screens/DashboardScreen';
import SendScreen from './screens/SendScreen';
import ReceiveScreen from './screens/ReceiveScreen';
import TransactionDetailsScreen from './screens/TransactionDetailsScreen';
import EscrowScreen from './screens/EscrowScreen';
import VoiceAssistantScreen from './screens/VoiceAssistantScreen';
import SettingsScreen from './screens/SettingsScreen';
import OfflineModeScreen from './screens/OfflineModeScreen';
import AssetsScreen from './screens/AssetsScreen';
import SwapScreen from './screens/SwapScreen';
import ScanScreen from './screens/ScanScreen';
import VaultScreen from './screens/VaultScreen';
import BuyScreen from './screens/BuyScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ContactsScreen from './screens/ContactsScreen';
import AssetDetailsScreen from './screens/AssetDetailsScreen';
import RecoveryPhraseScreen from './screens/RecoveryPhraseScreen';
import NetworkSettingsScreen from './screens/NetworkSettingsScreen';
import FiatDashboardScreen from './screens/FiatDashboardScreen';
import KYCScreen from './screens/KYCScreen';
import ExchangeScreen from './screens/ExchangeScreen';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from './WalletContext';
import AppLayout from './components/AppLayout';

const App: FC = () => {
  // ... (rest of the component) ...
  return (
    <AppLayout currentScreen={currentScreen} onNavigate={(screen) => setCurrentScreen(screen)}>
      <AnimatePresence mode="wait">
        <motion.div
// ...
        </motion.div>
    </AnimatePresence>
    </AppLayout >
  );
};

export default App;

