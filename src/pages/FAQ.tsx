import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';

const faqGroups = [
  {
    title: 'For referrers & professionals',
    items: [
      [
        'Who can make a referral?',
        'Local authorities, social workers, health teams, probation and other professionals can refer someone directly. Self-referrals and referrals from family members are also welcome — we\'ll guide you through what information is needed.'
      ],
      [
        'What happens after I submit a referral?',
        'Our referrals and assessment lead reviews the details, considers support needs, risk and accommodation suitability, and gets back to you to discuss next steps or request further information.'
      ],
      [
        'How quickly will I hear back?',
        'We aim to acknowledge every referral promptly and give a clear timeframe for assessment. Turnaround depends on accommodation availability and the complexity of support needs.'
      ],
      [
        'What information do you need in a referral?',
        'Contact details for the referrer, a brief summary of support needs and any known risks, and the person\'s preferred area if relevant. You don\'t need every detail up front — we\'ll follow up on anything missing.'
      ]
    ]
  },
  {
    title: 'For landlords',
    items: [
      [
        'What does a landlord partnership involve?',
        'We manage the tenancy relationship, day-to-day contact with residents, and routine inspections, so you get professional oversight of your property alongside consistent rent.'
      ],
      [
        'What condition does my property need to be in?',
        'Properties need to meet standard safety and habitability requirements. We\'ll discuss any work needed as part of onboarding, before a placement begins.'
      ],
      [
        'Who do I contact about my property once we\'re working together?',
        'You\'ll have a named point of contact on our property partnerships team for anything from maintenance queries to routine reviews.'
      ]
    ]
  },
  {
    title: 'For residents & families',
    items: [
      [
        'What kind of support will I receive?',
        'Support is tailored to you — this can include help with routines, appointments, budgeting, tenancy skills and working towards independent living, alongside safe, managed accommodation.'
      ],
      [
        'Is there an assessment before I move in?',
        'Yes. We review support needs and suitability first, so we can match you with accommodation and a support plan that actually fits your situation.'
      ],
      [
        'What if I have a safeguarding concern?',
        'Safeguarding is central to how we work. If you have a concern about your own safety or someone else\'s, contact our team directly and we will respond promptly and appropriately.'
      ]
    ]
  }
] as const;

export function FAQPage() {
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Answers to common questions about referrals, landlord partnerships and resident support at Together Support, Bristol."
      />
      <Navbar menuOpen={menu} setMenuOpen={setMenu} />
      <main>
        <section className="pageHero">
          <p className="eyebrow">Frequently asked questions</p>
          <h1>Answers for referrers, landlords and residents</h1>
          <p className="lead">
            Can't find what you're looking for? Get in touch and our team will help directly.
          </p>
        </section>

        <section className="faqLayout">
          {faqGroups.map((group) => (
            <div className="faqGroup" key={group.title}>
              <h2 className="faqGroupTitle">{group.title}</h2>
              {group.items.map(([q, a]) => {
                const id = group.title + q;
                const isOpen = open === id;
                return (
                  <div className="faqItem" data-open={isOpen} key={id}>
                    <button
                      className="faqQuestion"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : id)}
                    >
                      {q}
                      <ChevronDown size={20} />
                    </button>
                    {isOpen && <div className="faqAnswer">{a}</div>}
                  </div>
                );
              })}
            </div>
          ))}
        </section>

        <section className="ctaBand">
          <p className="eyebrow" style={{ color: '#7ef1e8' }}>Still have a question?</p>
          <h2>Talk to our team directly</h2>
          <p>We're happy to walk through a specific referral, property or support query.</p>
          <div className="actions">
            <Link className="btn" to="/#contact">Contact Us <ArrowRight size={18} /></Link>
            <Link className="btn outline" to="/#referrals">Make a Referral</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
