import { Link } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-nav-logo">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#lg)" />
            <path d="M10 16L14 20L22 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#4f46e5" />
              </linearGradient>
            </defs>
          </svg>
          <span className="landing-logo-text">PeerCollab</span>
        </div>
        <div className="landing-nav-links">
          <Link to="/login" className="landing-link">Log In</Link>
          <Link to="/signup" className="landing-btn-primary">Sign Up Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="landing-hero">
        <div className="hero-content">
          <div className="hero-badge">🚀 Collaboration Made Simple</div>
          <h1 className="hero-title">
            Peer Review &amp;<br />
            <span className="hero-gradient-text">Collaboration Platform</span>
          </h1>
          <p className="hero-subtitle">
            Empower students to learn together through structured peer reviews,
            real-time collaboration, and meaningful feedback — all in one platform.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="landing-btn-primary landing-btn-lg">Get Started — It's Free</Link>
            <Link to="/login" className="landing-btn-outline landing-btn-lg">I Have an Account</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><span className="hero-stat-value">5,000+</span><span className="hero-stat-label">Students</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><span className="hero-stat-value">200+</span><span className="hero-stat-label">Institutions</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><span className="hero-stat-value">50K+</span><span className="hero-stat-label">Reviews Given</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card hero-card-1">
            <span className="hero-card-icon">📝</span>
            <div><h4>Peer Reviews</h4><p>Give & receive structured feedback</p></div>
          </div>
          <div className="hero-card hero-card-2" style={{ animationDelay: '0.15s' }}>
            <span className="hero-card-icon">💬</span>
            <div><h4>Real-time Chat</h4><p>Collaborate with your team instantly</p></div>
          </div>
          <div className="hero-card hero-card-3" style={{ animationDelay: '0.3s' }}>
            <span className="hero-card-icon">📊</span>
            <div><h4>Analytics</h4><p>Track progress & performance</p></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features">
        <h2 className="features-title">Everything You Need to Succeed</h2>
        <p className="features-subtitle">Built for students and teachers who value meaningful collaboration</p>
        <div className="features-grid">
          {[
            { icon: '📁', title: 'Project Management', desc: 'Create, assign, and track projects with deadlines and progress.' },
            { icon: '📝', title: 'Structured Reviews', desc: 'Rating criteria, strengths, improvements — all in a clear form.' },
            { icon: '📤', title: 'Easy Submissions', desc: 'Drag-and-drop uploads with submission notes and versioning.' },
            { icon: '💬', title: 'Team Collaboration', desc: 'Channels, real-time messaging, and shared documents.' },
            { icon: '👩‍🏫', title: 'Teacher Dashboard', desc: 'Monitor submissions, assign reviews, and analyze performance.' },
            { icon: '🔒', title: 'Role-based Access', desc: 'Separate experiences for students and teachers.' },
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <h2>Ready to Transform Your Classroom?</h2>
        <p>Join thousands of students and educators already using PeerCollab.</p>
        <Link to="/signup" className="landing-btn-primary landing-btn-lg">Create Your Free Account</Link>
      </section>

      <footer className="landing-footer">
        <p>© 2026 PeerCollab. Built for collaborative learning.</p>
      </footer>
    </div>
  );
}