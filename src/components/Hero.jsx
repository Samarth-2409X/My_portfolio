import { useState, useEffect, useRef } from "react";

function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    let animId;
    const COLORS = ["#7c3aed","#a78bfa","#c4b5fd","#5b21b6","#8b5cf6"];
    const count = W < 768 ? 25 : 55;
    const pts = Array.from({ length: count }, () => ({ x:Math.random()*W, y:Math.random()*H, r:Math.random()*2+0.5, vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4, color:COLORS[Math.floor(Math.random()*COLORS.length)], op:Math.random()*0.6+0.2 }));
    let mouse = { x:W/2, y:H/2 };
    const onMove = e => { mouse.x=e.clientX; mouse.y=e.clientY; };
    window.addEventListener("mousemove", onMove);
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      for (const p of pts) {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=p.color; ctx.globalAlpha=p.op; ctx.fill();
      }
      ctx.globalAlpha=1;
      for(let i=0;i<pts.length;i++){
        for(let j=i+1;j<pts.length;j++){ const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy); if(d<120){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle="#7c3aed";ctx.globalAlpha=(1-d/120)*0.18;ctx.lineWidth=0.8;ctx.stroke();} }
        if(W>=768){const mx=pts[i].x-mouse.x,my=pts[i].y-mouse.y,md=Math.sqrt(mx*mx+my*my);if(md<160){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(mouse.x,mouse.y);ctx.strokeStyle="#a78bfa";ctx.globalAlpha=(1-md/160)*0.3;ctx.lineWidth=1;ctx.stroke();}}
      }
      ctx.globalAlpha=1; animId=requestAnimationFrame(draw);
    };
    draw();
    const onResize=()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;};
    window.addEventListener("resize",onResize);
    return ()=>{cancelAnimationFrame(animId);window.removeEventListener("mousemove",onMove);window.removeEventListener("resize",onResize);};
  },[]);
  return <canvas ref={canvasRef} style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0}} />;
}

function GlowOrb() {
  const labels=[{text:"React",angle:0,r:195},{text:"Node.js",angle:72,r:190},{text:"MongoDB",angle:144,r:198},{text:"TypeScript",angle:216,r:192},{text:"Express",angle:288,r:196}];
  return (
    <div className="glow-orb" style={{position:"absolute",top:"50%",right:"7vw",transform:"translateY(-50%)",width:320,height:320,zIndex:1,pointerEvents:"none",animation:"orbFloat 6s ease-in-out infinite"}}>
      <div style={{position:"absolute",inset:-30,borderRadius:"50%",background:"radial-gradient(circle,rgba(124,58,237,.15) 0%,transparent 70%)",animation:"orbPulse 4s ease-in-out infinite"}} />
      <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"radial-gradient(circle at 35% 35%,rgba(167,139,250,.5),rgba(109,40,217,.65) 50%,rgba(5,0,15,.85))",boxShadow:"0 0 60px rgba(124,58,237,.5),0 0 120px rgba(124,58,237,.2),inset 0 0 40px rgba(167,139,250,.15)",animation:"orbMorph 8s ease-in-out infinite"}} />
      <div style={{position:"absolute",top:"18%",left:"22%",width:"35%",height:"30%",borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,.18),transparent)"}} />
      <div style={{position:"absolute",inset:-22,borderRadius:"50%",animation:"orbit 5s linear infinite"}}>
        <div style={{position:"absolute",top:"8%",left:"50%",width:10,height:10,borderRadius:"50%",background:"#c4b5fd",boxShadow:"0 0 12px #a78bfa",transform:"translateX(-50%)"}} />
      </div>
      <div style={{position:"absolute",inset:-52,borderRadius:"50%",animation:"orbit 9s linear infinite reverse"}}>
        <div style={{position:"absolute",top:0,left:"50%",width:6,height:6,borderRadius:"50%",background:"#7c3aed",boxShadow:"0 0 8px #7c3aed",transform:"translateX(-50%)"}} />
      </div>
      {labels.map(({text,angle,r},i)=>{
        const rad=(angle*Math.PI)/180;
        return <div key={text} style={{position:"absolute",left:160+r*Math.cos(rad),top:160+r*Math.sin(rad),transform:"translate(-50%,-50%)",background:"rgba(124,58,237,.12)",border:"1px solid rgba(124,58,237,.35)",color:"#c4b5fd",padding:".28rem .7rem",borderRadius:100,fontFamily:"'DM Mono',monospace",fontSize:".68rem",whiteSpace:"nowrap",animation:`floatLbl ${3+i*0.4}s ease-in-out ${i*0.3}s infinite alternate`}}>{text}</div>;
      })}
    </div>
  );
}

