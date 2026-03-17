import { useState, useEffect } from "react";
import LandingPage from "./LandingPage.jsx";
import Dashboard from "./Dashboard.jsx";

// ══════════════════════════════════════════════════════════════════
// بسيط: نخزن الاشتراك في localStorage
// في المستقبل يُربط بـ Supabase + Moyasar
// ══════════════════════════════════════════════════════════════════
function getSubscription() {
  try {
    const raw = localStorage.getItem("ruyat_sub");
    if (!raw) return null;
    const sub = JSON.parse(raw);
    // تحقق من صلاحية الاشتراك
    if (sub.expiresAt && new Date(sub.expiresAt) < new Date()) {
      localStorage.removeItem("ruyat_sub");
      return null;
    }
    return sub;
  } catch { return null; }
}

export default function App() {
  const [sub, setSub] = useState(getSubscription);

  const handleSubscribe = (data) => {
    // data = { email, plan, expiresAt, sahmkKey }
    localStorage.setItem("ruyat_sub", JSON.stringify(data));
    setSub(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("ruyat_sub");
    setSub(null);
  };

  if (!sub) return <LandingPage onSubscribe={handleSubscribe} />;
  return <Dashboard sub={sub} onLogout={handleLogout} />;
}
