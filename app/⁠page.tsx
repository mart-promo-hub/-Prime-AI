"use client";
import { usePi } from "@/components/PiProvider";

export default function Home() {
  const { isReady, pi } = usePi();

  // لا نجعل المستخدم ينتظر للأبد، إذا تأخر التحميل نظهر واجهة التطبيق مباشرة
  return (
    <main style={{ padding: '20px', textAlign: 'center' }}>
      <h1>πPrime AI</h1>
      {isReady ? (
        <p>الحالة: {pi ? "متصل بـ Pi Network" : "وضع العمل المستقل (بدون SDK)"}</p>
      ) : (
        <p>جاري التحميل...</p>
      )}
    </main>
  );
}
