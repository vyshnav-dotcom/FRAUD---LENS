const{useState,useEffect,useRef}=React;

/* ── Icons ── */
const Shield=({s=24})=><svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>;
const AlertTri=()=><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>;
const CheckCirc=()=><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
const Clock=()=><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>;
const Search=()=><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const Globe=()=><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>;
const Lock=()=><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
const Zap=()=><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>;
const Brain=()=><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>;
const Menu=()=><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>;
const X=()=><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>;

/* ── Animated Counter ── */
function AnimCount({end,duration=2000,suffix=''}){
    const[val,setVal]=useState(0);
    useEffect(()=>{
        let start=0;const step=end/((duration/16));
        const t=setInterval(()=>{start+=step;if(start>=end){setVal(end);clearInterval(t)}else setVal(Math.floor(start))},16);
        return()=>clearInterval(t);
    },[end]);
    return <span>{val.toLocaleString()}{suffix}</span>;
}

/* ── Confidence Ring ── */
function ConfidenceMeter({score,label}){
    const pct=Math.round(score*100),r=54,c=2*Math.PI*r,off=c-(score*c);
    const col=label==='Dangerous'?'#ef4444':label==='Suspicious'?'#eab308':'#22c55e';
    return <div className="flex flex-col items-center"><svg width="140" height="140" className="confidence-ring"><circle cx="70" cy="70" r={r} stroke="#1a1a3e" strokeWidth="10" fill="none"/><circle cx="70" cy="70" r={r} stroke={col} strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} style={{transition:'stroke-dashoffset 1s ease-out'}}/></svg><div className="absolute flex flex-col items-center justify-center" style={{width:140,height:140}}><span className="text-4xl font-bold font-mono text-white">{pct}</span><span className="text-xs text-gray-400 uppercase tracking-widest">Risk %</span></div></div>;
}

/* ── Fake Terminal ── */
const STEPS=["Resolving DNS records...","Checking SSL certificate chain...","Extracting URL features...","Running heuristic analysis...","Querying threat intelligence DB...","Cross-referencing WHOIS data...","Executing AI pattern recognition...","Compiling threat report..."];
function DeepScanOverlay(){
    const[step,setStep]=useState(0);
    const[packets,setPackets]=useState(0);
    useEffect(()=>{const i=setInterval(()=>setStep(p=>p<STEPS.length-1?p+1:p),260);return()=>clearInterval(i)},[]);
    useEffect(()=>{const i=setInterval(()=>setPackets(p=>p+Math.floor(Math.random()*47)+3),100);return()=>clearInterval(i)},[]);
    return <div className="absolute inset-0 bg-cyber-950/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center rounded-xl">
        <div className="w-72 h-1 bg-cyber-700 rounded-full scan-bar mb-6"></div>
        <div className="space-y-1.5 text-left w-72 mb-4">{STEPS.map((s,i)=><div key={i} className={`flex items-center gap-2 text-xs font-mono transition-all duration-300 ${i<step?'text-green-400 opacity-60':i===step?'text-cyber-accent':'text-gray-600'}`}><span>{i<step?'✓':i===step?'▸':'○'}</span><span>{s}</span></div>)}</div>
        <div className="flex gap-6 text-[10px] font-mono text-gray-500 mt-2"><span>Packets: <span className="text-cyber-accent">{packets}</span></span><span>Threads: <span className="text-green-400">8</span></span><span>Latency: <span className="text-yellow-400">{Math.floor(Math.random()*30+5)}ms</span></span></div>
        <p className="text-cyber-accent mt-4 font-mono text-[10px] animate-pulse tracking-[0.3em] uppercase">Deep Scan in Progress</p>
    </div>;
}

