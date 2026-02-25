import { useState, useRef } from 'react';
import './SubmissionUpload.css';

export default function SubmissionUpload({ projectTitle, onSubmit, onCancel }) {
    const [files, setFiles] = useState([]);
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleFiles = (newFiles) => {
        const fileArray = Array.from(newFiles);
        const valid = fileArray.filter((f) => f.size <= 10 * 1024 * 1024);
        if (valid.length < fileArray.length) {
            setErrors((prev) => ({ ...prev, files: 'Some files exceeded the 10MB limit' }));
        }
        setFiles((prev) => [...prev, ...valid]);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
        else if (e.type === 'dragleave') setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const removeFile = (index) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = {};
        if (files.length === 0) errs.files = 'Please upload at least one file';
        if (!comment.trim()) errs.comment = 'Please add a comment about your submission';
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        setErrors({});
        onSubmit?.({ files, comment });
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <form className="submission-form card animate-fade-in-up" onSubmit={handleSubmit}>
            <div className="submission-form-header">
                <h3>📤 Upload Submission</h3>
                {projectTitle && <p>Project: <strong>{projectTitle}</strong></p>}
            </div>

            {/* Drop Zone */}
            <div
                className={`drop-zone ${dragActive ? 'active' : ''} ${errors.files ? 'error' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={(e) => handleFiles(e.target.files)}
                    hidden
                />
                <div className="drop-zone-icon">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                </div>
                <p className="drop-zone-text">
                    <strong>Click to upload</strong> or drag and drop
                </p>
                <p className="drop-zone-hint">PDF, DOCX, ZIP, images up to 10MB</p>
            </div>
            {errors.files && <span className="form-error">{errors.files}</span>}

            {/* File list */}
            {files.length > 0 && (
                <div className="file-list">
                    {files.map((file, i) => (
                        <div className="file-item" key={i}>
                            <div className="file-item-info">
                                <span className="file-item-icon">📄</span>
                                <div>
                                    <p className="file-item-name">{file.name}</p>
                                    <p className="file-item-size">{formatSize(file.size)}</p>
                                </div>
                            </div>
                            <button type="button" className="file-remove-btn" onClick={() => removeFile(i)}>
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="form-group">
                <label className="form-label">Submission Notes *</label>
                <textarea
                    className={`form-textarea ${errors.comment ? 'error' : ''}`}
                    placeholder="Describe your submission, any challenges faced, or instructions for the reviewer..."
                    value={comment}
                    onChange={(e) => {
                        setComment(e.target.value);
                        if (errors.comment) setErrors((prev) => ({ ...prev, comment: '' }));
                    }}
                    rows={3}
                />
                {errors.comment && <span className="form-error">{errors.comment}</span>}
            </div>

            <div className="submission-form-actions">
                {onCancel && (
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                )}
                <button type="submit" className="btn btn-success">
                    📤 Submit Work
                </button>
            </div>
        </form>
    );
}
