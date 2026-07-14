import React from 'react';
import { CloseIcon, WarningIcon, CheckIcon } from './Icons';

export default function LeadModal({
  isModalOpen,
  handleCloseModal,
  modalMode,
  submitError,
  formData,
  handleInputChange,
  errors,
  handleSubmit,
  isSubmitting,
  isSuccess
}) {
  if (!isModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleCloseModal} style={{ display: 'flex', padding: '4px' }}>
          <CloseIcon size={20} />
        </button>
        
        {!isSuccess ? (
          <>
            <h3 className="modal-title">
              {modalMode === 'contact' ? 'Contact Us' : modalMode === 'enterprise' ? 'Request Enterprise Plan' : 'Register'}
            </h3>
            <p className="modal-subtitle">
              {modalMode === 'contact' 
                ? 'Get in touch with our team.' 
                : modalMode === 'enterprise' 
                  ? "Let us know about your team's custom requirements." 
                  : 'Create your account to get started.'}
            </p>
            
            {submitError && (
              <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <WarningIcon size={16} />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {modalMode !== 'register' && (
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Jane Doe"
                    required
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="jane@company.com"
                  required
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="+1 (555) 019-2834"
                  required
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>

              {modalMode !== 'register' && (
                <div className="form-group">
                  <label className="form-label">Company Name {modalMode === 'enterprise' ? '*' : '(Optional)'}</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Acme Corp"
                    required={modalMode === 'enterprise'}
                  />
                  {errors.companyName && <span className="form-error">{errors.companyName}</span>}
                </div>
              )}

              {modalMode !== 'register' && (
                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder={modalMode === 'enterprise' ? "Describe your team size, custom workflows, or compliance requirements..." : "How can we help you?"}
                    rows={4}
                    style={{ resize: 'none', fontFamily: 'inherit' }}
                    required
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary form-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <span className="spinner"></span>
                    {modalMode === 'contact' ? 'Sending Message...' : modalMode === 'enterprise' ? 'Submitting Request...' : 'Registering Interest...'}
                  </span>
                ) : (
                  modalMode === 'contact' ? 'Send Message' : modalMode === 'enterprise' ? 'Request Consultation' : 'Submit Request'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="success-state">
            <div className="success-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckIcon size={36} />
            </div>
            <h3 className="success-title" style={{ color: '#10b981', fontWeight: '800' }}>
              {modalMode === 'contact' ? 'Message Sent Successfully!' : modalMode === 'enterprise' ? 'Consultation Request Received!' : 'Verification anchors have been dispatched.'}
            </h3>
            <p className="success-message">
              {modalMode === 'contact' ? (
                <>Thank you, <strong>{formData.name}</strong>. We have received your inquiry and will get back to you shortly at <strong>{formData.email}</strong>.</>
              ) : modalMode === 'enterprise' ? (
                <>Thank you, <strong>{formData.name}</strong>. Our enterprise solutions team has received your request and will contact you shortly at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong>.</>
              ) : (
                <>Thank you, <strong>{formData.name}</strong>. Your customized CubeLogs workspace is being provisioned. Please check your inbox at <strong>{formData.email}</strong> for your temporary admin credentials and the access link.</>
              )}
            </p>
            <button className="btn btn-primary" onClick={handleCloseModal} style={{ padding: '10px 24px' }}>
              Got it
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
