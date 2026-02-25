import { useAuth } from '../../context/AuthContext';
import ChatSection from '../../components/ChatSection/ChatSection';
import './Collaboration.css';

const channels = [
    { id: 1, name: 'Database Design Project', members: 4, unread: 3, lastMsg: 'Alex: Can we meet at 3PM?' },
    { id: 2, name: 'React Dashboard App', members: 3, unread: 0, lastMsg: 'Sarah: I pushed the new components.' },
    { id: 3, name: 'API Security Analysis', members: 2, unread: 1, lastMsg: 'Lisa: Found a new vulnerability.' },
    { id: 4, name: 'General Discussion', members: 12, unread: 5, lastMsg: 'Prof. Mitchell: Reminder about deadlines' },
];

const sharedDocs = [
    { id: 1, name: 'ER Diagram v2.pdf', uploadedBy: 'Maria Garcia', date: 'Mar 10', size: '2.4 MB', icon: '📄' },
    { id: 2, name: 'API_Endpoints.xlsx', uploadedBy: 'James Wilson', date: 'Mar 11', size: '180 KB', icon: '📊' },
    { id: 3, name: 'Project_Notes.docx', uploadedBy: 'Alex Johnson', date: 'Mar 12', size: '95 KB', icon: '📝' },
    { id: 4, name: 'Security_Report.pdf', uploadedBy: 'Lisa Anderson', date: 'Mar 13', size: '1.1 MB', icon: '🔒' },
];

export default function Collaboration() {
    const { isTeacher } = useAuth();

    return (
        <div className="collaboration-page">
            <div className="section-header">
                <div>
                    <h2 className="section-title">Collaboration Hub</h2>
                    <p className="section-subtitle">
                        {isTeacher ? 'Monitor team discussions and shared resources' : 'Connect with peers and share resources'}
                    </p>
                </div>
            </div>

            <div className="collab-layout">
                {/* Left: Chat + Channels */}
                <div className="collab-main">
                    <ChatSection channelName="Database Design Project" />
                </div>

                {/* Right: Channels + Docs */}
                <div className="collab-sidebar">
                    {/* Channels */}
                    <div className="collab-section card">
                        <h3 className="collab-section-title">💬 Channels</h3>
                        <div className="channel-list">
                            {channels.map((ch) => (
                                <div key={ch.id} className="channel-item">
                                    <div className="channel-info">
                                        <h4># {ch.name}</h4>
                                        <p>{ch.lastMsg}</p>
                                    </div>
                                    {ch.unread > 0 && (
                                        <span className="channel-unread">{ch.unread}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shared Documents */}
                    <div className="collab-section card">
                        <h3 className="collab-section-title">📎 Shared Documents</h3>
                        <div className="shared-docs-list">
                            {sharedDocs.map((doc) => (
                                <div key={doc.id} className="doc-item">
                                    <span className="doc-icon">{doc.icon}</span>
                                    <div className="doc-info">
                                        <h4>{doc.name}</h4>
                                        <p>{doc.uploadedBy} • {doc.date} • {doc.size}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
