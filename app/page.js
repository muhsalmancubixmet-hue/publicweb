'use client';

import { useState, useEffect } from 'react';
import { 
  CubeIcon, 
  SparklesIcon, 
  MapPinIcon, 
  CameraIcon, 
  ShieldIcon, 
  CalendarIcon, 
  ClockIcon, 
  PaletteIcon, 
  PhoneIcon, 
  MonitorIcon, 
  GlobeIcon, 
  TvIcon, 
  CheckIcon, 
  WarningIcon, 
  CloseIcon, 
  ArrowRightIcon 
} from '../components/promo/Icons';
import FAQ from '../components/promo/FAQ';
import Pricing from '../components/promo/Pricing';
import LeadModal from '../components/promo/LeadModal';

const FEATURES_DATA = [
  {
    icon: <MapPinIcon size={24} />,
    title: 'Geofenced Attendance',
    description: 'Verify check-ins in real-time. Lock coordinate boundaries (latitude, longitude, and custom radius) to ensure staff clock in exactly where they need to be.'
  },
  {
    icon: <CameraIcon size={24} />,
    title: 'Biometric Photo Log',
    description: 'Enhance accountability with base64 visual verification. Prevent proxy logging by storing verification photos securely with each clock-in.'
  },
  {
    icon: <ShieldIcon size={24} />,
    title: 'Tamperproof Audit Trail',
    description: 'Record all changes automatically. An immutable audit registry logs administrator modifications, settings updates, and employee transactions instantly.'
  },
  {
    icon: <CalendarIcon size={24} />,
    title: 'Leave Request Management',
    description: 'Request, validate, and manage leaves online. Set carry-forward allowances, establish custom rules, and block dates for holidays dynamically.'
  },
  {
    icon: <ClockIcon size={24} />,
    title: 'Flexible Shift Scheduling',
    description: 'Create designation shifts (shift start, shift end) and map logs against them automatically to capture accurate working hours and clock-out status.'
  },
  {
    icon: <PaletteIcon size={24} />,
    title: 'Custom Branding Controls',
    description: 'Tailor the platform workspace to your company style. Easily upload logos and adapt branding variables directly from the dashboard panel.'
  }
];

const getModuleInfo = (pkgName) => {
  const name = pkgName.toLowerCase();
  if (name.includes('attendance')) {
    return {
      title: 'Attendance Management',
      subtitle: 'Real-time tracking, Geofencing & Photo logs',
      description: 'See how our geofenced attendance system ensures accountability. Employees clock in within designated coordinate boundaries, verified by instant base64 photo logs, keeping check-ins automated and tamperproof.'
    };
  }
  if (name.includes('project') || name.includes('task')) {
    return {
      title: 'Project & Tasks Management',
      subtitle: 'Kanban boards, task tracking & objectives',
      description: 'Streamline team alignment by creating, assigning, and tracking tasks. The workflow logs progress automatically, providing managers with clear insights into objectives and operational efficiency.'
    };
  }
  if (name.includes('leave') || name.includes('holiday')) {
    return {
      title: 'Leave & Holiday Management',
      subtitle: 'Leave requests, approval portals & holiday calendars',
      description: 'Simplify leave tracking and holiday configurations. Staff can submit leave requests online under active allowances, while managers review, approve, or reject them instantly through a central dashboard.'
    };
  }
  return {
    title: pkgName,
    subtitle: 'Module Demo Video',
    description: 'Explore the features, tools, and capabilities of this workforce module in action.'
  };
};

