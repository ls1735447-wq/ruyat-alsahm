import { useState } from "react";

// ═══════════════════════════════════════════════════════════
// LANDING PAGE — رؤية السهم
// ═══════════════════════════════════════════════════════════

const FEATURES = [
  { ico: "📡", title: "أسعار حية من تداول",      desc: "أسعار مباشرة مرخصة من السوق السعودي تتحدث كل 30 ثانية عبر سهمك API" },
  { ico: "🤖", title: "تحليل بالذكاء الاصطناعي", desc: "تحليل شامل لكل سهم: أنماط الشموع، الاتجاه، مستويات الدخول والخروج" },
  { ico: "🕯️", title: "شموع يابانية تفاعلية",    desc: "مخطط شموع احترافي مع MA20/MA50 وكاشف أنماط تلقائي" },
  { ico: "🎯", title: "استراتيجيات المحفظة",      desc: "5 استراتيجيات جاهزة: دفاعية، نمو، توزيعات، انتعاش، رؤية 2030" },
  { ico: "📋", title: "تقويم الاكتتابات",          desc: "متابعة جميع الاكتتابات القادمة في تداول مع مواعيدها وتفاصيلها" },
  { ico: "🔬", title: "فلترة الأسهم",             desc: "ابحث وفلتر بالـ RSI والقطاع والزخم والإشارات التقنية" },
];

const TESTIMONIALS = [
  { name: "م. خالد العتيبي",   role: "مستثمر في تداول",        text: "التحليل بالذكاء الاصطناعي وفّر علي ساعات من البحث. أفضل أداة جربتها." },
  { name: "سارة المطيري",      role: "متداولة نشطة",             text: "أخيراً أداة تحليل عربية بمستوى عالمي. الشموع والاستراتيجيات ممتازة." },
  { name: "عبدالرحمن القحطاني",role: "مدير محفظة استثمارية",    text: "استخدمها قبل كل قرار تداول. التحليل دقيق والأسعار حية فعلاً." },
];

