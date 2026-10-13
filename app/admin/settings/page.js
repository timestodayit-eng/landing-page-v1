import SettingsForm from '../../../components/SettingsForm';import { getDb } from '../../../lib/db';
export const dynamic='force-dynamic';
export default async function Settings(){const db=getDb();const [rows]=await db.query("SELECT setting_value FROM settings WHERE setting_key='gtm_input' LIMIT 1");return <div><div className="topbar"><div><h1>Tracking / GTM</h1><p className="muted">Global tracking settings for every published landing page.</p></div></div><SettingsForm initialGtm={rows[0]?.setting_value||''}/></div>}
