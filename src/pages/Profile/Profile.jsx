import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

export default function Profile() {
    const { user, isTeacher } = useAuth();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({
        name: user.name,
        email: user.email,
        department: user.department || '',
        bio: isTeacher ? 'Associate Professor of Computer Science with 12 years of experience in software engineering and database systems.' : 'Computer Science junior passionate about web development and machine learning.',
        phone: '+1 (555) 123-4567',
    });

    const handleSave = () => {
        setEditing(false);
    };

    const skills = isTeacher
        ? ['Database Systems', 'Software Engineering', 'Cloud Computing', 'Agile Methodology', 'Machine Learning']
        : ['React.js', 'Python', 'SQL', 'Node.js', 'Git', 'REST APIs'];

    const achievements = isTeacher
        ? [
            { icon: '🏆', title: 'Outstanding Educator', desc: 'Awarded 2025' },
            { icon: '📚', title: '15 Publications', desc: 'IEEE & ACM journals' },
            { icon: '👥', title: '500+ Students', desc: 'Mentored to date' },
        ]
        : [
            { icon: '⭐', title: 'Top Reviewer', desc: 'Best peer feedback Q1 2026' },
            { icon: '🎯', title: '100% On Time', desc: 'All submissions on time' },
            { icon: '🏅', title: 'Dean\'s List', desc: 'Fall 2025 semester' },
        ];

    return (
        <div className="profile-page">
            <div className="section-header">
                <div>
                    <h2 className="section-title">Profile</h2>
                    <p className="section-subtitle">Manage your personal information</p>
                </div>
                <button className="btn btn-primary" onClick={() => editing ? handleSave() : setEditing(true)}>
                    {editing ? '💾 Save Changes' : '✏️ Edit Profile'}
                </button>
            </div>

            <div className="profile-layout">
                {/* Profile Card */}
                <div className="profile-card card">
                    <div className="profile-card-header">
                        <div
                            className="profile-avatar"
                            style={{
                                background: isTeacher
                                    ? 'linear-gradient(135deg, #f97316, #ea580c)'
                                    : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                            }}
                        >
                            {user.avatar}
                        </div>
                        <h3>{user.name}</h3>
                        <span className={`badge ${isTeacher ? 'badge-warning' : 'badge-primary'}`}>
                            {isTeacher ? '👩‍🏫 Teacher' : '🎓 Student'}
                        </span>
                        <p className="profile-dept">{user.department}</p>
                    </div>

                    {/* Skills */}
                    <div className="profile-skills">
                        <h4>Skills & Expertise</h4>
                        <div className="skills-list">
                            {skills.map((skill, i) => (
                                <span key={i} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Achievements */}
                    <div className="profile-achievements">
                        <h4>Achievements</h4>
                        <div className="achievements-list">
                            {achievements.map((a, i) => (
                                <div key={i} className="achievement-item">
                                    <span className="achievement-icon">{a.icon}</span>
                                    <div>
                                        <p className="achievement-title">{a.title}</p>
                                        <p className="achievement-desc">{a.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Details Form */}
                <div className="profile-details card">
                    <h3>Personal Information</h3>
                    <div className="profile-form">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                className="form-input"
                                value={form.name}
                                disabled={!editing}
                                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input className="form-input" value={form.email} disabled={!editing}
                                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Department</label>
                                <input className="form-input" value={form.department} disabled={!editing}
                                    onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input className="form-input" value={form.phone} disabled={!editing}
                                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Bio</label>
                            <textarea
                                className="form-textarea"
                                rows={4}
                                value={form.bio}
                                disabled={!editing}
                                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="profile-stats">
                        <div className="profile-stat">
                            <span className="stat-value">{isTeacher ? '8' : '5'}</span>
                            <span className="stat-label">Projects</span>
                        </div>
                        <div className="profile-stat">
                            <span className="stat-value">{isTeacher ? '142' : '7'}</span>
                            <span className="stat-label">{isTeacher ? 'Students' : 'Reviews'}</span>
                        </div>
                        <div className="profile-stat">
                            <span className="stat-value">{isTeacher ? '24' : '91%'}</span>
                            <span className="stat-label">{isTeacher ? 'Reviews' : 'Avg Grade'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
