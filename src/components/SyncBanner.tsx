import { useEffect, useState } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { getSyncStatus, STATUS_EVENT, type SyncStatus } from '../services/remoteStore';
import { initializeStorage } from '../services/storage';

/** Yagona markaziy baza bilan aloqa uzilsa ogohlantiradi va qayta ulanish tugmasini beradi. */
export function SyncBanner() {
  const [status, setStatus] = useState<SyncStatus>(getSyncStatus());
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const onChange = (e: Event) => setStatus((e as CustomEvent<SyncStatus>).detail);
    window.addEventListener(STATUS_EVENT, onChange);
    return () => window.removeEventListener(STATUS_EVENT, onChange);
  }, []);

  if (status !== 'offline') return null;

  const handleReconnect = async () => {
    setReconnecting(true);
    try {
      await initializeStorage();
    } finally {
      setReconnecting(false);
    }
  };

  return (
    <div
      role="alert"
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#ff4d6d]/95 backdrop-blur-md text-white px-4 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-3 shadow-2xl border-t border-white/20"
    >
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>
        Markaziy ma&apos;lumotlar bazasi bilan aloqa vaqtincha uzildi — aloqa tiklangach barcha o&apos;zgarishlar yagona bazaga saqlanadi.
      </span>
      <button
        type="button"
        onClick={handleReconnect}
        disabled={reconnecting}
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-black transition-all cursor-pointer disabled:opacity-50"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${reconnecting ? 'animate-spin' : ''}`} />
        <span>Qayta ulanish</span>
      </button>
    </div>
  );
}
