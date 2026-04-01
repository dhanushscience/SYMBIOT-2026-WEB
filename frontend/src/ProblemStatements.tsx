import React, { useState, useEffect, useMemo } from 'react';

// --- Problem Statement Data ---
interface ProblemStatement {
  psid: string;
  domain: 'Open Innovation' | 'Embedded and IOT' | 'Campus Innovation' | 'VLSI';
  subdomain?: string;
  title: string;
  department: string;
  category: string;
  theme: string;
  description: string;
}

const problemStatements: ProblemStatement[] = [
  {
    psid: 'SYM0101',
    domain: 'VLSI',
    subdomain: 'VLSI & FPGA',
    title: 'FPGA-Based Intelligent Traffic Light Controller with Emergency & Pedestrian Priority',
    department: 'Electronics & Communication Engineering',
    category: 'Hardware Design',
    theme: 'Smart Traffic Management / FPGA',
    description: `Design and implement an FPGA-based smart traffic light controller that dynamically controls traffic signals based on different conditions. The system must support emergency vehicle override and pedestrian crossing requests.`
  },
  {
    psid: 'SYM0102',
    domain: 'VLSI',
    subdomain: 'VLSI & FPGA',
    title: 'FPGA-Based FIR Filter for Real-Time Signal Processing',
    department: 'Electronics & Communication Engineering',
    category: 'Digital Signal Processing',
    theme: 'Real-Time Processing / FPGA',
    description: `Design and implement a Finite Impulse Response (FIR) digital filter using FPGA hardware to process real-time input data such as audio or sensor signals. The design should demonstrate filtering capability such as noise reduction or smoothing.`
  },
  {
    psid: 'SYM0103',
    domain: 'VLSI',
    subdomain: 'VLSI & FPGA',
    title: 'FPGA-Based Hardware Accelerator for Encryption and Decryption',
    department: 'Electronics & Communication Engineering',
    category: 'Hardware Security',
    theme: 'Hardware Acceleration / Cybersecurity',
    description: `Design and implement a hardware accelerator on FPGA to perform high-speed data encryption and decryption. The system should demonstrate faster performance compared to software-based execution by using parallel hardware architecture.`
  },
  {
    psid: 'SYM0104',
    domain: 'VLSI',
    subdomain: 'VLSI & FPGA',
    title: 'FPGA-Based Pulse Width Modulation (PWM) Controller Design',
    department: 'Electronics & Communication Engineering',
    category: 'Power Electronics',
    theme: 'Motor Control / Hardware',
    description: `Design and implement a Pulse Width Modulation (PWM) controller using FPGA. The controller should generate PWM signals with configurable duty cycle and frequency, suitable for motor control, LED dimming, or power electronics applications.`
  },
  {
    psid: 'SYM0105',
    domain: 'VLSI',
    subdomain: 'VLSI & FPGA',
    title: 'Open-Source Hardware Challenge (Task Assigned Before Hackathon)',
    department: 'Electronics & Communication Engineering',
    category: 'Open Source Hardware',
    theme: 'Open Source / FPGA implementation',
    description: `A participants should come with open-source.Tasks on FPGA implementation using open source will be assigned to participants before the 24-hour hackathon.`
  },
  {
    psid: 'SYM0006',
    domain: 'Embedded and IOT',
    title: 'Design and implement a hardware-assisted system capable of detecting and mitigating Distributed Denial-of-Service (DDoS) attacks targeting cloud-hosted services.',
    department: 'Computer Networks & Embedded Systems',
    category: 'Cybersecurity',
    theme: 'Network Security / Cloud Infrastructure Protection',
    description: `Distributed Denial-of-Service (DDoS) attacks are one of the most common threats against cloud infrastructure and online services.

Participants must design an embedded hardware-assisted system capable of detecting abnormal traffic patterns and mitigating potential DDoS attacks before they disrupt services.

The system should:
• Monitor network traffic in real time
• Identify abnormal traffic spikes or attack patterns
• Trigger mitigation actions automatically
• Ensure minimal downtime for cloud-hosted services`
  },
  {
    psid: 'SYM0007',
    domain: 'Embedded and IOT',
    title: 'Develop a system that detects sensitive personal information in uploaded documents and alerts users before the data is shared or stored.',
    department: 'Information Security',
    category: 'Software / AI Security',
    theme: 'Data Privacy / Digital Security',
    description: `Sensitive personal information such as Aadhaar numbers, PAN details, or driving license data can be unintentionally exposed when documents are uploaded to digital platforms.

Participants must develop a system that automatically scans uploaded documents and detects the presence of sensitive personal data.

The system should:
• Analyze document content using pattern recognition or AI
• Detect identifiers such as Aadhaar, PAN, or license numbers
• Alert users before storing or sharing the document
• Provide suggestions for masking or removing sensitive information`
  },
  {
    psid: 'SYM1008',
    domain: 'Campus Innovation',
    title: 'Develop a tool that automatically identifies critical vulnerabilities published on OEM websites.',
    department: 'Cybersecurity Research',
    category: 'Software',
    theme: 'Vulnerability Intelligence / Security Automation',
    description: `Many technology vendors publish security advisories and vulnerability disclosures on their official websites. However, tracking these updates manually can be difficult for organizations.

Participants must develop a tool that automatically scans OEM websites for newly published vulnerability disclosures.

The system should:
• Continuously monitor vendor security advisory pages
• Extract vulnerability information automatically
• Notify security teams about newly discovered vulnerabilities
• Provide categorized and searchable vulnerability reports`
  },
  {
    psid: 'SYM1009',
    domain: 'Campus Innovation',
    title: 'Create a tool that audits Windows and Linux systems according to CIS security benchmarks.',
    department: 'Information Security',
    category: 'Software',
    theme: 'System Security / Compliance Automation',
    description: `The Center for Internet Security (CIS) publishes security benchmarks that define best practices for configuring operating systems securely.

Participants must develop a tool that audits Windows and Linux systems against CIS benchmark guidelines.

The tool should:
• Scan system configurations automatically
• Compare settings with CIS benchmark recommendations
• Generate compliance reports
• Suggest remediation steps for security improvements`
  }
];