export default function Hero() {
  const [typed,setTyped]=useState(""); const [wIdx,setWIdx]=useState(0); const [deleting,setDeleting]=useState(false);
  const words=["Scalable Web Apps","MERN Projects","Real Solutions","Clean APIs"];
  useEffect(()=>{
    const word=words[wIdx]; let t;
    if(!deleting&&typed.length<word.length) t=setTimeout(()=>setTyped(word.slice(0,typed.length+1)),80);
    else if(!deleting&&typed.length===word.length) t=setTimeout(()=>setDeleting(true),1800);
    else if(deleting&&typed.length>0) t=setTimeout(()=>setTyped(typed.slice(0,-1)),40);
    else{setDeleting(false);setWIdx((wIdx+1)%words.length);}
    return()=>clearTimeout(t);
  },[typed,deleting,wIdx]);
  const scrollTo=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  return (
    <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",padding:"80px 6vw 2rem"}}>
      <ParticleCanvas />
      <div style={{position:"absolute",inset:0,opacity:.025,backgroundImage:"linear-gradient(rgba(124,58,237,1) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,1) 1px,transparent 1px)",backgroundSize:"60px 60px",pointerEvents:"none",zIndex:0}} />
      <div style={{position:"relative",zIndex:2,maxWidth:600,width:"100%"}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:".78rem",color:"#a78bfa",letterSpacing:".16em",textTransform:"uppercase",marginBottom:"1rem",display:"flex",alignItems:"center",gap:".6rem",opacity:0,animation:"fadeUp .6s ease .2s forwards"}}>
          <span style={{width:28,height:1,background:"#7c3aed",display:"inline-block",flexShrink:0}} />Full Stack Developer
        </div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(2.4rem,10vw,5.2rem)",fontWeight:800,color:"#fff",lineHeight:1.05,letterSpacing:"-.03em",margin:"0 0 .4rem",opacity:0,animation:"fadeUp .6s ease .35s forwards"}}>
          Samarth<br/><span style={{color:"#7c3aed"}}>Shirahatti</span>
        </h1>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(.95rem,4vw,1.9rem)",fontWeight:600,color:"rgba(255,255,255,.65)",marginBottom:"1.5rem",minHeight:"2rem",opacity:0,animation:"fadeUp .6s ease .5s forwards"}}>
          I build <span style={{color:"#c4b5fd",borderRight:"2px solid #7c3aed",paddingRight:2}}>{typed}</span>
        </div>
        <p style={{fontFamily:"'DM Sans',sans-serif",fontSize:"clamp(.85rem,3vw,1rem)",color:"rgba(255,255,255,.48)",lineHeight:1.75,maxWidth:480,marginBottom:"2rem",opacity:0,animation:"fadeUp .6s ease .65s forwards"}}>
          MERN Stack Enthusiast @ KLE Tech University, Hubli
          Turning real-world ideas into production-ready applications.
          Solved 200+ LeetCode problems and continuously improving problem-solving skills 🚀
        </p>
        <div style={{display:"flex",gap:".8rem",flexWrap:"wrap",opacity:0,animation:"fadeUp .6s ease .8s forwards"}}>
          <button onClick={()=>scrollTo("projects")} style={{background:"linear-gradient(135deg,#7c3aed,#5b21b6)",color:"#fff",padding:".75rem 1.5rem",borderRadius:6,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".9rem",border:"none",cursor:"pointer",boxShadow:"0 4px 24px rgba(124,58,237,.4)",whiteSpace:"nowrap"}}>View Projects</button>
          <button onClick={()=>scrollTo("contact")} style={{background:"transparent",color:"#a78bfa",padding:".75rem 1.5rem",borderRadius:6,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".9rem",border:"1px solid rgba(124,58,237,.5)",cursor:"pointer",whiteSpace:"nowrap"}}>Contact Me</button>
          <a href="https://github.com/Samarth-2409X" target="_blank" rel="noreferrer" style={{background:"transparent",color:"rgba(255,255,255,.5)",padding:".75rem 1.2rem",borderRadius:6,fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:".9rem",border:"1px solid rgba(255,255,255,.1)",textDecoration:"none",whiteSpace:"nowrap"}}>GitHub ↗</a>
        </div>
        <div style={{marginTop:"3rem",display:"flex",alignItems:"center",gap:".6rem",opacity:0,animation:"fadeUp .6s ease 1.1s forwards"}}>
          <div style={{width:20,height:34,border:"1.5px solid rgba(124,58,237,.4)",borderRadius:10,display:"flex",justifyContent:"center",padding:"5px 0"}}>
            <div style={{width:3,height:8,background:"#7c3aed",borderRadius:2,animation:"scrollDot 1.8s ease-in-out infinite"}} />
          </div>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:".65rem",color:"rgba(255,255,255,.25)",letterSpacing:".1em"}}>SCROLL</span>
        </div>
      </div>
      <GlowOrb />
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
        @keyframes orbFloat{0%,100%{transform:translateY(-50%) translateY(-12px);}50%{transform:translateY(-50%) translateY(12px);}}
        @keyframes orbPulse{0%,100%{opacity:.7;transform:scale(1);}50%{opacity:1;transform:scale(1.06);}}
        @keyframes orbMorph{0%,100%{border-radius:50%;}25%{border-radius:44% 56% 52% 48%/48% 44% 56% 52%;}50%{border-radius:56% 44% 48% 52%/52% 56% 44% 48%;}75%{border-radius:48% 52% 44% 56%/56% 48% 52% 44%;}}
        @keyframes orbit{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        @keyframes floatLbl{from{transform:translate(-50%,-50%) translateY(0);}to{transform:translate(-50%,-50%) translateY(-10px);}}
        @keyframes scrollDot{0%,100%{transform:translateY(0);opacity:1;}50%{transform:translateY(10px);opacity:.3;}}
        @media(max-width:768px){.glow-orb{display:none !important;}}
      `}</style>
    </section>
  );
}