import { useState } from 'react';
import './ReviewForm.css';

export default function ReviewForm({ projectTitle, studentName, onSubmit, onCancel }) {
    const [form, setForm] = useState({
        clarity: 5,
        completeness: 5,
        creativity: 5,
        feedback: '',
        strengths: '',
        improvements: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const errs = {};
        if (!form.feedback.trim()) errs.feedback = 'Feedback is required';
        if (form.feedback.trim().length > 0 && form.feedback.trim().length < 20)
            errs.feedback = 'Please provide at least 20 characters of feedback';
        if (!form.strengths.trim()) errs.strengths = 'Please mention at least one strength';
        return errs;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setErrors({});
        onSubmit?.(form);
    };

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };

    return (
        <form className="review-form card animate-fade-in-up" onSubmit={handleSubmit}>
            <div className="review-form-header">
                <h3>Peer Review</h3>
                {projectTitle && <p>Reviewing: <strong>{projectTitle}</strong></p>}
                {studentName && <p>Student: <strong>{studentName}</strong></p>}
            </div>

            <div className="review-ratings">
                {[
                    { key: 'clarity', label: 'Clarity', emoji: '💡' },
                    { key: 'completeness', label: 'Completeness', emoji: '✅' },
                    { key: 'creativity', label: 'Creativity', emoji: '🎨' },
                ].map(({ key, label, emoji }) => (
                    <div className="rating-item" key={key}>
                        <label className="rating-label">
                            <span>{emoji}</span> {label}
                        </label>
                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                <button
                                    key={n}
                                    type="button"
                                    className={`rating-dot ${n <= form[key] ? 'filled' : ''}`}
                                    onClick={() => handleChange(key, n)}
                                    aria-label={`${label}: ${n}`}
                                />
                            ))}
                            <span className="rating-value">{form[key]}/10</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="form-group">
                <label className="form-label">Strengths *</label>
                <textarea
                    className={`form-textarea ${errors.strengths ? 'error' : ''}`}
                    placeholder="What did the student do well?"
                    value={form.strengths}
                    onChange={(e) => handleChange('strengths', e.target.value)}
                    rows={3}
                />
                {errors.strengths && <span className="form-error">{errors.strengths}</span>}
            </div>

            <div className="form-group">
                <label className="form-label">Areas for Improvement</label>
                <textarea
                    className="form-textarea"
                    placeholder="What could be improved?"
                    value={form.improvements}
                    onChange={(e) => handleChange('improvements', e.target.value)}
                    rows={3}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Detailed Feedback *</label>
                <textarea
                    className={`form-textarea ${errors.feedback ? 'error' : ''}`}
                    placeholder="Provide detailed constructive feedback (min. 20 characters)..."
                    value={form.feedback}
                    onChange={(e) => handleChange('feedback', e.target.value)}
                    rows={4}
                />
                {errors.feedback && <span className="form-error">{errors.feedback}</span>}
            </div>

            <div className="review-form-actions">
                {onCancel && (
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                )}
                <button type="submit" className="btn btn-primary">
                    Submit Review
                </button>
            </div>
        </form>
    );
}
