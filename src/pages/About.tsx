import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake, Scale, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { impact } from '../data/siteData';

const values = [
  [ShieldCheck, 'Safeguarding first', 'Every decision we make starts with the safety of the people in our care.'],
  [HeartHandshake, 'Person-centred', 'Support is built around each individual, not a one-size-fits-all process.'],
  [Scale, 'Fair & transparent', 'Clear communication with referrers, landlords and residents at every stage.'],
  [Sparkles, 'Focused on outcomes', 'We measure success by stability, independence and positive move-on.']
] as const;

const team = [
  ['Registered Manager', 'Leads day-to-day service delivery, safeguarding practice and quality standards.'],
  ['Head of Housing Support', 'Oversees support planning, tenancy sustainment and resident wellbeing.'],
  ['Referrals & Assessment Lead', 'Reviews incoming referrals and matches people to suitable accommodation.'],
  ['Property & Landlord Partnerships', 'Manages property standards, inspections and landlord relationships.']
] as const;

function initials(role: string) {
  return role
    .split(' ')
    .filter((w) => w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

export function AboutPage() {
  const [menu, setMenu] = useState(false);

  return (
    <>
      <SEO
        title="About & Our Team"
        description="Learn about Together Support's mission, values and team providing supported accommodation and housing-related support across Bristol."
      />
      <Navbar menuOpen={menu} setMenuOpen={setMenu} />
      <main>
        <section className="pageHero">
          <p className="eyebrow">About Together Support</p>
          <h1>Safe homes and steady support, built around people.</h1>
          <p className="lead">
            We're a Bristol-based supported accommodation and housing-related support provider, working with
            local authorities, professionals, landlords and community partners to help adults move towards
            stability and independence.
          </p>
        </section>

        <section className="missionGrid">
          <div>
            <p className="eyebrow">Our mission</p>
            <h2>Stability first, so independence can follow</h2>
            <p>
              People come to us at difficult points in their lives — leaving homelessness, care, hospital,
              prison, or an unsafe home. Our job is to give them a safe, well-managed place to live and the
              practical, person-centred support that helps them stay housed, build routines, and move towards
              independent living.
            </p>
            <p>
              We work closely with commissioners, social workers, health teams and landlords so that referral
              pathways stay clear, risk is properly assessed, and everyone involved knows what to expect.
            </p>
          </div>
          <div className="grid stats" style={{ gridTemplateColumns: 'repeat(2,1fr)', background: 'transparent', gap: '14px' }}>
            {impact.map(([big, small]) => (
              <div key={big} style={{ background: 'white', border: '1px solid #e6edf2', borderRadius: '20px' }}>
                <strong>{big}</strong>
                <span>{small}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section soft">
          <p className="eyebrow">What we stand for</p>
          <h2>Our values</h2>
          <div className="grid valuesGrid">
            {values.map(([Icon, title, text]) => (
              <article className="valueCard" key={title}>
                <strong><Icon size={20} /></strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Our team</p>
          <h2>Who looks after your referral</h2>
          <div className="grid teamGrid">
            {team.map(([role, text]) => (
              <article className="teamCard" key={role}>
                <div className="teamAvatar" aria-hidden="true">{initials(role)}</div>
                <h3>{role}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="teamNote">
            <Users size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            Roles shown reflect how our service is structured. Get in touch if you'd like to speak with a named
            member of the team about a referral or property partnership.
          </p>
        </section>

        <section className="ctaBand">
          <p className="eyebrow" style={{ color: '#7ef1e8' }}>Ready to talk?</p>
          <h2>Make a referral or ask us a question</h2>
          <p>Councils, professionals, landlords and self-referrals are all welcome.</p>
          <div className="actions">
            <Link className="btn" to="/#referrals">Make a Referral <ArrowRight size={18} /></Link>
            <Link className="btn outline" to="/faq">Read our FAQs</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
