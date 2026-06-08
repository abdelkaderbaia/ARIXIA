# BBM Architects — React Website

موقع مكتب دراسات هندسة معمارية، برج باجي مختار، الجزائر.

---

## 🚀 تشغيل المشروع محلياً (VS Code)

### المتطلبات
- [Node.js](https://nodejs.org/) (الإصدار 16 أو أحدث)
- npm (يأتي مع Node.js)

### الخطوات

```bash
# 1. افتح المجلد في VS Code
# File > Open Folder > اختر مجلد bbm-architects

# 2. افتح Terminal في VS Code (Ctrl + `)

# 3. ثبّت المكتبات
npm install

# 4. شغّل الموقع محلياً
npm start
```

سيفتح المتصفح تلقائياً على: **http://localhost:3000**

---

## 🌐 رفع الموقع على الإنترنت

### الخيار 1 — Vercel (مجاني وسهل) ✅ **موصى به**

1. اذهب إلى [vercel.com](https://vercel.com) وأنشئ حساباً مجانياً
2. اضغط **"New Project"**
3. اسحب مجلد `bbm-architects` مباشرة إلى Vercel
4. اضغط **Deploy**
5. ✅ موقعك جاهز على رابط مثل: `bbm-architects.vercel.app`

---

### الخيار 2 — Netlify (مجاني)

```bash
# أولاً: ابنِ الموقع
npm run build

# سيُنشأ مجلد "build" جاهز للرفع
```

1. اذهب إلى [netlify.com](https://netlify.com)
2. اسحب مجلد `build` إلى Netlify
3. ✅ الموقع يعمل فوراً

---

### الخيار 3 — GitHub Pages

```bash
# 1. ثبّت الأداة
npm install --save-dev gh-pages

# 2. أضف في package.json:
# "homepage": "https://اسم-المستخدم.github.io/bbm-architects"
# وفي "scripts": أضف:
# "predeploy": "npm run build"
# "deploy": "gh-pages -d build"

# 3. ارفع
npm run deploy
```

---

## 📁 هيكل المشروع

```
bbm-architects/
├── public/
│   └── index.html          # الصفحة الرئيسية
├── src/
│   ├── App.jsx             # المكوّن الرئيسي (كل الموقع)
│   ├── App.css             # التصميم
│   ├── i18n.js             # الترجمات (FR / AR / EN)
│   └── index.js            # نقطة البداية
├── package.json
└── README.md
```

---

## ✏️ تعديل المحتوى

- **النصوص والترجمات**: عدّل ملف `src/i18n.js`
- **التصميم والألوان**: عدّل `src/App.css` (ابحث عن `:root`)
- **الأقسام**: عدّل `src/App.jsx`

---

## 📞 معلومات التواصل

- الهاتف: +213 674546663
- البريد: bbmtirage@gmail.com
- العنوان: برج باجي مختار، الجزائر
