'use client';
import { useState } from 'react';
export default function SettingsForm({initialGtm=''}){
  const [gtm,setGtm]=useState(initialGtm); const [saving,setSaving]=useState(false);
  async function save(){setSaving(true);const res=await fetch('/api/settings',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({gtm_input:gtm})});const data=await res.json();setSaving(false);if(!res.ok)return alert(data.error||'Save failed');alert(`Saved. Detected GTM ID: ${data.gtm_id||'none'}`)}
  return <div className="card"><h2>Invisible Global Tracking Header</h2><p className="muted">Paste your full Google Tag Manager code or only the GTM container ID. The CMS extracts the GTM ID and loads it automatically on every published landing page. Admin pages stay untouched.</p><label className="label">GTM code or GTM ID</label><textarea className="textarea codearea" value={gtm} onChange={e=>setGtm(e.target.value)} placeholder="GTM-XXXXXXX or paste the full GTM snippet here"/><div className="notice" style={{margin:'12px 0'}}>This is the recommended full-site invisible header for tracking. Do not paste passwords, API secrets or unrelated private code here.</div><button className="btn" onClick={save} disabled={saving}>{saving?'Saving...':'Save Tracking Settings'}</button></div>;
}
