/**
 * تأخير تنفيذ الكود لمدة معينة
 * @param ms - المدة بالمللي ثانية
 * @returns Promise
 * @example
 * await delay(1000); // ينتظر ثانية واحدة
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * تنسيق الأرقام إلى عملة Pi
 * @param amount - المبلغ
 * @returns نص منسق مع عملة Pi
 * @example
 * formatPi(0.75); // "0.75 Pi"
 */
export const formatPi = (amount: number): string => {
  return `${amount.toFixed(2)} Pi`;
};

/**
 * التحقق من صحة الرابط (URL)
 * @param url - الرابط المراد التحقق منه
 * @returns true إذا كان الرابط صحيح، false إذا كان غير صحيح
 * @example
 * isValidUrl("https://example.com"); // true
 * isValidUrl("not a url"); // false
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * توليد معرف فريد (ID)
 * @returns معرف فريد على شكل نص
 * @example
 * generateId(); // "abc1234567890"
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * تنسيق التاريخ إلى صيغة مقروءة
 * @param date - التاريخ (كائن Date أو نص)
 * @returns التاريخ بصيغة مقروءة
 * @example
 * formatDate(new Date()); // "2026-07-10 14:30:45"
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * نسخ نص إلى الحافظة (Clipboard)
 * @param text - النص المراد نسخه
 * @returns Promise - يتم حله عند نجاح النسخ
 * @example
 * copyToClipboard("Hello World");
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error('Failed to copy text:', error);
    // طريقة بديلة للنسخ
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
};

/**
 * تحديد ما إذا كان الكود يعمل في المتصفح أم لا
 * @returns true إذا كان في المتصفح، false إذا كان في السيرفر
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * الحصول على قيمة من Local Storage بأمان
 * @param key - مفتاح التخزين
 * @returns القيمة المخزنة أو null
 */
export const getLocalStorage = <T>(key: string): T | null => {
  if (!isBrowser()) return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

/**
 * تخزين قيمة في Local Storage بأمان
 * @param key - مفتاح التخزين
 * @param value - القيمة المراد تخزينها
 */
export const setLocalStorage = <T>(key: string, value: T): void => {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

/**
 * حذف قيمة من Local Storage بأمان
 * @param key - مفتاح التخزين
 */
export const removeLocalStorage = (key: string): void => {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
};

/**
 * تقطيع النص إلى عدد محدد من الكلمات
 * @param text - النص المراد تقطيعه
 * @param wordCount - عدد الكلمات المطلوبة
 * @returns النص المقطوع مع "..." إذا كان أطول
 * @example
 * truncateText("This is a long text", 3); // "This is a..."
 */
export const truncateText = (text: string, wordCount: number): string => {
  const words = text.split(' ');
  if (words.length <= wordCount) return text;
  return words.slice(0, wordCount).join(' ') + '...';
};

/**
 * التحقق مما إذا كان النص يحتوي على كلمة معينة (تجاهل الحالة)
 * @param text - النص المراد البحث فيه
 * @param searchTerm - الكلمة المراد البحث عنها
 * @returns true إذا وجدت، false إذا لم توجد
 */
export const containsText = (text: string, searchTerm: string): boolean => {
  return text.toLowerCase().includes(searchTerm.toLowerCase());
};

/**
 * تنظيف النص من HTML tags
 * @param html - النص الذي يحتوي على HTML
 * @returns النص بدون HTML
 */
export const stripHtml = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};
