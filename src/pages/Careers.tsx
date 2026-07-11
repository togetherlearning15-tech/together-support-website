import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgeCheck, BriefcaseBusiness, GraduationCap, HeartHandshake, ShieldCheck, Users } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { sendWebsiteEnquiry } from '../lib/sendWebsiteEnquiry';

export function CareersPage() {
  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  return (
    <>
      <SEO
        title="Careers | Together Support"
        description="Join Together Support in Bristol. Explore careers in supported accommodation and submit an expression of interest to our recruitment team."
      />
      <Navbar menuOpen={menu} setMenuOpen={setMenu} />
      <main>
        <section className="pageHero careersHero">
          <div className="breadcrumb"><Link to="/">Home</Link><span>/</span><span>Careers</span></div>
          <p className="eyebrow">Join our team</p>
          <h1>Build a career that changes lives.</h1>
          <p className="lead">Join a growing organisation committed to safe homes, respectful support and stronger futures for people across Bristol.</p>
          <div className="actions">
            <a className="btn" href="#apply">Apply or register interest</a>
            <a className="btn ghost" href="mailto:recruitment@togsupport.co.uk">Email recruitment</a>
          </div>
        </section>

        <section className="section careersIntro">
          <div>
            <p className="eyebrow">Why Together Support</p>
            <h2>Meaningful work, supportive leadership and room to grow.</h2>
          </div>
          <div className="grid careersBenefits">
            {[
              [HeartHandshake, 'Purposeful work', 'Help people build stability, confidence and greater independence.'],
              [GraduationCap, 'Learning and development', 'Role-specific induction, ongoing learning and opportunities to develop.'],
              [Users, 'Supportive culture', 'Work with colleagues who value respect, teamwork and person-centred practice.'],
              [ShieldCheck, 'Quality and safeguarding', 'Join an organisation where safety, accountability and professional standards matter.'],
              [BriefcaseBusiness, 'Career progression', 'Grow with an expanding provider and take on new responsibilities as services develop.'],
              [BadgeCheck, 'Inclusive employer', 'We welcome applicants from different backgrounds and value lived and professional experience.']
            ].map(([Icon, title, text]) => (
              <article className="careerBenefit" key={String(title)}>
                <Icon />
                <h3>{String(title)}</h3>
                <p>{String(text)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section soft vacanciesSection">
          <div className="sectionHead">
            <p className="eyebrow">Current opportunities</p>
            <h2>Register your interest</h2>
            <p>Our vacancies change as services grow. Submit your details and our recruitment team will contact you when a suitable opportunity is available.</p>
          </div>
          <div className="vacancyGrid">
            {['Support Worker', 'Senior Support Worker', 'Housing Officer', 'Service Manager'].map((role) => (
              <article className="vacancyCard" key={role}>
                <BriefcaseBusiness />
                <h3>{role}</h3>
                <p>Bristol and surrounding areas</p>
                <a href="#apply">Register interest</a>
              </article>
            ))}
          </div>
        </section>

        <section id="apply" className="section two careersApplication">
          <div>
            <p className="eyebrow">Application form</p>
            <h2>Tell us about yourself</h2>
            <p>Complete the form and your application will be sent securely to <strong>recruitment@togsupport.co.uk</strong>.</p>
            <ul className="tickList">
              <li>We review applications fairly and confidentially</li>
              <li>You will receive an automatic acknowledgement</li>
              <li>You can also email your CV directly after submitting</li>
            </ul>
          </div>

          <form
            className="form careersForm"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              setStatus('sending');
              setMessage('');

              try {
                await sendWebsiteEnquiry({
                  type: 'careers',
                  source: 'Careers application form',
                  fields: {
                    name: data.get('name'),
                    email: data.get('email'),
                    telephone: data.get('telephone'),
                    role_applied_for: data.get('role_applied_for'),
                    location: data.get('location'),
                    right_to_work_uk: data.get('right_to_work_uk'),
                    driving_licence: data.get('driving_licence'),
                    access_to_vehicle: data.get('access_to_vehicle'),
                    availability: data.get('availability'),
                    experience_and_qualifications: data.get('experience_and_qualifications'),
                    personal_statement: data.get('personal_statement'),
                    cv_link: data.get('cv_link'),
                    website: data.get('website')
                  }
                });

                setStatus('success');
                setMessage('Thank you. Your application has been sent to our recruitment team.');
                form.reset();
              } catch (error: any) {
                setStatus('error');
                setMessage(error?.message || 'Your application could not be sent. Please email recruitment@togsupport.co.uk.');
              }
            }}
          >
            <input name="website" className="hpField" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="formGrid">
              <input name="name" required placeholder="Full name" />
              <input name="email" required type="email" placeholder="Email address" />
              <input name="telephone" required placeholder="Telephone" />
              <input name="location" placeholder="Town / area" />
              <select name="role_applied_for" required defaultValue="">
                <option value="" disabled>Role of interest</option>
                <option>Support Worker</option>
                <option>Senior Support Worker</option>
                <option>Housing Officer</option>
                <option>Service Manager</option>
                <option>Administration / Other</option>
              </select>
              <select name="availability" required defaultValue="">
                <option value="" disabled>Availability</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Flexible / Bank</option>
              </select>
              <select name="right_to_work_uk" required defaultValue="">
                <option value="" disabled>Right to work in the UK?</option>
                <option>Yes</option>
                <option>No</option>
                <option>Requires sponsorship</option>
              </select>
              <select name="driving_licence" defaultValue="">
                <option value="" disabled>UK driving licence?</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <select name="access_to_vehicle" defaultValue="">
                <option value="" disabled>Access to a vehicle?</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <input name="cv_link" type="url" placeholder="Optional CV link (OneDrive, Google Drive, etc.)" />
            </div>
            <textarea name="experience_and_qualifications" required placeholder="Relevant experience, qualifications and training"></textarea>
            <textarea name="personal_statement" required placeholder="Why would you like to join Together Support?"></textarea>
            <p className="formHelp">After submitting, you may also email your CV to <a href="mailto:recruitment@togsupport.co.uk">recruitment@togsupport.co.uk</a>.</p>
            <button className="btn" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Submit Application'}</button>
            {message && <p className={`formStatus ${status}`}>{message}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
