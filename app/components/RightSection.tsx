export default function RightSection() {
	return (
		<div className="right-section">
			<div className="nav">
				<button id="menu-btn">
					<span className="material-icons-sharp">
						menu
					</span>
				</button>
				{/* TODO: enable light/dark mode */}
				<div className="dark-mode">
					<span className="material-icons-sharp active">
						light_mode
					</span>
					<span className="material-icons-sharp">
						dark_mode
					</span>
				</div>
				{/* TODO: implement user info */}
				<div className="profile">
					<div className="info">
						<p>Hey, <b>User</b></p>
						{/*<small className="text-muted">Admin</small>*/}
					</div>
					<div className="profile-photo">
						{/*<img src="/vercel.svg"  alt={""}/>*/}
					</div>
				</div>
			</div>
			
			{/* TODO: fill user card from user info */}
			<div className="user-profile">
				<div className="logo">
					{/*<img src="/vercel.svg" />*/}
					<h2>Hello World Header</h2>
					<p>Paragraph</p>
				</div>
			</div>
			
			{/* TODO: i like this, use todoist to fill it */}
			<div className="reminders">
				<div className="header">
					<h2>Reminders</h2>
					<span className="material-icons-sharp">
						notifications_none
					</span>
				</div>
			
				<div className="notification">
					<div className="icon">
						<span className="material-icons-sharp">
							volume_up
						</span>
					</div>
					<div className="content">
						<div className="info">
							<h3>Workshop</h3>
							<small className="text_muted">
								08:00 AM - 12:00 PM
							</small>
						</div>
						<span className="material-icons-sharp">
							more_vert
						</span>
					</div>
				</div>

				<div className="notification deactive">
					<div className="icon">
						<span className="material-icons-sharp">
							edit
						</span>
					</div>
					<div className="content">
						<div className="info">
							<h3>Workshop</h3>
							<small className="text_muted">
								08:00 AM - 12:00 PM
							</small>
						</div>
						<span className="material-icons-sharp">
							more_vert
						</span>
					</div>
				</div>
				
				{/* TODO: implement this using todoist */}
				<div className="notification add-reminder">
					<div>
                        <span className="material-icons-sharp">
                            add
                        </span>
						<h3>Add Reminder</h3>
					</div>
				</div>
			</div>
		</div>
	)
}