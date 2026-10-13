import { getDb } from '../../lib/db';import Gtm,{GtmNoScript} from '../../components/Gtm';
export const dynamic='force-dynamic';
export default async function PublicLayout({children}){let id='';try{const db=getDb();const [rows]=await db.query("SELECT setting_value FROM settings WHERE setting_key='gtm_id' LIMIT 1");id=rows[0]?.setting_value||''}catch(e){console.error('GTM settings load failed',e.message)}return <><Gtm id={id}/><GtmNoScript id={id}/>{children}</>}
