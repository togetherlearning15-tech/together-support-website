import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { serviceDetails } from '../data/siteData';

export function ServiceDetailPage() {
  const [menu, setMenu] = useState(false);
  const { slug } = useParams();
  const service = serviceDetails.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  const other = serviceDetails.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <SEO
        title={service.title}
        description={service.summary}
      />
      <Navbar menuOpen={menu} setMenuOpen={setMenu} />
      <main>
        <section className="pageHero">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span> <span>{service.title}</span>
          </div>
          <p className="eyebrow">Our services</p>
          <h1>{service.title}</h1>
          <p className="lead">{service.intro}</p>
          <div className="actions">
            <a className="btn" href="/#referrals">Make a Referral <ArrowRight size={18} /></a>
            <Link className="btn outline" to="/commissioners">Commissioner Centre</Link>
          </div>
        </section>

        <section className="missionGrid">
          <div>
            <p className="eyebrow">Who it's for</p>
            <h2>Suitable for</h2>
            <ul className="tickList">
              {service.whoItsFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">What's included</p>
            <h2>What we deliver</h2>
            <div className="grid" style={{ gap: '12px' }}>
              {service.whatsIncluded.map((item) => (
                <div key={item} className="miniGrid" style={{ gridTemplateColumns: '1fr', margin: 0 }}>
                  <span><CheckCircle2 /> {item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section soft">
          <p className="eyebrow">Explore more</p>
          <h2>Other services</h2>
          <div className="grid cards">
            {other.map((s) => (
              <Link className="card cardLink" to={`/services/${s.slug}`} key={s.slug}>
                <s.icon />
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <span className="cardMore">Learn more <span aria-hidden="true">&rarr;</span></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="ctaBand">
          <p className="eyebrow" style={{ color: '#7ef1e8' }}>Ready to talk?</p>
          <h2>Discuss a referral for {service.title.toLowerCase()}</h2>
          <p>Our assessment team will review suitability and get back to you promptly.</p>
          <div className="actions">
            <a className="btn" href="/#referrals">Make a Referral <ArrowRight size={18} /></a>
            <Link className="btn outline" to="/faq">Read our FAQs</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
