import re

with open('frontend/src/App.tsx', 'r', encoding='utf-8') as f:
    app_text = f.read()

# Trophy domains
app_text = app_text.replace(
'''  const trophyDomains = [
    { id: "embedded", name: "Embedded and IOT" },
    { id: "vlsi", name: "Open Innovation" },
    { id: "campus", name: "Campus Innovation" }
  ];''',
'''  const trophyDomains = [
    { id: "embedded", name: "Embedded and IOT", prize: "?25,000" },
    { id: "open", name: "Open Innovation", prize: "?12,500" },
    { id: "vlsi", name: "VLSI", prize: "?12,500" },
    { id: "campus", name: "Campus Innovation", prize: "?25,000" }
  ];'''
)

# Trophy Card Mapping
app_text = app_text.replace(
'''            <div className="trophy-container">
              {trophyDomains.map((t) => (
                <TrophyCard
                  key={t.id}
                  domain={t.name}
                  onClick={() => setActiveTrophy(t.name)}
                />
              ))}
            </div>''',
'''            <div className="trophy-container">
              {trophyDomains.map((t) => (
                <TrophyCard
                  key={t.id}
                  domain={t.name}
                  prizeAmount={t.prize}
                  onClick={() => setActiveTrophy(t.name)}
                />
              ))}
            </div>'''
)

# Modal Logic for split
app_text = app_text.replace(
'''        <h2 className="trophy-modal-title">{domain} {isExtraAward ? '' : <span>Winner</span>}</h2>
        <div className="trophy-modal-content">
          {!isExtraAward ? (
            <>
              <div className="prize-tier">
                <div className="prize-tier-header">
                  <h4>1st Prize</h4>
                  <span className="prize-amt">?15K</span>
                </div>
                <ul>
                  <li><span className="detail-check">?</span>?15,000 Cash Prize</li>
                  <li><span className="detail-check">?</span>IEEE Participation Certificate</li>
                  <li><span className="detail-check">?</span>Exciting Goodies</li>
                </ul>
              </div>
              <div className="prize-tier">
                <div className="prize-tier-header">
                  <h4>2nd Prize</h4>
                  <span className="prize-amt">?10K</span>
                </div>
                <ul>
                  <li><span className="detail-check">?</span>?10,000 Cash Prize</li>
                  <li><span className="detail-check">?</span>IEEE Participation Certificate</li>
                  <li><span className="detail-check">?</span>Exciting Goodies</li>
                </ul>
              </div>
            </>
          )''',
'''        <h2 className="trophy-modal-title">{domain} {isExtraAward ? '' : <span>Winner</span>}</h2>
        <div className="trophy-modal-content">
          {!isExtraAward ? (
            <>
              <div className="prize-tier">
                <div className="prize-tier-header">
                  <h4>1st Prize</h4>
                  <span className="prize-amt">{domain === 'Open Innovation' || domain === 'VLSI' ? '?10K' : '?15K'}</span>
                </div>
                <ul>
                  <li><span className="detail-check">?</span>{domain === 'Open Innovation' || domain === 'VLSI' ? '?10,000' : '?15,000'} Cash Prize</li>
                  <li><span className="detail-check">?</span>IEEE Participation Certificate</li>
                  <li><span className="detail-check">?</span>Exciting Goodies</li>
                </ul>
              </div>
              <div className="prize-tier">
                <div className="prize-tier-header">
                  <h4>2nd Prize</h4>
                  <span className="prize-amt">{domain === 'Open Innovation' || domain === 'VLSI' ? '?2.5K' : '?10K'}</span>
                </div>
                <ul>
                  <li><span className="detail-check">?</span>{domain === 'Open Innovation' || domain === 'VLSI' ? '?2,500' : '?10,000'} Cash Prize</li>
                  <li><span className="detail-check">?</span>IEEE Participation Certificate</li>
                  <li><span className="detail-check">?</span>Exciting Goodies</li>
                </ul>
              </div>
            </>
          )'''
)

# Nav Links
app_text = app_text.replace(
'''                <a href="#problem-statements" className="nav-dropdown-item" onClick={() => setPsFilter('Open Innovation')}>Open Innovation</a>
                <a href="#problem-statements" className="nav-dropdown-item" onClick={() => setPsFilter('Embedded and IOT')}>Embedded and IOT</a>''',
'''                <a href="#problem-statements" className="nav-dropdown-item" onClick={() => setPsFilter('Open Innovation')}>Open Innovation</a>
                <a href="#problem-statements" className="nav-dropdown-item" onClick={() => setPsFilter('VLSI')}>VLSI</a>
                <a href="#problem-statements" className="nav-dropdown-item" onClick={() => setPsFilter('Embedded and IOT')}>Embedded and IOT</a>'''
)

