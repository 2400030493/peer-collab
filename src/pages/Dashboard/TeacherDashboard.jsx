import { useState } from 'react';
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

const courseProjects = [
    {
        id: 1,
        title: 'Database Design Project',
        description: 'Design a normalized relational database for an e-commerce platform.',
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
        description: 'Build a responsive analytics dashboard using React.js.',
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
        description: 'Analyze security vulnerabilities in REST APIs.',
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

const pendingSubmissions = [
    { id: 1, student: 'Priya Sharma', project: 'Database Design', submitted: '2 hours ago', status: 'Needs Review' },
    { id: 2, student: 'Tom Brown', project: 'React Dashboard', submitted: '4 hours ago', status: 'Needs Review' },
    { id: 3, student: 'Chen Wei', project: 'React Dashboard', submitted: '1 day ago', status: 'Needs Review' },
];

export default function TeacherDashboard() {
    const { user } = useAuth();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [assignmentForm, setAssignmentForm] = useState({ title: '', description: '', dueDate: '' });

    const handleCreateAssignment = (e) => {
        e.preventDefault();
        alert(`Assignment "${assignmentForm.title}" created successfully!`);
        setShowCreateModal(false);
        setAssignmentForm({ title: '', description: '', dueDate: '' });
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-welcome teacher-welcome">
                <div className="welcome-content">
                    <h2>Welcome, {user?.name || 'Teacher'}! 👋</h2>
                    <p>Here's an overview of your courses and student progress.</p>
                </div>
                <div className="welcome-date">
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
            </div>

            <div className="analytics-grid">
                {teacherStats.map((stat, i) => (
                    <AnalyticsCard key={i} {...stat} />
                ))}
            </div>

            {/* Teacher Controls */}
            <div className="teacher-controls">
                <button className="btn-teacher-action" onClick={() => setShowCreateModal(true)}>
                    ➕ Create Assignment
                </button>
                <button className="btn-teacher-action btn-secondary-action">
                    🔀 Assign Peer Reviews
                </button>
                <button className="btn-teacher-action btn-secondary-action">
                    👥 Manage Students
                </button>
            </div>

            {/* Create Assignment Modal */}
            {showCreateModal && (
                <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
                    <div className="modal card" onClick={(e) => e.stopPropagation()}>
                        <h3>Create New Assignment</h3>
                        <form onSubmit={handleCreateAssignment} className="modal-form">
                            <div className="form-group">
                                <label className="form-label">Title</label>
                                <input
                                    className="form-input"
                                    placeholder="Assignment title"
                                    value={assignmentForm.title}
                                    onChange={(e) => setAssignmentForm(p => ({ ...p, title: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-textarea"
                                    placeholder="Describe the assignment"
                                    value={assignmentForm.description}
                                    onChange={(e) => setAssignmentForm(p => ({ ...p, description: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Due Date</label>
                                <input
                                    className="form-input"
                                    type="date"
                                    value={assignmentForm.dueDate}
                                    onChange={(e) => setAssignmentForm(p => ({ ...p, dueDate: e.target.value }))}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setShowCreateModal(false)}>Cancel</button>
                                <button type="submit" className="btn-submit">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Pending Submissions */}
            <div className="dashboard-section">
                <div className="section-header">
                    <h3 className="section-title">📋 Review Submissions</h3>
                    <p className="section-subtitle">Pending student submissions that need grading</p>
                </div>
                <div className="submissions-table card">
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Project</th>
                                <th>Submitted</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingSubmissions.map((sub) => (
                                <tr key={sub.id}>
                                    <td className="td-student">{sub.student}</td>
                                    <td>{sub.project}</td>
                                    <td className="td-time">{sub.submitted}</td>
                                    <td><span className="badge badge-warning">{sub.status}</span></td>
                                    <td><button className="btn-review-sm">Review</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="dashboard-section">
                    <div className="section-header">
                        <div>
                            <h3 className="section-title">Course Projects</h3>
                            <p className="section-subtitle">Manage your course assignments</p>
                        </div>
                    </div>
                    <div className="projects-grid">
                        {courseProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} isTeacher={true} />
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
