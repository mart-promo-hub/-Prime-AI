"use client";
import { useEffect, useState } from 'react';

export default function Home() {
  const [isPiReady, setIsPiReady] = useState(false);
  const [message, setMessage] = useState("جاري فحص اتصال Pi SDK...");

  useEffect(() => {
    // دالة للتحقق من وجود الـ Pi SDK
    const checkPi = () => {
      if (typeof window !== 'undefined' && window.Pi) {
        setIsPiReady(true);
        setMessage("تم الاتصال بـ Pi بنجاح! التطبيق يعمل الآن.");
      } else {
        // إذا لم يتم العثور عليه، ننتظر قليلاً ونحاول مرة أخرى
        setTimeout(checkPi, 1000); 
      }
    };

    checkPi();
  }, []);

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#5C338A' }}>πPrime AI</h1>
      <p style={{ fontSize: '18px', marginTop: '20px' }}>{message}</p>
      
      {isPiReady ? (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid green' }}>
          ✅ اتصال آمن ومستقر. يمكنك الآن البدء بإضافة الميزات.
        </div>
      ) : (
        <div style={{ marginTop: '30px', color: '#ff9800' }}>
          ⏳ يرجى الانتظار، جاري الربط مع شبكة Pi...
        </div>
      )}
    </div>
  );
}
