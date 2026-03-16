import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import CircuitBackground from './CircuitBackground';
import ProblemStatements from './ProblemStatements';

const SectionDivider: React.FC = () => (
  <div className="section-divider">
    <div className="node left"></div>
    <div className="trace-line">
      <div className="pulse"></div>
    </div>
    <div className="node center"></div>
    <div className="trace-line">
      <div className="pulse" style={{ animationDelay: '1.5s' }}></div>
    </div>
    <div className="node right"></div>
  </div>
);



// --- Interactive Trophy Components ---
const TrophyCard: React.FC<{
  domain: string;
  icon: React.ReactNode;
  onClick: () => void;
}> = ({ domain, icon, onClick }) => {
  return (
    <div 
      className="trophy-item"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="trophy-visual gold-glow">
        {icon}
      </div>
      <h3 className="trophy-label">{domain}</h3>
      <div className="click-hint">Click for details</div>
    </div>
  );
};

// --- Trophy Modal Component ---
const TrophyModal: React.FC<{
  domain: string | null;
  onClose: () => void;
}> = ({ domain, onClose }) => {
  if (!domain) return null;

  return (
    <div className="trophy-modal-overlay" onClick={onClose}>
      <div className="trophy-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="trophy-modal-close" onClick={onClose}>✕</button>
        <h2 className="trophy-modal-title">{domain} Winner</h2>
        <div className="trophy-modal-content">
          <div className="prize-tier">
            <h4>1st Prize <span className="prize-amt">₹15K</span></h4>
            <ul>
              <li><span className="detail-bullet"></span>₹15,000 Cash Prize</li>
              <li><span className="detail-bullet"></span>IEEE Participation Certificate</li>
              <li><span className="detail-bullet"></span>Electronic Kit + Subscriptions</li>
              <li><span className="detail-bullet"></span>Exciting Goodies</li>
            </ul>
          </div>
          <div className="prize-tier">
            <h4>2nd Prize <span className="prize-amt">₹10K</span></h4>
            <ul>
              <li><span className="detail-bullet"></span>₹10,000 Cash Prize</li>
              <li><span className="detail-bullet"></span>IEEE Participation Certificate</li>
              <li><span className="detail-bullet"></span>Electronic Kit + Subscriptions</li>
              <li><span className="detail-bullet"></span>Exciting Goodies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};




// --- Live Hardware Countdown Timer ---
const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Target Date: April 24, 2026 08:30:00 (Start of Hackathon)
    const targetDate = new Date('2026-04-24T08:30:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="countdown-section">
      <h3 className="countdown-title">Final Showdown Starts In</h3>
      <div className="countdown-grid">
        <div className="countdown-box">
          <div className="countdown-label">DAYS</div>
          <div className="countdown-circle">
            <span className="countdown-value">{formatNumber(timeLeft.days)}</span>
          </div>
        </div>

        <div className="countdown-box">
          <div className="countdown-label">HOURS</div>
          <div className="countdown-circle">
            <span className="countdown-value">{formatNumber(timeLeft.hours)}</span>
          </div>
        </div>

        <div className="countdown-box">
          <div className="countdown-label">MINUTES</div>
          <div className="countdown-circle">
            <span className="countdown-value">{formatNumber(timeLeft.minutes)}</span>
          </div>
        </div>

        <div className="countdown-box">
          <div className="countdown-label">SECONDS</div>
          <div className="countdown-circle">
            <span className="countdown-value">{formatNumber(timeLeft.seconds)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [psFilter, setPsFilter] = useState<string | undefined>(undefined);
  const [mobilePsOpen, setMobilePsOpen] = useState(false);
  const [activeTrophy, setActiveTrophy] = useState<string | null>(null);

  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };


  // Close popup or modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest('.trophy-modal') && !target.closest('.trophy-card')) {
        setActiveTrophy(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const onParallax = () => {
      const y = window.scrollY;
      if (heroVisualRef.current) {
        heroVisualRef.current.style.transform = `translateY(${y * 0.09}px)`;
      }
    };
    window.addEventListener('scroll', onParallax, { passive: true });
    return () => window.removeEventListener('scroll', onParallax);
  }, []);

  // Intersection Observer — reveal sections on scroll
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      '.section-header, .about-content, .about-cards, .countdown-section, .gallery-year-section, .sponsors-grid, .faq-container, .prizes-section-wrapper, .stats-ribbon, .ps-controls, .ps-table-wrapper'
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -50px 0px' }
    );
    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const trophyDomains = [
    {
      id: "embedded",
      name: "Embedded Systems",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>
    },
    {
      id: "vlsi",
      name: "VLSI",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>
    },
    {
      id: "campus",
      name: "Campus Innovation",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>
    }
  ];

  return (
    <>
      <div className="bg-gradients">
        <div className="gradient-orb cyan"></div>
        <div className="gradient-orb blue"></div>
        <div className="gradient-orb purple"></div>
      </div>

      <CircuitBackground />

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-brand">
            <div className="navbar-logos">
              <img src="/vvce-logo.png" alt="VVCE Logo" className="navbar-logo vvce" />
            </div>
            <div className="brand-text">SYMBIOT</div>
          </div>

          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <div className="nav-dropdown">
              <button className="nav-dropdown-trigger" onClick={() => { setPsFilter(undefined); document.getElementById('problem-statements')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Problem Statements <span className="nav-dropdown-arrow">▼</span>
              </button>
              <div className="nav-dropdown-menu">
                <a href="#problem-statements" className="nav-dropdown-item" onClick={() => setPsFilter('VLSI')}>VLSI</a>
                <a href="#problem-statements" className="nav-dropdown-item" onClick={() => setPsFilter('Embedded Systems')}>Embedded Systems</a>
                <a href="#problem-statements" className="nav-dropdown-item" onClick={() => setPsFilter('Campus Innovation')}>Campus Innovation</a>
              </div>
            </div>
            <a href="#prizes" className="nav-link">Prizes</a>
            <a href="#sponsors" className="nav-link">Sponsors</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <a href="#contact" className="nav-link">Contact</a>
            <img src="/ece-logo.png" alt="ECE Department Logo" className="navbar-logo ece" />
            <img src="/ieee-logo.png" alt="IEEE Logo" className="navbar-logo ieee" />
          </div>

          <button className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            <a href="#home" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="#about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <div className="mobile-ps-dropdown">
              <button className="mobile-ps-trigger" onClick={() => setMobilePsOpen(!mobilePsOpen)}>
                Problem Statements <span className="nav-dropdown-arrow" style={{ transform: mobilePsOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
              </button>
              <div className={`mobile-ps-subnav ${mobilePsOpen ? 'open' : ''}`}>
                <a href="#problem-statements" className="mobile-ps-link" onClick={() => { setPsFilter('VLSI'); setIsMobileMenuOpen(false); }}>VLSI</a>
                <a href="#problem-statements" className="mobile-ps-link" onClick={() => { setPsFilter('Embedded Systems'); setIsMobileMenuOpen(false); }}>Embedded Systems</a>
                <a href="#problem-statements" className="mobile-ps-link" onClick={() => { setPsFilter('Campus Innovation'); setIsMobileMenuOpen(false); }}>Campus Innovation</a>
              </div>
            </div>
            <a href="#prizes" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Prizes</a>
            <a href="#sponsors" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Sponsors</a>
            <a href="#faq" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <a href="#contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <a href="https://unstop.com/p/symbiot-2026-vidyavardhaka-college-of-engineering-mysore-1652707" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: '1rem' }}>Register</a>
            <div className="mobile-logos-row">
              <img src="/vvce-logo.png" alt="VVCE Logo" className="mobile-footer-logo" />
              <img src="/ece-logo.png" alt="ECE Logo" className="mobile-footer-logo" />
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section id="home" className="hero">
          <div className="hero-content" ref={heroContentRef}>
            <div className="hero-badges">
              <div className="hero-badge">National Level &middot; 24-Hour Hardware Hackathon</div>
              <div className="hero-badge hero-badge-secondary">One of Mysuru&apos;s Biggest Hackathons</div>
            </div>
            <h1 className="hero-title">
              Design. Build. <br />
              <span className="text-gradient">Deploy.</span>
            </h1>
            <p className="hero-desc">
              Join 500+ innovators for a 24-hour deep tech build challenge at Vidyavardhaka College of Engineering, Mysuru.
              <br /><br />
              <span className="hero-dates">April 24th - 25th, 2026</span>
            </p>
            <div className="hero-actions">
              <a href="https://unstop.com/p/symbiot-2026-vidyavardhaka-college-of-engineering-mysore-1652707" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Register</a>
              <a href="#about" className="btn btn-secondary">Learn More</a>
            </div>
          </div>

          <div className="hero-visual" ref={heroVisualRef}>
            <div className="logo-container">
              <div className="logo-glow-bg"></div>
              <img src="/logo.png" alt="Symbiot Logo" className="hero-main-logo" />

              <svg className="hero-traces" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <g className="trace-group">
                  <path d="M 200 200 L 120 120 L 80 120" />
                  <circle cx="80" cy="120" r="4" className="node" />
                </g>
                <g className="trace-group">
                  <path d="M 200 200 L 280 120 L 320 120" />
                  <circle cx="320" cy="120" r="4" className="node" />
                </g>
                <g className="trace-group">
                  <path d="M 200 200 L 280 280 L 320 280" />
                  <circle cx="320" cy="280" r="4" className="node" />
                </g>
                <g className="trace-group">
                  <path d="M 200 200 L 120 280 L 80 280" />
                  <circle cx="80" cy="280" r="4" className="node" />
                </g>
                <g className="trace-group">
                  <path d="M 200 200 L 200 320" />
                  <circle cx="200" cy="320" r="4" className="node" />
                </g>
              </svg>

              <div className="orbit-elements">
                <div className="orbit-el orbit-1">
                  <span className="hw-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg></span>
                  Embedded Systems
                </div>
                <div className="orbit-el orbit-2">
                  <span className="hw-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><line x1="18" y1="9" x2="18" y2="15"></line><line x1="9" y1="18" x2="15" y2="18"></line><line x1="9" y1="6" x2="15" y2="6"></line><line x1="6" y1="9" x2="6" y2="15"></line><path d="M12 6v12M6 12h12"></path></svg></span>
                  IoT
                </div>
                <div className="orbit-el orbit-3">
                  <span className="hw-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4M8 11v4M16 11v4"></path></svg></span>
                  Robotics
                </div>
                <div className="orbit-el orbit-4">
                  <span className="hw-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path><circle cx="12" cy="12" r="3"></circle><path d="M12 7V4M12 20v-3M7 12H4M20 12h-3M8.46 8.46L6.34 6.34M17.66 17.66l-2.12-2.12M8.46 15.54l-2.12 2.12M17.66 6.34l-2.12 2.12"></path></svg></span>
                  Edge AI
                </div>
                <div className="orbit-el orbit-5">
                  <span className="hw-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect><path d="M7 2v20M17 2v20M2 7h20M2 17h20"></path><rect x="9" y="9" width="6" height="6" fill="currentColor"></rect></svg></span>
                  VLSI
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Full-width animated marquee strip */}
        <div className="yellow-strip-container">
          <div className="strip-marquee">
            {[0, 1].map(group => (
              <div key={group} className="strip-track" aria-hidden={group === 1 ? true : undefined}>
                {Array(5).fill(null).map((_, i) => (
                  <span key={i} className="strip-item">
                    <span className="strip-arrows">{'◀'.repeat(10)}</span>
                    <span className="yellow-strip-text">DESIGN.BUILD.DEPLOY</span>
                    <span className="strip-arrows">{'▶'.repeat(10)}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="stats-ribbon">
          <div className="stat-item">
            <div className="stat-value">24H</div>
            <div className="stat-label">Build Sprint</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">500+</div>
            <div className="stat-label">Innovators</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">100+</div>
            <div className="stat-label">Deployments</div>
          </div>
        </div>

        <CountdownTimer />

        <SectionDivider />

        <section id="about" className="section">
          <div className="section-header">
            <h2 className="section-title">About <span className="text-gradient">SYMBIOT</span></h2>
            <p className="section-subtitle">Pushing the boundaries of what is possible in a 24-hour hackathon through rigorous engineering and real-world applicability.</p>
          </div>

          <div className="about-grid">
            <div className="about-content">
              <h3>Beyond Prototypes</h3>
              <p>SYMBIOT pushes teams to go beyond pitch decks and demo-only hacks. The focus is on deployable hardware and software stacks that can be tested, benchmarked, and scaled.</p>
              <p>From embedded systems and robotics to AI-driven platforms, every solution is evaluated for engineering rigor and real-world impact by industry experts.</p>
            </div>

            <div className="about-cards">
              <div className="glass-panel feature-card">
                <div className="feature-icon">⚙️</div>
                <h4>Real Hardware</h4>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Prototype and test on actual robots, sensors, and microcontrollers.</p>
              </div>
              <div className="glass-panel feature-card">
                <div className="feature-icon">🏢</div>
                <h4>Industry Problems</h4>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Tackle curated challenges designed with partner tech companies.</p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="schedule" className="section">
          <div className="section-header">
            <h2 className="section-title">Event <span className="text-gradient">Schedule</span></h2>
            <p className="section-subtitle">A tightly crafted 24-hour journey from onboarding to final showcase.</p>
          </div>

          <div className="timeline-container">

            <div className="day-label">
              <span className="day-dot"></span>
              <h3>Friday</h3>
            </div>

            <div className="timeline-row row-1">
              {/* 1 - Registration */}
              <div className="timeline-stop">
                <div className="stop-number">1</div>
                <div className="stop-icon">📝</div>
                <div className="stop-content">
                  <h4>Registration</h4>
                  <span>8:30 am</span>
                </div>
              </div>
              <div className="timeline-connector"></div>

              {/* 2 - Inauguration */}
              <div className="timeline-stop">
                <div className="stop-number">2</div>
                <div className="stop-icon">⚡</div>
                <div className="stop-content">
                  <h4>Inauguration</h4>
                  <span>9:30 am - 10:30 am</span>
                </div>
              </div>
              <div className="timeline-connector"></div>

              {/* 3 - Design Phase */}
              <div className="timeline-stop">
                <div className="stop-number">3</div>
                <div className="stop-icon">🧠</div>
                <div className="stop-content">
                  <h4>Design phase</h4>
                  <span>11:00 am - 1:00 pm</span>
                </div>
              </div>
              <div className="timeline-connector"></div>

              {/* 4 - Lunch */}
              <div className="timeline-stop">
                <div className="stop-number">4</div>
                <div className="stop-icon">🍽️</div>
                <div className="stop-content">
                  <h4>Design Phase Ends & Lunch</h4>
                  <span>1:00 pm - 2:00 pm</span>
                </div>
              </div>
            </div>

            {/* S-Curve Connector Right */}
            <div className="s-curve-right"></div>

            <div className="timeline-row row-2 reverse">
              {/* 5 - High Tea */}
              <div className="timeline-stop">
                <div className="stop-number">5</div>
                <div className="stop-icon">☕</div>
                <div className="stop-content">
                  <h4>High tea</h4>
                  <span>4:30 pm</span>
                </div>
              </div>
              <div className="timeline-connector reverse"></div>

              {/* 6 - Dinner */}
              <div className="timeline-stop">
                <div className="stop-number">6</div>
                <div className="stop-icon">🍲</div>
                <div className="stop-content">
                  <h4>Dinner</h4>
                  <span>7:00 pm - 8:00 pm</span>
                </div>
              </div>
              <div className="timeline-connector reverse"></div>

              {/* 7 - Judgement 1 */}
              <div className="timeline-stop">
                <div className="stop-number">7</div>
                <div className="stop-icon">⚖️</div>
                <div className="stop-content">
                  <h4>Phase II Judgement</h4>
                  <span>8:00 pm</span>
                </div>
              </div>
              <div className="timeline-connector reverse"></div>

              {/* 8 - Mid Night Tea */}
              <div className="timeline-stop">
                <div className="stop-number">8</div>
                <div className="stop-icon">🍵</div>
                <div className="stop-content">
                  <h4>High tea</h4>
                  <span>12:00 am</span>
                </div>
              </div>
            </div>

            {/* S-Curve Connector Left */}
            <div className="s-curve-left"></div>

            <div className="day-label" style={{ marginTop: '2rem' }}>
              <span className="day-dot"></span>
              <h3>Saturday</h3>
            </div>

            <div className="timeline-row row-3">
              {/* 9 - Breakfast */}
              <div className="timeline-stop">
                <div className="stop-number">9</div>
                <div className="stop-icon">🥐</div>
                <div className="stop-content">
                  <h4>Breakfast</h4>
                  <span>8:00 am</span>
                </div>
              </div>
              <div className="timeline-connector"></div>

              {/* 10 - Final Judgement */}
              <div className="timeline-stop">
                <div className="stop-number">10</div>
                <div className="stop-icon">🤖</div>
                <div className="stop-content">
                  <h4>Final Judgement</h4>
                  <span>11:00 am - 1:00 pm</span>
                </div>
              </div>
              <div className="timeline-connector"></div>

              {/* 11 - Lunch 2 */}
              <div className="timeline-stop">
                <div className="stop-number">11</div>
                <div className="stop-icon">🍛</div>
                <div className="stop-content">
                  <h4>Lunch</h4>
                  <span>1:00 pm</span>
                </div>
              </div>
              <div className="timeline-connector"></div>

              {/* 12 - Valedictory */}
              <div className="timeline-stop">
                <div className="stop-number">12</div>
                <div className="stop-icon">🏆</div>
                <div className="stop-content">
                  <h4>Valedictory & tea</h4>
                  <span>3:00 pm</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <SectionDivider />

        <ProblemStatements initialFilter={psFilter} />

        <SectionDivider />

        <section id="prizes" className="section bg-alt pattern-grid">
          <div className="section-header">
            <h2 className="section-title">Rewards & <span className="text-gradient">Recognition</span></h2>
            <p className="section-subtitle">Celebrate engineering excellence with prestigious titles and exciting rewards.</p>
          </div>

          <div className="prizes-section-wrapper">
            <div className="trophy-container">
              {trophyDomains.map((t) => (
                <TrophyCard
                  key={t.id}
                  domain={t.name}
                  icon={t.icon}
                  onClick={() => setActiveTrophy(t.name)}
                />
              ))}
            </div>

            {/* Modal for Prize Details popping up in center */}
            <TrophyModal
              domain={activeTrophy}
              onClose={() => setActiveTrophy(null)}
            />

            {/* Additional Awards displayed below the trophies */}
            <div className="extra-awards-container">
              <div className="glass-panel extra-award-card">
                <div className="extra-award-header cyan-glow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  <h4>Best Women Team</h4>
                  <span className="extra-award-amount">₹5K</span>
                </div>
                <ul className="extra-award-details">
                  <li><span className="detail-bullet"></span>₹5,000 Cash Prize</li>
                  <li><span className="detail-bullet"></span>IEEE Certificate</li>
                  <li><span className="detail-bullet"></span>Exciting Goodies</li>
                </ul>
              </div>

              <div className="glass-panel extra-award-card">
                <div className="extra-award-header cyan-glow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21h6"></path><path d="M12 21v-4"></path><path d="M16 11c0 3-4 5-4 5s-4-2-4-5a4 4 0 1 1 8 0z"></path></svg>
                  <h4>Best Innovation</h4>
                  <span className="extra-award-amount">₹5K</span>
                </div>
                <ul className="extra-award-details">
                  <li><span className="detail-bullet"></span>₹5,000 Cash Prize</li>
                  <li><span className="detail-bullet"></span>IEEE Certificate</li>
                  <li><span className="detail-bullet"></span>Exciting Goodies & Swags</li>
                </ul>
              </div>

              <div className="glass-panel extra-award-card">
                <div className="extra-award-header cyan-glow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
                  <h4>Participation</h4>
                  <span className="extra-award-amount">Swags</span>
                </div>
                <ul className="extra-award-details">
                  <li><span className="detail-bullet"></span>IEEE Certificate</li>
                  <li><span className="detail-bullet"></span>Exciting Goodies & Swags</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="gallery" className="section">
          <div className="section-header">
            <h2 className="section-title">SYMBIOT <span className="text-gradient">Moments</span></h2>
            <p className="section-subtitle">Highlights from previous SYMBIOT Hackathons</p>
          </div>

          <div className="gallery-years-container">
            {/* SYMBIOT 2025 */}
            <div className="gallery-year-section">
              <h3 className="gallery-year-title">SYMBIOT 2025</h3>
              <div className="gallery-grid">
                {[
                  "/symbiot-2025-1.jpg",
                  "/symbiot-2025-2.jpg",
                  "/symbiot-2025-3.jpg",
                  "/symbiot-2025-4.jpg"
                ].map((src, idx) => (
                  <div className="gallery-item" key={idx}>
                    <img src={src} alt="Symbiot 2025 Highlight" />
                    <div className="gallery-overlay"><span className="gallery-text">SYMBIOT 2025</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* SYMBIOT 2024 */}
            <div className="gallery-year-section">
              <h3 className="gallery-year-title">SYMBIOT 2024</h3>
              <div className="gallery-grid">
                {[
                  "/symbiot-2024-1.jpg",
                  "/symbiot-2024-2.jpg",
                  "/symbiot-2024-3.jpg",
                  "/symbiot-2024-4.jpg"
                ].map((src, idx) => (
                  <div className="gallery-item" key={idx}>
                    <img src={src} alt="Symbiot 2024 Highlight" />
                    <div className="gallery-overlay"><span className="gallery-text">SYMBIOT 2024</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* SYMBIOT 2023 */}
            <div className="gallery-year-section">
              <h3 className="gallery-year-title">SYMBIOT 2023</h3>
              <div className="gallery-grid">
                {[
                  "/symbiot-2023-1.jpg",
                  "/symbiot-2023-2.jpg",
                  "/symbiot-2023-3.jpg",
                  "/symbiot-2023-4.jpg"
                ].map((src, idx) => (
                  <div className="gallery-item" key={idx}>
                    <img src={src} alt="Symbiot 2023 Highlight" />
                    <div className="gallery-overlay"><span className="gallery-text">SYMBIOT 2023</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="sponsors" className="section sponsors-section">
          <div className="section-header">
            <h2 className="section-title"><span className="text-gradient">Sponsors</span></h2>
          </div>

          <div className="title-sponsor">
            <h3>Pravega Semi</h3>
          </div>

          <h3 style={{ fontSize: '2rem', marginBottom: '2.5rem', fontFamily: 'Outfit, sans-serif' }}>Proud Sponsors</h3>
          <div className="sponsors-grid">
            {['Vivartan', 'AWS', 'Geeks for Geeks', 'Wolfram', 'Axure', 'Balsamiq', 'DNA', 'Leading Learners', 'Pixel Hut', 'Sidewalk Cafe'].map((sponsor, i) => (
              <div className="sponsor-card" key={i}>
                <div className="sponsor-name">{sponsor}</div>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        <section id="faq" className="section bg-alt">
          <div className="section-header">
            <h2 className="section-title"><span className="text-gradient">FAQ</span></h2>
            <p className="section-subtitle">Everything you need to know about SYMBIOT 2026</p>
          </div>
          <div className="faq-container">
            {[
              { q: 'Is this hackathon online or offline?', a: 'The hackathon will be conducted completely offline at Vidyavardhaka College of Engineering, Mysuru.' },
              { q: 'What is eligibility criteria?', a: 'Students from engineering colleges across India are eligible to participate. Participants must register in teams.' },
              { q: 'What is team structure?', a: 'Each team must consist of 3 to 4 members.' },
              { q: 'Will there be an internet access?', a: 'Yes, high-speed internet will be provided to all participants during the hackathon.' },
              { q: 'What is the cancellation policy?', a: 'Once registered, cancellation requests will not be eligible for refunds.' },
              { q: 'Is accommodation available for participants?', a: 'Accommodation support may be provided for outstation teams based on availability.' }
            ].map((faq, i) => (
              <div className={`faq-item ${activeFaq === i ? 'active' : ''}`} key={i}>
                <button className="faq-question" onClick={() => toggleFaq(i)}>
                  {faq.q}
                  <span className="faq-icon">▼</span>
                </button>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer">
                    <div className="faq-answer-inner">
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


      </main>

      <footer id="contact" className="footer-redesigned">
        <div className="footer-main">
          {/* Column 1: Logo */}
          <div className="footer-col footer-col-logo" style={{ textAlign: 'center', alignItems: 'center' }}>
            <img src="/symbiot-teal-logo.png" alt="Symbiot Logo" className="footer-main-logo" />
          </div>

          <div className="footer-divider"></div>

          {/* Column 2: Venue */}
          <div className="footer-col footer-col-venue">
            <h4 className="footer-heading">Venue</h4>
            <p className="footer-text"><strong>24th - 25th April 2026</strong></p>
            <p className="footer-text">Vidyavardhaka College Of<br />Engineering 3rd stage,<br />Gokulam, Mysore - 570002</p>
          </div>

          <div className="footer-divider hidden-mobile"></div>

          {/* Column 3: Useful Links */}
          <div className="footer-col footer-col-links">
            <h4 className="footer-heading">Useful Links</h4>
            <ul className="footer-link-list">
              <li><a href="https://unstop.com/p/symbiot-2026-vidyavardhaka-college-of-engineering-mysore-1652707" target="_blank" rel="noopener noreferrer">Register Now</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-divider hidden-mobile"></div>

          {/* Column 4: Connect With Us */}
          <div className="footer-col footer-col-social" style={{ flex: 2 }}>
            <h4 className="footer-heading">Connect With Us</h4>
            
            <div className="contact-cards-grid">
              <div className="contact-card">
                <div className="contact-avatar">NA</div>
                <div className="contact-info">
                  <div className="contact-name">Namratha N S</div>
                  <div className="contact-email">namrathans202@gmail.com</div>
                  <div className="contact-phone">+919019755706</div>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-avatar">GO</div>
                <div className="contact-info">
                  <div className="contact-name">K Goutam</div>
                  <div className="contact-email">Kgoutam12504@gmail.com</div>
                  <div className="contact-phone">+917646903404</div>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-avatar">PR</div>
                <div className="contact-info">
                  <div className="contact-name">Praveen M S</div>
                  <div className="contact-email">praveenms588@gmail.com</div>
                  <div className="contact-phone">+919036810588</div>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-avatar">DH</div>
                <div className="contact-info">
                  <div className="contact-name">Dhanush S</div>
                  <div className="contact-email">dhanushs193@gmail.com</div>
                  <div className="contact-phone">+919742615796</div>
                </div>
              </div>
            </div>

            <div className="contact-general-info">
              <div className="general-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                <span>symbiot@vvce.ac.in</span>
              </div>
              <div className="general-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                <span>H Kempegowda Sports complex vvce mysuru</span>
              </div>
              <div className="general-item">
                <a href="https://www.instagram.com/iotcrew.vvce?igsh=MWd3YTEyeTNycnlxYw==" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                  <span>IoTCrew</span>
                </a>
              </div>
            </div>


          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>Copyright © 2026 All rights reserved | Made with <span className="heart">❤️</span> by <strong>IoTCrew</strong></p>
        </div>
      </footer>
    </>
  );
};

export default App;
