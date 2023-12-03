type Link = {
    path: string;
    text: string;
    icon: string;
};

type SidebarProps = {
    active: string;
};

const links: Link[] = [
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
                    <a key={link.path} href={link.path} className={props.active === link.path ? 'active' : ''}>
                        <span className="material-icons-sharp">{link.icon}</span>
                        <h3>{link.text}</h3>
                    </a>
                ))}
            </div>
        </aside>
    );
}
