import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './ChatSection.css';

const INITIAL_MESSAGES = [
    { id: 1, user: 'Alex Johnson', avatar: 'AJ', color: '#6366f1', text: 'Hey everyone! Has anyone started on the database schema for the project?', time: '10:30 AM', isOwn: false },
    { id: 2, user: 'Maria Garcia', avatar: 'MG', color: '#ec4899', text: 'Yes! I drafted an ER diagram last night. I\'ll share it in the group docs.', time: '10:32 AM', isOwn: false },
    { id: 3, user: 'James Wilson', avatar: 'JW', color: '#f97316', text: 'Great! Let me know if you need help with normalization. I just finished the textbook chapter on that 📚', time: '10:35 AM', isOwn: false },
    { id: 4, user: 'Alex Johnson', avatar: 'AJ', color: '#6366f1', text: 'That would be awesome! Can we meet at 3PM today to discuss the approach?', time: '10:38 AM', isOwn: false },
];

export default function ChatSection({ channelName = 'Project Discussion' }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const msg = {
            id: Date.now(),
            user: user.name,
            avatar: user.avatar,
            color: user.role === 'teacher' ? '#f97316' : '#6366f1',
            text: newMessage.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: true,
        };

        setMessages((prev) => [...prev, msg]);
        setNewMessage('');
    };

    return (
        <div className="chat-section">
            <div className="chat-header">
                <div className="chat-header-info">
                    <h3>💬 {channelName}</h3>
                    <span className="chat-member-count">4 members online</span>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`chat-message ${msg.isOwn ? 'own' : ''}`}>
                        {!msg.isOwn && (
                            <div className="avatar avatar-sm" style={{ background: msg.color }}>
                                {msg.avatar}
                            </div>
                        )}
                        <div className="chat-bubble">
                            {!msg.isOwn && <span className="chat-sender">{msg.user}</span>}
                            <p className="chat-text">{msg.text}</p>
                            <span className="chat-time">{msg.time}</span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-bar" onSubmit={handleSend}>
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="btn btn-primary btn-sm chat-send-btn" disabled={!newMessage.trim()}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </form>
        </div>
    );
}
