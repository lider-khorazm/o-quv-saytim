import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { BackgroundProvider } from './context/BackgroundContext';
import { SyncBanner } from './components/SyncBanner';
import { initRemoteStorage } from './services/storage';
import { startPolling } from './services/remoteStore';

// Avval markaziy ombordan ma'lumotni olamiz, keyin ilovani ochamiz
initRemoteStorage().finally(() => {
  startPolling();
  createRoot(document.getElementById('root')!).render(
    <ThemeProvider>
      <BackgroundProvider>
        <App />
        <SyncBanner />
      </BackgroundProvider>
    </ThemeProvider>
  );
});
