import React, { useState } from "react";
import {
  ArrowLeft, Bookmark, Share2, Heart, MessageCircle, X, FolderHeart,
  Check, Moon, Sun, ExternalLink, Clock
} from "lucide-react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700&family=Hind+Siliguri:wght@400;500;600;700&family=Tiro+Bangla:ital@0;1&family=Noto+Serif+Bengali:wght@600;700&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap');
* { box-sizing:border-box; -webkit-tap-highlight-color:transparent; }

.ek-root{
  --primary:#C25137; --primary-2:#A8412B; --primary-soft:rgba(194,81,55,.10);
  --bg:#FBF6F0; --bg-2:#F3EAE0; --surface:#FFFFFF; --text:#1E1813; --muted:#8A7E73;
  --line:rgba(30,24,19,.08); --shadow:0 22px 60px -24px rgba(60,32,18,.32);
  --head:'Noto Serif Bengali',serif; --body:'Tiro Bangla',serif; --ui:'Hind Siliguri',sans-serif;
  --lat:'Schibsted Grotesk',sans-serif; --brand:'Fraunces',serif;
}
.ek-root[data-accent="indigo"]{
  --primary:#6366F1; --primary-2:#4F46E5; --primary-soft:rgba(99,102,241,.10);
  --bg:#EEF0FB; --bg-2:#E3E6F8; --text:#1B1F33;
}
.ek-root[data-theme="dark"]{
  --bg:#15110E; --bg-2:#1C1714; --surface:#211A16; --text:#F3ECE4; --muted:#A89B90;
  --line:rgba(255,255,255,.08); --shadow:0 22px 60px -24px rgba(0,0,0,.7);
}
.ek-root[data-accent="terra"][data-theme="dark"]{ --primary:#E0744F; --primary-2:#C25137; --primary-soft:rgba(224,116,79,.14); }
.ek-root[data-accent="indigo"][data-theme="dark"]{ --primary:#818CF8; --primary-2:#6366F1; --primary-soft:rgba(129,140,248,.16); --bg:#13141F; --bg-2:#1A1C2B; --surface:#1E2030; }

.ek-wrap{ min-height:100vh; display:flex; flex-direction:column; align-items:center; gap:16px; padding:22px 14px 36px;
  background:radial-gradient(1100px 600px at 50% -10%, var(--bg-2), transparent 60%), var(--bg); font-family:var(--lat); }
.ek-bar{ width:100%; max-width:392px; display:flex; align-items:center; justify-content:space-between; }
.ek-bar h1{ margin:0; font-family:var(--brand); font-size:20px; font-weight:600; color:var(--text); letter-spacing:-.3px; }
.ek-bar h1 small{ display:block; font-family:var(--ui); font-size:11px; color:var(--muted); font-weight:400; margin-top:2px; }
.ek-ctrls{ display:flex; gap:8px; }
.ek-seg{ display:flex; gap:3px; background:var(--surface); border:1px solid var(--line); border-radius:11px; padding:4px; }
.ek-sw{ width:24px; height:24px; border-radius:7px; cursor:pointer; border:none; display:grid; place-items:center; transition:.15s; }
.ek-sw.terra{ background:linear-gradient(150deg,#C25137,#A8412B); }
.ek-sw.indigo{ background:linear-gradient(150deg,#6366F1,#4F46E5); }
.ek-sw.off{ opacity:.35; }
.ibtn{ width:38px; height:38px; border-radius:11px; border:1px solid var(--line); background:var(--surface); color:var(--text);
  display:grid; place-items:center; cursor:pointer; transition:.15s; }
.ibtn:active{ transform:scale(.92); }

.phone{ width:100%; max-width:392px; height:812px; background:var(--bg); border-radius:42px; overflow:hidden; position:relative;
  box-shadow:var(--shadow), 0 0 0 10px #0c0a09, 0 0 0 11px rgba(255,255,255,.06); }

/* status bar */
.sbar{ position:absolute; top:0; left:0; right:0; height:44px; z-index:6; display:flex; align-items:center; justify-content:space-between;
  padding:0 26px; font-family:var(--lat); font-size:13px; font-weight:600; color:#fff; }
.sbar .dots{ display:flex; gap:5px; align-items:center; }

/* scroll */
.scr{ height:100%; overflow-y:auto; } .scr::-webkit-scrollbar{ width:0; }

/* hero */
.hero{ height:340px; position:relative; overflow:hidden;
  background:linear-gradient(155deg,#5AA9E6 0%, #3D7FC4 38%, #2E8B8B 100%); }
.hero-lines{ position:absolute; inset:0; opacity:.22;
  background-image:linear-gradient(115deg, rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(65deg, rgba(0,0,0,.25) 1px, transparent 1px);
  background-size:26px 26px, 26px 26px; }
.hero-glow{ position:absolute; top:-30px; right:-30px; width:160px; height:160px; border-radius:50%; background:rgba(255,255,255,.35); filter:blur(40px); }
.hero-fade{ position:absolute; left:0; right:0; bottom:0; height:140px; background:linear-gradient(transparent, rgba(0,0,0,.18)); }
.nav{ position:absolute; top:54px; left:18px; right:18px; z-index:5; display:flex; justify-content:space-between; }
.circ{ width:42px; height:42px; border-radius:50%; background:rgba(255,255,255,.92); color:#1E1813; display:grid; place-items:center;
  cursor:pointer; box-shadow:0 6px 16px -6px rgba(0,0,0,.4); transition:.15s; border:none; }
.ek-root[data-theme="dark"] .circ{ background:rgba(40,33,28,.92); color:#F3ECE4; }
.circ:active{ transform:scale(.9); }
.nav-r{ display:flex; gap:9px; }

/* headline card */
.hcard{ position:relative; z-index:5; margin:-70px 18px 0; background:var(--surface); border-radius:24px; padding:20px;
  box-shadow:var(--shadow); border:1px solid var(--line); }
.hcat{ display:flex; align-items:center; gap:8px; margin-bottom:11px; }
.chip{ font-family:var(--ui); font-size:11px; font-weight:600; color:#fff; background:var(--primary); padding:4px 11px; border-radius:999px; }
.htime{ font-family:var(--lat); font-size:11.5px; color:var(--muted); display:flex; align-items:center; gap:5px; }
.hhead{ font-family:var(--head); font-weight:700; font-size:21px; line-height:1.45; color:var(--text); margin:0; }
.hrule{ height:1px; background:var(--line); margin:16px 0 14px; }
.eng{ display:flex; align-items:center; justify-content:space-between; }
.eng-l{ display:flex; gap:18px; }
.eng-btn{ display:flex; align-items:center; gap:7px; background:none; border:none; cursor:pointer; color:var(--muted);
  font-family:var(--lat); font-size:13.5px; font-weight:600; transition:.15s; }
.eng-btn:active{ transform:scale(.9); }
.eng-btn.liked{ color:var(--primary); }
.eng-r{ display:flex; gap:8px; }
.mini{ width:34px; height:34px; border-radius:10px; border:1px solid var(--line); background:transparent; color:var(--muted);
  display:grid; place-items:center; cursor:pointer; transition:.15s; }
.mini:active{ transform:scale(.9); }
.mini.on{ color:var(--primary); background:var(--primary-soft); border-color:transparent; }

/* body */
.body{ padding:22px 22px 60px; }
.short{ background:var(--primary-soft); border-radius:16px; padding:16px 17px 17px; position:relative; margin-bottom:26px;
  border:1px solid var(--line); }
.short-lab{ display:inline-flex; align-items:center; gap:6px; font-family:var(--ui); font-size:11px; font-weight:700;
  color:var(--primary); text-transform:uppercase; letter-spacing:.5px; margin-bottom:9px; }
.short-lab i{ width:6px; height:6px; border-radius:50%; background:var(--primary); display:inline-block; }
.short p{ margin:0; font-family:var(--body); font-size:16px; line-height:1.92; color:var(--text); }
.sec-h{ font-family:var(--ui); font-size:12px; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:1px; margin:0 0 13px; }
.body p.para{ font-family:var(--body); font-size:16px; line-height:2.0; color:var(--text); margin:0 0 18px; opacity:.92; }
.srcbox{ margin-top:8px; background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:15px 17px;
  display:flex; align-items:center; justify-content:space-between; }
.srcbox .l{ font-family:var(--ui); font-size:12.5px; color:var(--muted); }
.srcbox .l b{ color:var(--text); display:block; font-size:14px; font-family:var(--head); font-weight:600; margin-top:2px; }
.srcbtn{ display:flex; align-items:center; gap:6px; font-family:var(--ui); font-size:12.5px; font-weight:600; color:var(--primary);
  background:var(--primary-soft); border:none; padding:9px 13px; border-radius:11px; cursor:pointer; }

/* save overlay */
.ov{ position:absolute; inset:0; z-index:30; display:flex; align-items:flex-end; }
.ov-bd{ position:absolute; inset:0; background:rgba(20,12,8,.5); backdrop-filter:blur(3px); animation:fade .25s ease; }
@keyframes fade{ from{opacity:0;} to{opacity:1;} }
.ov-sheet{ position:relative; width:100%; background:var(--surface); border-radius:30px 30px 0 0; padding:14px 26px 34px;
  text-align:center; animation:rise .34s cubic-bezier(.2,.7,.3,1); }
@keyframes rise{ from{transform:translateY(100%);} to{transform:translateY(0);} }
.ov-x{ position:absolute; top:16px; right:18px; width:34px; height:34px; border-radius:50%; border:1px solid var(--line);
  background:var(--bg); color:var(--text); display:grid; place-items:center; cursor:pointer; }
.ov-ic{ width:96px; height:96px; border-radius:50%; background:var(--primary-soft); display:grid; place-items:center;
  color:var(--primary); margin:24px auto 22px; animation:pop .4s cubic-bezier(.2,1.3,.4,1) .1s both; }
@keyframes pop{ from{transform:scale(.4); opacity:0;} to{transform:scale(1); opacity:1;} }
.ov-t{ font-family:var(--head); font-size:22px; font-weight:700; color:var(--text); line-height:1.5; margin:0 0 12px; }
.ov-t b{ color:var(--primary); }
.ov-p{ font-family:var(--body); font-size:15px; line-height:1.8; color:var(--muted); margin:0 auto 24px; max-width:280px; }
.ov-go{ width:100%; border:none; border-radius:15px; padding:15px; font-family:var(--ui); font-size:15px; font-weight:600; color:#fff;
  background:linear-gradient(150deg,var(--primary),var(--primary-2)); cursor:pointer; transition:.18s; }
.ov-go:active{ transform:scale(.98); }
.ov-2{ margin-top:12px; background:none; border:none; font-family:var(--ui); font-size:13.5px; color:var(--muted); cursor:pointer; }

.toast{ position:absolute; bottom:30px; left:50%; transform:translateX(-50%); background:var(--text); color:var(--bg);
  font-family:var(--ui); font-size:13px; padding:11px 18px; border-radius:999px; display:flex; align-items:center; gap:8px;
  box-shadow:var(--shadow); z-index:40; animation:rise .3s ease; }
`;

export default function App() {
  const [accent, setAccent] = useState("terra");
  const [dark, setDark] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [toast, setToast] = useState("");
  const flash = (m) => { setToast(m); setTimeout(() => setToast(""), 1800); };

  const news = {
    cat: "বিজ্ঞান",
    time: "১২ মিনিট আগে",
    head: "“ফিউশন শক্তিতে যুগান্তকারী অগ্রগতি — পরিচ্ছন্ন ও সীমাহীন বিদ্যুতের নতুন সম্ভাবনা”",
    short:
      "বিজ্ঞানীরা ফিউশন শক্তিতে এক যুগান্তকারী সাফল্য অর্জন করেছেন, যা পরিচ্ছন্ন ও প্রায় সীমাহীন বিদ্যুতের পথ খুলে দিতে পারে। সূর্যের শক্তি উৎপাদনের একই প্রক্রিয়া কাজে লাগিয়ে স্থিতিশীল ফিউশন বিক্রিয়া ঘটানো গেছে। বৈশ্বিক জ্বালানি সংকট ও জলবায়ু পরিবর্তন মোকাবিলায় এটি গুরুত্বপূর্ণ ভূমিকা রাখতে পারে বলে গবেষকরা আশাবাদী।",
    body: [
      "এক যুগান্তকারী অগ্রগতিতে আন্তর্জাতিক একদল গবেষক ফিউশন শক্তিতে উল্লেখযোগ্য সাফল্য অর্জন করেছেন, যা পরিচ্ছন্ন ও কার্যত সীমাহীন বিদ্যুৎ উৎসের অনুসন্ধানে একটি গুরুত্বপূর্ণ মাইলফলক হিসেবে বিবেচিত হচ্ছে।",
      "ফিউশন শক্তিকে প্রায়ই পরিচ্ছন্ন জ্বালানির ‘হলি গ্রেইল’ বলা হয়। এটি সূর্যের বিদ্যুৎ উৎপাদনের একই প্রক্রিয়া কাজে লাগায়। এতদিন স্থিতিশীল ও দীর্ঘস্থায়ী ফিউশন বিক্রিয়া ঘটানো ছিল কঠিন এক চ্যালেঞ্জ, কারণ এর জন্য বিপুল তাপমাত্রা ও চাপ প্রয়োজন।",
      "তবে আরও গবেষণা বাকি থাকলেও এই সাফল্য একটি উজ্জ্বল ও টেকসই ভবিষ্যতের আশা জাগিয়েছে। বিজ্ঞানী ও প্রকৌশলীরা এখন প্রযুক্তিটিকে আরও বড় পরিসরে নিয়ে যাওয়া ও কার্যকারিতা বাড়ানোর দিকে মনোযোগ দিচ্ছেন।",
    ],
    source: "Reuters",
    collection: "পরে পড়ব",
  };

  const doSave = () => { setSaved(true); setShowSave(true); };
  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: news.head, text: news.short });
      else { await navigator.clipboard.writeText(news.head + "\n\n" + news.short); flash("কপি হয়েছে ✓"); }
    } catch (e) {}
  };

  return (
    <div className="ek-root" data-accent={accent} data-theme={dark ? "dark" : "light"}>
      <style>{CSS}</style>
      <div className="ek-wrap">
        <div className="ek-bar">
          <h1>ekNojor<small>নিউজ শর্ট পেজ</small></h1>
          <div className="ek-ctrls">
            <div className="ek-seg">
              <button className={"ek-sw terra" + (accent === "terra" ? "" : " off")} onClick={() => setAccent("terra")} title="Terracotta" />
              <button className={"ek-sw indigo" + (accent === "indigo" ? "" : " off")} onClick={() => setAccent("indigo")} title="Indigo (reference)" />
            </div>
            <button className="ibtn" onClick={() => setDark((d) => !d)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
          </div>
        </div>

        <div className="phone">
          <div className="sbar">
            <span>9:41</span>
            <span className="dots">●●● <span style={{ marginLeft: 4 }}>▮▮▮</span></span>
          </div>

          <div className="scr">
            {/* hero */}
            <div className="hero">
              <div className="hero-lines" />
              <div className="hero-glow" />
              <div className="hero-fade" />
              <div className="nav">
                <button className="circ" onClick={() => flash("পেছনে")}><ArrowLeft size={19} /></button>
                <div className="nav-r">
                  <button className="circ" onClick={share}><Share2 size={17} /></button>
                  <button className="circ" onClick={doSave} style={saved ? { color: "var(--primary)" } : {}}>
                    <Bookmark size={17} fill={saved ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </div>

            {/* headline card */}
            <div className="hcard">
              <div className="hcat">
                <span className="chip">{news.cat}</span>
                <span className="htime"><Clock size={12} /> {news.time}</span>
              </div>
              <h2 className="hhead">{news.head}</h2>
              <div className="hrule" />
              <div className="eng">
                <div className="eng-l">
                  <button className={"eng-btn" + (liked ? " liked" : "")} onClick={() => setLiked((l) => !l)}>
                    <Heart size={18} fill={liked ? "currentColor" : "none"} /> {liked ? "৫৯০" : "৫৮৯"}
                  </button>
                  <button className="eng-btn" onClick={() => flash("মন্তব্য শিগগিরই")}>
                    <MessageCircle size={18} /> ৫৮৯
                  </button>
                </div>
                <div className="eng-r">
                  <button className={"mini" + (saved ? " on" : "")} onClick={doSave}>
                    <Bookmark size={16} fill={saved ? "currentColor" : "none"} />
                  </button>
                  <button className="mini" onClick={share}><Share2 size={16} /></button>
                </div>
              </div>
            </div>

            {/* body */}
            <div className="body">
              <div className="short">
                <span className="short-lab"><i />এক নজরে</span>
                <p>{news.short}</p>
              </div>

              <h3 className="sec-h">বিস্তারিত</h3>
              {news.body.map((p, i) => <p className="para" key={i}>{p}</p>)}

              <div className="srcbox">
                <span className="l">সোর্স<b>{news.source}</b></span>
                <button className="srcbtn" onClick={() => flash("মূল খবরে যাচ্ছে")}>মূল খবর পড়ুন <ExternalLink size={14} /></button>
              </div>
            </div>
          </div>

          {/* save confirmation overlay */}
          {showSave && (
            <div className="ov">
              <div className="ov-bd" onClick={() => setShowSave(false)} />
              <div className="ov-sheet">
                <button className="ov-x" onClick={() => setShowSave(false)}><X size={17} /></button>
                <div className="ov-ic"><FolderHeart size={44} strokeWidth={1.6} /></div>
                <h3 className="ov-t">খবরটি সংরক্ষণ হয়েছে<br /><b>“{news.collection}”</b> তে</h3>
                <p className="ov-p">দারুণ! খবরটি তোমার কালেকশনে যোগ হয়েছে। যেকোনো সময় পড়তে পারবে।</p>
                <button className="ov-go" onClick={() => { setShowSave(false); flash("কালেকশন খোলা হচ্ছে"); }}>কালেকশন দেখুন</button>
                <button className="ov-2" onClick={() => { setShowSave(false); setSaved(false); flash("সংরক্ষণ বাতিল"); }}>আনডু করুন</button>
              </div>
            </div>
          )}

          {toast && <div className="toast"><Check size={14} />{toast}</div>}
        </div>
      </div>
    </div>
  );
}
