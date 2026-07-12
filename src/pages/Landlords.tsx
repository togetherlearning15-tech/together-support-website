import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Banknote, Building2, ChevronDown, MessageCircle, ShieldCheck, Star } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { LandlordForm } from '../components/LandlordForm';
import { landlordFaqs, landlordReasons } from '../data/siteData';

const iconMap = { MessageCircle, ShieldCheck, Building2, Banknote };

export function LandlordsPage() {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="Landlord Centre"
        description="Partner with Together Support: guaranteed communication, compliance management and professional property care for landlords across Bristol."
      />
      <Navbar menuOpen={menu} setMenuOpen={setMenu} />
      <main>
        <section className="pageHero">
          <p className="eyebrow">Landlord Centre</p>
          <h1>A property partnership that actually keeps you informed.</h1>
          <p className="lead">
            Together Support manages properties on behalf of landlords across Bristol — with guaranteed
            communication, handled compliance, and professional day-to-day property care.
          </p>
          <div className="actions">
            <a className="btn" href="#landlord-enquiry">Send a Landlord Enquiry <ArrowRight size={18} /></a>
            <a className="btn outline" href="tel:03302210527">Call 0330 221 0527</a>
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Why landlords choose us</p>
          <h2>Property partnership, done properly</h2>
          <div className="grid valuesGrid">
            {landlordReasons.map(([iconKey, title, text]) => {
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

        <section className="section soft two">
          <div>
            <p className="eyebrow">Guaranteed communication</p>
            <h2>One named contact, not a call centre</h2>
            <p>
              Every landlord partner has a single named contact on our property partnerships team. You'll
              hear from us proactively — after every inspection, before any compliance renewal, and whenever
              something needs your input — rather than only when something has gone wrong.
            </p>
          </div>
          <div>
            <p className="eyebrow">Compliance</p>
            <h2>Gas, electrical &amp; fire safety, tracked for you</h2>
            <p>
              We track gas safety certificates, EICR renewals, fire safety requirements and alarm testing
              against their renewal dates, and coordinate access with residents so nothing lapses and nothing
              falls on you to chase.
            </p>
          </div>
        </section>

        <section className="section two">
          <div>
            <p className="eyebrow">Property care</p>
            <h2>Scheduled inspections, written reports</h2>
            <p>
              Properties are inspected on a regular schedule, with a written report after every visit covering
              condition, any maintenance needs, and resident conduct. You always know the state of your
              property without having to ask.
            </p>
            <ul className="tickList">
              <li>Scheduled inspections with photographic, written reports</li>
              <li>Maintenance issues logged and coordinated promptly</li>
              <li>Proactive contact ahead of compliance renewals</li>
              <li>Long-term partnership approach, not short-term lets</li>
            </ul>
          </div>
          <blockquote>
            <div><Star /><Star /><Star /><Star /><Star /></div>
            <p>&ldquo;A responsible and organised approach to supported accommodation and landlord partnership.&rdquo;</p>
            <cite>Sarah, Landlord Partner</cite>
          </blockquote>
        </section>

        <section className="faqLayout">
          <div className="faqGroup">
            <h2 className="faqGroupTitle">Frequently asked questions</h2>
            {landlordFaqs.map(([q, a]) => {
              const isOpen = open === q;
              return (
                <div className="faqItem" data-open={isOpen} key={q}>
                  <button className="faqQuestion" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : q)}>
                    {q}
                    <ChevronDown size={20} />
                  </button>
                  {isOpen && <div className="faqAnswer">{a}</div>}
                </div>
              );
            })}
          </div>
        </section>

        <div id="landlord-enquiry">
          <LandlordForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
