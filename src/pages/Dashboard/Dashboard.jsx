import { useAuth } from '../../context/AuthContext';
import AnalyticsCard from '../../components/AnalyticsCard/AnalyticsCard';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Dashboard.css';

const teacherStats = [
    { title: 'Total Students', value: '142', icon: '👥', color: 'primary', trend: 12, subtitle: 'vs last semester' },
    { title: 'Active Projects', value: '8', icon: '📁', color: 'success', trend: 5, subtitle: 'this semester' },
    { title: 'Pending Reviews', value: '24', icon: '📝', color: 'warning', trend: -8, subtitle: 'awaiting grading' },
    { title: 'Avg. Score', value: '87%', icon: '⭐', color: 'danger', trend: 3, subtitle: 'class average' },
];

const studentStats = [
    { title: 'My Projects', value: '5', icon: '📁', color: 'primary', trend: 0, subtitle: 'assigned to you' },
    { title: 'Completed', value: '3', icon: '✅', color: 'success', trend: 15, subtitle: 'submissions done' },
    { title: 'Peer Reviews', value: '7', icon: '📝', color: 'warning', trend: 10, subtitle: 'given & received' },
    { title: 'Avg. Grade', value: '91%', icon: '🏆', color: 'danger', trend: 4, subtitle: 'your average' },
];

const recentProjects = [
    {
        id: 1,
        title: 'Database Design Project',
        description: 'Design a normalized relational database for an e-commerce platform with ER diagrams and SQL schemas.',
        status: 'active',
        dueDate: 'Mar 15, 2026',
        submissions: 28,
        progress: 65,
        icon: '🗄️',
        color: 'linear-gradient(135deg, #6366f1, #4f46e5)',
        team: ['Alex Johnson', 'Maria Garcia', 'James Wilson', 'Priya Sharma'],
    },
    {
        id: 2,
        title: 'React Dashboard App',
        description: 'Build a responsive analytics dashboard using React.js with real-time data visualization and charts.',
        status: 'active',
        dueDate: 'Mar 22, 2026',
        submissions: 15,
        progress: 40,
        icon: '⚛️',
        color: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        team: ['Chen Wei', 'Sarah Kim', 'Tom Brown'],
    },
    {
        id: 3,
        title: 'API Security Analysis',
        description: 'Analyze and document security vulnerabilities in REST APIs with proposed mitigation strategies.',
        status: 'pending',
        dueDate: 'Apr 1, 2026',
        submissions: 0,
        progress: 10,
        icon: '🔒',
        color: 'linear-gradient(135deg, #f97316, #ea580c)',
        team: ['Lisa Anderson', 'Mike Zhang'],
    },
];

const recentActivity = [
    { id: 1, text: 'Alex Johnson submitted Database Design Project', time: '2 hours ago', icon: '📤', color: '#22c55e' },
    { id: 2, text: 'Maria Garcia completed peer review for React Dashboard', time: '3 hours ago', icon: '📝', color: '#6366f1' },
    { id: 3, text: 'New assignment "API Security Analysis" created', time: '5 hours ago', icon: '📁', color: '#f97316' },
    { id: 4, text: 'James Wilson uploaded updated documentation', time: '1 day ago', icon: '📎', color: '#06b6d4' },
    { id: 5, text: 'Peer review deadline extended for Database Project', time: '1 day ago', icon: '⏰', color: '#ef4444' },
];

export default function Dashboard() {
    const { user, isTeacher } = useAuth();
    const stats = isTeacher ? teacherStats : studentStats;

    return (
        <div className="dashboard-page">
            {/* Welcome Section */}
            <div className="dashboard-welcome">
                <div className="welcome-content">
                    <h2>Welcome back, {user?.name || 'User'}! 👋</h2>
                    <p>{isTeacher ? 'Here\'s an overview of your courses and student progress.' : 'Here\'s your learning progress and upcoming tasks.'}</p>
                </div>
                <div className="welcome-date">
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
            </div>

            {/* Analytics Grid */}
            <div className="analytics-grid">
                {stats.map((stat, i) => (
                    <AnalyticsCard key={i} {...stat} />
                ))}
            </div>

            {/* Main Content */}
            <div className="dashboard-content">
                {/* Projects Section */}
                <div className="dashboard-section">
                    <div className="section-header">
                        <div>
                            <h3 className="section-title">{isTeacher ? 'Recent Projects' : 'My Projects'}</h3>
                            <p className="section-subtitle">{isTeacher ? 'Manage your course assignments' : 'Your current assignments'}</p>
                        </div>
                    </div>
                    <div className="projects-grid">
                        {recentProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} isTeacher={isTeacher} />
                        ))}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="dashboard-activity">
                    <div className="section-header">
                        <h3 className="section-title">Recent Activity</h3>
                    </div>
                    <div className="activity-feed card">
                        {recentActivity.map((item) => (
                            <div key={item.id} className="activity-item">
                                <div className="activity-icon" style={{ backgroundColor: item.color + '18', color: item.color }}>
                                    {item.icon}
                                </div>
                                <div className="activity-info">
                                    <p className="activity-text">{item.text}</p>
                                    <span className="activity-time">{item.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
