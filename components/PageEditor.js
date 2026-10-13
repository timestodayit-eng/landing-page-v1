'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Builder from './Builder';
export default function PageEditor({page,category,starterBlocks}){
  const router=useRouter(); const isNew=!page?.id;
  const [title,setTitle]=useState(page?.title||'Untitled Page'); const [slug,setSlug]=useState(page?.slug||''); const [status,setStatus]=useState(page?.status||'draft'); const [blocks,setBlocks]=useState(page?.blocks||starterBlocks||[]); const [saving,setSaving]=useState(false);
  async function save(duplicate=false){setSaving(true);const payload={title,slug,status,category_key:category,blocks,duplicate};const res=await fetch(isNew?'/api/pages':`/api/pages/${page.id}`,{method:isNew?'POST':'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const data=await res.json();setSaving(false);if(!res.ok)return alert(data.error||'Save failed');router.push(`/admin/editor/${data.id}`);router.refresh()}
  return <div><div className="topbar"><div><h1>{isNew?'Create Page':'Edit Page'}</h1><div className="muted">Category: {category}</div></div><div className="row">{!isNew&&<button className="btn ghost" onClick={()=>save(true)}>Duplicate</button>}<button className="btn" disabled={saving} onClick={()=>save(false)}>{saving?'Saving...':'Save Page'}</button></div></div>
    <div className="card" style={{marginBottom:18}}><div className="grid three"><div><label className="label">Page name</label><input className="input" value={title} onChange={e=>setTitle(e.target.value)} /></div><div><label className="label">URL slug</label><input className="input" placeholder="campaign-name" value={slug} onChange={e=>setSlug(e.target.value)} /></div><div><label className="label">Status</label><select className="select" value={status} onChange={e=>setStatus(e.target.value)}><option value="draft">Draft</option><option value="published">Published</option></select></div></div></div>
    <Builder initialBlocks={blocks} onChange={setBlocks}/></div>;
}
