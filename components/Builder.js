'use client';
import { useState } from 'react';
import BlockRenderer from './BlockRenderer';

function uid(type){return `${type}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`}
function newBlock(type){
  if(type==='custom') return {id:uid(type),type,title:'Raw HTML / CSS / JS',html:'<div class="my-section"><h2>Custom section</h2></div>',css:'.my-section{padding:60px 20px;text-align:center;background:#f8fafc}',js:'',height:300};
  const block={id:uid(type),type,title:type[0].toUpperCase()+type.slice(1),heading:'New section',text:''};
  if(type==='hero'||type==='cta'){block.buttonText='Call Now';block.buttonUrl='tel:+8801000000000'}
  if(type==='video') block.videoUrl='';
  return block;
}

export default function Builder({initialBlocks=[],onChange}){
  const [blocks,setBlocks]=useState(initialBlocks); const [drag,setDrag]=useState(null); const [tab,setTab]=useState('builder');
  function commit(next){setBlocks(next);onChange?.(next)}
  function update(i,key,val){commit(blocks.map((b,x)=>x===i?{...b,[key]:val}:b))}
  function remove(i){commit(blocks.filter((_,x)=>x!==i))}
  function move(from,to){if(from===null||from===to)return;const next=[...blocks];const [item]=next.splice(from,1);next.splice(to,0,item);commit(next)}
  function importJson(value){try{const parsed=JSON.parse(value);if(!Array.isArray(parsed))throw new Error();commit(parsed)}catch{alert('Invalid JSON blocks')}}
  return <div>
    <div className="tabs"><button className={`tab ${tab==='builder'?'active':''}`} onClick={()=>setTab('builder')}>Drag & Drop Builder</button><button className={`tab ${tab==='json'?'active':''}`} onClick={()=>setTab('json')}>Raw Blocks JSON</button></div>
    {tab==='json'?<div className="card"><div className="notice">Advanced option. Raw HTML/CSS/JS is available as a Custom Code block. JSON lets you move the entire page structure between campaigns.</div><textarea className="textarea codearea" defaultValue={JSON.stringify(blocks,null,2)} onBlur={e=>importJson(e.target.value)} /></div>:<>
      {blocks.map((b,i)=><div className="block" key={b.id||i} draggable onDragStart={()=>setDrag(i)} onDragOver={e=>e.preventDefault()} onDrop={()=>{move(drag,i);setDrag(null)}}>
        <div className="block-head"><strong>☰ {b.title||b.type}</strong><div className="row"><span className="badge">{b.type}</span><button className="btn danger" onClick={()=>remove(i)}>Remove</button></div></div>
        <div className="block-body">
          {b.type==='custom'?<>
            <label className="label">HTML</label><textarea className="textarea codearea" value={b.html||''} onChange={e=>update(i,'html',e.target.value)} />
            <label className="label">CSS</label><textarea className="textarea codearea" value={b.css||''} onChange={e=>update(i,'css',e.target.value)} />
            <label className="label">JavaScript</label><textarea className="textarea codearea" value={b.js||''} onChange={e=>update(i,'js',e.target.value)} />
            <label className="label">Frame height (px)</label><input className="input" type="number" value={b.height||500} onChange={e=>update(i,'height',e.target.value)} />
            <div className="notice" style={{marginTop:12}}>Custom JavaScript runs inside a sandboxed iframe. It cannot read the admin session cookie or modify the CMS dashboard.</div>
          </>:<>
            <label className="label">Heading</label><input className="input" value={b.heading||''} onChange={e=>update(i,'heading',e.target.value)} />
            <label className="label">Text</label><textarea className="textarea" value={b.text||''} onChange={e=>update(i,'text',e.target.value)} />
            {b.type==='video' && <><label className="label">YouTube URL</label><input className="input" value={b.videoUrl||''} onChange={e=>update(i,'videoUrl',e.target.value)} /></>}
            {(b.type==='hero'||b.type==='cta') && <div className="grid two"><div><label className="label">Button text</label><input className="input" value={b.buttonText||''} onChange={e=>update(i,'buttonText',e.target.value)} /></div><div><label className="label">Button URL</label><input className="input" value={b.buttonUrl||''} onChange={e=>update(i,'buttonUrl',e.target.value)} /></div></div>}
          </>}
        </div>
      </div>)}
      <div className="row">{['hero','text','trust','video','reviews','faq','cta','custom'].map(type=><button className="btn secondary" key={type} onClick={()=>commit([...blocks,newBlock(type)])}>+ {type==='custom'?'Raw HTML/CSS/JS':type}</button>)}</div>
    </>}
    <div style={{marginTop:24}}><h3>Live Preview</h3><div className="preview">{blocks.map((b,i)=><BlockRenderer key={b.id||i} block={b} preview />)}</div></div>
  </div>
}
