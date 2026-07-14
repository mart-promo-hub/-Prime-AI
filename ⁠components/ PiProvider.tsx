"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface PiUser {
  uid: string;
  username: string;
  piAddress?: string;
  balance?: number;
}

interface PiContextType {
  user: PiUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isSDKReady: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => void;
}

const PiContext = createContext<PiContextType | undefined>(undefined);

export function PiProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PiUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSDKReady, setIsSDKReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkPiSDK = () => {
      if (typeof window !== "undefined" && (window as any).Pi) {
        try {
          (window as any).Pi.init({
            appId: "M69FT1ID8qPG_U8VxMmbxZ9ZvsgSx-0sCvvADTFj9CI",
            version: "1.0",
            sandbox: true,
          });
          setIsSDKReady(true);
          console.log("✅ Pi SDK ready");
          return true;
        } catch (err) {
          console.error("Pi.init error:", err);
          setError("فشل تهيئة Pi SDK");
          return false;
        }
      }
      return false;
    };

    // تحقق فوري
    if (checkPiSDK()) return;

    // تحقق كل 200ms لمدة 10 ثوانٍ
    const interval = setInterval(() => {
      if (checkPiSDK()) {
        clearInterval(interval);
      }
    }, 200);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setError("تعذر تحميل Pi SDK، تأكد من فتح التطبيق في Pi Browser");
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const signIn = async () => {
    if (!isSDKReady) {
      setError("Pi SDK ليس جاهزاً بعد");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const Pi = (window as any).Pi;
      if (!Pi) {
        throw new Error("Pi SDK غير موجود");
      }

      const result = await Pi.authenticate(["username", "payments"]);
      
      if (result && result.user) {
        const userData: PiUser = {
          uid: result.user.uid || result.user.id,
          username: result.user.username || "Pi User",
          piAddress: result.user.piAddress || "",
          balance: 0.75,
        };
        setUser(userData);
        localStorage.setItem("piUser", JSON.stringify(userData));
        console.log("✅ User authenticated:", userData);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      if (err.message?.includes("cancelled")) {
        setError("تم إلغاء تسجيل الدخول");
      } else {
        setError(err.message || "فشل تسجيل الدخول");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("piUser");
  };

  return (
    <PiContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isSDKReady,
        error,
        signIn,
        signOut,
      }}
    >
      {children}
    </PiContext.Provider>
  );
}

export function usePi() {
  const context = useContext(PiContext);
  if (context === undefined) {
    throw new Error("usePi must be used within a PiProvider");
  }
  return context;
}