app_text = app_text.replace(
'''                <a href="#problem-statements" className="mobile-ps-link" onClick={() => { setPsFilter('Open Innovation'); setIsMobileMenuOpen(false); }}>Open Innovation</a>
                <a href="#problem-statements" className="mobile-ps-link" onClick={() => { setPsFilter('Embedded and IOT'); setIsMobileMenuOpen(false); }}>Embedded and IOT</a>''',
'''                <a href="#problem-statements" className="mobile-ps-link" onClick={() => { setPsFilter('Open Innovation'); setIsMobileMenuOpen(false); }}>Open Innovation</a>
                <a href="#problem-statements" className="mobile-ps-link" onClick={() => { setPsFilter('VLSI'); setIsMobileMenuOpen(false); }}>VLSI</a>
                <a href="#problem-statements" className="mobile-ps-link" onClick={() => { setPsFilter('Embedded and IOT'); setIsMobileMenuOpen(false); }}>Embedded and IOT</a>'''
)

template_replace = '''            <div className="glass-panel feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="feature-icon">??</div>
              <h4 style={{ color: 'var(--accent-yellow)', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>Campus Innovation</h4>
              <a href={${import.meta.env.BASE_URL}PPT_template/SYMBIOT_2026_CAMPUS_PPT.pptx} download="SYMBIOT_2026_CAMPUS_PPT.pptx" className="btn btn-secondary">Download</a>
            </div>

            <div className="glass-panel feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="feature-icon">??</div>
              <h4 style={{ color: 'var(--accent-yellow)', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>VLSI</h4>
              <a href="#" onClick={(e) => e.preventDefault()} className="btn btn-secondary" style={{ opacity: 0.5, cursor: 'not-allowed' }}>Coming Soon</a>
            </div>

            <div className="glass-panel feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="feature-icon">??</div>
              <h4 style={{ color: 'var(--accent-yellow)', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>Open Innovation</h4>
              <a href="#" onClick={(e) => e.preventDefault()} className="btn btn-secondary" style={{ opacity: 0.5, cursor: 'not-allowed' }}>Coming Soon</a>
            </div>'''
app_text = app_text.replace(
'''            <div className="glass-panel feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="feature-icon">??</div>
              <h4 style={{ color: 'var(--accent-yellow)', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>Campus Innovation</h4>
              <a href={${import.meta.env.BASE_URL}PPT_template/SYMBIOT_2026_CAMPUS_PPT.pptx} download="SYMBIOT_2026_CAMPUS_PPT.pptx" className="btn btn-secondary">Download</a>
            </div>

            <div className="glass-panel feature-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div className="feature-icon">??</div>
              <h4 style={{ color: 'var(--accent-yellow)', marginBottom: '1.5rem', fontSize: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>Open Innovation</h4>
              <a href="#" onClick={(e) => e.preventDefault()} className="btn btn-secondary" style={{ opacity: 0.5, cursor: 'not-allowed' }}>Coming Soon</a>
            </div>''', template_replace
)

with open('frontend/src/App.tsx', 'w', encoding='utf-8') as f:
    f.write(app_text)

with open('frontend/src/ProblemStatements.tsx', 'r', encoding='utf-8') as f:
    ps_text = f.read()

ps_text = ps_text.replace(
  "domain: 'Open Innovation' | 'Embedded and IOT' | 'Campus Innovation';",
  "domain: 'Open Innovation' | 'Embedded and IOT' | 'Campus Innovation' | 'VLSI';"
)

ps_text = ps_text.replace(
  "const DOMAINS = ['All', 'Open Innovation', 'Embedded and IOT', 'Campus Innovation'] as const;",
  "const DOMAINS = ['All', 'Open Innovation', 'VLSI', 'Embedded and IOT', 'Campus Innovation'] as const;"
)

ps_text = ps_text.replace(
  "'Open Innovation': 'ps-badge-vlsi',",
  "'Open Innovation': 'ps-badge-vlsi',\n  'VLSI': 'ps-badge-vlsi',"
)

for i in range(1, 6):
    old_str = f"psid: 'SYM010{i}',\\n    domain: 'Open Innovation',"
    new_str = f"psid: 'SYM010{i}',\\n    domain: 'VLSI',"
    ps_text = ps_text.replace(old_str, new_str)

# One more fallback for replacing without regex just in case
for i in range(1, 6):
    ps_text = ps_text.replace(f"psid: 'SYM010{i}',\\n    domain: 'Open Innovation',", f"psid: 'SYM010{i}',\\n    domain: 'VLSI',")
    ps_text = re.sub(rf"psid:\s*'SYM010{i}',\s*domain:\s*'Open Innovation',", f"psid: 'SYM010{i}',\\n    domain: 'VLSI',", ps_text)


with open('frontend/src/ProblemStatements.tsx', 'w', encoding='utf-8') as f:
    f.write(ps_text)

print('Updated successfully')
