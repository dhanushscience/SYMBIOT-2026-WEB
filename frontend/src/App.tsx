import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import CircuitBackground from './CircuitBackground';
import ProblemStatements from './ProblemStatements';
import ShortlistedTeams from './ShortlistedTeams';
import FoolPage from './FoolPage';

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
  prizeAmount?: string;
  bannerLabel?: string;
  onClick: () => void;
}> = ({ domain, prizeAmount = '₹25,000', bannerLabel = 'PRIZE POOL', onClick }) => {
  return (
    <div
      className="trophy-card"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="trophy-card-banner">
        <span className="banner-label">{bannerLabel}</span>
        <span className="banner-amount">{prizeAmount}</span>
      </div>
      <div className="trophy-card-glow"></div>
      <div className="trophy-card-img">
        <img src="./trophy-gold.png" alt="Trophy" />
      </div>
      <h3 className="trophy-card-title">{domain}</h3>
      <div className="trophy-card-hint">Click for details</div>
    </div>
  );
};

const TrophyModal: React.FC<{
  domain: string | null;
  onClose: () => void;
}> = ({ domain, onClose }) => {
  useEffect(() => {
    if (domain) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [domain]);

  if (!domain) return null;

  return (
    <div className="trophy-modal-overlay" onClick={onClose}>
      <div className="trophy-modal" onClick={(e) => e.stopPropagation()}>
        <button className="trophy-modal-close" onClick={onClose}>✕</button>
        <div className="trophy-modal-icon">🏆</div>
        <h2 className="trophy-modal-title">{domain}</h2>
        <div className="trophy-modal-content">
          {(domain === 'Embedded & IoT' || domain === 'Software Domain') && (
            <>
              <div className="prize-tier">
                <div className="prize-tier-header">
                  <h4>Winner</h4>
                  <span className="prize-amt">₹15K</span>
                </div>
                <ul>
                  <li><span className="detail-check">✓</span>₹15,000 Cash Prize</li>
                  <li><span className="detail-check">✓</span>IEEE Participation Certificate</li>
                  <li><span className="detail-check">✓</span>Exciting Goodies</li>
                </ul>
              </div>
              <div className="prize-tier">
                <div className="prize-tier-header">
                  <h4>Runner-Up</h4>
                  <span className="prize-amt">₹10K</span>
                </div>
                <ul>
                  <li><span className="detail-check">✓</span>₹10,000 Cash Prize</li>
                  <li><span className="detail-check">✓</span>IEEE Participation Certificate</li>
                  <li><span className="detail-check">✓</span>Exciting Goodies</li>
                </ul>
              </div>
            </>
          )}

          {(domain === 'Best Innovation' || domain === 'Best Women\'s Team') && (
            <div className="prize-tier">
              <div className="prize-tier-header">
                <h4>Winner</h4>
                <span className="prize-amt">₹5K</span>
              </div>
              <ul>
                <li><span className="detail-check">✓</span>₹5,000 Cash Prize</li>
                <li><span className="detail-check">✓</span>IEEE Participation Certificate</li>
                <li><span className="detail-check">✓</span>Exciting Goodies</li>
              </ul>
            </div>
          )}

          {domain === 'VLSI' && (
            <>
              <div className="prize-tier">
                <div className="prize-tier-header">
                  <h4>Winner</h4>
                  <span className="prize-amt">₹10K</span>
                </div>
                <ul>
                  <li><span className="detail-check">✓</span>₹10,000 Cash Prize</li>
                  <li><span className="detail-check">✓</span>IEEE Participation Certificate</li>
                  <li><span className="detail-check">✓</span>Exciting Goodies</li>
                </ul>
              </div>
              <div className="prize-tier">
                <div className="prize-tier-header">
                  <h4>Runner-Up</h4>
                  <span className="prize-amt">₹5K</span>
                </div>
                <ul>
                  <li><span className="detail-check">✓</span>₹5,000 Cash Prize</li>
                  <li><span className="detail-check">✓</span>IEEE Participation Certificate</li>
                  <li><span className="detail-check">✓</span>Exciting Goodies</li>
                </ul>
              </div>
            </>
          )}

          {domain === 'Campus Innovation' && (
            <div className="prize-tier">
              <div className="prize-tier-header">
                <h4>Winner</h4>
                <span className="prize-amt">₹10K</span>
              </div>
              <ul>
                <li><span className="detail-check">✓</span>₹10,000 Cash Prize</li>
                <li><span className="detail-check">✓</span>IEEE Participation Certificate</li>
                <li><span className="detail-check">✓</span>Exciting Goodies</li>
              </ul>
            </div>
          )}

          {domain === 'Participation' && (
            <div className="prize-tier">
              <div className="prize-tier-header">
                <h4>Rewards</h4>
                <span className="prize-amt">Swags</span>
              </div>
              <ul>
                <li><span className="detail-check">✓</span>Participation Certificate</li>
                <li><span className="detail-check">✓</span>Exciting Goodies & Swags</li>
              </ul>
            </div>
          )}
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
  const [teamFilter, setTeamFilter] = useState<string | undefined>(undefined);
  const [mobilePsOpen, setMobilePsOpen] = useState(false);
  const [activeTrophy, setActiveTrophy] = useState<string | null>(null);

  // April fools logic
  const [showPrankModal, setShowPrankModal] = useState(false);
  const now = new Date();
  const isPrankActive = now.getFullYear() === 2026 && now.getMonth() === 3 && now.getDate() === 1 && now.getHours() >= 14;

  const handleRegisterClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isPrankActive) {
      e.preventDefault();
      try {
        if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } catch (err) {
        console.warn("Fullscreen request failed", err);
      }
      setShowPrankModal(true);
    }
  };

  const closePrank = () => {
    setShowPrankModal(false);
    try {
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(err => console.warn(err));
      }
    } catch (err) { }
  };

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
      '.section-header, .about-content, .about-cards, .countdown-section, .gallery-year-section, .sponsors-grid, .faq-container, .prizes-section-wrapper, .stats-ribbon, .ps-controls'
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
    { id: "embedded", name: "Embedded & IoT", prize: "₹25,000" },
    { id: "software", name: "Software Domain", prize: "₹25,000" },
    { id: "vlsi", name: "VLSI", prize: "₹15,000" },
    { id: "campus", name: "Campus Innovation", prize: "₹10,000" },
    { id: "best-innovation", name: "Best Innovation", prize: "₹5,000" },
    { id: "best-women", name: "Best Women's Team", prize: "₹5,000" }
  ];

  return (
    <>
      <div className="bg-gradients">
        <div className="gradient-orb cyan"></div>
        <div className="gradient-orb blue"></div>
        <div className="gradient-orb purple"></div>
      </div>

      <CircuitBackground />
      <div className="bg-soften-layer" aria-hidden="true"></div>

      {isPrankActive && (
        <>
          <style>
            {`
              .btn-primary-alert {
                background: transparent !important;
                color: #ff4444 !important;
                border: 1.5px solid #ff4444 !important;
                box-shadow: 0 0 15px rgba(255, 68, 68, 0.6), inset 0 0 12px rgba(255, 68, 68, 0.3) !important;
                text-shadow: 0 0 8px rgba(255, 68, 68, 0.6) !important;
                animation: pulse-glow-red 2s infinite alternate;
              }
              .btn-primary-alert:hover {
                box-shadow: 0 0 30px rgba(255, 68, 68, 0.9), inset 0 0 20px rgba(255, 68, 68, 0.5) !important;
                border-color: #ff6666 !important;
                color: #ff6666 !important;
              }
              @keyframes pulse-glow-red {
                0% { transform: scale(0.98); box-shadow: 0 0 12px rgba(255, 68, 68, 0.4), inset 0 0 8px rgba(255, 68, 68, 0.2); }
                100% { transform: scale(1.02); box-shadow: 0 0 20px rgba(255, 68, 68, 0.8), inset 0 0 15px rgba(255, 68, 68, 0.4); }
              }
              
              /* Prank Modal Details */
              @keyframes suspenseReveal {
                0% { transform: scale(0.3) translateY(200px); opacity: 0; filter: blur(20px); }
                60% { transform: scale(1.05) translateY(-10px); opacity: 1; filter: blur(0px); }
                80% { transform: scale(0.95) translateY(5px); }
                100% { transform: scale(1) translateY(0); }
              }
              .prank-modal-reveal {
                animation: suspenseReveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
              }
              .prank-btn-red {
                background: linear-gradient(135deg, #ff3333, #cc0000) !important;
                border: none !important;
                color: white !important;
                box-shadow: 0 4px 15px rgba(255, 51, 51, 0.5) !important;
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease !important;
              }
              .prank-btn-red:hover {
                transform: scale(1.05) translateY(-3px) !important;
                box-shadow: 0 8px 25px rgba(255, 51, 51, 0.7) !important;
              }
            `}
          </style>
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1100, background: '#ff3333', color: '#fff', textAlign: 'center', padding: '16px', fontWeight: '900', fontSize: '18px', letterSpacing: '2px', textTransform: 'uppercase', boxShadow: '0 4px 20px rgba(255, 51, 51, 0.5)' }}>
            🚨 URGENT: Hackathon Registration is closing! Only a few slots left! 🚨
          </div>
        </>
      )}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ top: isPrankActive ? '56px' : '0' }} aria-label="Main Navigation - Symbiot 2026 Hackathon">
        <div className="navbar-container">
          <div className="navbar-brand">
            <div className="navbar-logos">
              <img src="./vvce-logo.png" alt="VVCE Logo" className="navbar-logo vvce" />
            </div>
            <div className="brand-text">SYMBIOT</div>
          </div>

          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <div className="nav-dropdown">
              <button className="nav-dropdown-trigger">
                Problem Statements <span className="nav-dropdown-arrow">▼</span>
              </button>
              <div className="nav-dropdown-menu">
                <a href="#problem-statements" className="nav-dropdown-item" onClick={() => setPsFilter('Embedded and IOT')}>Embedded and IOT</a>
                <a href="#shortlisted-teams" className="nav-dropdown-item" onClick={(e) => { e.stopPropagation(); setTeamFilter('SOFTWARE'); setPsFilter(undefined); }}>Software Domain</a>
                <a href="#shortlisted-teams" className="nav-dropdown-item" onClick={(e) => { e.stopPropagation(); setTeamFilter('CAMPUS INNOVATION'); setPsFilter(undefined); }}>Campus Innovation</a>
                <a href="#problem-statements" className="nav-dropdown-item" onClick={() => setPsFilter('VLSI')}>VLSI</a>
                <a href="#templates" className="nav-dropdown-item" onClick={() => { setPsFilter(undefined); document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' }); }}>PPTs</a>
              </div>
            </div>
            <a href="#prizes" className="nav-link">Prizes</a>
            <a href="#sponsors" className="nav-link">Sponsors</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <a href="#contact" className="nav-link">Contact</a>
            <img src="./ece-logo.png" alt="ECE Department Logo" className="navbar-logo ece" />
            <img src="./ieee-vvce-vertical.png" alt="IEEE Logo" className="navbar-logo ieee" />
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
                <a href="#problem-statements" className="mobile-ps-link" onClick={() => { setPsFilter('Embedded and IOT'); setIsMobileMenuOpen(false); }}>Embedded and IOT</a>
                <a href="#shortlisted-teams" className="mobile-ps-link" onClick={(e) => { e.stopPropagation(); setTeamFilter('SOFTWARE'); setPsFilter(undefined); setIsMobileMenuOpen(false); }}>Software Domain</a>
                <a href="#shortlisted-teams" className="mobile-ps-link" onClick={(e) => { e.stopPropagation(); setTeamFilter('CAMPUS INNOVATION'); setPsFilter(undefined); setIsMobileMenuOpen(false); }}>Campus Innovation</a>
                <a href="#problem-statements" className="mobile-ps-link" onClick={() => { setPsFilter('VLSI'); setIsMobileMenuOpen(false); }}>VLSI</a>
                <a href="#templates" className="mobile-ps-link" onClick={() => { setPsFilter(undefined); setIsMobileMenuOpen(false); document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' }); }}>PPTs</a>
              </div>
            </div>
            <a href="#prizes" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Prizes</a>
            <a href="#sponsors" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Sponsors</a>
            <a href="#faq" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
            <a href="#contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
            <a href="https://unstop.com/p/symbiot-2026-vidyavardhaka-college-of-engineering-mysore-1652707" onClick={handleRegisterClick} target="_blank" rel="noopener noreferrer" className={`btn btn-primary btn-register-heartbeat ${isPrankActive ? 'btn-primary-alert' : ''}`} style={{ marginTop: '1rem' }}>Register</a>
            <div className="mobile-logos-row">
              <img src="./vvce-logo.png" alt="VVCE Logo" className="mobile-footer-logo" />
              <img src="./ece-logo.png" alt="ECE Logo" className="mobile-footer-logo" />
            </div>
          </div>
        </div>
      </nav>

      <main className="content-layer" role="main">
        <section id="home" className="hero" itemScope itemType="https://schema.org/Event" aria-label="Symbiot 2026 Hero - National Level Hackathon at VVCE Mysore">
          <meta itemProp="name" content="Symbiot 2026 - National Level 24-Hour Hackathon at VVCE Mysore" />
          <meta itemProp="startDate" content="2026-04-24T08:30:00+05:30" />
          <meta itemProp="endDate" content="2026-04-25T08:30:00+05:30" />
          <meta itemProp="eventStatus" content="https://schema.org/EventScheduled" />
          <meta itemProp="eventAttendanceMode" content="https://schema.org/OfflineEventAttendanceMode" />
          <div className="hero-content" ref={heroContentRef}>
            <div className="hero-badges">
              <div className="hero-badge hero-badge-secondary">One of Mysuru&apos;s Biggest Hackathons</div>
            </div>
            <h1 className="hero-title">
              <span className="sr-only">Symbiot 2026 — National Level 24-Hour Hackathon at Vidyavardhaka College of Engineering (VVCE), Mysuru, Karnataka. Organized by ECE Department &amp; IoTCrew. Featuring Embedded Systems, IoT, Open Innovation &amp; Campus Innovation domains. April 24-25, 2026. </span>
              Design. Build. <br />
              <span className="text-gradient">Deploy.</span>
            </h1>
            <p className="hero-desc" itemProp="description">
              Join 500+ innovators for a 24-hour deep tech build challenge at Vidyavardhaka College of Engineering, Mysuru.
              <br /><br />
              <span className="hero-dates">April 24th - 25th, 2026</span>
            </p>

            <div className="eligibility-banner">
              <div className="eligibility-text">
                Open to <span className="highlight-bright">B.Tech & M.Tech</span> Students Nationwide<br className="mobile-break" />
                Experience SYMBIOT’s First-Ever Dedicated <span className="highlight-gradient"><strong style={{ fontWeight: 900 }}>VLSI</strong> Track</span>
              </div>
            </div>

            <div className="hero-actions">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <a href="https://unstop.com/p/symbiot-2026-vidyavardhaka-college-of-engineering-mysore-1652707" onClick={handleRegisterClick} target="_blank" rel="noopener noreferrer" className={`btn btn-primary btn-register-heartbeat ${isPrankActive ? 'btn-primary-alert' : ''}`}>Register</a>
                  <a href="#about" className="btn btn-secondary">Learn More</a>
                </div>
                {isPrankActive && (
                  <div style={{ color: '#ff4444', fontWeight: 'bold', fontSize: '0.95rem', animation: 'pulse-glow 2s infinite alternate', padding: '0.5rem 1rem', background: 'rgba(255, 68, 68, 0.1)', border: '1px solid rgba(255, 68, 68, 0.3)', borderRadius: '8px', textAlign: 'center' }}>
                    🚨 Registration closing! Only few slots left!
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="hero-visual" ref={heroVisualRef}>
            <div className="logo-container">
              <div className="logo-glow-bg"></div>
              <img src="./logo.png" alt="Symbiot 2026 Hackathon Logo - VVCE Mysore National Level Hackathon" className="hero-main-logo" itemProp="image" />
              <div className="orbit-elements">
                <div className="orbit-el orbit-1" onClick={() => { setPsFilter('Embedded and IOT'); document.getElementById('problem-statements')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <span className="hw-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg></span>
                  <span className="orbit-label">Embedded and IOT</span>
                  <span className="orbit-arrow">→</span>
                </div>
                <div className="orbit-el orbit-2" onClick={() => { setPsFilter('Campus Innovation'); document.getElementById('problem-statements')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <span className="hw-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21h6"></path><path d="M12 21v-4"></path><path d="M16 11c0 3-4 5-4 5s-4-2-4-5a4 4 0 1 1 8 0z"></path></svg></span>
                  <span className="orbit-label">Campus Innovation</span>
                  <span className="orbit-arrow">→</span>
                </div>
                <div className="orbit-el orbit-3" onClick={() => { setPsFilter('Open Innovation'); document.getElementById('problem-statements')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <span className="hw-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"></rect><path d="M7 2v20M17 2v20M2 7h20M2 17h20"></path><rect x="9" y="9" width="6" height="6" fill="currentColor"></rect></svg></span>
                  <span className="orbit-label">Open Innovation</span>
                  <span className="orbit-arrow">→</span>
                </div>
                <div className="orbit-el orbit-4" onClick={() => { setPsFilter('VLSI'); document.getElementById('problem-statements')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <span className="hw-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></span>
                  <span className="orbit-label">VLSI</span>
                  <span className="orbit-arrow">→</span>
                </div>
                <div className="orbit-el orbit-5" onClick={() => { setPsFilter('Software Domain'); document.getElementById('problem-statements')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <span className="hw-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 17l6-6-6-6"></path><path d="M12 19h8"></path></svg></span>
                  <span className="orbit-label">Software Domain</span>
                  <span className="orbit-arrow">→</span>
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

        <section id="about" className="section" aria-label="About Symbiot 2026 Hackathon at VVCE Mysore">
          <div className="section-header">
            <h2 className="section-title">About <span className="text-gradient">SYMBIOT</span></h2>
            <p className="section-subtitle">Pushing the boundaries of what is possible in a 24-hour hackathon through rigorous engineering and real-world applicability.</p>
            <p className="sr-only">Symbiot 2026 is the flagship national-level 24-hour hackathon organized by the ECE Department of Vidyavardhaka College of Engineering (VVCE), Mysuru, Karnataka, India. Symbiot has been successfully conducted since 2023, making it one of Mysuru's most established hackathon events. Powered by IoTCrew and hosted on Unstop platform.</p>
          </div>

          <div className="about-grid">
            <div className="about-content">
              <h3 style={{ color: 'var(--accent-cyan)' }}>Beyond Prototypes</h3>
              <p>SYMBIOT pushes teams to go beyond pitch decks and demo-only hacks. The focus is on deployable hardware and software stacks that can be tested, benchmarked, and scaled.</p>
              <p>From embedded systems and robotics to AI-driven platforms, every solution is evaluated for engineering rigor and real-world impact by industry experts.</p>
            </div>

            <div className="about-cards">
              <div className="glass-panel feature-card">
                <div className="feature-icon">⚙️</div>
                <h4 style={{ color: 'var(--accent-yellow)' }}>Real Hardware</h4>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Prototype and test on actual robots, sensors, and microcontrollers.</p>
              </div>
              <div className="glass-panel feature-card">
                <div className="feature-icon">🏢</div>
                <h4 style={{ color: 'var(--accent-yellow)' }}>VVCE ECE Pathway</h4>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Core ECE foundations, electives, and capstone-driven learning for real-world deployment.</p>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <ShortlistedTeams initialFilter={teamFilter} />

        <SectionDivider />
        
        <ProblemStatements initialFilter={psFilter} />

        <SectionDivider />

        <section id="templates" className="section">
          <div className="section-header">
            <h2 className="section-title">PPT <span className="text-gradient">Templates</span></h2>
            <p className="section-subtitle">Download the required presentation template for your domain.</p>
          </div>

          <div className="about-cards" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div className="glass-panel feature-card" style={{ flex: '1 1 250px', maxWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="feature-icon">🤖</div>
              <h4 style={{ color: 'var(--accent-yellow)', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>Embedded and IOT</h4>
              <a href={`${import.meta.env.BASE_URL}PPT_template/SYMBIOT_2026_EMBD_PPT.pptx`} download="SYMBIOT_2026_EMBD_PPT.pptx" className="btn btn-secondary">Download</a>
            </div>

            <div className="glass-panel feature-card" style={{ flex: '1 1 250px', maxWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="feature-icon">💻</div>
              <h4 style={{ color: 'var(--accent-yellow)', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>Software Domain</h4>
              <a href={`${import.meta.env.BASE_URL}PPT_template/SYMBIOT_2026_SOFTWARE_PPT.pptx`} download="SYMBIOT_2026_SOFTWARE_PPT.pptx" className="btn btn-secondary">Download</a>
            </div>

            <div className="glass-panel feature-card" style={{ flex: '1 1 250px', maxWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="feature-icon">💡</div>
              <h4 style={{ color: 'var(--accent-yellow)', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>Campus Innovation</h4>
              <a href={`${import.meta.env.BASE_URL}PPT_template/SYMBIOT_2026_CAMPUS_PPT.pptx`} download="SYMBIOT_2026_CAMPUS_PPT.pptx" className="btn btn-secondary">Download</a>
            </div>

            <div className="glass-panel feature-card" style={{ flex: '1 1 250px', maxWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="feature-icon">🔌</div>
              <h4 style={{ color: 'var(--accent-yellow)', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>VLSI</h4>
              <a href={`${import.meta.env.BASE_URL}PPT_template/SYMBIOT_2026_VLSI_PPT.pptx`} download="SYMBIOT_2026_VLSI_PPT.pptx" className="btn btn-secondary">Download</a>
            </div>

            <div className="glass-panel feature-card" style={{ flex: '1 1 250px', maxWidth: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="feature-icon">🌐</div>
              <h4 style={{ color: 'var(--accent-yellow)', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>Open Innovation</h4>
              <a href={`${import.meta.env.BASE_URL}PPT_template/SYMBIOT_2026_OPEN_PPT.pptx`} download="SYMBIOT_2026_OPEN_PPT.pptx" className="btn btn-secondary">Download</a>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="prizes" className="section bg-alt pattern-grid" aria-label="Symbiot 2026 Prizes and Awards">
          <div className="section-header">
            <h2 className="section-title">Rewards & <span className="text-gradient">Recognition</span></h2>
            <p className="section-subtitle">Celebrate engineering excellence with prestigious titles and exciting rewards.</p>
            <p className="sr-only">Symbiot 2026 hackathon prizes: Total prize pool of over ₹1,20,000. Main tracks (Embedded &amp; IoT, Software Domain) each have ₹25,000 prize pools (₹15,000 Winner, ₹10,000 Runner-up). VLSI has ₹15,000 and Campus Innovation has ₹10,000. Special awards include Best Innovation (₹5,000) and Best Women's Team (₹5,000). Participation Certificates and exciting swags for all participants at VVCE Mysore.</p>
          </div>

          <div className="prizes-section-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', paddingBottom: '3rem' }}>
            {/* First Row: 3 Cards - Core Domains */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', width: '100%', maxWidth: '950px' }}>
              {trophyDomains.slice(0, 3).map((t) => (
                <TrophyCard
                  key={t.id}
                  domain={t.name}
                  prizeAmount={t.prize}
                  onClick={() => setActiveTrophy(t.name)}
                />
              ))}
            </div>

            {/* Second Row: 2 Cards - Campus & Rewards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', width: '100%', maxWidth: '950px' }}>
              <TrophyCard
                domain={trophyDomains[3].name}
                prizeAmount={trophyDomains[3].prize}
                onClick={() => setActiveTrophy(trophyDomains[3].name)}
              />
              <TrophyCard
                domain="Participation"
                prizeAmount="Swags"
                bannerLabel="REWARDS"
                onClick={() => setActiveTrophy("Participation")}
              />
            </div>

            {/* Third Row: 2 Cards - Special Awards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', width: '100%', maxWidth: '950px' }}>
              {trophyDomains.slice(4).map((t) => (
                <TrophyCard
                  key={t.id}
                  domain={t.name}
                  prizeAmount={t.prize}
                  onClick={() => setActiveTrophy(t.name)}
                />
              ))}
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="sponsors" className="section sponsors-section" aria-label="Symbiot 2026 Sponsors and Partners">
          <div className="section-header">
            <h2 className="section-title"><span className="text-gradient">Sponsors</span></h2>
            <p className="sr-only">Symbiot 2026 hackathon at VVCE Mysore is supported by leading industry partners. Powered by IoTCrew and Unstop. Prize Partners include Pravega Semiconductors, IEEE WIE, and Tregorra. Proud sponsors include GeeksForGeeks, Logycent, and Pixelhut.</p>
          </div>

          <div className="powered-by-sponsor">
            <h3>Powered By</h3>
            <div className="powered-by-logos">
              <div className="powered-logo-wrapper left">
                <img src="./iotcrew.png" alt="IO T CREW Logo" className="powered-logo" />
              </div>
              <div className="powered-divider"></div>
              <div className="powered-logo-wrapper right">
                <img src="./Unstop-Logo-Blue-Medium.png" alt="Unstop Logo" className="powered-logo unstop" />
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '2rem', marginBottom: '2.5rem', fontFamily: 'Outfit, sans-serif' }}>Prize Partners</h3>
          <div className="sponsors-grid">
            <a href="https://pravegasemi.com/" target="_blank" rel="noopener noreferrer" className="sponsor-card">
              <img src="./PravegaSemi-Logo.png" alt="Pravega Semi Logo" className="sponsor-logo logo-wide" />
            </a>
            <div className="sponsor-card">
              <img src="./WIE Bengaluru section.png" alt="WIE Bangalore" className="sponsor-logo logo-compact" />
            </div>
            <a href="https://tregoraa.com/?srsltid=AfmBOoqwkVjv00TXp2nV_r4Tg3iAPwxNFGxiobkdkkaZI0o5V4dX-ksq" target="_blank" rel="noopener noreferrer" className="sponsor-card">
              <img src="./Tregorra.png" alt="Tregorra" className="sponsor-logo logo-compact" />
            </a>
          </div>

          <h3 style={{ fontSize: '2rem', marginBottom: '2.5rem', marginTop: '4rem', fontFamily: 'Outfit, sans-serif' }}>Technical Sponsors</h3>
          <div className="sponsors-grid">
            <div className="sponsor-card">
              <img src="./ieee-mb-blue.png" alt="IEEE Kite" className="sponsor-logo logo-wide" />
            </div>
            <div className="sponsor-card">
              <img src="./IEEE-banglore-Section-Blue-300x75-2.png" alt="IEEE Bangalore Section" className="sponsor-logo logo-wide" />
            </div>
            <div className="sponsor-card">
              <img src="./IEEE mysore subsection white.png" alt="IEEE Mysore Subsection" className="sponsor-logo logo-wide" />
            </div>
            <div className="sponsor-card">
              <img src="./CAS-WHITE-BG.jpg" alt="CAS Bangalore" className="sponsor-logo logo-compact" />
            </div>
            <div className="sponsor-card">
              <img src="./RAS-bangalore.jpg" alt="RAS Bangalore" className="sponsor-logo logo-compact" style={{ borderRadius: '8px' }} />
            </div>
            <div className="sponsor-card">
              <img src="./ieee-yp.png" alt="IEEE Young Professionals Bangalore Section" className="sponsor-logo logo-wide" />
            </div>
          </div>

          <h3 style={{ fontSize: '2rem', marginBottom: '2.5rem', marginTop: '4rem', fontFamily: 'Outfit, sans-serif' }}>Proud Sponsors</h3>
          <div className="sponsors-grid-2x2">
            <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer" className="sponsor-card">
              <img src="./gfg-logo-new.png" alt="GeeksForGeeks" className="sponsor-logo logo-compact" />
            </a>
            <a href="https://logycent.com/" target="_blank" rel="noopener noreferrer" className="sponsor-card">
              <img src="./Logycent.png" alt="Logycent" className="sponsor-logo logo-wide" />
            </a>
            <a href="https://www.instagram.com/pixel_hut/" target="_blank" rel="noopener noreferrer" className="sponsor-card">
              <img src="./pixelhut.png" alt="Pixelhut" className="sponsor-logo logo-wide" style={{ transform: 'scale(1.5)' }} />
            </a>
            <div className="sponsor-card">
              <img src="./vivartan.png" alt="Vivartan" className="sponsor-logo logo-wide" />
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
                  "./symbiot-2025-1.jpg",
                  "./symbiot-2025-2.jpg",
                  "./symbiot-2025-3.jpg",
                  "./symbiot-2025-4.jpg"
                ].map((src, idx) => (
                  <div className="gallery-item" key={idx}>
                    <img 
                      src={src} 
                      alt={`Symbiot 2025 hackathon at VVCE Mysore - highlight ${idx + 1}`} 
                      loading="lazy" 
                      decoding="async"
                      fetchPriority={idx < 2 ? "high" : "auto"}
                    />
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
                  "./symbiot-2024-1.jpg",
                  "./symbiot-2024-2.jpg",
                  "./symbiot-2024-3.jpg",
                  "./symbiot-2024-4.jpg"
                ].map((src, idx) => (
                  <div className="gallery-item" key={idx}>
                    <img 
                      src={src} 
                      alt={`Symbiot 2024 hackathon at VVCE Mysore - highlight ${idx + 1}`} 
                      loading="lazy" 
                      decoding="async"
                      fetchPriority="low"
                    />
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
                  "./symbiot-2023-1.jpg",
                  "./symbiot-2023-2.jpg",
                  "./symbiot-2023-3.jpg",
                  "./symbiot-2023-4.jpg"
                ].map((src, idx) => (
                  <div className="gallery-item" key={idx}>
                    <img 
                      src={src} 
                      alt={`Symbiot 2023 hackathon at VVCE Mysore - highlight ${idx + 1}`} 
                      loading="lazy" 
                      decoding="async"
                      fetchPriority="low"
                    />
                    <div className="gallery-overlay"><span className="gallery-text">SYMBIOT 2023</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="department" className="section" aria-label="About VVCE and ECE Department">
          <div className="section-header">
            <h2 className="section-title">About <span className="text-gradient">Institution</span></h2>
          </div>

          <div className="institution-cards-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto', marginBottom: '3rem', padding: '0 1rem' }}>

            <div className="glass-panel institution-card" style={{ flex: '1 1 400px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(0, 240, 255, 0.2)' }}>

              <div className="institution-card-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '0.5rem' }}>
                <div className="institution-logo-box" style={{ flexShrink: 0, width: '70px', height: '70px', border: '1px solid var(--accent-cyan)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 240, 255, 0.05)' }}>
                  <img src="./vvce-logo.png" alt="VVCE Logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span style="color: var(--accent-cyan); font-weight: 800; font-size: 1.1rem;">VVCE</span>'; }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.3rem' }}>EST. 1997 • MYSURU</span>
                  <h3 className="institution-card-title" style={{ color: '#ffffff', fontSize: '1.5rem', margin: '0', lineHeight: '1.2' }}>Vidyavardhaka College<br />of Engineering</h3>
                </div>
              </div>

              <div style={{ height: '1px', width: '50px', background: 'rgba(255, 255, 255, 0.2)', marginBottom: '0.5rem' }}></div>

              <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '1.05rem', margin: 0 }}>
                An autonomous institute affiliated with Visvesvaraya Technological University (VTU), Belagavi, approved by AICTE & UGC, New Delhi. Accredited by NAAC with an “A” grade and seven UG programs accredited by NBA. With 3200+ students, nine PhD research centers, and a passionate faculty team dedicated to world-class education.
                Vidyavardhaka College of Engineering (VVCE) is known for conducting outstanding hackathons that go beyond ideas focusing on engineering discipline, system-level thinking, and real-world applicability.
              </p>
              <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '1.05rem', margin: 0 }}>
                Each event reflects the institution’s commitment to building capable engineers, not just competitors.
              </p>

              <div className="institution-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: 'auto', paddingTop: '1.5rem' }}>
                <span style={{ fontSize: '0.65rem', padding: '0.4rem 0.8rem', border: '1px solid rgba(0, 240, 255, 0.4)', borderRadius: '20px', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>NBA ACCREDITED</span>
                <span style={{ fontSize: '0.65rem', padding: '0.4rem 0.8rem', border: '1px solid rgba(0, 240, 255, 0.4)', borderRadius: '20px', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>NAAC 'A' GRADE</span>
                <span style={{ fontSize: '0.65rem', padding: '0.4rem 0.8rem', border: '1px solid rgba(0, 240, 255, 0.4)', borderRadius: '20px', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>VTU AFFILIATED</span>
                <span style={{ fontSize: '0.65rem', padding: '0.4rem 0.8rem', border: '1px solid rgba(0, 240, 255, 0.4)', borderRadius: '20px', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>AICTE APPROVED</span>
              </div>
            </div>

            <div className="glass-panel institution-card" style={{ flex: '1 1 400px', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', border: '1px solid rgba(0, 240, 255, 0.2)' }}>

              <div className="institution-card-header" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '0.5rem' }}>
                <div className="institution-logo-box" style={{ flexShrink: 0, width: '70px', height: '70px', border: '1px solid var(--accent-cyan)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 240, 255, 0.05)' }}>
                  <img src="./ece-logo.png" alt="ECE Logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span style="color: var(--accent-cyan); font-weight: 800; font-size: 1.1rem;">ECE</span>'; }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '0.3rem' }}>DEPT. OF</span>
                  <h3 className="institution-card-title" style={{ color: '#ffffff', fontSize: '1.5rem', margin: '0', lineHeight: '1.2' }}>Electronics &<br />Communication Engineering</h3>
                </div>
              </div>

              <div style={{ height: '1px', width: '50px', background: 'rgba(255, 255, 255, 0.2)', marginBottom: '0.5rem' }}></div>

              <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '1.05rem', margin: 0 }}>
                The Department of Electronics and Communication Engineering (ECE) at Vidyavardhaka College of Engineering, Mysuru, is dedicated to providing quality education in electronics and modern communication technologies. The department offers undergraduate and postgraduate programs, including a B.E. in ECE and an M.Tech. in VLSI, equipping students with both fundamental knowledge and advanced technical skills.
              </p>
              <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '1.05rem', margin: 0 }}>
                With a strong focus on practical learning and innovation, the department prepares students to excel in diverse technology-driven industries and contribute to societal development.
              </p>

              <div className="institution-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginTop: 'auto', paddingTop: '1.5rem' }}>
                <span style={{ fontSize: '0.65rem', padding: '0.4rem 0.8rem', border: '1px solid rgba(0, 240, 255, 0.4)', borderRadius: '20px', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>CUTTING-EDGE CURRICULUM</span>
                <span style={{ fontSize: '0.65rem', padding: '0.4rem 0.8rem', border: '1px solid rgba(0, 240, 255, 0.4)', borderRadius: '20px', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>RESEARCH FOCUSED</span>
                <span style={{ fontSize: '0.65rem', padding: '0.4rem 0.8rem', border: '1px solid rgba(0, 240, 255, 0.4)', borderRadius: '20px', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>INDUSTRY READY</span>
                <span style={{ fontSize: '0.65rem', padding: '0.4rem 0.8rem', border: '1px solid rgba(0, 240, 255, 0.4)', borderRadius: '20px', color: 'var(--accent-cyan)', fontWeight: 'bold' }}>INNOVATION HUB</span>
              </div>
            </div>

          </div>

          <div className="institution-facilitators-row" style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
            <div className="glass-panel facilitators-card institution-facilitators" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '800px', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
              <h4 style={{ marginBottom: '2.5rem', textAlign: 'center', width: '100%', color: 'var(--accent-cyan)', fontSize: '1.8rem', letterSpacing: '1px' }}>Facilitators</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', width: '100%', textAlign: 'center' }}>
                <div className="facilitator" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--accent-cyan)', marginBottom: '1.2rem', boxShadow: '0 0 20px var(--glow-cyan)' }}>
                    <img src="./CM-Patil.jpg" alt="Dr. C M Patil" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.3rem', margin: 0 }}>Dr. C M Patil</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.4rem 0 0 0' }}>HOD, ECE Department</p>
                </div>
                <div className="facilitator" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--accent-cyan)', marginBottom: '1.2rem', boxShadow: '0 0 20px var(--glow-cyan)' }}>
                    <img src="./geetha-mam.jpeg" alt="Dr. Geetha Shree A" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                  </div>
                  <p style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '1.3rem', margin: 0 }}>Dr. Geetha Shree A</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0.4rem 0 0 0' }}>SYMBIOT Faculty Coordinator</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SectionDivider />

        <section id="faq" className="section bg-alt" aria-label="Frequently Asked Questions about Symbiot 2026 Hackathon">
          <div className="section-header">
            <h2 className="section-title"><span className="text-gradient">FAQ</span></h2>
            <p className="section-subtitle">Everything you need to know about SYMBIOT 2026</p>
            <p className="sr-only">Frequently Asked Questions about Symbiot 2026 national-level hackathon at Vidyavardhaka College of Engineering (VVCE), Mysuru. Learn about eligibility, team structure, prizes, dates, venue, registration process, and more.</p>
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

      {showPrankModal && (
        <FoolPage onBack={closePrank} />
      )}

      <footer id="contact" className="footer-redesigned" aria-label="Symbiot 2026 Contact Information and Links">
        <div className="footer-main">
          {/* Column 1: Logo */}
          <div className="footer-col footer-col-logo">
            <div className="footer-logo-wrapper">
              <img src="./symbiot-2026-logo.png" alt="SYMBIOT 2026" className="footer-main-logo" />
            </div>
          </div>

          {/* Column 2: Venue */}
          <div className="footer-col footer-col-venue">
            <h4 className="footer-heading">Venue Location</h4>
            <div className="venue-glass-box" style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column' }}>
              <iframe
                src="https://maps.google.com/maps?q=H+Kempegowda+Indoor+Sports+Complex+VVCE+Mysore&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="150"
                style={{ border: 0, borderRadius: '8px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Column 3: Useful Links */}
          <div className="footer-col footer-col-links">
            <h4 className="footer-heading">Useful Links</h4>
            <ul className="footer-link-list">
              <li><a href="https://unstop.com/p/symbiot-2026-vidyavardhaka-college-of-engineering-mysore-1652707" onClick={handleRegisterClick} target="_blank" rel="noopener noreferrer" className={isPrankActive ? 'text-gradient' : ''} style={isPrankActive ? { color: '#ff4444', textShadow: '0 0 10px rgba(255, 68, 68, 0.5)', fontWeight: 'bold' } : {}}>Register Now</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="mailto:symbiot@vvce.ac.in?subject=[PARTICIPANT]%20Query%20Regarding%20SYMBIOT%202026">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4: Connect With Us */}
          <div className="footer-col footer-col-social">
            <h4 className="footer-heading">Connect With Us</h4>

            <div className="contact-cards-grid">
              <div className="contact-card">
                <div className="contact-avatar">GO</div>
                <div className="contact-info">
                  <div className="contact-name">K Goutam</div>
                  <div className="contact-email">Kgoutam12504@gmail.com</div>
                  <div className="contact-phone">+917646903404</div>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-avatar">NS</div>
                <div className="contact-info">
                  <div className="contact-name">Namratha N S</div>
                  <div className="contact-email">namrathans202@gmail.com</div>
                  <div className="contact-phone">+919019755706</div>
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
            </div>

            <div className="contact-general-info">
              <div className="general-item">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                <a href="mailto:symbiot@vvce.ac.in?subject=[PARTICIPANT]%20Query%20Regarding%20SYMBIOT%202026" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>symbiot@vvce.ac.in</a>
              </div>
              <div className="general-item">
                <a href="https://www.instagram.com/symbiot.2026/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                  <span>SYMBIOT 2026</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>Copyright © 2026 All rights reserved | Made with <span className="heart">❤️</span> by <strong>IoTCrew</strong></p>
          <p className="sr-only">Symbiot 2026 is the flagship national-level hackathon organized by the Electronics and Communication Engineering (ECE) Department of Vidyavardhaka College of Engineering (VVCE), Mysuru, Karnataka, India. It is a 24-hour offline hackathon held on April 24-25, 2026, featuring three competition domains: Embedded Systems &amp; IoT, Open Innovation, and Campus Innovation. Total prize pool exceeds ₹85,000 with Participation Certificates for all participants. Engineering students from colleges across India can register on Unstop. The event is powered by IoTCrew. Visit symbiotvvce.in for more details. Symbiot 2026 VVCE hackathon registration, Symbiot hackathon Mysore, national level hackathon India 2026, VVCE ECE department hackathon.</p>
        </div>
      </footer>

      {/* Modal for Prize Details popping up in center */}
      <TrophyModal
        domain={activeTrophy}
        onClose={() => setActiveTrophy(null)}
      />

      {/* Scroll to Top Arrow */}
      {scrolled && (
        <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6" />
          </svg>
        </button>
      )}
    </>
  );
};

export default App;

