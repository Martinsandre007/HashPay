import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GameState, Sector, MapEvent, Operative } from './types';

interface GameContextType {
    state: GameState;
    updateState: (updates: Partial<GameState>) => void;
    navigateTo: (sector: Sector) => void;
    spawnEvent: (event: MapEvent) => void;
    removeEvent: (eventId: string) => void;
    updateRotation: (rotation: number) => void;
}

const STORAGE_KEY = 'xodus_game_state';

const initialState: GameState = {
    currentSector: Sector.LANDING,
    activeEvents: [],
    scanRotation: 0,
    operatives: [],
    inventory: [],
    resources: {
        xodus: 12850.42,
        scrap: 0,
        reputation: 0
    }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<GameState>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : initialState;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const updateState = (updates: Partial<GameState>) => {
        setState(prev => ({ ...prev, ...updates }));
    };

    const navigateTo = (sector: Sector) => {
        setState(prev => ({ ...prev, currentSector: sector }));
    };

    const spawnEvent = (event: MapEvent) => {
        setState(prev => ({
            ...prev,
            activeEvents: [...prev.activeEvents, event]
        }));
    };

    const removeEvent = (eventId: string) => {
        setState(prev => ({
            ...prev,
            activeEvents: prev.activeEvents.filter(e => e.id !== eventId)
        }));
    };

    const updateRotation = (rotation: number) => {
        setState(prev => ({ ...prev, scanRotation: rotation }));
    };

    return (
        <GameContext.Provider value={{
            state,
            updateState,
            navigateTo,
            spawnEvent,
            removeEvent,
            updateRotation
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
