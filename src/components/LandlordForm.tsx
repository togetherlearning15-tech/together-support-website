import { useState } from 'react';
import { sendWebsiteEnquiry } from '../lib/sendWebsiteEnquiry';

export function LandlordForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  return (
    <section id="landlords" className="section soft two">
      <div>
        <p className="eyebrow">Landlords</p>
        <h2>Partner with Together Support</h2>
        <p>We build professional, long-term landlord relationships with clear communication, regular checks and responsible property oversight.</p>
        <ul className="tickList">
          <li>Regular property checks</li>
          <li>Dedicated communication</li>
          <li>Long-term partnership approach</li>
          <li>Supportive housing management model</li>
        </ul>
      </div>
      <form
        className="form"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data = new FormData(form);
          setStatus('sending');
          setMessage('');

          try {
            await sendWebsiteEnquiry({
              type: 'landlord',
              source: 'Landlord enquiry form',
              fields: {
                name: data.get('name'),
                company: data.get('company'),
                email: data.get('email'),
                telephone: data.get('telephone'),
                property_address: data.get('property_address'),
                bedrooms: data.get('bedrooms'),
                message: data.get('message'),
                website: data.get('website')
              }
            });

            setStatus('success');
            setMessage('Thank you. Your landlord enquiry has been sent and our team will contact you shortly.');
            form.reset();
          } catch (error: any) {
            setStatus('error');
            setMessage(error?.message || 'Your enquiry could not be sent. Please call us on 0330 221 0527.');
          }
        }}
      >
        <input name="website" className="hpField" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <input name="name" required placeholder="Your name" />
        <input name="company" placeholder="Company" />
        <input name="email" required type="email" placeholder="Email" />
        <input name="telephone" placeholder="Telephone" />
        <input name="property_address" placeholder="Property address" />
        <input name="bedrooms" placeholder="Number of bedrooms" />
        <textarea name="message" placeholder="Tell us about the property"></textarea>
        <button className="btn" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send Landlord Enquiry'}</button>
        {message && <p className={`formStatus ${status}`}>{message}</p>}
      </form>
    </section>
  );
}
