import { useAuth } from '../../context/AuthContext';
import AnalyticsCard from '../../components/AnalyticsCard/AnalyticsCard';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './Dashboard.css';

const studentStats = [
    { title: 'My Projects', value: '5', icon: '📁', color: 'primary', trend: 0, subtitle: 'assigned to you' },
    { title: 'Completed', value: '3', icon: '✅', color: 'success', trend: 15, subtitle: 'submissions done' },
    { title: 'Peer Reviews', value: '7', icon: '📝', color: 'warning', trend: 10, subtitle: 'given & received' },
    { title: 'Avg. Grade', value: '91%', icon: '🏆', color: 'danger', trend: 4, subtitle: 'your average' },
];

const myProjects = [
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
        team: ['Maria Garcia', 'James Wilson', 'Priya Sharma'],
    },
    {
        id: 2,
        title: 'React Dashboard App',
        description: 'Build a responsive analytics dashboard using React.js with real-time data visualization.',
        status: 'active',
        dueDate: 'Mar 22, 2026',
        submissions: 15,
        progress: 40,
        icon: '⚛️',
        color: 'linear-gradient(135deg, #06b6d4, #0891b2)',
        team: ['Chen Wei', 'Sarah Kim'],
    },
    {
        id: 3,
        title: 'API Security Analysis',
        description: 'Analyze security vulnerabilities in REST APIs with proposed mitigation strategies.',
        status: 'pending',
        dueDate: 'Apr 1, 2026',
        submissions: 0,
        progress: 10,
        icon: '🔒',
        color: 'linear-gradient(135deg, #f97316, #ea580c)',
        team: ['Lisa Anderson'],
    },
];

const recentActivity = [
    { id: 1, text: 'You submitted Database Design Project', time: '2 hours ago', icon: '📤', color: '#22c55e' },
    { id: 2, text: 'Maria Garcia completed peer review for your submission', time: '3 hours ago', icon: '📝', color: '#6366f1' },
    { id: 3, text: 'New assignment "API Security Analysis" received', time: '5 hours ago', icon: '📁', color: '#f97316' },
    { id: 4, text: 'Peer review deadline extended for Database Project', time: '1 day ago', icon: '⏰', color: '#ef4444' },
];

export default function StudentDashboard() {
    const { user } = useAuth();

    return (
        <div className="dashboard-page">
            <div className="dashboard-welcome">
                <div className="welcome-content">
                    <h2>Welcome, {user?.name || 'Student'}! 👋</h2>
                    <p>Here's your learning progress and upcoming tasks.</p>
                </div>
                <div className="welcome-date">
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
            </div>

            <div className="analytics-grid">
                {studentStats.map((stat, i) => (
                    <AnalyticsCard key={i} {...stat} />
                ))}
            </div>

            <div className="dashboard-content">
                <div className="dashboard-section">
                    <div className="section-header">
                        <div>
                            <h3 className="section-title">My Projects</h3>
                            <p className="section-subtitle">Your current assignments</p>
                        </div>
                    </div>
                    <div className="projects-grid">
                        {myProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} isTeacher={false} />
                        ))}
                    </div>
                </div>

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
