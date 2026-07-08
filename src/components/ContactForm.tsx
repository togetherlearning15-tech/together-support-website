import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { sendWebsiteEnquiry } from '../lib/sendWebsiteEnquiry';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  return (
    <section id="contact" className="section contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Speak to our team</h2>
        <p><Phone /> 0330 221 0527</p>
        <p><Mail /> admin@togsupport.co.uk</p>
        <p><MapPin /> 27–31 Church Road, Bristol, BS5 9JJ</p>
        <p>Company No: 12247622</p>
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
              type: 'contact',
              source: 'Contact form',
              fields: {
                name: data.get('name'),
                email: data.get('email'),
                telephone: data.get('telephone'),
                subject: data.get('subject'),
                message: data.get('message'),
                website: data.get('website')
              }
            });

            setStatus('success');
            setMessage('Thank you. Your message has been sent and our team will contact you shortly.');
            form.reset();
          } catch (error: any) {
            setStatus('error');
            setMessage(error?.message || 'Your message could not be sent. Please call us on 0330 221 0527.');
          }
        }}
      >
        <input name="website" className="hpField" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <input name="name" required placeholder="Name" />
        <input name="email" required type="email" placeholder="Email" />
        <input name="telephone" placeholder="Telephone" />
        <input name="subject" placeholder="Subject" />
        <textarea name="message" required placeholder="Message"></textarea>
        <button className="btn" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : 'Send Message'}</button>
        {message && <p className={`formStatus ${status}`}>{message}</p>}
      </form>
    </section>
  );
}
