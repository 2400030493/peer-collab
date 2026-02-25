import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import SubmissionUpload from '../../components/SubmissionUpload/SubmissionUpload';
import './Projects.css';

const allProjects = [
    {
        id: 1, title: 'Database Design Project', description: 'Design a normalized relational database for an e-commerce platform.',
        status: 'active', dueDate: 'Mar 15, 2026', submissions: 28, progress: 65, icon: '🗄️',
        color: 'linear-gradient(135deg, #6366f1, #4f46e5)', team: ['Alex Johnson', 'Maria Garcia', 'James Wilson', 'Priya Sharma'],
    },
    {
        id: 2, title: 'React Dashboard App', description: 'Build a responsive analytics dashboard using React.js.',
        status: 'active', dueDate: 'Mar 22, 2026', submissions: 15, progress: 40, icon: '⚛️',
        color: 'linear-gradient(135deg, #06b6d4, #0891b2)', team: ['Chen Wei', 'Sarah Kim', 'Tom Brown'],
    },
    {
        id: 3, title: 'API Security Analysis', description: 'Analyze security vulnerabilities in REST APIs.',
        status: 'pending', dueDate: 'Apr 1, 2026', submissions: 0, progress: 10, icon: '🔒',
        color: 'linear-gradient(135deg, #f97316, #ea580c)', team: ['Lisa Anderson', 'Mike Zhang'],
    },
    {
        id: 4, title: 'Machine Learning Report', description: 'Write a comprehensive report on supervised learning algorithms.',
        status: 'completed', dueDate: 'Feb 28, 2026', submissions: 35, progress: 100, icon: '🤖',
        color: 'linear-gradient(135deg, #22c55e, #16a34a)', team: ['Alex Johnson', 'Priya Sharma', 'Chen Wei'],
    },
    {
        id: 5, title: 'Mobile App Prototype', description: 'Design and prototype a mobile app using Figma and React Native.',
        status: 'active', dueDate: 'Mar 30, 2026', submissions: 12, progress: 55, icon: '📱',
        color: 'linear-gradient(135deg, #ec4899, #db2777)', team: ['Sarah Kim', 'James Wilson'],
    },
    {
        id: 6, title: 'Cloud Deployment Lab', description: 'Deploy a full-stack application to AWS with CI/CD pipeline.',
        status: 'overdue', dueDate: 'Feb 20, 2026', submissions: 8, progress: 30, icon: '☁️',
        color: 'linear-gradient(135deg, #ef4444, #dc2626)', team: ['Tom Brown', 'Lisa Anderson', 'Mike Zhang'],
    },
];

export default function Projects() {
    const { isTeacher } = useAuth();
    const [filter, setFilter] = useState('all');
    const [showUpload, setShowUpload] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [createForm, setCreateForm] = useState({ title: '', description: '', dueDate: '', maxTeamSize: '' });
    const [createErrors, setCreateErrors] = useState({});

    const filtered = filter === 'all' ? allProjects : allProjects.filter((p) => p.status === filter);

    const statuses = ['all', 'active', 'pending', 'completed', 'overdue'];

    const handleProjectView = (project) => {
        if (!isTeacher) {
            setShowUpload(project);
        }
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        const errs = {};
        if (!createForm.title.trim()) errs.title = 'Title is required';
        if (!createForm.description.trim()) errs.description = 'Description is required';
        if (!createForm.dueDate) errs.dueDate = 'Due date is required';
        if (Object.keys(errs).length > 0) {
            setCreateErrors(errs);
            return;
        }
        setCreateErrors({});
        setShowCreate(false);
        setCreateForm({ title: '', description: '', dueDate: '', maxTeamSize: '' });
    };

    return (
        <div className="projects-page">
            <div className="section-header">
                <div>
                    <h2 className="section-title">{isTeacher ? 'All Projects' : 'My Projects'}</h2>
                    <p className="section-subtitle">{isTeacher ? 'Manage assignments and track submissions' : 'View and submit your work'}</p>
                </div>
                {isTeacher && (
                    <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
                        + Create Assignment
                    </button>
                )}
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs">
                {statuses.map((s) => (
                    <button key={s} className={`filter-tab ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                        <span className="filter-count">{s === 'all' ? allProjects.length : allProjects.filter(p => p.status === s).length}</span>
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <div className="projects-grid-page">
                {filtered.map((project) => (
                    <ProjectCard key={project.id} project={project} isTeacher={isTeacher} onView={handleProjectView} />
                ))}
            </div>

            {/* Student Upload Modal */}
            {showUpload && (
                <div className="modal-overlay" onClick={() => setShowUpload(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <SubmissionUpload
                            projectTitle={showUpload.title}
                            onSubmit={() => setShowUpload(null)}
                            onCancel={() => setShowUpload(null)}
                        />
                    </div>
                </div>
            )}

            {/* Teacher Create Modal */}
            {showCreate && (
                <div className="modal-overlay" onClick={() => setShowCreate(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <form className="create-assignment-form card" onSubmit={handleCreateSubmit}>
                            <h3>📋 Create New Assignment</h3>
                            <div className="form-group">
                                <label className="form-label">Project Title *</label>
                                <input
                                    className={`form-input ${createErrors.title ? 'error' : ''}`}
                                    placeholder="Enter project title"
                                    value={createForm.title}
                                    onChange={(e) => { setCreateForm(f => ({ ...f, title: e.target.value })); setCreateErrors(er => ({ ...er, title: '' })); }}
                                />
                                {createErrors.title && <span className="form-error">{createErrors.title}</span>}
                            </div>
                            <div className="form-group">
                                <label className="form-label">Description *</label>
                                <textarea
                                    className={`form-textarea ${createErrors.description ? 'error' : ''}`}
                                    placeholder="Describe the assignment..."
                                    value={createForm.description}
                                    onChange={(e) => { setCreateForm(f => ({ ...f, description: e.target.value })); setCreateErrors(er => ({ ...er, description: '' })); }}
                                    rows={4}
                                />
                                {createErrors.description && <span className="form-error">{createErrors.description}</span>}
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label className="form-label">Due Date *</label>
                                    <input
                                        type="date"
                                        className={`form-input ${createErrors.dueDate ? 'error' : ''}`}
                                        value={createForm.dueDate}
                                        onChange={(e) => { setCreateForm(f => ({ ...f, dueDate: e.target.value })); setCreateErrors(er => ({ ...er, dueDate: '' })); }}
                                    />
                                    {createErrors.dueDate && <span className="form-error">{createErrors.dueDate}</span>}
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Max Team Size</label>
                                    <input
                                        type="number"
                                        className="form-input"
                                        placeholder="e.g. 4"
                                        min="1" max="10"
                                        value={createForm.maxTeamSize}
                                        onChange={(e) => setCreateForm(f => ({ ...f, maxTeamSize: e.target.value }))}
                                    />
                                </div>
                            </div>
                            <div className="review-form-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Create Assignment</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
