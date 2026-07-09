"use client";
import { usePi } from "@/components/PiProvider";

export default function Home() {
  const { isReady, pi } = usePi();

  // إذا كان النظام لا يزال في مرحلة التهيئة، نظهر رسالة انتظار
  if (!isReady) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        fontFamily: 'sans-serif' 
      }}>
        <p>جاري تهيئة النظام، يرجى الانتظار...</p>
      </div>
    );
  }

  // الواجهة الرئيسية بعد التحميل
  return (
    <main style={{ 
      padding: '20px', 
      textAlign: 'center', 
      fontFamily: 'sans-serif',
      color: '#333'
    }}>
      <h1 style={{ color: '#5c2d91' }}>مرحباً بك في πPrime AI</h1>
      <p>منصة الذكاء الاصطناعي الذكية لشبكة Pi</p>
      
      <div style={{ 
        marginTop: '3
