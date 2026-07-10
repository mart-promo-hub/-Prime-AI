"use client";

import React, { createContext, useContext, useEffect, useState, useRef } from "react";

declare global {
  interface Window {
    Pi?: {
      init: (config: { version: string; sandbox?: boolean }) => void;
      authenticate: (scopes: string[], options?: any) => Promise<any>;
    };
  }
}

type PiContextType = {
  ready: boolean;
  initialized: boolean;
  pi: Window["Pi"] | null;
  error: string | null;
};

const PiContext = createContext<PiContextType>({
  ready: false,
  initialized: false,
  pi: null,
  error: null,
});

const MAX_ATTEMPTS = 30;
const CHECK_INTERVAL = 500;

export function PiProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PiContextType>({
    ready: false,
    initialized: false,
    pi: null,
    error: null,
  });

  const initializedRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    let cancelled = false;
    let attempts = 0;

    const initializePi = (): boolean => {
      try {
        const sdk = window.Pi;
        if (!sdk) return false;

        if (sdk.init && typeof sdk.init === "function") {
          sdk.init({
            version: process.env.NEXT_PUBLIC_PI_VERSION || "2.0",
            sandbox: process.env.NEXT_PUBLIC_PI_SANDBOX === "true",
          });

          if (!cancelled) {
            setState({
              ready: true,
              initialized: true,
              pi: sdk,
              error: null,
            });
          }
          return true;
        }
        return false;
      } catch (err) {
        console.error("Pi SDK initialization failed:", err);
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            ready: true,
            error: err instanceof Error ? err.message : "Unknown error",
          }));
        }
        return true;
      }
    };

    if (initializePi()) {
      return () => {
        cancelled = true;
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    intervalRef.current = setInterval(() => {
      attempts++;
      if (initializePi() || attempts >= MAX_ATTEMPTS) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        if (!cancelled && !state.ready) {
          console.warn("Pi SDK not loaded after maximum attempts");
          setState((prev) => ({
            ...prev,
            ready: true,
            error: "Pi SDK failed to load",
          }));
        }
      }
    }, CHECK_INTERVAL);

    return () => {
      cancelled = true;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return <PiContext.Provider value={state}>{children}</PiContext.Provider>;
}

export function usePi() {
  const context = useContext(PiContext);
  if (!context) {
    throw new Error("usePi must be used within a PiProvider");
  }
  return context;
}
