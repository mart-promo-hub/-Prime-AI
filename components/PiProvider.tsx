"use client";
import { createContext, useContext, useEffect, useState } from 'react';

const PiContext = createContext<any>(null);

export function PiProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [pi, setPi] = useState<any>(null);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && (window as any).Pi) {
        setPi((window as any).Pi);
      }
    } catch (e) {
      console.error("Pi SDK error", e);
    }
    setIsReady(true);
  }, []);

  return <PiContext.Provider value={{ pi, isReady }}>{children}</PiContext.Provider>;
}

export const usePi = () => useContext(PiContext);
