import Link from 'next/link';
import { CATEGORIES } from '../lib/categories';
import LogoutButton from './LogoutButton';
export default function AdminShell({children}){
  return <div className="shell"><aside className="sidebar"><div className="brand">Landing CMS Pro</div><nav className="nav">
    <Link href="/admin">Dashboard</Link>
    <div className="nav-label">Page categories</div>
    {CATEGORIES.map(c=><Link key={c.key} href={`/admin/pages/${c.key}`}>{c.name}</Link>)}
    <div className="nav-label">Master templates</div>
    {CATEGORIES.map(c=><Link key={c.key} href={`/admin/templates/${c.key}`}>{c.name}</Link>)}
    <div className="nav-label">System</div><Link href="/admin/settings">Tracking / GTM</Link><LogoutButton />
  </nav></aside><main className="admin-main">{children}</main></div>;
}
