import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, FileText, Search, Star } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { PropertyCard } from '../components/PropertyCard';
import { ReferralForm } from '../components/ReferralForm';
import { LandlordForm } from '../components/LandlordForm';
import { ContactForm } from '../components/ContactForm';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { heroSlides, impactStats, process, properties, serviceDetails, trustPartners, whoWeSupport } from '../data/siteData';

export function HomePage() {
  const [q, setQ] = useState('');
  const [menu, setMenu] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % heroSlides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, []);

  const results = useMemo(() => {
    const s = q.toLowerCase().trim();
    if (!s) return properties;
    return properties.filter((p) =>
      [p.title, p.area, p.city, p.postcode, p.type, p.supportLevel].join(' ').toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <>
      <SEO
        title="Together Support"
        description="Together Support provides safe supported accommodation and housing-related support for adults across Bristol, working with local authorities, professionals and landlords."
      />
      <Navbar menuOpen={menu} setMenuOpen={setMenu} />
      <main id="top">
        <Hero slide={slide} setSlide={setSlide} />

        <section className="stats impactStats" aria-label="Our impact">
          {impactStats.map((stat) => (
            <div key={stat.label}>
              <strong><AnimatedCounter value={stat.value} suffix={stat.suffix} /></strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className="workingWith" aria-label="Working with">
          <p className="eyebrow">Trusted by commissioners &amp; partners</p>
          <div className="partnerLogos">
            {trustPartners.map((partner) => (
              <div className="partnerLogo" key={partner.name}>
                <strong>{partner.name}</strong>
                <span>{partner.type}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section two">
          <div>
            <p className="eyebrow">About Together Support</p>
            <h2>Safe homes. Stronger futures. Better lives.</h2>
          </div>
          <div className="copyBlock">
            <p>
              Together Support works with local authorities, professionals, landlords and community partners to provide safe accommodation and practical support. Our focus is stability, safeguarding, independence and positive outcomes.
            </p>
            <div className="miniGrid">
              <span><CheckCircle /> Person-centred support</span>
              <span><CheckCircle /> Clear referral pathways</span>
              <span><CheckCircle /> Professional property oversight</span>
              <span><CheckCircle /> Safeguarding culture</span>
            </div>
            <div className="actions compact">
              <Link className="btn outline small" to="/about">Meet the team &amp; our values</Link>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <p className="eyebrow">What we do</p>
          <h2>Our services</h2>
          <div className="grid cards">
            {serviceDetails.map((service) => (
              <Link className="card cardLink" to={`/services/${service.slug}`} key={service.slug}>
                <service.icon />
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <span className="cardMore">Learn more <span aria-hidden="true">&rarr;</span></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="section soft" id="who-we-support">
          <p className="eyebrow">Who we support</p>
          <h2>Support for people with different housing needs</h2>
          <div className="grid supportGrid">
            {whoWeSupport.map(([Icon, title, text]) => (
              <article className="supportCard" key={title}>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="section processSection">
          <div className="sectionHead">
            <p className="eyebrow">How it works</p>
            <h2>A clear pathway from referral to independence</h2>
            <p>Simple for referrers, reassuring for landlords and structured for residents.</p>
          </div>
          <div className="processGrid">
            {process.map(([step, title, text]) => (
              <article className="processCard" key={step}>
                <strong>{step}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="properties" className="section soft">
          <p className="eyebrow">Available accommodation</p>
          <h2>Property finder</h2>
          <div className="searchBox">
            <Search />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Easton, Bristol, BS5 or postcode" />
          </div>
          <div className="grid properties">
            {results.length ? (
              results.map((p) => <PropertyCard key={p.id} property={p} />)
            ) : (
              <div className="noResult">
                <h3>Can't find suitable accommodation?</h3>
                <p>
                  We may have new accommodation becoming available soon. Contact our team or submit a referral and we will review suitable options.
                </p>
                <div className="actions compact">
                  <a className="btn small" href="#contact">Contact Us</a>
                  <a className="btn small ghost" href="#referrals">Make a Referral</a>
                </div>
              </div>
            )}
          </div>
        </section>

        <ReferralForm />

        <section className="trackerBanner">
          <div>
            <p className="eyebrow" style={{ color: '#7ef1e8' }}>Already referred someone?</p>
            <h2>Track your referral in real time</h2>
            <p>No phone calls, no chasing emails. Enter your reference number and see exactly where a referral is, from received through to placement offered.</p>
          </div>
          <Link className="btn" to="/track-referral">Track My Referral <ArrowRight size={18} /></Link>
        </section>

        <LandlordForm />

        <section className="section careersCta">
          <div>
            <p className="eyebrow">Careers</p>
            <h2>Do work that makes a real difference.</h2>
            <p>Join a growing team delivering respectful, practical and person-centred support across Bristol.</p>
          </div>
          <Link className="btn" to="/careers">Join Our Team</Link>
        </section>

        <section className="section resourceSection">
          <div>
            <p className="eyebrow">Resources</p>
            <h2>Useful information for professionals</h2>
          </div>
          <div className="resourceGrid">
            {[
              ['Commissioner Centre', 'Referral criteria, governance, KPI reporting and brochures for commissioners.', '/commissioners'],
              ['Safeguarding approach', 'How we manage risk, concerns and multi-agency working.', '/commissioners#safeguarding'],
              ['Landlord Centre', 'Compliance, property care and how landlord partnerships work.', '/landlords']
            ].map(([title, text, href]) => (
              <Link className="resource resourceLink" to={href} key={title}>
                <FileText />
                <h3>{title}</h3>
                <p>{text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="eyebrow"></p>
          <h2>Testimonials</h2>
          <div className="grid testimonials">
            {[
              ['Together Support gave me stability, guidance and the confidence to move forward.', 'James, Resident'],
              ['The team communicates clearly and understands professional referral pathways.', 'Andy, Referrer'],
              ['A responsible and organised approach to supported accommodation and landlord partnership.', 'Sarah, Landlord Partner']
            ].map(([t, c]) => (
              <blockquote key={c}>
                <div><Star /><Star /><Star /><Star /><Star /></div>
                <p>“{t}”</p>
                <cite>{c}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
