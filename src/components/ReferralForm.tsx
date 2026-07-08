import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { sendWebsiteEnquiry } from '../lib/sendWebsiteEnquiry';

export function ReferralForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  return (
    <section id="referrals" className="section two">
      <div>
        <p className="eyebrow">Referrals</p>
        <h2>Make a referral</h2>
        <p>For councils, professionals, self-referrals and partner organisations.</p>
        <ul className="tickList">
          <li>Referral reviewed by the Together Support team</li>
          <li>Accommodation suitability considered</li>
          <li>Risk and support needs reviewed safely</li>
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
              type: 'referral',
              source: 'Referral form',
              fields: {
                referrer_name: data.get('referrer_name'),
                organisation: data.get('organisation'),
                email: data.get('email'),
                telephone: data.get('telephone'),
                local_authority: data.get('local_authority'),
                person_being_referred: data.get('person_being_referred'),
                preferred_area: data.get('preferred_area'),
                support_needs: data.get('support_needs'),
                risk_information: data.get('risk_information'),
                website: data.get('website')
              }
            });

            setStatus('success');
            setMessage('Thank you. Your referral has been sent securely to the Together Support team.');
            form.reset();
          } catch (error: any) {
            setStatus('error');
            setMessage(error?.message || 'The referral could not be sent. Please call us on 0330 221 0527.');
          }
        }}
      >
        <input name="website" className="hpField" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <input name="referrer_name" required placeholder="Referrer name" />
        <input name="organisation" placeholder="Organisation" />
        <input name="email" required type="email" placeholder="Email" />
        <input name="telephone" placeholder="Telephone" />
        <input name="local_authority" placeholder="Local authority / funding body" />
        <input name="person_being_referred" placeholder="Person being referred / initials" />
        <input name="preferred_area" placeholder="Preferred area" />
        <textarea name="support_needs" required placeholder="Brief support needs / accommodation requirements"></textarea>
        <textarea name="risk_information" placeholder="Known risks or safeguarding information"></textarea>
        <button className="btn" disabled={status === 'sending'}>{status === 'sending' ? 'Sending...' : <>Submit Referral <ArrowRight size={18} /></>}</button>
        {message && <p className={`formStatus ${status}`}>{message}</p>}
      </form>
    </section>
  );
}
