import React, { createContext, useContext, useState, useEffect } from 'react';
import { BackgroundConfig } from '../types';

interface BackgroundContextType {
  background: BackgroundConfig;
  updateBackground: (config: BackgroundConfig) => void;
  resetBackground: () => void;
  isBackgroundModalOpen: boolean;
  setIsBackgroundModalOpen: (open: boolean) => void;
}

const DEFAULT_BACKGROUND: BackgroundConfig = {
  type: 'default',
  value: '#0a0912',
  overlayOpacity: 0.25,
  blur: 0,
};

const STORAGE_KEY = 'devmaster_custom_background_v1';

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [background, setBackground] = useState<BackgroundConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.type === 'default') return DEFAULT_BACKGROUND;
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to parse saved background', e);
    }
    return DEFAULT_BACKGROUND;
  });

  const [isBackgroundModalOpen, setIsBackgroundModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(background));
    } catch (e) {
      console.warn('Failed to save background to localStorage', e);
    }

    if (typeof document !== 'undefined') {
      const body = document.body;
      if (background.type === 'color') {
        body.style.backgroundColor = background.value;
        body.style.backgroundImage = 'none';
      } else if (background.type === 'gradient') {
        body.style.background = background.value;
        body.style.backgroundAttachment = 'fixed';
      } else if (background.type === 'image_upload' || background.type === 'image_url') {
        body.style.backgroundImage = `url("${background.value}")`;
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundAttachment = 'fixed';
      } else {
        body.style.backgroundColor = '';
        body.style.backgroundImage = '';
      }
    }
  }, [background]);

  const updateBackground = (config: BackgroundConfig) => {
    setBackground(config);
  };

  const resetBackground = () => {
    setBackground(DEFAULT_BACKGROUND);
  };

  return (
    <BackgroundContext.Provider
      value={{
        background,
        updateBackground,
        resetBackground,
        isBackgroundModalOpen,
        setIsBackgroundModalOpen,
      }}
    >
      {/* Dynamic Background Renderer Layer */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-700 -z-50 aurora-bg-mesh"
        style={getBackgroundStyle(background)}
      />
      {background.type !== 'default' && (
        <div
          className="fixed inset-0 pointer-events-none transition-opacity duration-500 -z-40 bg-black"
          style={{ opacity: background.overlayOpacity ?? 0.35 }}
        />
      )}
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};

function getBackgroundStyle(bg: BackgroundConfig): React.CSSProperties {
  if (bg.type === 'color') {
    return {
      backgroundColor: bg.value,
      filter: bg.blur ? `blur(${bg.blur}px)` : undefined,
    };
  }
  if (bg.type === 'gradient') {
    return {
      background: bg.value,
      filter: bg.blur ? `blur(${bg.blur}px)` : undefined,
    };
  }
  if (bg.type === 'image_upload' || bg.type === 'image_url') {
    return {
      backgroundImage: `url("${bg.value}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      filter: bg.blur ? `blur(${bg.blur}px)` : undefined,
    };
  }
  return {};
}
