export default function Sidebar() {
    // TODO: Add active class to the active link
    return (
        <aside>
            <div className="sidebar">
                <a href="/" className="active">
                    <span className="material-icons-sharp">dashboard</span>
                    <h3>Dashboard</h3>
                </a>
                <a href="/expenses">
                    <span className="material-icons-sharp">receipt_long</span>
                    <h3>Expenses</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">inventory</span>
                    <h3>Todoist</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">report_gmailerrorred</span>
                    <h3>Reports</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">account_circle</span>
                    <h3>Users</h3>
                </a>
                <a href="#">
                    <span className="material-icons-sharp">settings</span>
                    <h3>Settings</h3>
                </a>
            </div>
        </aside>
    )
}