const DOMAINS = ['All', 'Embedded and IOT', 'VLSI', 'Campus Innovation', 'Open Innovation'] as const;

const domainBadgeClass: Record<string, string> = {
  'Open Innovation': 'ps-badge-vlsi',
  'VLSI': 'ps-badge-vlsi',
  'Embedded and IOT': 'ps-badge-embedded',
  'Campus Innovation': 'ps-badge-campus',
};

interface ProblemStatementsProps {
  initialFilter?: string;
}

/**
 * Renders description text with support for paragraphs and bullet points.
 * Lines starting with • are rendered as list items.
 */
function renderDescription(text: string) {
  const blocks = text.split('\n\n');
  const elements: React.ReactNode[] = [];

  blocks.forEach((block, bIdx) => {
    const lines = block.split('\n');
    const bulletLines: string[] = [];
    const textLines: string[] = [];

    lines.forEach(line => {
      if (line.trim().startsWith('•')) {
        bulletLines.push(line.trim().replace(/^•\s*/, ''));
      } else {
        // If we already collected bullets, flush them first
        if (bulletLines.length > 0) {
          // This shouldn't happen within a block, but handle gracefully
        }
        textLines.push(line);
      }
    });

    // Render text lines as a paragraph (if not only a header for bullets)
    const pureText = textLines.filter(l => !l.endsWith(':')).join(' ');
    const headerText = textLines.filter(l => l.endsWith(':')).join(' ');

    if (pureText.trim()) {
      elements.push(<p key={`p-${bIdx}`}>{pureText}</p>);
    }

    if (headerText.trim()) {
      elements.push(<p key={`h-${bIdx}`} className="ps-desc-subheading">{headerText}</p>);
    }

    if (bulletLines.length > 0) {
      elements.push(
        <ul key={`ul-${bIdx}`} className="ps-desc-bullets">
          {bulletLines.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    }
  });

  return elements;
}

const branches = [
  "Select Branch",
  "ECE",
  "CSE / ISE",
  "EEE",
  "Mechanical",
  "Civil",
  "Other"
];

const interests = [
  "Select Interest",
  "Hardware Mapping / VLSI",
  "Software & Web Dev",
  "Cybersecurity & Networks",
  "IoT & Embedded",
  "Open Source & General Innovation"
];

const ProblemStatements: React.FC<ProblemStatementsProps> = ({ initialFilter }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(null);

  // Recommendations state
  const [userBranch, setUserBranch] = useState(branches[0]);
  const [userInterest, setUserInterest] = useState(interests[0]);
  const [recommendedResults, setRecommendedResults] = useState<ProblemStatement[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleRecommend = () => {
    if (userBranch === "Select Branch" || userInterest === "Select Interest") {
      setHasSearched(false);
      setRecommendedResults([]);
      return;
    }

    setIsSearching(true);
    setHasSearched(false);

    let scoredList = problemStatements.map(ps => {
      let score = 0;
      const t = `${ps.title} ${ps.description} ${ps.category} ${ps.department} ${ps.theme} ${ps.domain}`.toLowerCase();
      
      const bStr = userBranch.toLowerCase();
      const iStr = userInterest.toLowerCase();

      // Branch scoring
      if (bStr === "ece" && (t.includes("electronic") || t.includes("vlsi") || t.includes("hardware") || t.includes("embedded"))) score += 3;
      if (bStr.includes("cse") && (t.includes("software") || t.includes("cybersecurity") || t.includes("network") || t.includes("cloud"))) score += 3;
      if (bStr === "eee" && (t.includes("power") || t.includes("motor") || t.includes("hardware"))) score += 2;
      
      // Interest scoring
      if (iStr.includes("hardware") && (t.includes("hardware") || t.includes("fpga") || t.includes("vlsi"))) score += 5;
      if (iStr.includes("software") && (t.includes("software") || t.includes("tool"))) score += 5;
      if (iStr.includes("cyber") && (t.includes("security") || t.includes("ddos") || t.includes("vulnerabil"))) score += 5;
      if (iStr.includes("iot") && (t.includes("iot") || t.includes("embedded") || t.includes("sensor"))) score += 5;
      if (iStr.includes("open") && t.includes("open-source")) score += 5;

      // Bonus if highly relevant
      if (t.includes(bStr)) score += 1;
      
      return { ps, score };
    });

    scoredList.sort((a, b) => b.score - a.score);
    
    // Top 3 positive score matches
    const topMatches = scoredList.filter(item => item.score > 0).slice(0, 3).map(i => i.ps);
    
    setTimeout(() => {
        setRecommendedResults(topMatches.length > 0 ? topMatches : problemStatements.slice(0, 3));
        setIsSearching(false);
        setHasSearched(true);
    }, 600);
  };

  // Apply initial filter from navbar dropdown
  useEffect(() => {
    if (initialFilter && DOMAINS.includes(initialFilter as any)) {
      setActiveFilter(initialFilter);
    }
  }, [initialFilter]);

  const filteredStatements = useMemo(() => {
    let result = problemStatements;

    // Domain filter
    if (activeFilter !== 'All') {
      result = result.filter(ps => ps.domain === activeFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(ps =>
        ps.psid.toLowerCase().includes(q) ||
        ps.domain.toLowerCase().includes(q) ||
        ps.title.toLowerCase().includes(q) ||
        ps.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeFilter, searchQuery]);

  const openModal = (ps: ProblemStatement) => {
    setSelectedPS(ps);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedPS(null);
    document.body.style.overflow = '';
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <section id="problem-statements" className="section ps-section">
      <div className="section-header">
        <h2 className="section-title">
          Explore <span className="text-gradient">Problem Statements</span>
        </h2>
        <p className="section-subtitle">
          Tackle curated challenges designed to impact the real world.
        </p>
        <p className="section-subtitle" style={{ color: '#00f0ff', marginTop: '0.5rem', fontWeight: 'bold', fontSize: '1rem' }}>
          * More problem statements will be added today!
        </p>
      </div>



      {/* Sticky Filters & Search */}

      <div className="ps-controls-sticky">
        <div className="ps-controls">
          <div className="ps-filters">
            {DOMAINS.map(domain => (
              <button
                key={domain}
                className={`ps-filter-btn ${activeFilter === domain ? 'active' : ''}`}
                onClick={() => setActiveFilter(domain)}
              >
                {domain}
              </button>
            ))}
          </div>
          <div className="ps-search-wrapper">
            <svg className="ps-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="ps-search"
              placeholder="Search by PSID, Domain, or Keywords"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {activeFilter === 'Open Innovation' ? (
        <div className="open-innovation-view" style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '16px', margin: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', border: '1px solid rgba(0, 240, 255, 0.3)', boxShadow: '0 0 30px rgba(0, 240, 255, 0.1)' }}>
          <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', margin: 0, background: 'linear-gradient(90deg, #fff, #00f0ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '800', lineHeight: '1.2' }}>
            No limits. Just innovation.<br/>This is where you shine. 🚀
          </h3>
          <p style={{ fontSize: '1.15rem', maxWidth: '800px', margin: '0', color: '#e2e8f0', lineHeight: '1.6' }}>
            Build anything you want — AI, apps, web platforms, embedded systems, hardware innovations, or hybrid solutions.
          </p>
          <p style={{ fontSize: '1.15rem', maxWidth: '800px', margin: '0', color: '#e2e8f0', lineHeight: '1.6' }}>
            Bring your own problem statement or pick one and go all in.
          </p>
          <p style={{ fontSize: '1.15rem', maxWidth: '800px', margin: '0', color: '#e2e8f0', lineHeight: '1.6' }}>
            Whether it's code, circuits, or a fusion of both, if it’s innovative, it belongs here.
          </p>
          <a href={`${import.meta.env.BASE_URL}PPT_template/SYMBIOT_2026_OPEN_PPT.pptx`} download="SYMBIOT_2026_OPEN_PPT.pptx" className="btn btn-primary" style={{ marginTop: '1.5rem', fontSize: '1.1rem', padding: '1rem 2.5rem', background: 'linear-gradient(135deg, #00f0ff, #007bb5)', border: 'none', boxShadow: '0 4px 15px rgba(0,240,255,0.4)', color: '#fff' }}>
            Download Open Innovation PPT
          </a>
        </div>
      ) : (
      <>
      {/* Results count */}
      <div className="ps-results-count">
        Showing <span>{filteredStatements.length}</span> of <span>{problemStatements.length}</span> problem statements
      </div>

      {/* Desktop Table */}
      <div className="ps-table-wrapper">
        <table className="ps-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Domain</th>
              <th>Problem Statement</th>
              <th>PSID</th>
              <th>No of Submissions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredStatements.length === 0 ? (
              <tr className="ps-empty-row">
                <td colSpan={6}>
                  <div className="ps-empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                    <p>No problem statements found matching your criteria.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStatements.map((ps, idx) => (
                <tr key={ps.psid} className="ps-row" onClick={() => openModal(ps)}>
                  <td className="ps-sl">{idx + 1}</td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', alignItems: 'flex-start' }}>
                      <span className={`ps-badge ${domainBadgeClass[ps.domain]}`}>
                        {ps.domain}
                      </span>
                      {ps.subdomain && (
                        <span className="ps-badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
                          {ps.subdomain}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="ps-title-cell">{ps.title}</td>
                  <td className="ps-psid">{ps.psid}</td>
                  <td className="ps-submissions">0</td>
                  <td className="ps-row-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="ps-cards-mobile">
        {filteredStatements.length === 0 ? (
          <div className="ps-empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <p>No problem statements found matching your criteria.</p>
          </div>
        ) : (
          filteredStatements.map((ps) => (
            <div key={ps.psid} className="ps-card" onClick={() => openModal(ps)}>
              <div className="ps-card-header">
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span className={`ps-badge ${domainBadgeClass[ps.domain]}`}>
                    {ps.domain}
                  </span>
                  {ps.subdomain && (
                    <span className="ps-badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                      {ps.subdomain}
                    </span>
                  )}
                </div>
                <span className="ps-card-psid">{ps.psid}</span>
              </div>
              <h4 className="ps-card-title">{ps.title}</h4>
              <div className="ps-card-submissions-mobile">
                <span className="ps-sub-label">Submissions:</span>
                <span className="ps-sub-value">0</span>
              </div>
              <div className="ps-card-footer">
                <span className="ps-card-view">View Details</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))
        )}
      </div>
      </>
      )}

      {/* Recommender Section */}
      <div className="recommender-container">
        <h3 className="recommender-title">Didn't find a match? Find Your Perfect Problem Statement</h3>
        <p className="recommender-subtitle">Tell us your domain and interests, and we'll suggest the best matches for your team.</p>
        
        <div className="recommender-form">
          <select 
            className="recommender-select" 
            value={userBranch} 
            onChange={(e) => setUserBranch(e.target.value)}
          >
            {branches.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <select 
            className="recommender-select" 
            value={userInterest} 
            onChange={(e) => setUserInterest(e.target.value)}
          >
            {interests.map(i => <option key={i} value={i}>{i}</option>)}
          </select>

          <button className={`btn ${isSearching ? 'btn-secondary' : 'btn-primary'} recommender-btn`} onClick={handleRecommend} disabled={isSearching}>
            {isSearching ? 'Analyzing...' : 'Find Match'}
          </button>
        </div>

        {hasSearched && recommendedResults.length > 0 && (
          <div className="recommender-results fade-in">
            <h4 className="recommender-results-title">🔥 Top Recommended For You</h4>
            <div className="ps-cards-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              {recommendedResults.map((ps) => (
                <div key={'rec-'+ps.psid} className="ps-card recommended-card-glow" onClick={() => openModal(ps)}>
                  <div className="ps-card-header">
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span className={`ps-badge ${domainBadgeClass[ps.domain]}`}>
                        {ps.domain}
                      </span>
                      {ps.subdomain && (
                        <span className="ps-badge" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                          {ps.subdomain}
                        </span>
                      )}
                    </div>
                    <span className="ps-card-psid">{ps.psid}</span>
                  </div>
                  <h4 className="ps-card-title">{ps.title}</h4>
                  <div className="ps-card-footer">
                    <span className="ps-card-view">View Details</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href={`${import.meta.env.BASE_URL}PPT_template/SYMBIOT_2026_OPEN_PPT.pptx`} 
                download="SYMBIOT_2026_OPEN_PPT.pptx" 
                className="btn btn-primary"
                style={{ background: 'linear-gradient(135deg, #00f0ff, #007bb5)', border: 'none', color: '#fff', boxShadow: '0 4px 15px rgba(0,240,255,0.3)' }}
              >
                Make Your Own Problem Statement
              </a>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setHasSearched(false);
                  document.getElementById('problem-statements')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View All Statements ↓
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Modal — SIH-style structured detail view */}
      {selectedPS && (
        <div className="ps-modal-overlay" onClick={closeModal}>
          <div className="ps-modal" onClick={e => e.stopPropagation()}>
            <button className="ps-modal-close" onClick={closeModal} aria-label="Close">
              ✕
            </button>
            <div className="ps-modal-scroll">
              {/* Problem Statement ID */}
              <div className="ps-modal-id-label">Problem Statement ID</div>
              <div className="ps-modal-id-value">{selectedPS.psid}</div>

              {/* Title */}
              <div className="ps-modal-field-label">Problem Statement Title</div>
              <h3 className="ps-modal-title">{selectedPS.title}</h3>

              {/* Domain Badge */}
              <div className="ps-modal-field-label">Domain Bucket</div>
              <div className="ps-modal-domain-row">
                <span className={`ps-badge ps-badge-lg ${domainBadgeClass[selectedPS.domain]}`}>
                  {selectedPS.domain}
                </span>
                {selectedPS.subdomain && (
                  <span className="ps-badge ps-badge-secondary ps-badge-lg" style={{ marginLeft: '1rem', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {selectedPS.subdomain}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="ps-modal-field-label">Description</div>
              <div className="ps-modal-description">
                {renderDescription(selectedPS.description)}
              </div>

              {/* Meta Grid — Department, Category, Theme */}
              <div className="ps-modal-meta-grid">
                <div className="ps-modal-meta-item">
                  <span className="ps-meta-label">Department</span>
                  <span className="ps-meta-value">{selectedPS.department}</span>
                </div>
                <div className="ps-modal-meta-item">
                  <span className="ps-meta-label">Category</span>
                  <span className="ps-meta-value">{selectedPS.category}</span>
                </div>
                <div className="ps-modal-meta-item">
                  <span className="ps-meta-label">Theme</span>
                  <span className="ps-meta-value">{selectedPS.theme}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProblemStatements;
