import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  Download,
  FileText,
  Mail,
  Phone,
  Scale,
  ShieldCheck
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import {
  commissionerGovernance,
  commissionerKpis,
  commissionerReasons,
  commissionerReferralCriteria,
  commissionerReferralSteps
} from '../data/siteData';

const iconMap = { ShieldCheck, ClipboardCheck, BarChart3, Scale };

export function CommissionersPage() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <SEO
        title="Commissioner Centre"
        description="Referral criteria, governance, safeguarding and KPI reporting information for commissioners, local authorities and referring professionals working with Together Support."
      />
      <Navbar menuOpen={menu} setMenuOpen={setMenu} />
      <main>
        <section className="pageHero">
          <p className="eyebrow">Commissioner Centre</p>
          <h1>Everything a commissioner needs, in one place.</h1>
          <p className="lead">
            Referral criteria, governance, safeguarding practice and outcome reporting — the information
            commissioners, local authority officers and referring professionals need to assess Together
            Support as a delivery partner.
          </p>
          <div className="actions">
            <a className="btn" href="/#referrals">Make a Referral <ArrowRight size={18} /></a>
            <a className="btn outline" href="#contact-commissioning">Contact the Commissioning Team</a>
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Why choose Together Support</p>
          <h2>Built for professional referral pathways</h2>
          <div className="grid valuesGrid">
            {commissionerReasons.map(([iconKey, title, text]) => {
              const Icon = iconMap[iconKey as keyof typeof iconMap];
              return (
                <article className="valueCard" key={title}>
                  <strong><Icon size={20} /></strong>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section soft">
          <p className="eyebrow">Referral criteria</p>
          <h2>Who we accept referrals for</h2>
          <p style={{ maxWidth: '760px', color: 'var(--muted)', lineHeight: 1.75 }}>
            Every referral is reviewed individually against risk, support needs and accommodation
            availability. As a general guide, we accept referrals for:
          </p>
          <ul className="tickList" style={{ maxWidth: '760px' }}>
            {commissionerReferralCriteria.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="section processSection">
          <div className="sectionHead">
            <p className="eyebrow">Referral process</p>
            <h2>From referral to placement</h2>
            <p>A structured, transparent pathway so referrers always know what happens next.</p>
          </div>
          <div className="processGrid">
            {commissionerReferralSteps.map(([step, title, text]) => (
              <article className="processCard" key={step}>
                <strong>{step}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="actions compact" style={{ marginTop: '30px' }}>
            <Link className="btn outline small" to="/track-referral">Track an existing referral</Link>
          </div>
        </section>

        <section className="section" id="safeguarding">
          <p className="eyebrow">Safeguarding</p>
          <h2>Safeguarding is not a policy on a shelf</h2>
          <p style={{ maxWidth: '760px', color: 'var(--muted)', lineHeight: 1.8 }}>
            Every referral is risk-assessed before acceptance. Every support worker follows documented
            safeguarding procedures, with clear escalation routes to local safeguarding boards and statutory
            partners. Incidents are logged, reviewed and reported transparently to commissioners where a
            contract requires it.
          </p>
        </section>

        <section className="section soft">
          <p className="eyebrow">Governance</p>
          <h2>Clear accountability, documented practice</h2>
          <div className="grid valuesGrid">
            {commissionerGovernance.map(([title, text]) => (
              <article className="valueCard" key={title}>
                <strong><ShieldCheck size={20} /></strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Outcomes &amp; KPI reporting</p>
          <h2>Measured against what actually matters</h2>
          <p style={{ maxWidth: '760px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '20px' }}>
            We report against the metrics commissioners care about, on a schedule agreed as part of the
            referral or contract arrangement. Typical KPIs include:
          </p>
          <ul className="tickList" style={{ maxWidth: '760px' }}>
            {commissionerKpis.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="section soft">
          <p className="eyebrow">Downloads</p>
          <h2>Brochures &amp; policy documents</h2>
          <div className="grid resourceGrid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            {[
              ['Commissioner Brochure', 'Overview of services, referral criteria and contact details.'],
              ['Safeguarding Statement', 'Our approach to safeguarding, risk and multi-agency working.'],
              ['Complaints Procedure', 'How concerns and complaints are raised, handled and resolved.']
            ].map(([title, text]) => (
              <div className="resource" key={title} style={{ background: 'white', color: 'inherit', border: '1px solid #e6edf2', boxShadow: '0 18px 40px #17324d0e' }}>
                <FileText style={{ color: 'var(--teal)' }} />
                <h3 style={{ color: 'var(--navy)' }}>{title}</h3>
                <p style={{ color: 'var(--muted)' }}>{text}</p>
                <span className="cardMore" style={{ color: 'var(--teal2)', display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '10px', fontWeight: 900 }}>
                  <Download size={16} /> Available on request
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="ctaBand" id="contact-commissioning">
          <p className="eyebrow" style={{ color: '#7ef1e8' }}>Contact the commissioning team</p>
          <h2>Talk to us about a referral, contract or framework</h2>
          <p>We're happy to discuss individual referrals, block arrangements or framework agreements.</p>
          <div className="actions">
            <a className="btn" href="mailto:referrals@togsupport.co.uk"><Mail size={18} /> referrals@togsupport.co.uk</a>
            <a className="btn outline" href="tel:03302210527"><Phone size={18} /> 0330 221 0527</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
