"use client";
import {useEffect,useRef} from "react";import gsap from "gsap";
const lines=[["I","DON'T","JUST","BUILD","WEBSITES."],["I","BUILD","DIGITAL","EXPERIENCES."]];
const hot=["EXPERIENCES.","DIGITAL"];
export default function Statement(){
const r=useRef();
useEffect(()=>{if(matchMedia("(prefers-reduced-motion: reduce)").matches){gsap.set(Array.from(r.current.querySelectorAll(".w")),{opacity:1,yPercent:0});return}
const ctx=gsap.context(()=>{gsap.fromTo(".w",{opacity:.12,yPercent:40},{opacity:1,yPercent:0,stagger:.15,ease:"power2.out",scrollTrigger:{trigger:r.current,start:"top 70%",end:"bottom 60%",scrub:1}})},r);return()=>ctx.revert()},[]);
return <section ref={r} className="sec min-h-[80vh] flex flex-col justify-center"><h2 className="h-display text-[clamp(2rem,9.5vw,9rem)]">
{lines.map((l,i)=><span key={i} className="block mb-4">{l.map((w,j)=><span key={j} className={`w inline-block mr-[.25em] ${hot.includes(w)?"text-acc":i?"text-fg":"text-dim"}`}>{w}</span>)}</span>)}</h2></section>}
