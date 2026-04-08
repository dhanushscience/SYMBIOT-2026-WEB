import React, { useEffect, useRef } from 'react';

interface ScheduleEvent {
  time: string;
  title: string;
  icon: React.ReactNode;
  stage?: { number: number; label: string; color: string };
  day?: string;
}

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

const UserCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><polyline points="16 11 18 13 22 9"/></svg>
);

const EditIcon = () => (
   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
);

const MicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
);

const CoffeeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
);

const UtensilsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
);

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
);

const TerminalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
);

const LayersIcon = () => (
   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>
);

const scheduleData: ScheduleEvent[] = [
  { time: '8:30 AM', title: 'Check-In', icon: <UserCheckIcon />, day: 'Day 1' },
  { time: '9:30 AM', title: 'Registration Close', icon: <EditIcon /> },
  { time: '9:45 AM', title: 'Inauguration', icon: <MicIcon /> },
  { time: '11:00 AM', title: 'Hackathon Start', icon: <RocketIcon /> },
  { time: '1:00 PM – 2:00 PM', title: 'Lunch', icon: <UtensilsIcon /> },
  { time: '4:30 PM', title: 'Tea Break', icon: <CoffeeIcon /> },
  { time: '6:00 PM', title: 'Stage 1 Evaluation', icon: <CodeIcon />, stage: { number: 1, label: 'Ideation', color: '#00f0ff' } },
  { time: '8:30 PM', title: 'Dinner', icon: <UtensilsIcon /> },
  { time: '11:00 PM', title: 'Stage 2 Evaluation', icon: <TerminalIcon />, stage: { number: 2, label: 'Prototyping', color: '#f59e0b' } },
  { time: '5:30 AM', title: 'Tea Break', icon: <CoffeeIcon />, day: 'Day 2' },
  { time: '7:15 AM', title: 'Breakfast', icon: <UtensilsIcon /> },
  { time: '11:00 AM', title: 'Stage 3 Evaluation', icon: <LayersIcon />, stage: { number: 3, label: 'Final Design', color: '#a855f7' } },
  { time: '12:45 PM', title: 'Lunch', icon: <UtensilsIcon /> },
  { time: '2:00 PM', title: 'Valedictory', icon: <AwardIcon /> },
];

const EventSchedule: React.FC = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.timeline-event');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="schedule" className="section" ref={sectionRef} style={{ background: 'transparent' }}>
      <div className="section-header" style={{ marginBottom: '4rem' }}>
        <h2 className="section-title">
          Event <span className="text-gradient">Schedule</span>
        </h2>
        <p className="section-subtitle">
          Your 24-hour hackathon journey mapped out with clear milestones.
        </p>
      </div>

      <div className="modern-timeline">
        <div className="timeline-line-wrapper">
          <div className="timeline-line" ref={lineRef}></div>
        </div>

        {scheduleData.map((event, idx) => (
          <div key={idx} className={`timeline-event ${idx % 2 === 0 ? 'left-event' : 'right-event'}`}>
            <div className="timeline-dot-wrapper">
              <div className="timeline-dot" style={{ 
                borderColor: event.stage ? event.stage.color : 'var(--accent-cyan)',
                boxShadow: event.stage ? `0 0 15px ${event.stage.color}80` : '0 0 15px var(--glow-cyan)',
                color: event.stage ? event.stage.color : 'var(--accent-cyan)',
              }}>
                 {event.stage ? (
                   <span style={{ fontWeight: 'bold' }}>{event.stage.number}</span>
                 ) : (
                   event.icon
                 )}
              </div>
            </div>
            
            <div className="timeline-card glass-panel" style={{ 
                padding: '1.5rem 2rem', 
                position: 'relative', 
                overflow: 'hidden',
                borderColor: event.stage ? `${event.stage.color}40` : 'rgba(0, 240, 255, 0.15)'
              }}>
              {event.day && (
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(0, 240, 255, 0.1)', color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 800, padding: '0.2rem 0.8rem', borderBottomLeftRadius: '12px', letterSpacing: '1px' }}>
                  {event.day.toUpperCase()}
                </div>
              )}
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontSize: '0.9rem', fontWeight: 600 }}>
                <ClockIcon /> {event.time}
              </div>
              
              <h4 style={{ fontSize: '1.25rem', color: '#fff', margin: 0, fontFamily: "'Outfit', sans-serif" }}>{event.title}</h4>
              
              {event.stage && (
                <div style={{ marginTop: '0.8rem', display: 'inline-block', background: `${event.stage.color}15`, color: event.stage.color, padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, border: `1px solid ${event.stage.color}40` }}>
                  Stage {event.stage.number} — {event.stage.label}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventSchedule;
