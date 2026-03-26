import { useIntersection } from "../hooks/useIntersection";

export default function About() {
  const [ref, visible] = useIntersection();
  return (
    <section id="about" style={{padding:"5rem 6vw",position:"relative"}}>
      <div ref={ref} style={{maxWidth:"900px",margin:"0 auto",opacity:visible?1:0,transform:visible?"none":"translateY(40px)",transition:"all 0.8s ease"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"3rem",alignItems:"start"}}>

          {/* Photo Card */}
          <div style={{position:"relative",maxWidth:"380px",margin:"0 auto",width:"100%"}}>
            <div style={{position:"absolute",inset:"-20px",borderRadius:"24px",background:"radial-gradient(circle at 40% 40%,rgba(124,58,237,0.25),transparent 70%)",zIndex:0,filter:"blur(16px)"}} />
            <div style={{position:"relative",zIndex:1,borderRadius:"20px",overflow:"hidden",border:"1px solid rgba(124,58,237,0.35)",boxShadow:"0 24px 60px rgba(0,0,0,0.5)",background:"#0a0015"}}>
              <div style={{position:"relative",width:"100%",paddingBottom:"110%"}}>
                <img src="/samarth1.jpg" alt="Samarth Shirahatti" style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top",display:"block"}} />
                <div style={{position:"absolute",bottom:0,left:0,right:0,height:"55%",background:"linear-gradient(to top,rgba(5,0,15,1) 0%,rgba(5,0,15,0.7) 50%,transparent 100%)"}} />
                <div style={{position:"absolute",top:0,left:0,right:0,height:"2px",background:"linear-gradient(90deg,transparent,#7c3aed,#a78bfa,#7c3aed,transparent)"}} />
                <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"1.2rem",zIndex:2}}>
                  <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"#fff",marginBottom:"0.2rem"}}>Samarth Shirahatti</div>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.7rem",color:"#a78bfa",letterSpacing:"0.08em",marginBottom:"0.7rem"}}>Full Stack Developer</div>
                  <div style={{display:"flex",gap:"0.4rem",flexWrap:"wrap"}}>
                    {["🎓 KLE Tech","📍 Hubli","🚀 MERN"].map(b=>(
                      <span key={b} style={{background:"rgba(124,58,237,0.25)",border:"1px solid rgba(124,58,237,0.45)",color:"rgba(255,255,255,0.8)",fontSize:"0.62rem",padding:"0.2rem 0.5rem",borderRadius:"100px",fontFamily:"'DM Sans',sans-serif",fontWeight:500}}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderTop:"1px solid rgba(124,58,237,0.2)"}}>
                {[["10+","Repos"],["MERN","Stack"],["DSA","Learner"]].map(([val,label],i)=>(
                  <div key={label} style={{padding:"0.9rem 0",textAlign:"center",borderRight:i<2?"1px solid rgba(124,58,237,0.2)":"none",background:"rgba(124,58,237,0.04)"}}>
                    <div style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"1rem",color:"#a78bfa"}}>{val}</div>
                    <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.58rem",color:"rgba(255,255,255,0.35)",textTransform:"uppercase",letterSpacing:"0.08em",marginTop:"0.15rem"}}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{position:"absolute",bottom:"-14px",right:"-14px",width:"50px",height:"50px",border:"2px solid rgba(124,58,237,0.4)",borderRadius:"8px",zIndex:0}} />
            <div style={{position:"absolute",top:"-10px",left:"-10px",width:"28px",height:"28px",border:"2px solid rgba(124,58,237,0.25)",borderRadius:"4px",zIndex:0}} />
          </div>

          {/* Text */}
          <div>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.78rem",color:"#a78bfa",letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:"1rem",display:"flex",alignItems:"center",gap:"0.6rem"}}>
              <span style={{width:"24px",height:"1px",background:"#7c3aed",display:"inline-block"}} />About Me
            </div>
            <h2 style={{fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,5vw,2.4rem)",color:"#fff",letterSpacing:"-0.02em",lineHeight:1.1,marginBottom:"1.2rem"}}>
              Building things that<br/><span style={{color:"#7c3aed"}}>matter.</span>
            </h2>
            <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.55)",lineHeight:1.8,fontSize:"0.95rem",marginBottom:"1.2rem"}}>
              Hey! I'm Samarth — a Full Stack Developer and MERN Stack enthusiast
              studying at KLE Tech University, Hubli. I’m passionate about turning ideas into
              real, scalable products that solve meaningful problems.
            </p>

            <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.55)",lineHeight:1.8,fontSize:"0.95rem",marginBottom:"1.8rem"}}>
              I’ve solved 200+ LeetCode problems, strengthening my foundation in
              Data Structures & Algorithms, and I continuously work on improving my
              problem-solving skills.
            </p>

            <p style={{fontFamily:"'DM Sans',sans-serif",color:"rgba(255,255,255,0.55)",lineHeight:1.8,fontSize:"0.95rem",marginBottom:"1.8rem"}}>
              Currently, I’m building ExileDraw, a real-time chat application with Next.js, focused on scalable systems, clean architecture, and smooth real-time interactions.
            </p>
            <div style={{display:"flex",gap:"0.7rem",flexWrap:"wrap",marginBottom:"1.8rem"}}>
              {[{label:"GitHub",url:"https://github.com/Samarth-2409X"},{label:"LinkedIn",url:"https://www.linkedin.com/in/samarth-shirahatti-9bb8962a3/"},{label:"Email",url:"mailto:samarthgone667@gmail.com"}].map(s=>(
                <a key={s.label} href={s.url} target="_blank" rel="noreferrer" style={{fontFamily:"'DM Mono',monospace",fontSize:"0.72rem",color:"#c4b5fd",textDecoration:"none",border:"1px solid rgba(124,58,237,0.3)",padding:"0.4rem 0.9rem",borderRadius:"6px",transition:"all 0.2s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="rgba(124,58,237,0.15)";e.currentTarget.style.borderColor="#7c3aed";e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor="rgba(124,58,237,0.3)";e.currentTarget.style.transform="none";}}>
                  {s.label} ↗
                </a>
              ))}
            </div>
            <div style={{background:"rgba(124,58,237,0.06)",border:"1px solid rgba(124,58,237,0.2)",borderRadius:"12px",padding:"1.2rem 1.4rem",borderLeft:"3px solid #7c3aed"}}>
              <div style={{fontFamily:"'DM Mono',monospace",fontSize:"0.68rem",color:"#7c3aed",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"0.6rem"}}>Currently</div>
              {["Building ExileDraw, a real-time chat application","Solved 200+ LeetCode problems and actively improving DSA","Open to collaboration on scalable MERN stack projects"].map(item=>(
                <div key={item} style={{fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",color:"rgba(255,255,255,0.6)",lineHeight:1.6,marginBottom:"0.3rem"}}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}