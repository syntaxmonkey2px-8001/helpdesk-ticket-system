import '@/styles/app.scss'

export default function TopNav() {

    return (
        <header className="header-banner">
            <h1>Support Tickets</h1>

            <div className="header-actions">
                <div className="header-metric">
                    <span>Open</span>
                    <strong>12</strong>
                </div>
                <div className="header-metric">
                    <span>In Progress</span>
                    <strong>8</strong>
                </div>

                <div className="header-user">
                    <div className="avatar">AM</div>
                    <div className="user-meta">
                        <span className="user-name">Alice Morgan</span>
                        <span className="user-role">Support Lead</span>
                    </div>
                </div>
            </div>
        </header>
    )
}