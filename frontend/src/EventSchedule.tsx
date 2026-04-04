import React, { useEffect, useRef } from 'react';

interface ScheduleEvent {
  time: string;
  title: string;
  icon: string;
  stage?: { number: number; label: string; color: string };
}

const scheduleData: ScheduleEvent[] = [
  { time: '8:30 AM', title: 'Check-In', icon: '🟢' },
  { time: '9:30 AM', title: 'Registration Close', icon: '📝' },
  { time: '9:45 AM', title: 'Inauguration', icon: '🎤' },
  { time: '11:00 AM', title: 'Hackathon Start', icon: '🚀' },
  { time: '1:00 PM – 2:00 PM', title: 'Lunch', icon: '🍽️' },
  { time: '4:30 PM', title: 'Tea Break', icon: '☕' },
  { time: '6:00 PM', title: 'Stage 2 Evaluation', icon: '2', stage: { number: 2, label: 'Prototyping', color: '#f59e0b' } },
  { time: '8:30 PM', title: 'Dinner', icon: '🍽️' },
  { time: '11:00 PM', title: 'Stage 1 Evaluation', icon: '1', stage: { number: 1, label: 'Ideation', color: '#00f0ff' } },
  { time: '5:30 AM', title: 'Tea Break', icon: '☕' },
  { time: '7:15 AM', title: 'Breakfast', icon: '🍽️' },
  { time: '11:00 AM', title: 'Stage 3 Evaluation', icon: '3', stage: { number: 3, label: 'Final Design', color: '#a855f7' } },
  { time: '12:45 PM', title: 'Lunch', icon: '🍽️' },
  { time: '2:00 PM', title: 'Valedictory', icon: '🏁' },
];

const EventSchedule: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.schedule-node');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('schedule-node-visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  // Animate the road path on scroll
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      const start = rect.top - windowH;
      const end = rect.bottom;
      const total = end - start;
      const current = -start;
      const progress = Math.min(Math.max(current / total, 0), 1);
      path.style.strokeDashoffset = `${length * (1 - progress)}`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="schedule" className="section schedule-section" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">
          Event <span className="text-gradient">Schedule</span>
        </h2>
        <p className="section-subtitle">
          Your 24-hour hackathon journey, mapped out.
        </p>
      </div>

      <div className="schedule-roadmap">
        {/* SVG Road Path — Desktop */}
        <svg className="schedule-road-svg" viewBox="0 0 200 1400" fill="none" preserveAspectRatio="none" aria-hidden="true">
          {/* Road background */}
          <path
            d="M100 0 C100 50, 160 80, 160 140 S60 230, 60 300 S160 380, 160 440 S60 530, 60 600 S160 680, 160 740 S60 830, 60 900 S160 980, 160 1040 S60 1130, 60 1200 S160 1280, 160 1340 S100 1400, 100 1400"
            stroke="rgba(30, 40, 70, 0.6)"
            strokeWidth="28"
            strokeLinecap="round"
            fill="none"
          />
          {/* Road dashed center line */}
          <path
            d="M100 0 C100 50, 160 80, 160 140 S60 230, 60 300 S160 380, 160 440 S60 530, 60 600 S160 680, 160 740 S60 830, 60 900 S160 980, 160 1040 S60 1130, 60 1200 S160 1280, 160 1340 S100 1400, 100 1400"
            stroke="rgba(100, 120, 160, 0.35)"
            strokeWidth="2"
            strokeDasharray="12 8"
            fill="none"
          />
          {/* Animated glow path */}
          <path
            ref={pathRef}
            d="M100 0 C100 50, 160 80, 160 140 S60 230, 60 300 S160 380, 160 440 S60 530, 60 600 S160 680, 160 740 S60 830, 60 900 S160 980, 160 1040 S60 1130, 60 1200 S160 1280, 160 1340 S100 1400, 100 1400"
            stroke="url(#roadGlow)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            className="schedule-road-glow-path"
          />
          <defs>
            <linearGradient id="roadGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="50%" stopColor="#1a56db" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Mobile: vertical line */}
        <div className="schedule-mobile-line" aria-hidden="true">
          <div className="schedule-mobile-line-glow"></div>
        </div>

        {/* Event nodes */}
        {scheduleData.map((event, idx) => (
          <div
            key={idx}
            className={`schedule-node ${idx % 2 === 0 ? 'schedule-node-left' : 'schedule-node-right'}`}
          >
            <div className="schedule-node-connector"></div>
            <div className="schedule-node-card">
              <div className="schedule-node-icon-wrapper">
                {event.stage ? (
                  <div className="schedule-stage-badge" style={{ background: event.stage.color, boxShadow: `0 0 16px ${event.stage.color}55` }}>
                    {event.stage.number}
                  </div>
                ) : (
                  <span className="schedule-node-icon">{event.icon}</span>
                )}
              </div>
              <div className="schedule-node-content">
                <span className="schedule-node-time">{event.time}</span>
                <h4 className="schedule-node-title">{event.title}</h4>
                {event.stage && (
                  <span className="schedule-stage-label" style={{ color: event.stage.color }}>
                    Stage {event.stage.number} — {event.stage.label}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventSchedule;
