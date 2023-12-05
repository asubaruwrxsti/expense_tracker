import Link from 'next/link';

type anchorLink = {
    path: string;
    text: string;
    icon: string;
};

type SidebarProps = {
    active: string;
};

const links: anchorLink[] = [
    { path: '/', text: 'Dashboard', icon: 'dashboard' },
    { path: '/expenses', text: 'Expenses', icon: 'receipt_long' },
    { path: '/todoist', text: 'Todoist', icon: 'inventory' },
    { path: '/reports', text: 'Reports', icon: 'report_gmailerrorred' },
    { path: '/users', text: 'Users', icon: 'account_circle' },
    { path: '/settings', text: 'Settings', icon: 'settings' },
];

export default function Sidebar(props: SidebarProps) {
    return (
        <aside>
            <div className="sidebar">
                {links.map((link) => (
                    <Link href={link.path} key={link.path} className={`${props.active === link.path ? 'active' : ''}`}>
						<span className={`material-icons-sharp`}>{link.icon}</span>
						<p>{link.text}</p>
					</Link>
                ))}
            </div>
        </aside>
    );
}
