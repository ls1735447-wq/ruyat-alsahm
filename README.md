# رؤية السهم — دليل النشر الكامل

## هيكل المشروع
```
ruyat-alsahm/
├── src/
│   ├── main.jsx          ← نقطة الدخول
│   ├── App.jsx           ← الراوتر (Landing vs Dashboard)
│   ├── LandingPage.jsx   ← صفحة الاشتراك والتسويق
│   └── Dashboard.jsx     ← التطبيق الكامل
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## الخطوة 1 — رفع الكود على GitHub

1. افتح github.com وأنشئ حساب مجاني
2. انشئ repository جديد اسمه `ruyat-alsahm`
3. ارفع كل الملفات:
   - زر "uploading an existing file"
   - اسحب مجلد ruyat-alsahm كامل
   - اضغط "Commit changes"

---

## الخطوة 2 — نشر على Vercel

1. افتح vercel.com وسجّل بـ GitHub
2. اضغط "Add New Project"
3. اختر repository `ruyat-alsahm`
4. Vercel يكتشف Vite تلقائياً
5. اضغط "Deploy"
6. بعد دقيقتين يعطيك رابط مثل: `ruyat-alsahm.vercel.app` ✅

---

## الخطوة 3 — ربط دومين خاص (اختياري)

### شراء الدومين:
- namecheap.com أو godaddy.com
- حوالي 50-80 ر.س/سنة

### ربطه بـ Vercel:
1. من Vercel → Settings → Domains
2. أضف دومينك مثل `ruyat-alsahm.com`
3. Vercel يعطيك record DNS
4. في Namecheap → Advanced DNS → أضف الـ record
5. انتظر ساعة → جاهز! ✅

---

## الخطوة 4 — تفعيل الدفع الحقيقي (Moyasar)

### التسجيل:
1. moyasar.com → سجّل كتاجر
2. وثّق حسابك (هوية + سجل تجاري)
3. احصل على `publishable_key` و `secret_key`

### الربط:
في `LandingPage.jsx` استبدل القسم المميز بكود Moyasar:

```jsx
// 1. أضف Moyasar script في index.html:
// <script src="https://cdn.moyasar.com/mpf/1.14.0/moyasar.js"></script>

// 2. في handleActivate() استبدل بـ:
window.Moyasar.init({
  element: '.mysr-form',
  amount: 15000, // 150 ر.س بالهللة
  currency: 'SAR',
  description: 'اشتراك رؤية السهم - شهري',
  publishable_api_key: 'pk_live_YOUR_KEY',
  callback_url: 'https://ruyat-alsahm.com/success',
  on_completed: (payment) => {
    // فعّل الاشتراك بعد نجاح الدفع
    handleActivate();
  }
});
```

---

## الخطوة 5 — إدارة المستخدمين (Supabase)

للحصول على قاعدة بيانات حقيقية:

1. supabase.com → مشروع مجاني
2. أنشئ جدول `subscriptions`:
   ```sql
   CREATE TABLE subscriptions (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     email text UNIQUE NOT NULL,
     sahmk_key text NOT NULL,
     plan text DEFAULT 'monthly',
     expires_at timestamptz NOT NULL,
     created_at timestamptz DEFAULT now()
   );
   ```
3. استبدل localStorage بـ Supabase client

---

## تحديث التطبيق

في أي وقت تريد إضافة ميزة جديدة:

1. اطلب التعديل من Claude في هذا الـ chat
2. Claude يعطيك الكود المحدث
3. استبدل الملف في GitHub
4. Vercel يحدث الموقع تلقائياً خلال دقيقة ✅

---

## الإيرادات المتوقعة

| المشتركون | الإيراد الشهري | بعد تكاليف سهمك |
|-----------|----------------|-----------------|
| 10        | 1,500 ر.س      | 1,350 ر.س       |
| 50        | 7,500 ر.س      | 7,350 ر.س       |
| 100       | 15,000 ر.س     | 14,850 ر.س      |

---

## الدعم

للتعديلات والتطوير: راجع هذا الـ Claude chat في أي وقت
