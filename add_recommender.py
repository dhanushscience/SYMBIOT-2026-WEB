import sys

with open('frontend/src/ProblemStatements.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Imports and State
state_str = '''const ProblemStatements: React.FC<ProblemStatementsProps> = ({ initialFilter }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(null);
'''

new_state_str = '''const branches = [
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
      const t = ${ps.title}     .toLowerCase();
      
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
'''

text = text.replace(state_str, new_state_str)

# 2. Recommender UI before ps-controls
recommender_ui = '''
      {/* Recommender Section */}
      <div className="recommender-container">
        <h3 className="recommender-title">Find Your Perfect Problem Statement</h3>
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

          <button className={tn  recommender-btn} onClick={handleRecommend} disabled={isSearching}>
            {isSearching ? 'Analyzing...' : 'Find Match'}
          </button>
        </div>

        {hasSearched && recommendedResults.length > 0 && (
          <div className="recommender-results fade-in">
            <h4 className="recommender-results-title">?? Top Recommended For You</h4>
            <div className="ps-cards-mobile" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              {recommendedResults.map((ps) => (
                <div key={'rec-'+ps.psid} className="ps-card recommended-card-glow" onClick={() => openModal(ps)}>
                  <div className="ps-card-header">
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span className={ps-badge }>
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
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setHasSearched(false);
                  document.getElementById('problem-statements')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View All Statements ?
              </button>
            </div>
          </div>
        )}
      </div>

      <SectionDivider />

      {/* Sticky Filters & Search */}
'''

text = text.replace('''      {/* Sticky Filters & Search */}''', recommender_ui)

with open('frontend/src/ProblemStatements.tsx', 'w', encoding='utf-8') as f:
    f.write(text)

with open('frontend/src/style.css', 'a', encoding='utf-8') as f:
    f.write('''

/* -----------------------------------------------
   RECOMMENDER ENGINE STYLES
   ----------------------------------------------- */
.recommender-container {
  background: linear-gradient(135deg, rgba(16, 24, 46, 0.8) 0%, rgba(10, 16, 32, 0.9) 100%);
  border: 1px solid rgba(0, 240, 255, 0.2);
  border-radius: 20px;
  padding: 3rem 2rem;
  max-width: 1000px;
  margin: 0 auto 3rem;
  text-align: center;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 240, 255, 0.05);
}

.recommender-title {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 0.5rem;
  font-family: 'Outfit', sans-serif;
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
}

.recommender-subtitle {
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  font-size: 1.05rem;
}

.recommender-form {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
}

.recommender-select {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 0.85rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Outfit', sans-serif;
  min-width: 280px;
  outline: none;
  transition: all 0.3s ease;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300f0ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;
}

.recommender-select:hover, .recommender-select:focus {
  border-color: var(--accent-cyan);
  box-shadow: 0 0 10px rgba(0, 240, 255, 0.2);
}

.recommender-select option {
  background: #0f172a;
  color: #fff;
  padding: 0.5rem;
}

.recommender-btn {
  min-width: 200px;
}

.recommender-results {
  margin-top: 3.5rem;
  padding-top: 3rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.15);
}

.recommender-results-title {
  color: var(--accent-yellow);
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.recommended-card-glow {
  border: 1.5px solid var(--accent-cyan) !important;
  box-shadow: 0 0 20px rgba(0, 240, 255, 0.2), inset 0 0 10px rgba(0, 240, 255, 0.05) !important;
  transform: translateY(-5px);
  text-align: left;
}

.recommended-card-glow:hover {
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.4), inset 0 0 15px rgba(0, 240, 255, 0.1) !important;
  transform: translateY(-10px);
}

@media (max-width: 768px) {
  .recommender-select {
    width: 100%;
    min-width: unset;
  }
  .recommender-btn {
    width: 100%;
  }
}
''')

print('Recommender updated')
