import './AnalyticsCard.css';

export default function AnalyticsCard({ title, value, subtitle, icon, trend, color = 'primary' }) {
    const colorMap = {
        primary: { bg: 'linear-gradient(135deg, #eef2ff, #e0e7ff)', icon: '#6366f1', border: '#c7d2fe' },
        success: { bg: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', icon: '#22c55e', border: '#bbf7d0' },
        warning: { bg: 'linear-gradient(135deg, #fff7ed, #ffedd5)', icon: '#f97316', border: '#fed7aa' },
        danger: { bg: 'linear-gradient(135deg, #fef2f2, #fee2e2)', icon: '#ef4444', border: '#fecaca' },
    };

    const c = colorMap[color] || colorMap.primary;

    return (
        <div className="analytics-card animate-fade-in-up">
            <div className="analytics-card-top">
                <div>
                    <p className="analytics-card-title">{title}</p>
                    <h2 className="analytics-card-value">{value}</h2>
                </div>
                <div className="analytics-card-icon" style={{ background: c.bg, borderColor: c.border }}>
                    <span style={{ color: c.icon }}>{icon}</span>
                </div>
            </div>
            {(subtitle || trend) && (
                <div className="analytics-card-bottom">
                    {trend && (
                        <span className={`analytics-trend ${trend > 0 ? 'up' : 'down'}`}>
                            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
                        </span>
                    )}
                    {subtitle && <span className="analytics-subtitle">{subtitle}</span>}
                </div>
            )}
        </div>
    );
}