export default function LandingPage({ onSubscribe }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [email, setEmail]       = useState("");
  const [sahmkKey, setSahmkKey] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [step, setStep]         = useState(1); // 1=email, 2=payment, 3=done

  // ── تفعيل الاشتراك (حالياً: تجريبي بدون دفع حقيقي)
  // لاحقاً: اربطه بـ Moyasar webhook
  const handleActivate = async () => {
    if (!email || !email.includes("@")) { setError("أدخل إيميل صحيح"); return; }
    if (!sahmkKey || !sahmkKey.startsWith("shmk_")) { setError("أدخل مفتاح سهمك صحيح (يبدأ بـ shmk_live_)"); return; }
    setError("");
    setLoading(true);

    // هنا في المستقبل تضيف Moyasar payment
    // الآن: نفعّل مباشرة (للتجربة)
    await new Promise(r => setTimeout(r, 1500));

    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + 1);

    onSubscribe({
      email,
      sahmkKey,
      plan: "monthly",
      expiresAt: expiresAt.toISOString(),
      activatedAt: new Date().toISOString(),
    });

    setLoading(false);
  };

  return (
    <div style={{ background: "#04101f", color: "#f0f6ff", fontFamily: "'Tajawal', sans-serif", direction: "rtl", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap');
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0 }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fadeUp { animation: fadeUp .6s ease forwards }
        .float  { animation: float 3s ease-in-out infinite }
        ::-webkit-scrollbar { width:5px }
        ::-webkit-scrollbar-track { background:#071828 }
        ::-webkit-scrollbar-thumb { background:#1a3d5e; border-radius:3px }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(4,16,31,.95)", backdropFilter:"blur(16px)", borderBottom:"1px solid #0f2a40", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 5%", height:64 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          {/* Logo SVG */}
          <svg width="34" height="34" viewBox="0 0 38 38" fill="none">
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1a56db"/><stop offset="100%" stopColor="#3b82f6"/></linearGradient>
              <linearGradient id="lg2" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="#d97706"/><stop offset="100%" stopColor="#fbbf24"/></linearGradient>
            </defs>
            <path d="M19 2 L34 10.5 L34 27.5 L19 36 L4 27.5 L4 10.5 Z" fill="#071828" stroke="url(#lg1)" strokeWidth="1.4"/>
            <rect x="8"  y="22" width="4" height="8"  rx="1" fill="#1a56db" opacity="0.7"/>
            <rect x="14" y="17" width="4" height="13" rx="1" fill="url(#lg1)"/>
            <rect x="20" y="13" width="4" height="17" rx="1" fill="url(#lg1)"/>
            <rect x="26" y="9"  width="4" height="21" rx="1" fill="url(#lg2)"/>
            <polyline points="10,22 16,17 22,13 28,9" stroke="url(#lg2)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <circle cx="28" cy="9" r="2.2" fill="#fbbf24"/>
          </svg>
          <div>
            <div style={{ fontSize:17, fontWeight:900, color:"#f0f6ff", lineHeight:1 }}>رؤية <span style={{ color:"#fbbf24" }}>السهم</span></div>
            <div style={{ fontSize:8, color:"#3b82f6", fontWeight:700, letterSpacing:2 }}>VISION OF THE STOCK</div>
          </div>
        </div>
        <button onClick={() => setShowCheckout(true)}
          style={{ background:"linear-gradient(135deg,#1a56db,#3b82f6)", color:"#fff", border:"none", borderRadius:8, padding:"10px 22px", fontFamily:"Tajawal,sans-serif", fontSize:14, fontWeight:800, cursor:"pointer" }}>
          ابدأ الآن — 150 ر.س
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ textAlign:"center", padding:"90px 5% 70px", position:"relative", overflow:"hidden" }}>
        {/* background glow */}
        <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translateX(-50%)", width:600, height:300, background:"radial-gradient(ellipse,rgba(26,86,219,.15) 0%,transparent 70%)", pointerEvents:"none" }}/>

        <div className="fadeUp" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(26,86,219,.1)", border:"1px solid rgba(26,86,219,.3)", borderRadius:20, padding:"6px 16px", fontSize:12, color:"#60a5fa", fontWeight:700, marginBottom:24 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", animation:"pulse 1.4s infinite" }}/>
          مرخص من تداول السعودية · أسعار حية
        </div>

        <h1 className="fadeUp" style={{ fontSize:"clamp(32px,5vw,58px)", fontWeight:900, lineHeight:1.15, marginBottom:20, animationDelay:".1s" }}>
          حلّل أسهم تداول<br/>
          <span style={{ background:"linear-gradient(135deg,#3b82f6,#fbbf24)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>بالذكاء الاصطناعي</span>
        </h1>

        <p className="fadeUp" style={{ fontSize:17, color:"#94a3b8", maxWidth:520, margin:"0 auto 36px", lineHeight:1.8, animationDelay:".2s" }}>
          أسعار حية مباشرة · شموع يابانية تفاعلية · تحليل AI لكل سهم · استراتيجيات محفظة كاملة
        </p>

        <div className="fadeUp" style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", animationDelay:".3s" }}>
          <button onClick={() => setShowCheckout(true)}
            style={{ background:"linear-gradient(135deg,#1a56db,#3b82f6)", color:"#fff", border:"none", borderRadius:10, padding:"15px 36px", fontFamily:"Tajawal,sans-serif", fontSize:16, fontWeight:800, cursor:"pointer", boxShadow:"0 8px 32px rgba(26,86,219,.4)" }}>
            ابدأ الآن · 150 ر.س / شهر
          </button>
          <button onClick={() => document.getElementById("features").scrollIntoView({behavior:"smooth"})}
            style={{ background:"transparent", color:"#94a3b8", border:"1px solid #1a3d5e", borderRadius:10, padding:"15px 28px", fontFamily:"Tajawal,sans-serif", fontSize:15, cursor:"pointer" }}>
            اعرف أكثر ↓
          </button>
        </div>

        {/* price badge */}
        <div className="fadeUp" style={{ marginTop:20, fontSize:13, color:"#4a6580", animationDelay:".4s" }}>
          بدون عقد · إلغاء في أي وقت · تجربة مجانية 3 أيام
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ background:"#071828", borderTop:"1px solid #0f2a40", borderBottom:"1px solid #0f2a40", padding:"32px 5%" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:24, maxWidth:800, margin:"0 auto", textAlign:"center" }}>
          {[
            { v:"350+",  l:"سهم مدرج" },
            { v:"15+",   l:"قطاع مغطى" },
            { v:"30 ث",  l:"تحديث الأسعار" },
            { v:"100%",  l:"مرخص من تداول" },
          ].map((s,i) => (
            <div key={i}>
              <div style={{ fontSize:28, fontWeight:900, color:"#fbbf24" }}>{s.v}</div>
              <div style={{ fontSize:12, color:"#4a6580", marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding:"80px 5%" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#3b82f6", letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>الميزات</div>
          <h2 style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:900 }}>كل ما تحتاجه للتحليل</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:20, maxWidth:1000, margin:"0 auto" }}>
          {FEATURES.map((f,i) => (
            <div key={i} style={{ background:"#0b2035", border:"1px solid #0f2a40", borderRadius:14, padding:24, transition:"all .2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="#1a56db"; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="#0f2a40"; e.currentTarget.style.transform=""; }}>
              <div style={{ fontSize:28, marginBottom:12 }}>{f.ico}</div>
              <div style={{ fontSize:15, fontWeight:800, marginBottom:8 }}>{f.title}</div>
              <div style={{ fontSize:13, color:"#4a6580", lineHeight:1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding:"80px 5%", background:"#071828", borderTop:"1px solid #0f2a40" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontSize:12, fontWeight:700, color:"#3b82f6", letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>الأسعار</div>
          <h2 style={{ fontSize:"clamp(24px,3.5vw,36px)", fontWeight:900 }}>خطة واحدة شاملة</h2>
        </div>
        <div style={{ maxWidth:420, margin:"0 auto", background:"linear-gradient(135deg,#0b2035,#0f2a40)", border:"2px solid #1a56db", borderRadius:20, padding:36, textAlign:"center", boxShadow:"0 20px 60px rgba(26,86,219,.2)" }}>
          <div style={{ fontSize:13, color:"#3b82f6", fontWeight:700, marginBottom:8 }}>الباقة الشاملة</div>
          <div style={{ fontSize:52, fontWeight:900, color:"#fbbf24", lineHeight:1 }}>150</div>
          <div style={{ fontSize:16, color:"#94a3b8", marginBottom:28 }}>ريال / شهر</div>

          {["جميع الميزات بدون قيود","أسعار حية مرخصة من تداول","تحليل AI غير محدود","تحديثات مستمرة","دعم فني عبر الواتساب","إلغاء في أي وقت"].map((item,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12, textAlign:"right" }}>
              <span style={{ color:"#22c55e", fontSize:16, flexShrink:0 }}>✓</span>
              <span style={{ fontSize:14, color:"#f0f6ff" }}>{item}</span>
            </div>
          ))}

          <button onClick={() => setShowCheckout(true)}
            style={{ width:"100%", marginTop:24, background:"linear-gradient(135deg,#1a56db,#3b82f6)", color:"#fff", border:"none", borderRadius:10, padding:"16px 0", fontFamily:"Tajawal,sans-serif", fontSize:16, fontWeight:800, cursor:"pointer", boxShadow:"0 8px 24px rgba(26,86,219,.4)" }}>
            اشترك الآن
          </button>
          <div style={{ fontSize:11, color:"#334155", marginTop:10 }}>تجربة مجانية 3 أيام · بدون بطاقة ائتمان للتجربة</div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding:"80px 5%" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:900 }}>ماذا يقول المستخدمون</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20, maxWidth:900, margin:"0 auto" }}>
          {TESTIMONIALS.map((t,i) => (
            <div key={i} style={{ background:"#0b2035", border:"1px solid #0f2a40", borderRadius:14, padding:24 }}>
              <div style={{ fontSize:20, color:"#fbbf24", marginBottom:12 }}>★★★★★</div>
              <p style={{ fontSize:13.5, color:"#94a3b8", lineHeight:1.8, marginBottom:16 }}>"{t.text}"</p>
              <div style={{ fontSize:13, fontWeight:700, color:"#f0f6ff" }}>{t.name}</div>
              <div style={{ fontSize:11, color:"#4a6580" }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1px solid #0f2a40", padding:"28px 5%", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
        <div style={{ fontSize:13, color:"#334155" }}>رؤية السهم © 2026 · للأغراض التعليمية والتحليلية فقط</div>
        <div style={{ fontSize:12, color:"#334155" }}>مرخص من تداول السعودية عبر سهمك API</div>
      </footer>

      {/* ══════════════════════════════════════════════════════ */}
      {/* CHECKOUT MODAL                                        */}
      {/* ══════════════════════════════════════════════════════ */}
      {showCheckout && (
        <div style={{ position:"fixed", inset:0, background:"rgba(4,16,31,.92)", backdropFilter:"blur(8px)", zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}
          onClick={e => e.target === e.currentTarget && setShowCheckout(false)}>
          <div style={{ background:"#0b2035", border:"1px solid #1a3d5e", borderRadius:18, padding:32, maxWidth:460, width:"100%", position:"relative" }}>
            <button onClick={() => setShowCheckout(false)}
              style={{ position:"absolute", top:16, left:16, background:"none", border:"none", color:"#4a6580", fontSize:20, cursor:"pointer" }}>✕</button>

            <div style={{ fontSize:18, fontWeight:900, marginBottom:6 }}>
              {step === 3 ? "🎉 تم التفعيل!" : "تفعيل الاشتراك"}
            </div>
            <div style={{ fontSize:13, color:"#4a6580", marginBottom:24 }}>
              {step === 3 ? "حسابك نشط الآن" : "150 ر.س / شهر · تجربة مجانية 3 أيام"}
            </div>

            {step === 1 && (
              <>
                <label style={{ fontSize:13, color:"#94a3b8", display:"block", marginBottom:6 }}>الإيميل</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" type="email"
                  style={{ width:"100%", background:"#071828", border:"1px solid #1a3d5e", borderRadius:8, padding:"11px 14px", color:"#f0f6ff", fontFamily:"Tajawal,sans-serif", fontSize:14, outline:"none", marginBottom:16, direction:"ltr" }}/>

                <label style={{ fontSize:13, color:"#94a3b8", display:"block", marginBottom:6 }}>
                  مفتاح سهمك API
                  <a href="https://www.sahmk.sa/developers/register" target="_blank" rel="noreferrer"
                    style={{ color:"#3b82f6", fontSize:11, marginRight:8 }}>اجلب مفتاحك مجاناً ←</a>
                </label>
                <input value={sahmkKey} onChange={e=>setSahmkKey(e.target.value)} placeholder="shmk_live_xxxxxxxxxx"
                  style={{ width:"100%", background:"#071828", border:"1px solid #1a3d5e", borderRadius:8, padding:"11px 14px", color:"#f0f6ff", fontFamily:"monospace", fontSize:13, outline:"none", marginBottom:8, direction:"ltr" }}/>

                {error && <div style={{ color:"#f87171", fontSize:12, marginBottom:12 }}>⚠️ {error}</div>}

                <div style={{ background:"#071828", border:"1px solid #0f2a40", borderRadius:8, padding:"10px 14px", fontSize:12, color:"#4a6580", marginBottom:20 }}>
                  💡 مفتاح سهمك مجاني 100% — سجّل على sahmk.sa/developers وأنشئ مفتاح في ثانيتين
                </div>

                {/* Moyasar payment placeholder */}
                <div style={{ background:"#041220", border:"1px dashed #1a3d5e", borderRadius:8, padding:"14px", marginBottom:16, textAlign:"center" }}>
                  <div style={{ fontSize:12, color:"#4a6580", marginBottom:8 }}>الدفع عبر</div>
                  <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
                    {["مدى","Visa","Mastercard","Apple Pay"].map(m => (
                      <span key={m} style={{ background:"#0b2035", border:"1px solid #1a3d5e", borderRadius:6, padding:"4px 8px", fontSize:11, color:"#94a3b8" }}>{m}</span>
                    ))}
                  </div>
                  <div style={{ fontSize:10, color:"#334155", marginTop:8 }}>يُفعَّل الدفع الحقيقي عبر Moyasar قريباً</div>
                </div>

                <button onClick={handleActivate} disabled={loading}
                  style={{ width:"100%", background:loading?"#1a3d5e":"linear-gradient(135deg,#1a56db,#3b82f6)", color:"#fff", border:"none", borderRadius:10, padding:"15px 0", fontFamily:"Tajawal,sans-serif", fontSize:15, fontWeight:800, cursor:loading?"not-allowed":"pointer" }}>
                  {loading ? "جار التفعيل..." : "تفعيل · 150 ر.س / شهر"}
                </button>
                <div style={{ fontSize:11, color:"#334155", textAlign:"center", marginTop:8 }}>بدون رسوم مخفية · إلغاء في أي وقت</div>
              </>
            )}

            {step === 3 && (
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
                <div style={{ fontSize:14, color:"#22c55e", marginBottom:24 }}>اشتراكك نشط حتى شهر من الآن</div>
                <button onClick={() => setShowCheckout(false)}
                  style={{ background:"linear-gradient(135deg,#1a56db,#3b82f6)", color:"#fff", border:"none", borderRadius:10, padding:"14px 36px", fontFamily:"Tajawal,sans-serif", fontSize:15, fontWeight:800, cursor:"pointer" }}>
                  ادخل للتطبيق →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
