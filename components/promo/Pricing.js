import React from 'react';
import { ArrowRightIcon, PhoneIcon, MonitorIcon, GlobeIcon, TvIcon } from './Icons';

export default function Pricing({
  cmsContent,
  customEmployees,
  setCustomEmployees,
  calculateCustomPrice,
  availablePackages,
  selectedPackageIds,
  togglePackage,
  handleOpenBuildYourOwnModal,
  handleOpenEnterpriseModal
}) {
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Flexible Pricing</span>
          <h2 className="section-title">{cmsContent.pricing_title || 'Transparent Plans Built to Scale'}</h2>
          <p className="section-subtitle">
            {cmsContent.pricing_subtitle || 'Start monitoring logs and attendance with predictable subscription plans that fit your team.'}
          </p>
        </div>

        {/* Grid of Custom Solutions */}
        <div className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 270px), 1fr))', maxWidth: '960px', margin: '0 auto' }}>
          {/* Build-Your-Own Customizer */}
          <div className="pricing-card popular" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="popular-badge">Calculated dynamically</div>
            <div className="pricing-header">
              <div>
                <h3>Build-Your-Own Plan</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>Configure and bundle specific software modules dynamically. Priced per active employee.</p>
              </div>
            </div>

            <div className="customizer-ui" style={{ display: 'flex', flexDirection: 'column', gap: '16px', background: 'rgba(0, 0, 0, 0.2)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              {/* Employee Count Input & Dynamic Price Box Row */}
              <div className="customizer-input-price-row">
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '0px', flex: 1 }}>
                  <label className="form-label" htmlFor="custom-employees" style={{ fontSize: '0.9rem', fontWeight: '600', color: '#ffffff', display: 'block', marginBottom: '0px' }}>
                    Enter Estimated Team Size / Employee Count
                  </label>
                  <input
                    id="custom-employees"
                    type="number"
                    min="0"
                    value={customEmployees}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setCustomEmployees('');
                      } else {
                        const parsed = parseInt(val);
                        setCustomEmployees(isNaN(parsed) ? '' : Math.max(0, parsed));
                      }
                    }}
                    className="form-input"
                    placeholder="e.g. 25"
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      background: 'rgba(15, 23, 42, 0.4)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#ffffff',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div className="price-header-box" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  background: 'rgba(37, 99, 235, 0.1)',
                  border: '1px solid rgba(37, 99, 235, 0.25)',
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  minWidth: '130px',
                  flexShrink: 0
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                    <span className="price-currency" style={{ fontSize: '1.2rem', color: 'var(--secondary)', fontWeight: '700' }}>₹</span>
                    <span className="price-amount" style={{ fontSize: '2.2rem', fontWeight: '850', color: '#ffffff', fontFamily: 'var(--font-heading)', lineHeight: '1' }}>
                      {calculateCustomPrice().toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="price-period" style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px', fontWeight: '500' }}>/mo (INR)</span>
                </div>
              </div>

              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '-8px', display: 'block' }}>
                Core features are free. Add-ons are priced per active employee.
              </span>

              {/* Package tier selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ffffff', display: 'block' }}>
                  Select Add-on Modules:
                </span>

                <div
                  className="module-checkbox-label disabled"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-sm)', opacity: 0.7, fontSize: '0.85rem' }}
                >
                  <div className="module-checkbox-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="switch-toggle checked disabled" style={{ pointerEvents: 'none' }}>
                      <div className="switch-handle" />
                    </div>
                    <span>Free Core Modules (Dashboard, Employees, Logs)</span>
                  </div>
                  <span className="module-cost" style={{ color: 'var(--text-muted)' }}>Free Bundle</span>
                </div>

                {availablePackages.length === 0 ? (
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--border)', textAlign: 'center' }}>
                    Loading available packages...
                  </div>
                ) : (
                  availablePackages.map(pkg => {
                    const isSelected = selectedPackageIds.has(pkg.id);
                    return (
                      <div
                        key={pkg.id}
                        className={`module-checkbox-label ${isSelected ? 'active' : ''}`}
                        onClick={() => togglePackage(pkg.id)}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          background: isSelected ? 'rgba(37,99,235,0.1)' : 'rgba(255,255,255,0.02)',
                          border: `1px solid ${isSelected ? 'rgba(37,99,235,0.5)' : 'var(--border)'}`,
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div className="module-checkbox-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div className={`switch-toggle ${isSelected ? 'checked' : ''}`} style={{ pointerEvents: 'none' }}>
                            <div className="switch-handle" />
                          </div>
                          <span>{pkg.name}</span>
                        </div>
                        <span className="module-cost" style={{ color: 'var(--secondary)' }}>
                          +₹{parseFloat(pkg.price).toLocaleString('en-IN')}/emp
                        </span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <button className="btn btn-primary" onClick={handleOpenBuildYourOwnModal} style={{ width: '100%', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginTop: 'auto' }}>
              <span>Configure &amp; Register Plan</span>
              <ArrowRightIcon size={16} />
            </button>
          </div>

          {/* Enterprise Agency Capabilities */}
          <div className="pricing-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="pricing-header">
              <h3>Enterprise Plan</h3>
              <p>Custom software development engineered for corporate workflows.</p>
            </div>

            <div className="agency-capabilities" style={{ display: 'flex', flexDirection: 'column', gap: '16px', flexGrow: 1 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ffffff', display: 'block' }}>
                Agency-Level Software Engineering Services:
              </span>

              <div className="capability-item" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span className="capability-icon" style={{ color: 'var(--secondary)', display: 'flex', marginTop: '3px' }}><PhoneIcon size={20} /></span>
                <div className="capability-text">
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>Specialized Mobile Apps</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>Native iOS & Android builds designed with custom workflows and biometric capture integrations.</p>
                </div>
              </div>

              <div className="capability-item" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span className="capability-icon" style={{ color: 'var(--secondary)', display: 'flex', marginTop: '3px' }}><MonitorIcon size={20} /></span>
                <div className="capability-text">
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>Standalone Desktop Software</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>Robust desktop systems engineered for offline sync and dedicated hardware connectivity on Windows & macOS.</p>
                </div>
              </div>

              <div className="capability-item" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span className="capability-icon" style={{ color: 'var(--secondary)', display: 'flex', marginTop: '3px' }}><GlobeIcon size={20} /></span>
                <div className="capability-text">
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>Advanced Web Applications</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>Highly secure portals, database managers, and customized intranet solutions deployed on cloud clusters.</p>
                </div>
              </div>

              <div className="capability-item" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span className="capability-icon" style={{ color: 'var(--secondary)', display: 'flex', marginTop: '3px' }}><TvIcon size={20} /></span>
                <div className="capability-text">
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>Corporate Websites</h4>
                  <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>High-conversion landing hubs, brand portals, and media pipelines optimized for speed and SEO rankings.</p>
                </div>
              </div>
            </div>

            <div className="price-box" style={{ marginBottom: '16px' }}>
              <span className="price-amount" style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ffffff' }}>Let's Talk</span>
            </div>

            <button className="btn btn-secondary" onClick={handleOpenEnterpriseModal} style={{ width: '100%' }}>
              Request Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
