import './ProjectCard.css';

export default function ProjectCard({ project, onView, isTeacher }) {
    const statusColors = {
        active: 'badge-success',
        pending: 'badge-warning',
        completed: 'badge-primary',
        overdue: 'badge-danger',
    };

    return (
        <div className="project-card animate-fade-in-up">
            <div className="project-card-header">
                <div className="project-card-icon" style={{ background: project.color || 'linear-gradient(135deg, #6366f1, #4f46e5)' }}>
                    {project.icon || '📁'}
                </div>
                <span className={`badge ${statusColors[project.status] || 'badge-neutral'}`}>
                    {project.status}
                </span>
            </div>

            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-desc">{project.description}</p>

            <div className="project-card-meta">
                {project.dueDate && (
                    <div className="project-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        <span>{project.dueDate}</span>
                    </div>
                )}
                {project.submissions !== undefined && (
                    <div className="project-meta-item">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <span>{project.submissions} submissions</span>
                    </div>
                )}
            </div>

            {project.progress !== undefined && (
                <div className="project-card-progress">
                    <div className="progress-info">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${project.progress}%` }} />
                    </div>
                </div>
            )}

            <div className="project-card-footer">
                {project.team && (
                    <div className="project-card-team">
                        {project.team.slice(0, 3).map((member, i) => (
                            <div
                                key={i}
                                className="avatar avatar-sm"
                                style={{
                                    background: `hsl(${(i * 90 + 200) % 360}, 60%, 55%)`,
                                    marginLeft: i > 0 ? '-8px' : '0',
                                    zIndex: 3 - i,
                                    border: '2px solid white',
                                }}
                                title={member}
                            >
                                {member.split(' ').map(n => n[0]).join('')}
                            </div>
                        ))}
                        {project.team.length > 3 && (
                            <span className="team-extra">+{project.team.length - 3}</span>
                        )}
                    </div>
                )}
                <button className="btn btn-primary btn-sm" onClick={() => onView?.(project)}>
                    {isTeacher ? 'Manage' : 'View'}
                </button>
            </div>
        </div>
    );
}
