import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';

// --- Shortlisted Team Data ---
interface ShortlistedTeam {
  teamName: string;
  leader: string;
  domain: 'HARDWARE' | 'SOFTWARE' | 'VLSI' | 'CAMPUS INNOVATION' | 'WAITLISTED';
  status: 'SHORTLISTED' | 'WAITLISTED' | 'NOT SELECTED';
}

// Initial data
const shortlistedTeams: ShortlistedTeam[] = [
  { teamName: 'innovHER', leader: 'Rakshitha C M', domain: 'CAMPUS INNOVATION', status: 'SHORTLISTED' },
  { teamName: 'StatusSync', leader: 'Nihal Datta K P', domain: 'CAMPUS INNOVATION', status: 'SHORTLISTED' },
  { teamName: 'infiniteNeurons', leader: 'Ullas B R', domain: 'CAMPUS INNOVATION', status: 'SHORTLISTED' },
  { teamName: 'Tech Titans', leader: 'Bharath Kumar R', domain: 'CAMPUS INNOVATION', status: 'SHORTLISTED' },
  { teamName: 'Hacktivists', leader: 'Nishanth S', domain: 'CAMPUS INNOVATION', status: 'SHORTLISTED' },
  { teamName: 'Team Vortex', leader: 'Yashwanth N', domain: 'CAMPUS INNOVATION', status: 'SHORTLISTED' },
  { teamName: 'Gmu Spark', leader: 'Poornima B', domain: 'CAMPUS INNOVATION', status: 'SHORTLISTED' },
  { teamName: 'DebugLeaf', leader: 'Karthik M', domain: 'CAMPUS INNOVATION', status: 'WAITLISTED' },
  { teamName: 'The Mind Mesh', leader: 'Likhitha C K', domain: 'VLSI', status: 'SHORTLISTED' },
  { teamName: 'Silicon Syndicate', leader: 'Dhruthika R', domain: 'VLSI', status: 'SHORTLISTED' },
  { teamName: 'CtrlAltDefeat', leader: 'Chinmay Karthik', domain: 'VLSI', status: 'SHORTLISTED' },
  { teamName: 'Digital Dynamos', leader: 'Prasad B', domain: 'VLSI', status: 'SHORTLISTED' },
  { teamName: 'Bumblebee', leader: 'Prarthana Mh', domain: 'VLSI', status: 'SHORTLISTED' },
  { teamName: 'Logicode', leader: 'Kb Maithri', domain: 'VLSI', status: 'SHORTLISTED' },
  { teamName: 'Phoenix', leader: 'Kavana S R', domain: 'VLSI', status: 'SHORTLISTED' },
  { teamName: 'Vitality', leader: 'Krishna M', domain: 'VLSI', status: 'SHORTLISTED' },
  { teamName: 'BitFlow', leader: 'Manya K', domain: 'VLSI', status: 'SHORTLISTED' },
  { teamName: 'CipherX', leader: 'Yashwanth K', domain: 'VLSI', status: 'SHORTLISTED' },
  { teamName: '405 Found', leader: 'Yashas Kumar R', domain: 'VLSI', status: 'SHORTLISTED' },
  { teamName: 'Amplifiers', leader: 'Shreeharsha D S', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'idea forge', leader: 'shriya srinivas', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Yugmatech', leader: 'Ananya Anilkumar', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Code4Cure', leader: 'Chandan S', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Dose Track', leader: 'Prithvik Raju Naik', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: '4_bit', leader: 'Girish MP', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Project HERA', leader: 'Nahida Firdous', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Techives', leader: 'Shiva Prasad M B', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Team conquerors', leader: 'C N PRATHAM', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Ai avengers', leader: 'PUNYASHREE', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: '3Bytes', leader: 'Devan Arya', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'BitVeda', leader: 'Sujith', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Quadcore Titans', leader: 'Vineeth Kumar', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Short Circuit', leader: 'Keerthana BL', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Quadron', leader: 'Adarsh M B', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Innovators', leader: 'Tanny ub', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'TrustiX', leader: 'H B Shivani', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Team Bravo', leader: 'Katte Harshitha', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'CareNet', leader: 'Bhavani M', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'MedMatrix', leader: 'Dheeraj Achar H', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Team Virus', leader: 'MAHESHA M', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'NatureX', leader: 'SAMARTH S', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Toxic Trace', leader: 'Shrilalitha M', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Quadsync', leader: 'Monish P', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'INFINITE IGNITY', leader: 'Impana H N', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'RescueX', leader: 'Yashwanth N', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'infinite solutions', leader: 'Anush Rao D', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Agrobot', leader: 'Swathi Vishwanath', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'PeaceOps', leader: 'Akshath Acharya N', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'vvcians', leader: 'R Shreya', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Chanukya\'s', leader: 'Chandana S Gowda', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'CTRLELITE', leader: 'Anurag Rawat', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Guardian Medics', leader: 'Deepikashree KR', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'The Mind Mesh', leader: 'Sanjay A', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'AURALIS', leader: 'Dhanush R', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'Lumina', leader: 'Hema Rashmi S', domain: 'HARDWARE', status: 'SHORTLISTED' },
  { teamName: 'AlgoRangers', leader: 'Ayush N P', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Devsquad', leader: 'Harshan H B', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Code Aeternum', leader: 'Mohammed Zayid Khan', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'GenCodez', leader: 'Rithvik S', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Dev titans', leader: 'MADAN B R', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'ByteX', leader: 'Shreyas SH', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'TradeMint', leader: 'Satvik D B', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'PrivacyX', leader: 'Vikas BU', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'CodeVeda', leader: 'SRUSHTI SHASHIKANT PATIL', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'The Devdragons', leader: 'V Mathan Kumar', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Vikings', leader: 'Aditya', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Elites', leader: 'Abhishek G Rao', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'EcoLogic', leader: 'Gagan K S', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'CodeX', leader: 'Ravikumar Hugar', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'FutureMinds', leader: 'Rachitha Kamath', domain: 'SOFTWARE', status: 'SHORTLISTED' },

  { teamName: 'Hack Dominators', leader: 'Milan Raj', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Connected creators', leader: 'Sneha G C', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'CodeCreators', leader: 'POORNIMA N', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'CodeRed', leader: 'SNEHA R', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Aura Setters', leader: 'Ganavi KP', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Nexa', leader: 'Chandana NM', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'HacktoWin', leader: 'Hemalatha L', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Spark Igniters', leader: 'Pushpa dc', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Herb Trace', leader: 'Raksha A R', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Codebase', leader: 'Nithin D', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'GOALDTECH', leader: 'Dhanushiya S', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Vision Stack', leader: 'Varnika EC', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'InnovX', leader: 'Aimanz Sarwad Sarwad', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'TCA', leader: 'Shravani D', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'DSE', leader: 'PRAJWAL MATHS', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'CODE BREAKERS', leader: 'SRIVALLI S SHARMA', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Jungly Billi', leader: 'Zidane Contractor', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Alive', leader: 'D S Chirag', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Algorythm', leader: 'TUSHAR MV', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Pulse_X', leader: 'Arjun M', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'ESTATESYNC', leader: 'Vikas P Vishwakarma', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'team syntax addicts', leader: 'Ahmed Faraaz', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'neural forge', leader: 'ahmed faraaz', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'TECHNO SQUAD', leader: 'Dhanush R S', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Infra Sentinel', leader: 'Chinmay C P CP', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'JACKCODERS', leader: 'Neil Mascarenhas', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Hashiras', leader: 'Mohamed mansoor khateeb', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Genz innovators', leader: 'Rachana P', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'GEC CHAMARAJAN', leader: 'Ishank Mourya Mourya', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Medirush', leader: 'Swati B parshi', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Binary brains', leader: 'Sanjana K G', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'Neural Ninjas', leader: 'VINAY M', domain: 'WAITLISTED', status: 'WAITLISTED' },
  { teamName: 'Kaizen', leader: 'Chiranthan M S', domain: 'WAITLISTED', status: 'WAITLISTED' },
  { teamName: 'VoltNexus', leader: 'Mohamed Arif M', domain: 'WAITLISTED', status: 'WAITLISTED' },
  { teamName: 'Think Quest', leader: 'Punith', domain: 'WAITLISTED', status: 'WAITLISTED' },
  { teamName: 'Vision Coders', leader: 'Priyanka S K', domain: 'SOFTWARE', status: 'SHORTLISTED' },
  { teamName: 'NeuroFlex', leader: 'Granthini CA', domain: 'WAITLISTED', status: 'WAITLISTED' },
  { teamName: 'DebugLeaf', leader: 'Karthik M', domain: 'WAITLISTED', status: 'WAITLISTED' },
  { teamName: 'Rookies', leader: 'Prajwal Goni', domain: 'WAITLISTED', status: 'WAITLISTED' },
  { teamName: 'pink panthers', leader: 'SINDHU H M', domain: 'WAITLISTED', status: 'WAITLISTED' },

  { teamName: 'SquadBytes', leader: 'GNANA RAVANDUR PRAKASH', domain: 'WAITLISTED', status: 'WAITLISTED' },
  { teamName: 'Team404', leader: 'Dhanush urs', domain: 'WAITLISTED', status: 'WAITLISTED' },
  { teamName: 'Phoenix A*', leader: 'Madhukeshwar Shripad Hegde', domain: 'WAITLISTED', status: 'WAITLISTED' },
  { teamName: 'Data dynamos', leader: 'Anirudh Pai', domain: 'WAITLISTED', status: 'WAITLISTED' },
  { teamName: 'Herb_Ledger', leader: 'Pranamya R', domain: 'WAITLISTED', status: 'WAITLISTED' },
  { teamName: 'Curly Braces', leader: 'Tarun S G', domain: 'WAITLISTED', status: 'WAITLISTED' }
];

const DOMAINS = ['ALL', 'HARDWARE', 'SOFTWARE', 'VLSI', 'CAMPUS INNOVATION', 'WAITLISTED'] as const;

const domainBadgeClass: Record<string, string> = {
  'HARDWARE': 'ps-badge-embedded',
  'SOFTWARE': 'ps-badge-software',
  'VLSI': 'ps-badge-vlsi',
  'CAMPUS INNOVATION': 'ps-badge-campus',
  'WAITLISTED': 'ps-badge-software',
};

const statusBadgeStyle = (status: 'SHORTLISTED' | 'WAITLISTED' | 'NOT SELECTED') => {
  let bgColor = '';
  let textColor = '';
  let borderColor = '';
  let shadowColor = '';

  if (status === 'SHORTLISTED') {
    bgColor = 'rgba(34, 197, 94, 0.15)';
    textColor = '#4ade80';
    borderColor = 'rgba(34, 197, 94, 0.4)';
    shadowColor = 'rgba(34, 197, 94, 0.2)';
  } else if (status === 'WAITLISTED') {
    bgColor = 'rgba(250, 204, 21, 0.15)';
    textColor = '#fde047';
    borderColor = 'rgba(250, 204, 21, 0.4)';
    shadowColor = 'rgba(250, 204, 21, 0.2)';
  } else {
    bgColor = 'rgba(239, 68, 68, 0.15)';
    textColor = '#f87171';
    borderColor = 'rgba(239, 68, 68, 0.4)';
    shadowColor = 'rgba(239, 68, 68, 0.2)';
  }

  return {
    display: 'inline-block',
    padding: '0.25rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    borderRadius: '9999px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
    backgroundColor: bgColor,
    color: textColor,
    border: `1px solid ${borderColor}`,
    boxShadow: `0 0 10px ${shadowColor}`
  };
};

interface ShortlistedTeamsProps {
  initialFilter?: string;
}

const ShortlistedTeams: React.FC<ShortlistedTeamsProps> = ({ initialFilter }) => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    if (initialFilter) {
      setActiveFilter(initialFilter);
    }
  }, [initialFilter]);

  const [searchQuery, setSearchQuery] = useState('');

  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  // Filter scroll navigation for mobile
  const filtersRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollArrows = useCallback(() => {
    const el = filtersRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    const el = filtersRef.current;
    if (!el || !isMobileView) return;
    updateScrollArrows();
    el.addEventListener('scroll', updateScrollArrows, { passive: true });
    window.addEventListener('resize', updateScrollArrows);
    return () => {
      el.removeEventListener('scroll', updateScrollArrows);
      window.removeEventListener('resize', updateScrollArrows);
    };
  }, [isMobileView, updateScrollArrows]);

  const scrollFilters = (direction: 'left' | 'right') => {
    const el = filtersRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -160 : 160;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const handleCheck = (e: any) => setIsMobileView(e.matches);
    setIsMobileView(mql.matches);
    mql.addEventListener('change', handleCheck);
    return () => mql.removeEventListener('change', handleCheck);
  }, []);

  const filteredTeams = useMemo(() => {
    let result = [...shortlistedTeams];

    // Domain filter
    if (activeFilter !== 'ALL') {
      result = result.filter(team => team.domain === activeFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(team =>
        team.teamName.toLowerCase().includes(q) ||
        team.leader.toLowerCase().includes(q) ||
        team.domain.toLowerCase().includes(q)
      );
    }

    // Sort by status priority
    const statusPriority = {
      'SHORTLISTED': 1,
      'WAITLISTED': 2,
      'NOT SELECTED': 3
    };

    result.sort((a, b) => statusPriority[a.status] - statusPriority[b.status]);

    return result;
  }, [activeFilter, searchQuery]);

  return (
    <section id="shortlisted-teams" className="section ps-section" onClick={(e) => e.stopPropagation()}>
      <div className="section-header">
        <h2 className="section-title">
          <span className="text-gradient">Shortlisted Teams</span> <span style={{ fontSize: '1.5rem', verticalAlign: 'middle', textShadow: 'none' }}>🏆</span>
        </h2>
        <p className="section-subtitle">
          Recognizing top-performing teams selected for the next stage.
        </p>
        <p className="section-subtitle" style={{ color: '#00f0ff', marginTop: '0.5rem', fontWeight: 'bold', fontSize: '1rem', textShadow: '0 0 10px rgba(0, 240, 255, 0.4)' }}>
          ✨ Results announced. Congratulations to all shortlisted teams!
        </p>
        {activeFilter === 'WAITLISTED' && (
          <p className="section-subtitle" style={{ color: '#fde047', marginTop: '0.5rem', fontWeight: 'bold', fontSize: '0.95rem', textShadow: '0 0 10px rgba(250, 204, 21, 0.4)' }}>
            ⏳ Reserve / Backup Teams — These teams are on the waitlist and may be promoted.
          </p>
        )}
      </div>

      <div className="ps-controls-sticky" style={isMobileView ? { position: 'relative', top: 'auto', background: 'rgba(12, 15, 30, 0.98)', padding: '0.75rem 1rem', margin: '0 -1rem', borderBottom: '1px solid rgba(0, 240, 255, 0.15)' } : undefined}>
        <div className="ps-controls">
          {/* Filter row */}
          <div className="ps-filters-nav-wrapper">
            {isMobileView && canScrollLeft && (
              <button
                className="ps-filter-arrow ps-filter-arrow-left"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollFilters('left'); }}
                aria-label="Scroll results filters left"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}
            <div
              className="ps-filters"
              ref={filtersRef}
              style={isMobileView ? { display: 'flex', flexWrap: 'nowrap', overflowX: 'auto', gap: '0.5rem', paddingBottom: '6px', scrollbarWidth: 'none', scrollBehavior: 'smooth' } : undefined}
            >
              {DOMAINS.map(domain => {
                const isWaitlisted = domain === 'WAITLISTED';
                const isActive = activeFilter === domain;
                return (
                  <button
                    key={domain}
                    type="button"
                    className={`ps-filter-btn ${isActive ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveFilter(domain);
                    }}
                    style={isMobileView ? {
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                      padding: '0.5rem 1rem',
                      fontSize: '0.8rem',
                      border: isActive
                        ? (isWaitlisted ? '1.5px solid #fde047' : '1.5px solid #00f0ff')
                        : (isWaitlisted ? '1.5px solid rgba(250, 204, 21, 0.4)' : '1.5px solid rgba(0, 240, 255, 0.4)'),
                      background: isActive
                        ? (isWaitlisted ? 'rgba(250, 204, 21, 0.18)' : 'rgba(0, 240, 255, 0.18)')
                        : (isWaitlisted ? 'rgba(250, 204, 21, 0.06)' : 'rgba(0, 240, 255, 0.06)'),
                      color: isWaitlisted ? '#fde047' : '#fff',
                      borderRadius: '6px',
                    } : (
                      isWaitlisted ? {
                        border: isActive ? '1.5px solid #fde047' : '1.5px solid rgba(250, 204, 21, 0.4)',
                        background: isActive ? 'rgba(250, 204, 21, 0.18)' : 'rgba(250, 204, 21, 0.06)',
                        color: '#fde047',
                        boxShadow: isActive ? '0 0 12px rgba(250, 204, 21, 0.3)' : 'none',
                      } : undefined
                    )}
                  >
                    {domain}
                  </button>
                );
              })}
            </div>
            {isMobileView && canScrollRight && (
              <button
                className="ps-filter-arrow ps-filter-arrow-right"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollFilters('right'); }}
                aria-label="Scroll results filters right"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </div>

          <div className="ps-search-wrapper">
            <svg className="ps-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="ps-search"
              placeholder="Search by Team Name, Leader, or Domain"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              style={isMobileView ? { border: '1.5px solid rgba(0, 240, 255, 0.35)', background: 'rgba(15, 23, 42, 0.8)', color: '#fff' } : undefined}
            />
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      {!isMobileView && (
        <div className="ps-table-wrapper">
          <table className="ps-table">
            <thead>
              <tr>
                <th>SL NO</th>
                <th>TEAM NAME</th>
                <th>TEAM LEADER</th>
                <th>DOMAIN</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.length === 0 ? (
                <tr className="ps-empty-row">
                  <td colSpan={5}>
                    <div className="ps-empty-state">
                      <p style={{ fontSize: '1.15rem', color: '#00f0ff', textShadow: '0 0 10px rgba(0, 240, 255, 0.3)', fontWeight: '500' }}>
                        No teams shortlisted yet. Stay tuned for results!
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTeams.map((team, idx) => (
                  <tr key={idx} className="ps-row" style={{ cursor: 'default' }}>
                    <td className="ps-sl">{idx + 1}</td>
                    <td className="ps-title-cell" style={{ fontWeight: '600' }}>{team.teamName}</td>
                    <td className="ps-psid" style={{ color: '#e2e8f0' }}>{team.leader}</td>
                    <td>
                      <span className={`ps-badge ${domainBadgeClass[team.domain]}`}>
                        {team.domain}
                      </span>
                    </td>
                    <td>
                      <span style={statusBadgeStyle(team.status)}>
                        {team.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Mobile Card View */}
      {isMobileView && (
        <div className="ps-cards-mobile">
          {filteredTeams.length === 0 ? (
            <div className="ps-empty-state" style={{ padding: '3rem 1rem' }}>
              <p style={{ fontSize: '1.1rem', color: '#00f0ff', textShadow: '0 0 10px rgba(0, 240, 255, 0.3)', fontWeight: '500', textAlign: 'center' }}>
                No teams shortlisted yet. Stay tuned for results!
              </p>
            </div>
          ) : (
            filteredTeams.map((team, idx) => (
              <div key={idx} className="ps-card" style={{ cursor: 'default' }}>
                <div className="ps-card-header" style={{ marginBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span className={`ps-badge ${domainBadgeClass[team.domain]}`}>
                      {team.domain}
                    </span>
                    <span style={{ ...statusBadgeStyle(team.status), fontSize: '0.65rem', padding: '0.2rem 0.5rem' }}>
                      {team.status}
                    </span>
                  </div>
                  <span className="ps-card-psid">#{idx + 1}</span>
                </div>
                <h4 className="ps-card-title" style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{team.teamName}</h4>
                <div className="ps-card-footer" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '0.8rem', marginTop: '0.5rem' }}>
                  <span className="ps-card-view" style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                    Leader: <span style={{ color: '#fff' }}>{team.leader}</span>
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

    </section>
  );
};

export default ShortlistedTeams;