/* ── Navbar ── */
function Navbar({page,setPage}){
    const[open,setOpen]=useState(false);
    const links=[['home','Home'],['scanner','Scanner'],['how','How It Works'],['stats','Dashboard']];
    return <nav className="sticky top-0 z-50 bg-cyber-950/80 backdrop-blur-lg border-b border-cyber-700/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3 cursor-pointer" onClick={()=>setPage('home')}><div className="p-2 bg-gradient-to-br from-cyber-accent/20 to-cyber-800 rounded-lg text-cyber-accent glow-pulse"><Shield s={22}/></div><span className="text-xl font-extrabold text-white">Deep<span className="text-cyber-accent">Scan</span> AI</span></div>
            <div className="hidden md:flex items-center gap-1">{links.map(([k,l])=><button key={k} onClick={()=>setPage(k)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${page===k?'bg-cyber-accent/10 text-cyber-accent':'text-gray-400 hover:text-white hover:bg-cyber-800/50'}`}>{l}</button>)}</div>
            <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-[10px] font-semibold border border-green-500/20"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>Protected</div>
                <button className="md:hidden text-gray-400" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button>
            </div>
        </div>
        {open&&<div className="md:hidden border-t border-cyber-700/40 px-4 py-2 space-y-1">{links.map(([k,l])=><button key={k} onClick={()=>{setPage(k);setOpen(false)}} className={`block w-full text-left px-3 py-2 rounded-lg text-sm ${page===k?'bg-cyber-accent/10 text-cyber-accent':'text-gray-400'}`}>{l}</button>)}</div>}
    </nav>;
}

/* ── Hero Section ── */
function HeroSection({setPage}){
    return <section className="relative py-20 md:py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-accent/5 via-transparent to-transparent"></div>
        <div className="relative max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyber-accent/10 border border-cyber-accent/20 rounded-full text-cyber-accent text-xs font-semibold mb-4"><Zap/> Powered by PhishNet-7B AI</div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">Stop Phishing<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent to-purple-400">Before It Starts</span></h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">Real-time URL threat analysis powered by advanced heuristics and AI. Scan any link in seconds.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <button onClick={()=>setPage('scanner')} className="px-8 py-3.5 bg-gradient-to-r from-cyber-accent to-[#00c8d4] text-cyber-950 font-bold rounded-xl hover:brightness-110 transition-all text-sm tracking-wide">Start Scanning →</button>
                <button onClick={()=>setPage('how')} className="px-8 py-3.5 bg-cyber-800/60 border border-cyber-700/50 text-gray-300 font-semibold rounded-xl hover:bg-cyber-700/40 transition-all text-sm">How It Works</button>
            </div>
            <div className="flex justify-center gap-8 pt-8 text-center">
                <div><div className="text-2xl font-bold text-white"><AnimCount end={12847}/></div><div className="text-xs text-gray-500">Threats Blocked</div></div>
                <div><div className="text-2xl font-bold text-white"><AnimCount end={99} suffix="%"/></div><div className="text-xs text-gray-500">Accuracy</div></div>
                <div><div className="text-2xl font-bold text-white">&lt;<AnimCount end={200} suffix="ms"/></div><div className="text-xs text-gray-500">Avg Response</div></div>
            </div>
        </div>
    </section>;
}

/* ── Features Grid ── */
function FeaturesSection(){
    const feats=[
        {icon:<Shield s={24}/>,title:'Threat Intelligence',desc:'Cross-references URLs against databases of known phishing domains in real-time.'},
        {icon:<Brain/>,title:'AI Pattern Recognition',desc:'PhishNet-7B model analyzes URL structure, entropy, and semantic patterns.'},
        {icon:<Lock/>,title:'SSL/TLS Verification',desc:'Validates certificate chains and detects missing or invalid HTTPS configurations.'},
        {icon:<Globe/>,title:'Domain Analysis',desc:'Inspects subdomain depth, WHOIS age, IP-based hosts, and DNS anomalies.'},
        {icon:<Zap/>,title:'Real-Time Scoring',desc:'Weighted heuristic engine produces a 0-100% risk score in under 200ms.'},
        {icon:<Search/>,title:'Keyword Detection',desc:'Identifies social engineering keywords: login, verify, bank, secure, update.'},
    ];
    return <section className="py-16 px-4"><div className="max-w-6xl mx-auto"><h2 className="text-3xl font-bold text-white text-center mb-2">Enterprise-Grade Protection</h2><p className="text-gray-500 text-center mb-12">Six layers of analysis working together to protect you.</p><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{feats.map((f,i)=><div key={i} className="bg-cyber-800/40 border border-cyber-700/40 rounded-xl p-6 hover:border-cyber-accent/30 hover:bg-cyber-800/60 transition-all group"><div className="text-cyber-accent mb-3 group-hover:scale-110 transition-transform inline-block">{f.icon}</div><h3 className="text-white font-semibold mb-2">{f.title}</h3><p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p></div>)}</div></div></section>;
}

/* ── How It Works ── */
function HowItWorks(){
    const steps=[
        {n:'01',t:'Submit URL',d:'Enter any suspicious link into the scanner. We accept all URL formats.'},
        {n:'02',t:'Feature Extraction',d:'Our engine parses the URL extracting 5+ structural and semantic features.'},
        {n:'03',t:'Threat Intel Lookup',d:'The URL is cross-referenced against known phishing domain databases.'},
        {n:'04',t:'Heuristic Scoring',d:'A weighted rule engine calculates the risk score (simulated ML model).'},
        {n:'05',t:'AI Analysis',d:'PhishNet-7B generates a human-readable explanation of the detected threats.'},
        {n:'06',t:'Report Generated',d:'You receive a full threat report with score, classification, and recommendations.'},
    ];
    return <section className="py-16 px-4 bg-gradient-to-b from-transparent via-cyber-800/20 to-transparent" id="how"><div className="max-w-4xl mx-auto"><h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2><div className="space-y-4">{steps.map((s,i)=><div key={i} className="flex gap-4 items-start bg-cyber-800/30 border border-cyber-700/30 rounded-xl p-5 hover:border-cyber-accent/30 transition-all"><div className="text-cyber-accent font-mono text-xl font-bold shrink-0 w-10">{s.n}</div><div><h3 className="text-white font-semibold mb-1">{s.t}</h3><p className="text-gray-400 text-sm">{s.d}</p></div></div>)}</div></div></section>;
}

/* ── Scanner Page ── */
function ScannerPage(){
    const[url,setUrl]=useState('');const[scanning,setScanning]=useState(false);const[result,setResult]=useState(null);const[history,setHistory]=useState([]);const[error,setError]=useState(null);const[emailMode,setEmailMode]=useState(false);const inp=useRef(null);
    useEffect(()=>{try{const s=localStorage.getItem('phishHistory');if(s)setHistory(JSON.parse(s))}catch{}},[]);
    const save=item=>{const h=[item,...history.filter(x=>x.url!==item.url)].slice(0,5);setHistory(h);localStorage.setItem('phishHistory',JSON.stringify(h))};
    const scan=async e=>{e.preventDefault();if(!url.trim())return;setScanning(true);setResult(null);setError(null);
        try{await new Promise(r=>setTimeout(r,2400));const res=await fetch("/api/analyze", {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({url:url.trim()})});if(!res.ok)throw new Error('Server error '+res.status);const d=await res.json();setResult(d);save({url:url.trim(),label:d.label,score:d.score,time:new Date().toLocaleTimeString()})}
        catch(err){setError('Cannot connect to backend. Run the FastAPI server on port 8000.\n'+err.message)}finally{setScanning(false)}};
    const lc={Dangerous:{text:'text-red-400',bg:'bg-red-500/10',bdr:'border-red-500/30',glow:'shadow-[0_0_30px_rgba(239,68,68,.12)]'},Suspicious:{text:'text-yellow-400',bg:'bg-yellow-500/10',bdr:'border-yellow-500/30',glow:'shadow-[0_0_30px_rgba(234,179,8,.12)]'},Safe:{text:'text-green-400',bg:'bg-green-500/10',bdr:'border-green-500/30',glow:'shadow-[0_0_30px_rgba(34,197,94,.12)]'}};
    const c=result?lc[result.label]||lc.Safe:null;
    return <section className="py-10 px-4"><div className="max-w-6xl mx-auto"><div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            {/* Mode Toggle */}
            <div className="flex gap-2">{[['URL Scan',false],['Email Header',true]].map(([l,m])=><button key={l} onClick={()=>setEmailMode(m)} className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${emailMode===m?'bg-cyber-accent/15 text-cyber-accent border border-cyber-accent/30':'bg-cyber-800/40 text-gray-500 border border-cyber-700/30 hover:text-gray-300'}`}>{l}</button>)}</div>

            {/* Scanner Card */}
            <div className="bg-cyber-800/50 backdrop-blur rounded-xl p-6 border border-cyber-700/40 relative overflow-hidden">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-200"><Search/>{emailMode?'Paste Email Headers':'Enter Target URL'}</h2>
                <form onSubmit={scan} className="flex flex-col sm:flex-row gap-3 relative z-10">
                    {emailMode?<textarea value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste email headers here..." rows={4} className="flex-1 bg-cyber-950 border border-cyber-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent/50 transition-all placeholder-gray-600 resize-none"/>
                    :<input ref={inp} type="text" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.com/login" className="flex-1 bg-cyber-950 border border-cyber-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent/50 transition-all placeholder-gray-600"/>}
                    <button type="submit" disabled={scanning||!url.trim()} className="px-7 py-3 bg-gradient-to-r from-cyber-accent to-[#00c8d4] text-cyber-950 font-bold rounded-lg hover:brightness-110 focus:ring-4 focus:ring-cyber-accent/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all whitespace-nowrap text-sm">{scanning?'Scanning...':'Analyze'}</button>
                </form>
                {scanning&&<DeepScanOverlay/>}
            </div>

            {error&&!scanning&&<div className="bg-red-950/30 border border-red-500/30 rounded-xl p-5 text-red-300 text-sm animate-fade-in whitespace-pre-line">⚠ {error}</div>}

            {/* Result */}
            {result&&!scanning&&<div className={`rounded-xl border ${c.bdr} ${c.glow} animate-fade-in overflow-hidden`}>
                <div className={`${c.bg} px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                    <div><div className="text-[10px] text-gray-400 uppercase tracking-[.2em] mb-1 font-semibold">Threat Classification</div><div className={`text-3xl font-extrabold flex items-center gap-3 ${c.text}`}>{result.label==='Dangerous'?<AlertTri/>:result.label==='Safe'?<CheckCirc/>:null}{result.label}</div></div>
                    <div className="relative"><ConfidenceMeter score={result.score} label={result.label}/></div>
                </div>
                <div className="bg-cyber-800/40 backdrop-blur p-6 space-y-5">
                    <div><h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider flex items-center gap-2"><span className="w-1 h-4 bg-cyber-accent rounded-full inline-block"></span>Analysis Report</h3>
                        <ul className="space-y-2.5">{result.reasons.map((r,i)=>{const ai=r.startsWith('AI Analysis:');return <li key={i} className={`flex items-start gap-3 p-3.5 rounded-lg border text-sm leading-relaxed ${ai?'bg-purple-950/20 border-purple-500/30 text-purple-200':'bg-cyber-950/50 border-cyber-700/50 text-gray-300'}`}><span className="mt-0.5 text-cyber-accent shrink-0">{ai?'🧠':'▹'}</span><div>{ai&&<span className="text-purple-400 font-bold uppercase tracking-wide text-[10px] mb-1 block">AI Engine Assessment</span>}{ai?r.replace('AI Analysis: ',''):r}</div></li>})}</ul>
                    </div>
                    <div className="pt-4 border-t border-cyber-700/40"><h3 className="text-[10px] font-semibold text-gray-500 mb-3 uppercase tracking-[.2em]">Raw Feature Extraction</h3><div className="flex flex-wrap gap-2">{Object.entries(result.features).map(([k,v])=><span key={k} className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-cyber-950/60 rounded-md text-[11px] border border-cyber-700/40 font-mono"><span className="text-gray-500">{k}:</span><span className={typeof v==='boolean'?(v?'text-green-400':'text-red-400'):Array.isArray(v)?'text-amber-300':'text-blue-300'}>{Array.isArray(v)?(v.length?v.join(', '):'—'):String(v)}</span></span>)}</div></div>
                    {/* Export */}
                    <button onClick={()=>{const t=`DeepScan AI Report\n${'='.repeat(40)}\nURL: ${url}\nScore: ${Math.round(result.score*100)}%\nLabel: ${result.label}\n\nReasons:\n${result.reasons.map(r=>'• '+r).join('\n')}\n\nFeatures:\n${JSON.stringify(result.features,null,2)}`;navigator.clipboard.writeText(t).then(()=>alert('Report copied to clipboard!'))}} className="text-xs text-gray-500 hover:text-cyber-accent transition-colors cursor-pointer flex items-center gap-1">📋 Copy Report to Clipboard</button>
                </div>
            </div>}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
            <div className="bg-cyber-800/50 backdrop-blur rounded-xl p-5 border border-cyber-700/40"><h2 className="text-sm font-semibold flex items-center gap-2 mb-5 text-gray-300 uppercase tracking-wider"><Clock/> Recent Scans</h2>
                {history.length===0?<p className="text-xs text-gray-600 italic">No scans yet.</p>:<ul className="space-y-2">{history.map((it,i)=>{const hc=lc[it.label]||lc.Safe;return<li key={i} className="flex items-center justify-between bg-cyber-950/40 p-3 rounded-lg text-xs border border-cyber-700/30 cursor-pointer hover:border-cyber-accent/40 transition-all group" onClick={()=>{setUrl(it.url);inp.current?.focus()}}><div className="truncate pr-3"><span className="text-gray-300 group-hover:text-white transition-colors font-mono block truncate">{it.url}</span>{it.time&&<span className="text-gray-600 text-[10px]">{it.time}</span>}</div><span className={`px-2 py-1 rounded text-[10px] font-bold shrink-0 ${hc.bg} ${hc.text} border ${hc.bdr}`}>{Math.round(it.score*100)}%</span></li>})}</ul>}
            </div>
            <div className="bg-cyber-800/50 backdrop-blur rounded-xl p-5 border border-cyber-700/40"><h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">System Status</h2><div className="space-y-3 text-xs"><div className="flex justify-between"><span className="text-gray-500">Engine</span><span className="text-cyber-accent font-mono">v3.2.1</span></div><div className="flex justify-between"><span className="text-gray-500">Threat DB</span><span className="text-green-400 font-mono">Synced</span></div><div className="flex justify-between"><span className="text-gray-500">AI Model</span><span className="text-purple-400 font-mono">PhishNet-7B</span></div><div className="flex justify-between"><span className="text-gray-500">Rules Engine</span><span className="text-green-400 font-mono">Active</span></div><div className="flex justify-between"><span className="text-gray-500">Uptime</span><span className="text-gray-400 font-mono">99.97%</span></div></div></div>
            {/* Quick test URLs */}
            <div className="bg-cyber-800/50 backdrop-blur rounded-xl p-5 border border-cyber-700/40"><h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Quick Test URLs</h2><div className="space-y-2">{['https://google.com','http://192.168.1.1/login-update-secure','paypal-support-help.org','https://my-bank-verify-account.com'].map(u=><button key={u} onClick={()=>{setUrl(u);inp.current?.focus()}} className="block w-full text-left px-3 py-2 bg-cyber-950/40 rounded-lg text-[11px] font-mono text-gray-400 border border-cyber-700/30 hover:border-cyber-accent/40 hover:text-white transition-all truncate">{u}</button>)}</div></div>
        </div>
    </div></div></section>;
}

/* ── Stats Dashboard ── */
function StatsPage(){
    const fakeData=[{label:'Safe',count:8423,pct:65},{label:'Suspicious',count:3102,pct:24},{label:'Dangerous',count:1322,pct:11}];
    return <section className="py-10 px-4"><div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-white">Threat Dashboard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {fakeData.map(d=>{const col=d.label==='Safe'?'green':d.label==='Suspicious'?'yellow':'red';return<div key={d.label} className="bg-cyber-800/50 border border-cyber-700/40 rounded-xl p-6"><div className={`text-${col}-400 text-sm font-semibold mb-1`}>{d.label}</div><div className="text-3xl font-bold text-white mb-2"><AnimCount end={d.count}/></div><div className="w-full h-1.5 bg-cyber-950 rounded-full overflow-hidden"><div className={`h-full bg-${col}-500 rounded-full`} style={{width:`${d.pct}%`,transition:'width 1.5s ease-out'}}></div></div><div className="text-xs text-gray-500 mt-1">{d.pct}% of scans</div></div>})}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-cyber-800/50 border border-cyber-700/40 rounded-xl p-6"><h3 className="text-white font-semibold mb-4">Top Blocked Domains</h3><div className="space-y-3">{['secure-login-update.com','paypal-support-help.org','bank-verify-account.net','apple-id-recovery.info','netflix-billing-update.com'].map((d,i)=><div key={i} className="flex items-center justify-between text-sm"><span className="font-mono text-gray-300">{d}</span><span className="text-red-400 text-xs font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">Blocked</span></div>)}</div></div>
            <div className="bg-cyber-800/50 border border-cyber-700/40 rounded-xl p-6"><h3 className="text-white font-semibold mb-4">Detection Timeline</h3><div className="space-y-3">{['23:41:02','23:38:15','23:35:47','23:30:22','23:28:01'].map((t,i)=><div key={i} className="flex items-center gap-3 text-sm"><span className="font-mono text-cyber-accent text-xs">{t}</span><span className="w-2 h-2 rounded-full bg-red-500"></span><span className="text-gray-400">{['Phishing URL blocked','Suspicious redirect detected','Known scam domain flagged','IP-based URL intercepted','Missing SSL detected'][i]}</span></div>)}</div></div>
        </div>
    </div></section>;
}

/* ── Footer ── */
function Footer(){
    return <footer className="border-t border-cyber-700/30 mt-16 py-10 px-4"><div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"><div><div className="flex items-center gap-2 mb-3"><Shield s={20}/><span className="font-bold text-white">DeepScan AI</span></div><p className="text-gray-500 text-sm">Advanced phishing detection powered by heuristic analysis and AI pattern recognition.</p></div><div><h4 className="text-white font-semibold mb-3 text-sm">Integrations</h4><div className="space-y-1 text-xs text-gray-500"><div>Google Safe Browsing API</div><div>PhishTank Database</div><div>VirusTotal</div><div>OpenAI / Claude API</div></div></div><div><h4 className="text-white font-semibold mb-3 text-sm">Resources</h4><div className="space-y-1 text-xs text-gray-500"><div>API Documentation</div><div>Swagger UI (localhost:8000/docs)</div><div>GitHub Repository</div></div></div></div><div className="max-w-6xl mx-auto text-center text-gray-600 text-xs mt-8 pt-6 border-t border-cyber-700/20">DeepScan AI — Hackathon Demo • Not for production use • © {new Date().getFullYear()}</div></footer>;
}

/* ── App Router ── */
function App(){
    const[page,setPage]=useState('home');
    return <div className="bg-grid min-h-screen flex flex-col">
        <Navbar page={page} setPage={setPage}/>
        <main className="flex-1">
            {page==='home'&&<><HeroSection setPage={setPage}/><FeaturesSection/><HowItWorks/></>}
            {page==='scanner'&&<ScannerPage/>}
            {page==='how'&&<HowItWorks/>}
            {page==='stats'&&<StatsPage/>}
        </main>
        <Footer/>
    </div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