const DEFAULT_FAQS = [
  {
    q: "How does geofencing verify employee location?",
    a: "Our geofenced attendance system verifies the device's GPS coordinates (latitude/longitude) against the office coordinates configured in your dashboard. Employees can only clock in or out when they are within the designated radius (e.g. 100 meters) of an authorized work site."
  },
  {
    q: "What is the purpose of the biometric photo log?",
    a: "The biometric photo log prompts employees to take a selfie when clocking in or out. The image is stored as a secure base64 string directly within the attendance log, allowing HR and managers to visually audit check-ins and prevent proxy logging."
  },
  {
    q: "Can I customize which features I pay for?",
    a: "Yes! Using our 'Build-Your-Own Plan' calculator, you can bundle only the active modules your company requires (e.g., just Attendance, or just Tasks). Pricing is scaled dynamically per active employee, so you never pay for features you don't use."
  },
  {
    q: "Is there a limit to how many employees I can onboard?",
    a: "Our Core package is free for up to 5 employees. For standard packages, the active employee cap is configured by your package plan tier. You can easily upgrade your employee limit from the billing dashboard as your team expands."
  },
  {
    q: "Are system audit logs immutable?",
    a: "Absolutely. All administrator and developer actions, settings updates, billing transactions, and employee profile updates are automatically logged in an audit trail. These logs cannot be deleted or modified, ensuring strict compliance."
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    stars: 5,
    text: "Implementing CubeLogs cut down our timesheet dispute rates by 94%. Geofencing ensures that technicians are on-site before clocking in, and the audit logs keep everything compliance-friendly.",
    author_initials: "RS",
    author_name: "Robert Shaw",
    author_title: "Operations Director, Vortex Logistics",
    bg_color: "var(--primary)"
  },
  {
    stars: 5,
    text: "The biometric photo log has eliminated buddy punching entirely in our warehouses. I can instantly verify attendance histories from the backoffice dashboard with full geolocation accuracy.",
    author_initials: "MH",
    author_name: "Maria Halen",
    author_title: "HR Manager, Aether Manufacturing",
    bg_color: "var(--secondary)"
  },
  {
    stars: 5,
    text: "We love the module flexibility. Being able to choose only Attendance and Tasks allowed us to stay within budget while scaling our remote operations across 12 branch locations.",
    author_initials: "DK",
    author_name: "David Kovic",
    author_title: "Chief Operating Officer, Apex Tech",
    bg_color: "#818cf8"
  }
];

const DEFAULT_STATS = [
  {
    number: "10k+",
    label: "Active Users",
    desc: "Administrators and workforce members logging in daily."
  },
  {
    number: "1.2M+",
    label: "Verified Clock-Ins",
    desc: "Tamperproof geofenced check-ins recorded with base64 visual verification."
  },
  {
    number: "99.99%",
    label: "System Uptime",
    desc: "Highly reliable container cloud infrastructure keeping check-ins active."
  },
  {
    number: "0",
    label: "Proxy Check-Ins",
    desc: "Zero spoof check-ins due to hardware coordinate boundaries and facial audits."
  }
];

const DEFAULT_CLIENT_LOGOS = [
  { name: "Vortex Systems", type: "system" },
  { name: "Aether Corp", type: "corp" },
  { name: "Acme Digital", type: "digital" },
  { name: "Zenith Labs", type: "labs" },
  { name: "Apex Grid", type: "grid" }
];

