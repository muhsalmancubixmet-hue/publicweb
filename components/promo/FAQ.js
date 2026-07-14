import React from 'react';

export default function FAQ({
  faqs,
  activeFaq,
  setActiveFaq
}) {
  return (
    <section id="faq" className="faq" style={{ padding: '100px 0', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-tag" style={{ color: 'var(--secondary)', fontSize: '0.88rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>Common Inquiries</span>
          <h2 className="section-title" style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '16px' }}>Frequently Asked Questions</h2>
          <p className="section-subtitle" style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Have questions about billing, security, coordinates setup, or geofencing options? Find quick answers here.
          </p>
        </div>
        
        <div className="faq-list" style={{ maxWidth: '780px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`} style={{ background: 'var(--surface-glass)', border: `1px solid ${isOpen ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--radius-md)', overflow: 'hidden', transition: 'all 0.25s ease' }}>
                <button 
                  className="faq-question" 
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  style={{ width: '100%', padding: '24px 28px', background: 'none', border: 'none', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: '#ffffff', fontSize: '1.05rem', fontWeight: '600' }}
                >
                  <span>{faq.q}</span>
                  <span className="faq-icon" style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.2s ease', transform: isOpen ? 'rotate(180deg)' : 'none', color: isOpen ? 'var(--secondary)' : 'var(--text-muted)' }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </button>
                <div className="faq-answer-wrapper" style={{ maxHeight: isOpen ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
                  <div className="faq-answer" style={{ padding: '0 28px 24px', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    <p style={{ margin: 0 }}>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
