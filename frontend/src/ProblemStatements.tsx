import React, { useState, useEffect, useMemo } from 'react';

// --- Problem Statement Data ---
interface ProblemStatement {
  psid: string;
  domain: 'VLSI' | 'Embedded Systems' | 'Campus Innovation';
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
    title: 'Design and demonstrate a fault injection attack on a simplified RISC-V Bootloader RTL that successfully bypasses the firmware signature verification mechanism.',
    department: 'Electronics & Semiconductor Security',
    category: 'Hardware Security',
    theme: 'VLSI Security / Secure Systems',
    description: `Modern embedded systems rely on secure boot mechanisms to verify firmware authenticity before execution. However, hardware-level vulnerabilities such as fault injection attacks can potentially bypass these protections.

Participants must design and demonstrate a controlled fault injection attack on a simplified RISC-V bootloader RTL implementation. The goal is to identify how faults introduced in the verification logic can bypass firmware signature validation.

Key objectives include:
• Analyze the boot process and firmware verification flow
• Identify vulnerable hardware points for fault injection
• Simulate fault injection scenarios in RTL
• Demonstrate how signature verification can be bypassed`
  },
  {
    psid: 'SYM0102',
    domain: 'VLSI',
    title: 'Design a hardware-accelerated intrusion detection module that can analyze incoming packet headers and detect suspicious patterns.',
    department: 'Electronics & Communication Engineering',
    category: 'Hardware / Network Security',
    theme: 'Cybersecurity Hardware Acceleration',
    description: `Network security systems often rely on software-based intrusion detection systems which can become performance bottlenecks under high network loads.

This problem requires designing a hardware-based intrusion detection module capable of analyzing network packet headers in real-time.

Participants should create a hardware architecture capable of:
• Inspecting packet headers at high speed
• Detecting predefined malicious patterns or anomalies
• Triggering alerts when suspicious traffic is detected
• Maintaining high throughput with minimal latency`
  },
  {
    psid: 'SYM0103',
    domain: 'VLSI',
    title: 'Design a fault-tolerant line buffer module for a simplified medical X-ray image processing pipeline capable of detecting and correcting memory bit-flips caused by SEUs.',
    department: 'Biomedical Electronics / VLSI Systems',
    category: 'Hardware Reliability',
    theme: 'Medical Electronics / Fault-Tolerant Systems',
    description: `Medical imaging systems require extremely high reliability since even small errors in image processing can lead to incorrect diagnoses.

Participants must design a fault-tolerant line buffer module used in an X-ray image processing pipeline. The system should detect and correct memory bit-flips caused by Single Event Upsets (SEUs), which commonly occur in radiation-sensitive environments.

The design should focus on:
• Reliable data buffering for image processing
• Error detection mechanisms
• Error correction methods for memory corruption
• Ensuring uninterrupted image processing operations`
  },
  {
    psid: 'SYM0104',
    domain: 'VLSI',
    title: 'Design and implement a hardware accelerator for a convolutional neural network (CNN) layer using Verilog or VHDL.',
    department: 'Electronics & AI Hardware Systems',
    category: 'Hardware Acceleration',
    theme: 'AI Hardware / Edge Computing',
    description: `Deep learning models are computationally intensive and require significant processing power for real-time applications.

In this problem, participants must design a hardware accelerator for executing CNN convolution operations efficiently using hardware description languages such as Verilog or VHDL.

The system should:
• Process image data inputs
• Perform convolution operations using parallel hardware modules
• Implement multiply-accumulate (MAC) units for efficient computation
• Improve inference speed compared to software execution`
  },
  {
    psid: 'SYM0105',
    domain: 'VLSI',
    title: 'Design and implement a low-power FPGA-based hardware accelerator for performing inference on a lightweight neural network model for edge IoT applications.',
    department: 'Embedded & VLSI Systems',
    category: 'Hardware / AI Acceleration',
    theme: 'Edge AI / IoT Intelligence',
    description: `Edge IoT devices require efficient neural network inference while maintaining low power consumption.

Participants must design a low-power FPGA-based accelerator that can perform inference on lightweight neural network models deployed on edge devices.

The solution should focus on:
• Energy-efficient hardware design
• Optimized neural network inference
• FPGA-based architecture implementation
• Real-time inference capability for IoT applications`
  },
  {
    psid: 'SYM0006',
    domain: 'Embedded Systems',
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
    domain: 'Embedded Systems',
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

const DOMAINS = ['All', 'VLSI', 'Embedded Systems', 'Campus Innovation'] as const;

const domainBadgeClass: Record<string, string> = {
  'VLSI': 'ps-badge-vlsi',
  'Embedded Systems': 'ps-badge-embedded',
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

const ProblemStatements: React.FC<ProblemStatementsProps> = ({ initialFilter }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPS, setSelectedPS] = useState<ProblemStatement | null>(null);

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
                    <span className={`ps-badge ${domainBadgeClass[ps.domain]}`}>
                      {ps.domain}
                    </span>
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
                <span className={`ps-badge ${domainBadgeClass[ps.domain]}`}>
                  {ps.domain}
                </span>
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
