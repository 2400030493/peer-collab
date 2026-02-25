import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar({ onToggleSidebar }) {
    const { user, logout, isTeacher } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes('dashboard')) return 'Dashboard';
        const segment = path.split('/')[1];
        return segment ? segment.charAt(0).toUpperCase() + segment.slice(1) : 'Dashboard';
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <button className="navbar-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
                <h1 className="navbar-title">{getPageTitle()}</h1>
            </div>

            <div className="navbar-right">
                {/* Role Badge */}
                <div className="navbar-role-badge">
                    {isTeacher ? '👩‍🏫 Teacher' : '🎓 Student'}
                </div>

                {/* Notifications */}
                <button className="navbar-icon-btn" aria-label="Notifications">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                    <span className="notification-dot"></span>
                </button>

                {/* User Avatar */}
                <Link to="/profile" className="navbar-user">
                    <div className="avatar" style={{ background: isTeacher ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
                        {user?.avatar || '?'}
                    </div>
                    <div className="navbar-user-info">
                        <span className="navbar-user-name">{user?.name || 'User'}</span>
                        <span className="navbar-user-role">{user?.role || ''}</span>
                    </div>
                </Link>

                {/* Logout */}
                <button className="navbar-logout-btn" onClick={handleLogout} title="Logout">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}
