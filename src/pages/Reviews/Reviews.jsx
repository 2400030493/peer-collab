import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import './Reviews.css';

const reviewData = {
    teacher: [
        {
            id: 1, student: 'Alex Johnson', project: 'Database Design Project', status: 'reviewed',
            score: 88, submittedAt: 'Mar 10, 2026', reviewedBy: 'Maria Garcia',
            feedback: 'Excellent ER diagram with proper normalization.',
        },
        {
            id: 2, student: 'Maria Garcia', project: 'React Dashboard App', status: 'pending',
            score: null, submittedAt: 'Mar 12, 2026', reviewedBy: null,
            feedback: null,
        },
        {
            id: 3, student: 'James Wilson', project: 'Database Design Project', status: 'reviewed',
            score: 75, submittedAt: 'Mar 9, 2026', reviewedBy: 'Alex Johnson',
            feedback: 'Good structure but missing some edge cases.',
        },
        {
            id: 4, student: 'Priya Sharma', project: 'API Security Analysis', status: 'pending',
            score: null, submittedAt: 'Mar 14, 2026', reviewedBy: null,
            feedback: null,
        },
        {
            id: 5, student: 'Chen Wei', project: 'Machine Learning Report', status: 'reviewed',
            score: 92, submittedAt: 'Feb 25, 2026', reviewedBy: 'Tom Brown',
            feedback: 'Outstanding research and analysis.',
        },
    ],
    student: [
        {
            id: 1, reviewer: 'Maria Garcia', project: 'Database Design Project', type: 'received',
            score: 88, date: 'Mar 11, 2026',
            comment: 'Great work on the ER diagram! The relationships are well-defined.',
        },
        {
            id: 2, reviewer: 'You → James Wilson', project: 'Database Design Project', type: 'given',
            score: 82, date: 'Mar 10, 2026',
            comment: 'You gave constructive feedback on schema design.',
        },
        {
            id: 3, reviewer: 'Pending', project: 'React Dashboard App', type: 'awaiting',
            score: null, date: 'Mar 22, 2026',
            comment: 'Waiting for peer review assignment.',
        },
    ],
};

const peerReviewAssignments = [
    { id: 1, student: 'James Wilson', project: 'React Dashboard App', deadline: 'Mar 25, 2026' },
    { id: 2, student: 'Priya Sharma', project: 'Database Design Project', deadline: 'Mar 20, 2026' },
];

export default function Reviews() {
    const { isTeacher } = useAuth();
    const [showReviewForm, setShowReviewForm] = useState(null);
    const [tab, setTab] = useState(isTeacher ? 'all' : 'received');
    const [showAssign, setShowAssign] = useState(false);

    const reviews = isTeacher ? reviewData.teacher : reviewData.student;
    const filteredReviews = tab === 'all' ? reviews
        : isTeacher ? reviews.filter(r => r.status === tab)
            : reviews.filter(r => r.type === tab);

    return (
        <div className="reviews-page">
            <div className="section-header">
                <div>
                    <h2 className="section-title">{isTeacher ? 'Review Management' : 'Peer Reviews'}</h2>
                    <p className="section-subtitle">
                        {isTeacher ? 'Monitor and assign peer reviews' : 'View received and given reviews'}
                    </p>
                </div>
                {isTeacher && (
                    <button className="btn btn-primary" onClick={() => setShowAssign(true)}>
                        🔀 Assign Peer Reviews
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="filter-tabs">
                {isTeacher ? (
                    <>
                        <button className={`filter-tab ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')}>All Reviews</button>
                        <button className={`filter-tab ${tab === 'reviewed' ? 'active' : ''}`} onClick={() => setTab('reviewed')}>Completed</button>
                        <button className={`filter-tab ${tab === 'pending' ? 'active' : ''}`} onClick={() => setTab('pending')}>Pending</button>
                    </>
                ) : (
                    <>
                        <button className={`filter-tab ${tab === 'received' ? 'active' : ''}`} onClick={() => setTab('received')}>Received</button>
                        <button className={`filter-tab ${tab === 'given' ? 'active' : ''}`} onClick={() => setTab('given')}>Given</button>
                        <button className={`filter-tab ${tab === 'awaiting' ? 'active' : ''}`} onClick={() => setTab('awaiting')}>To Review</button>
                    </>
                )}
            </div>

            {/* Reviews List */}
            <div className="reviews-list">
                {filteredReviews.map((review) => (
                    <div key={review.id} className="review-item card animate-fade-in-up">
                        <div className="review-item-header">
                            <div className="review-item-info">
                                <h4>{review.project}</h4>
                                <p>{isTeacher ? `Student: ${review.student}` : `${review.type === 'received' ? 'From' : 'To'}: ${review.reviewer}`}</p>
                            </div>
                            <div className="review-item-status">
                                {(review.score !== null && review.score !== undefined) ? (
                                    <div className="review-score">
                                        <span className="score-value">{review.score}</span>
                                        <span className="score-label">/100</span>
                                    </div>
                                ) : (
                                    <span className="badge badge-warning">Pending</span>
                                )}
                            </div>
                        </div>
                        {(review.feedback || review.comment) && (
                            <p className="review-item-feedback">
                                "{review.feedback || review.comment}"
                            </p>
                        )}
                        <div className="review-item-footer">
                            <span className="review-date">
                                📅 {review.submittedAt || review.date}
                            </span>
                            {!isTeacher && review.type === 'awaiting' && (
                                <button className="btn btn-primary btn-sm" onClick={() => setShowReviewForm(review)}>
                                    ✍️ Write Review
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Student: to-review assignments */}
            {!isTeacher && tab === 'awaiting' && peerReviewAssignments.length > 0 && (
                <div className="pending-assignments">
                    <h3>📋 Assigned Peer Reviews</h3>
                    <div className="assignment-list">
                        {peerReviewAssignments.map((a) => (
                            <div key={a.id} className="assignment-item card">
                                <div>
                                    <h4>{a.project}</h4>
                                    <p>Student: {a.student} • Due: {a.deadline}</p>
                                </div>
                                <button className="btn btn-primary btn-sm" onClick={() => setShowReviewForm(a)}>
                                    Start Review
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Review Form Modal */}
            {showReviewForm && (
                <div className="modal-overlay" onClick={() => setShowReviewForm(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <ReviewForm
                            projectTitle={showReviewForm.project}
                            studentName={showReviewForm.student}
                            onSubmit={() => setShowReviewForm(null)}
                            onCancel={() => setShowReviewForm(null)}
                        />
                    </div>
                </div>
            )}

            {/* Teacher: Assign Modal */}
            {showAssign && (
                <div className="modal-overlay" onClick={() => setShowAssign(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="card assign-modal">
                            <h3>🔀 Assign Peer Reviews</h3>
                            <p className="assign-desc">Select a project and review assignment method.</p>
                            <div className="form-group">
                                <label className="form-label">Project</label>
                                <select className="form-select">
                                    <option>Database Design Project</option>
                                    <option>React Dashboard App</option>
                                    <option>API Security Analysis</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Assignment Method</label>
                                <select className="form-select">
                                    <option>Random Pairing</option>
                                    <option>Round Robin</option>
                                    <option>Manual Assignment</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Reviews per Student</label>
                                <input type="number" className="form-input" defaultValue={2} min={1} max={5} />
                            </div>
                            <div className="review-form-actions">
                                <button className="btn btn-secondary" onClick={() => setShowAssign(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={() => setShowAssign(false)}>Assign Reviews</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