const getLogoIcon = (type) => {
  switch (type) {
    case 'system':
      return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>;
    case 'corp':
      return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4.5 16.5c-1.5 1.26-2.5 3.19-2.5 5.5h20c0-2.31-1-4.24-2.5-5.5M12 2C8.69 2 6 4.69 6 8c0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6z"/></svg>;
    case 'digital':
      return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg>;
    case 'labs':
      return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    case 'grid':
    default:
      return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"/></svg>;
  }
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [modalMode, setModalMode] = useState('register'); // 'register', 'contact', 'enterprise'

  const [cmsContent, setCmsContent] = useState({});
  const [lmsModules, setLmsModules] = useState([]);
  const [activeLMSModule, setActiveLMSModule] = useState(null);
  const [promoVideo, setPromoVideo] = useState(null);
  const [selectedVideoPkgId, setSelectedVideoPkgId] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [dbTestimonials, setDbTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({
    author_name: '',
    author_title: '',
    text: '',
    stars: 5,
  });
  const [testimonialSubmitting, setTestimonialSubmitting] = useState(false);
  const [testimonialSuccess, setTestimonialSuccess] = useState(false);
  const [testimonialError, setTestimonialError] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://salmankwork.pythonanywhere.com';
  const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://cubelogs-dashboard.vercel.app';
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % FEATURES_DATA.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const [customEmployees, setCustomEmployees] = useState(25);
  const [availablePackages, setAvailablePackages] = useState([
    {
      id: "attendance",
      name: "Attendance Management",
      price: "99.00",
      features: ["attendance"],
      video_url: null
    },
    {
      id: "tasks",
      name: "Project Management",
      price: "56.00",
      features: ["tasks"],
      video_url: null
    }
  ]);

  useEffect(() => {
    async function loadPackages() {
      try {
        const res = await fetch(`${API_URL}/api/packages/`);
        if (res.ok) {
          const data = await res.json();
          const activePkgs = [];
          
          data.forEach(pkg => {
            if (!pkg.isActive) return;
            
            const features = Array.isArray(pkg.features) ? pkg.features : [];
            const featuresLower = features.map(f => String(f).toLowerCase());
            
            const isAttendance = featuresLower.includes('attendance') || pkg.name.toLowerCase().includes('attendance');
            const isProject = featuresLower.includes('tasks') || featuresLower.includes('project') || pkg.name.toLowerCase().includes('project') || pkg.name.toLowerCase().includes('task');
            
            if (isAttendance) {
              activePkgs.push({
                id: 'attendance',
                name: pkg.name,
                price: pkg.price,
                features: ['attendance'],
                video_url: pkg.video_url || null,
                embed_url: pkg.embed_url || null
              });
            } else if (isProject) {
              activePkgs.push({
                id: 'tasks',
                name: pkg.name,
                price: pkg.price,
                features: ['tasks'],
                video_url: pkg.video_url || null,
                embed_url: pkg.embed_url || null
              });
            }
          });
          
          setAvailablePackages(activePkgs);
        }
      } catch (err) {
        console.error("Failed to load packages:", err);
      }
    }
    loadPackages();
  }, [API_URL]);

  const [selectedPackageIds, setSelectedPackageIds] = useState(new Set());

  const calculateCustomPrice = () => {
    let total = 0;
    selectedPackageIds.forEach(id => {
      const pkg = availablePackages.find(p => p.id === id);
      if (pkg) total += parseFloat(pkg.price);
    });
    const employeeCount = parseInt(customEmployees) || 0;
    return employeeCount * total;
  };

  const togglePackage = (id) => {
    setSelectedPackageIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleOpenBuildYourOwnModal = () => {
    const selectedNames = availablePackages
      .filter(p => selectedPackageIds.has(p.id))
      .map(p => p.name)
      .join(', ') || 'None';
    const metadataMsg = `Employees: ${customEmployees} | Modules: ${selectedNames} | Total: ₹${calculateCustomPrice().toLocaleString('en-IN')}/mo`;
    setModalMode('register');
    setIsModalOpen(true);
    setIsSuccess(false);
    setSubmitError('');
    setFormData({ name: '', email: '', phone: '', companyName: '', message: metadataMsg });
    setErrors({});
  };

  const handleOpenEnterpriseModal = () => {
    setModalMode('enterprise');
    setIsModalOpen(true);
    setIsSuccess(false);
    setSubmitError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      message: 'Enterprise Plan request'
    });
    setErrors({});
  };

  const handleOpenModal = () => {
    setModalMode('contact');
    setIsModalOpen(true);
    setIsSuccess(false);
    setSubmitError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      message: ''
    });
    setErrors({});
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (modalMode !== 'register') {
      if (!formData.name || !formData.name.trim()) {
        newErrors.name = 'Full name is required';
      }
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone || !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (modalMode === 'enterprise') {
      if (!formData.companyName || !formData.companyName.trim()) {
        newErrors.companyName = 'Company name is required';
      }
    }

    if (modalMode !== 'register') {
      if (!formData.message || !formData.message.trim()) {
        newErrors.message = 'Message/Inquiry details are required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const emailPrefix = formData.email ? formData.email.split('@')[0] : 'Prospect';
    const computedName = formData.name ? formData.name.trim() : (emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1));
    
    const emailDomain = formData.email ? formData.email.split('@')[1] : '';
    const displayCompany = emailDomain ? emailDomain.split('.')[0] : 'Company';
    const computedCompany = formData.companyName ? formData.companyName.trim() : (displayCompany.charAt(0).toUpperCase() + displayCompany.slice(1));

    const payload = {
      name: computedName,
      email: formData.email,
      phone: formData.phone,
      companyName: computedCompany,
      message: formData.message || 'No additional message'
    };

    try {
      const response = await fetch(`${API_URL}/api/leads/public/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setFormData(prev => ({
          ...prev,
          name: computedName,
          companyName: computedCompany
        }));
        setIsSuccess(true);
      } else {
        const errData = await response.json().catch(() => ({}));
        setSubmitError(errData.detail || 'Failed to submit form. Please check your inputs and try again.');
      }
    } catch (err) {
      setSubmitError(`Connection to server failed. Make sure the backend service is running on ${API_URL}.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    if (!newTestimonial.author_name.trim() || !newTestimonial.text.trim()) {
      setTestimonialError('Name and testimonial text are required.');
      return;
    }

    setTestimonialSubmitting(true);
    setTestimonialError('');
    setTestimonialSuccess(false);

    // Get initials
    const names = newTestimonial.author_name.trim().split(' ');
    const initials = names.map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';
    
    const randomBgColors = ['var(--primary)', 'var(--secondary)', '#818cf8', '#ec4899', '#f59e0b', '#10b981'];
    const randomBg = randomBgColors[Math.floor(Math.random() * randomBgColors.length)];

    const payload = {
      stars: parseInt(newTestimonial.stars),
      text: newTestimonial.text,
      author_initials: initials,
      author_name: newTestimonial.author_name,
      author_title: newTestimonial.author_title || 'Client Partner',
      bg_color: randomBg,
      is_approved: true
    };

    try {
      const res = await fetch(`${API_URL}/api/testimonials/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const savedTestimonial = await res.json();
        setTestimonialSuccess(true);
        setDbTestimonials(prev => [savedTestimonial, ...prev]);
        setNewTestimonial({
          author_name: '',
          author_title: '',
          text: '',
          stars: 5,
        });
      } else {
        const errData = await res.json().catch(() => ({}));
        setTestimonialError(errData.detail || 'Failed to submit testimonial.');
      }
    } catch (err) {
      setTestimonialError(`Connection to server failed. Make sure the backend service is running on ${API_URL}.`);
    } finally {
      setTestimonialSubmitting(false);
    }
  };

  let faqs = DEFAULT_FAQS;
  if (cmsContent.faqs) {
    try {
      faqs = JSON.parse(cmsContent.faqs);
    } catch (e) {
      console.error("Error parsing CMS faqs:", e);
    }
  }

  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : DEFAULT_TESTIMONIALS;

  let stats = DEFAULT_STATS;
  if (cmsContent.stats) {
    try {
      stats = JSON.parse(cmsContent.stats);
    } catch (e) {
      console.error("Error parsing CMS stats:", e);
    }
  }

  let clientLogos = DEFAULT_CLIENT_LOGOS;
  if (cmsContent.client_logos) {
    try {
      clientLogos = JSON.parse(cmsContent.client_logos);
    } catch (e) {
      console.error("Error parsing CMS client_logos:", e);
    }
  }

  return (
    <>
      {/* Header Navigation */}
      <nav className="navbar">
        <div className="container navbar-container">
          <div className="logo-group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/cubixmet.png" alt="CubeLogs Logo" style={{ height: '34px', width: 'auto', objectFit: 'contain' }} />
            <span className="logo-text">CubeLogs</span>
          </div>
          
          <div className="nav-links">
            <a href="#features" className="nav-item">Features</a>
            <a href="#testimonials" className="nav-item">Testimonials</a>
            <a href="#pricing" className="nav-item">Pricing</a>
            <a href="#faq" className="nav-item">FAQ</a>
          </div>

          <div className="nav-actions">
            <a href={`${DASHBOARD_URL}/login`} className="btn btn-outline">Sign In</a>
          </div>

          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(true)} aria-label="Toggle mobile menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <div className="logo-group" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="/cubixmet.png" alt="CubeLogs Logo" style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
                <span className="logo-text">CubeLogs</span>
              </div>
              <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)} aria-label="Close mobile menu">
                <CloseIcon size={24} />
              </button>
            </div>
            <div className="mobile-menu-links">
              <a href="#features" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#testimonials" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
              <a href="#pricing" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <a href="#faq" className="mobile-menu-item" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            </div>
            <div className="mobile-menu-actions">
              <a href={`${DASHBOARD_URL}/login`} className="btn btn-secondary" style={{ width: '100%' }}>Sign In</a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-glow"></div>
        <div className="container">
          <div className="hero-tag">
            <SparklesIcon size={16} style={{ color: 'var(--secondary)' }} /> Introducing CubeLogs 2.0
          </div>
          <h1 className="hero-title">
            {cmsContent.hero_title || 'The Modular Workspace Suite for Modern Workforces'}
          </h1>
          <p className="hero-subtitle">
            {cmsContent.hero_subtitle || 'Secure, scalable, and fully customizable. Streamline attendance, tasks, auditing, billing, and all your critical business operations in one unified ecosystem.'}
          </p>
          <div className="hero-actions">
            <a href={`${DASHBOARD_URL}/login`} className="btn btn-secondary btn-large">Access Dashboard</a>
            <a href="#pricing" className="btn btn-outline btn-large" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', background: 'rgba(255,255,255,0.02)' }}>
              <span>Check Pricing</span>
              <ArrowRightIcon size={16} />
            </a>
          </div>

          <div className="hero-features-badges">
            <div className="badge-item">
              <span className="badge-icon">✓</span>
              <span>Geofenced Clock-in</span>
            </div>
            <div className="badge-item">
              <span className="badge-icon">✓</span>
              <span>Photo Verification</span>
            </div>
            <div className="badge-item">
              <span className="badge-icon">✓</span>
              <span>Tamperproof Audits</span>
            </div>
          </div>


        </div>
      </header>

      {/* Client Logos Banner */}
      <section className="client-logos-section" style={{ padding: '40px 0', background: 'rgba(255,255,255,0.01)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="logos-title" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-light)', letterSpacing: '0.15em', margin: '0 0 24px' }}>TRUSTED BY MODERN WORKFORCES WORLDWIDE</p>
          <div className="logos-grid" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}>
            {clientLogos.map((logo, idx) => (
              <div key={idx} className="logo-item" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: '600' }}>
                {getLogoIcon(logo.type)}
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Core Features</span>
            <h2 className="section-title">{cmsContent.features_title || 'Designed for Accountability and Compliance'}</h2>
            <p className="section-subtitle">
              {cmsContent.features_subtitle || 'Everything you need to automate workforce check-ins, record actions securely, and keep operations running cleanly.'}
            </p>
          </div>

          <div className="features-grid-wrapper">
            <div className="features-grid">
              {FEATURES_DATA.map((feat, idx) => {
                let cardClass = '';
                const isCenter = idx === activeFeatureIndex;
                const isPrev = idx === (activeFeatureIndex - 1 + FEATURES_DATA.length) % FEATURES_DATA.length;
                const isNext = idx === (activeFeatureIndex + 1) % FEATURES_DATA.length;

                if (isCenter) cardClass = 'active-card';
                else if (isPrev) cardClass = 'prev-card';
                else if (isNext) cardClass = 'next-card';
                else cardClass = 'hidden-card';

                return (
                  <div key={idx} className={`feature-card ${cardClass}`}>
                    <div className="feature-icon-wrapper">{feat.icon}</div>
                    <h3>{feat.title}</h3>
                    <p className="feature-card-desc">{feat.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="features-carousel-dots">
              {FEATURES_DATA.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`dot ${idx === activeFeatureIndex ? 'active' : ''}`}
                  onClick={() => setActiveFeatureIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" style={{ padding: '80px 0', background: 'rgba(3, 7, 18, 0.4)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-card" style={{ background: 'var(--surface-glass)', border: '1px solid var(--border)', padding: '32px 24px', borderRadius: 'var(--radius-lg)', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
                <span className="stat-number" style={{ display: 'block', fontSize: '3rem', fontWeight: '900', fontFamily: 'var(--font-heading)', color: 'var(--secondary)', marginBottom: '8px', lineHeight: 1 }}>{stat.number}</span>
                <span className="stat-label" style={{ display: 'block', fontSize: '1rem', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>{stat.label}</span>
                <p className="stat-desc" style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Video Showcase Section */}
      {availablePackages.some(p => p.video_url) && (
        <section className="promo-video-section" style={{ padding: '80px 0', backgroundColor: '#09111e', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div className="section-header" style={{ marginBottom: '40px', textAlign: 'center' }}>
              <span className="section-tag">Interactive Demos</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', marginTop: '10px' }}>Explore Our Modules in Action</h2>
              <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '10px auto 0' }}>
                Select a software module below to watch a quick walkthrough and learn how it transforms workforce management.
              </p>
            </div>

            {/* Tabs for packages with videos */}
            <div className="video-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '40px', flexWrap: 'wrap' }}>
              {availablePackages.filter(p => p.video_url).map(pkg => {
                const isSelected = selectedVideoPkgId === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedVideoPkgId(pkg.id)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '30px',
                      border: '1px solid ' + (isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.1)'),
                      background: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
                      color: '#ffffff',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isSelected ? '0 4px 12px rgba(37,99,235,0.3)' : 'none'
                    }}
                  >
                    {pkg.name}
                  </button>
                );
              })}
            </div>

            {/* Video Content Display */}
            {(() => {
              const activePkg = availablePackages.find(p => p.id === selectedVideoPkgId) || availablePackages.find(p => p.video_url);
              if (!activePkg) return null;
              const info = getModuleInfo(activePkg.name);
              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '40px', alignItems: 'center' }}>
                  
                  {/* Left Column: Title & Description */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <span className="section-tag" style={{ alignSelf: 'flex-start', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8' }}>{info.subtitle}</span>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)', margin: 0, lineHeight: 1.2 }}>
                      {info.title}
                    </h2>
                    <p style={{ fontSize: '1.05rem', color: 'var(--text-light)', lineHeight: 1.6, margin: 0 }}>
                      {info.description}
                    </p>
                  </div>

                  {/* Right Column: Video Player Wrapper */}
                  <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {activePkg.embed_url ? (
                      <iframe
                        src={activePkg.embed_url}
                        title={activePkg.name}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    ) : (
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#0d1b2a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)' }}>
                        Video unavailable
                      </div>
                    )}
                  </div>

                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials" style={{ padding: '100px 0', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="section-tag" style={{ color: 'var(--secondary)', fontSize: '0.88rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', display: 'block' }}>Success Stories</span>
            <h2 className="section-title" style={{ fontSize: '2.2rem', color: '#ffffff', marginBottom: '16px' }}>Trusted by Team Leaders</h2>
            <p className="section-subtitle" style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              See how operations directors and human resources managers streamline compliance and audit trails with CubeLogs.
            </p>
          </div>
          
          <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {testimonials.map((test, idx) => (
              <div key={idx} className="testimonial-card" style={{ background: 'var(--surface-glass)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '36px', display: 'flex', flexDirection: 'column', gap: '20px', backdropFilter: 'blur(12px)' }}>
                <div className="testimonial-stars" style={{ color: '#f59e0b', fontSize: '1.1rem' }}>{"★".repeat(test.stars || 5)}</div>
                <p className="testimonial-text" style={{ margin: 0, fontSize: '0.98rem', color: '#d1d5db', lineHeight: 1.6, flexGrow: 1 }}>
                  "{test.text}"
                </p>
                <div className="testimonial-author" style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px' }}>
                  <div className="author-avatar" style={{ width: '40px', height: '40px', borderRadius: '50%', background: test.bg_color || 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: '700', fontSize: '0.9rem' }}>{test.author_initials || "U"}</div>
                  <div className="author-meta" style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="author-name" style={{ color: '#ffffff', fontWeight: '600', fontSize: '0.95rem' }}>{test.author_name}</span>
                    <span className="author-title" style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{test.author_title}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Submission Form for New Testimonials */}
          <div style={{ maxWidth: '600px', margin: '60px auto 0', background: 'var(--surface-glass)', border: '1px solid var(--border)', padding: '40px', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(16px)' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '8px', textAlign: 'center' }}>Share Your Experience</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px', textAlign: 'center' }}>
              We value your feedback! Submit your testimonial below to be displayed on our platform.
            </p>

            {testimonialSuccess && (
              <div style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '0.88rem', textAlign: 'center' }}>
                ✓ Thank you! Your testimonial has been successfully submitted and added.
              </div>
            )}

            {testimonialError && (
              <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '20px', fontSize: '0.88rem', textAlign: 'center' }}>
                ⚠ {testimonialError}
              </div>
            )}

            <form onSubmit={handleTestimonialSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Your Name *</label>
                  <input
                    type="text"
                    value={newTestimonial.author_name}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, author_name: e.target.value }))}
                    className="form-input"
                    placeholder="Robert Shaw"
                    style={{ padding: '10px 14px', fontSize: '0.85rem' }}
                    required
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontSize: '0.8rem' }}>Designation / Company *</label>
                  <input
                    type="text"
                    value={newTestimonial.author_title}
                    onChange={(e) => setNewTestimonial(prev => ({ ...prev, author_title: e.target.value }))}
                    className="form-input"
                    placeholder="Operations Director, Vortex"
                    style={{ padding: '10px 14px', fontSize: '0.85rem' }}
                    required
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Rating</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewTestimonial(prev => ({ ...prev, stars: star }))}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.4rem',
                        color: star <= newTestimonial.stars ? '#f59e0b' : 'rgba(255,255,255,0.15)',
                        padding: 0,
                        transition: 'transform 0.1s ease',
                      }}
                    >
                      ★
                    </button>
                  ))}
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '8px' }}>
                    {newTestimonial.stars} Star{newTestimonial.stars > 1 ? 's' : ''}
                  </span>
                </div>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Your Testimonial *</label>
                <textarea
                  value={newTestimonial.text}
                  onChange={(e) => setNewTestimonial(prev => ({ ...prev, text: e.target.value }))}
                  className="form-input"
                  placeholder="Tell us how CubeLogs helped your team..."
                  rows={3}
                  style={{ padding: '10px 14px', fontSize: '0.85rem', resize: 'none', fontFamily: 'inherit' }}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={testimonialSubmitting}
                style={{ padding: '12px', fontSize: '0.9rem', marginTop: '8px', width: '100%', justifyContent: 'center' }}
              >
                {testimonialSubmitting ? 'Submitting...' : 'Submit Testimonial'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Pricing
        cmsContent={cmsContent}
        customEmployees={customEmployees}
        setCustomEmployees={setCustomEmployees}
        calculateCustomPrice={calculateCustomPrice}
        availablePackages={availablePackages}
        selectedPackageIds={selectedPackageIds}
        togglePackage={togglePackage}
        handleOpenBuildYourOwnModal={handleOpenBuildYourOwnModal}
        handleOpenEnterpriseModal={handleOpenEnterpriseModal}
      />

      <FAQ
        faqs={faqs}
        activeFaq={activeFaq}
        setActiveFaq={setActiveFaq}
      />

      {/* Bottom CTA Section */}
      <section className="bottom-cta-section" style={{ padding: '100px 0', borderTop: '1px solid var(--border)', background: 'linear-gradient(180deg, rgba(3, 7, 18, 0) 0%, rgba(37, 99, 235, 0.05) 100%)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div className="cta-wrapper" style={{ background: 'var(--surface-glass)', border: '1px solid var(--border)', padding: '56px 48px', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(16px)', boxShadow: 'var(--shadow-premium), 0 0 40px rgba(37, 99, 235, 0.05)' }}>
            <h2 className="cta-title" style={{ fontSize: '2.2rem', color: '#ffffff', fontWeight: '800', fontFamily: 'var(--font-heading)', margin: '0 0 16px', lineHeight: 1.2 }}>Ready to Automate Your Workforce Audits?</h2>
            <p className="cta-subtitle" style={{ fontSize: '1.05rem', color: 'var(--text-muted)', margin: '0 0 36px', lineHeight: 1.6 }}>
              Get started with geofenced tracking, biometric photo logging, and immutable system audit logs today.
            </p>
            <div className="cta-actions" style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href={`${DASHBOARD_URL}/login`} className="btn btn-secondary btn-large" style={{ background: 'var(--primary)', color: '#ffffff', border: 'none', boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)' }}>Launch Free Dashboard</a>
              <button onClick={handleOpenModal} className="btn btn-outline" style={{ border: '1px solid rgba(255,255,255,0.25)', color: '#ffffff', background: 'rgba(255,255,255,0.02)' }}>Contact Enterprise Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Generation Modal */}
      <LeadModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        modalMode={modalMode}
        submitError={submitError}
        formData={formData}
        handleInputChange={handleInputChange}
        errors={errors}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isSuccess={isSuccess}
      />

      {/* Footer Section */}
      <footer className="footer">
        <div className="container footer-container">
          <div className="footer-left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/cubixmet.png" alt="CubeLogs Logo" style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
            <span className="footer-logo-text">CubeLogs</span>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} CubeLogs Inc. All rights reserved.
          </div>
          <div className="footer-links">
            <a href={`${DASHBOARD_URL}/login`} className="footer-link">SaaS Portal</a>
            <a href="#features" className="footer-link">Security Policies</a>
            <a href="#pricing" className="footer-link">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}
