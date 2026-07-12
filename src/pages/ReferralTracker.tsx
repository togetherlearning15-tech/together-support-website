import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle2, CircleDashed, Search, ShieldCheck } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { SEO } from '../components/SEO';
import { supabase } from '../lib/supabase';

const STAGES = [
  'Referral received',
  'Under review',
  'Awaiting assessment',
  'Property matching',
  'Placement offered'
];

type TrackingResult = {
  reference_number: string;
  stage: number;
  updated_at: string;
} | null;

export function ReferralTrackerPage() {
  const [menu, setMenu] = useState(false);
  const [searchParams] = useSearchParams();
  const [refInput, setRefInput] = useState(searchParams.get('ref') || '');
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'not-found' | 'error'>('idle');
  const [result, setResult] = useState<TrackingResult>(null);

  async function lookup(reference: string) {
    const cleaned = reference.trim().toUpperCase();
    if (!cleaned) return;

    setStatus('loading');
    setResult(null);

    try {
      const { data, error } = await supabase
        .from('referral_tracking')
        .select('reference_number, stage, updated_at')
        .eq('reference_number', cleaned)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setStatus('not-found');
        return;
      }

      setResult(data as TrackingResult);
      setStatus('found');
    } catch {
      setStatus('error');
    }
  }

  useEffect(() => {
    const prefilled = searchParams.get('ref');
    if (prefilled) {
      lookup(prefilled);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SEO
        title="Track My Referral"
        description="Track the live status of a referral submitted to Together Support using your reference number — no phone calls or chasing emails required."
      />
      <Navbar menuOpen={menu} setMenuOpen={setMenu} />
      <main>
        <section className="pageHero">
          <p className="eyebrow">Track My Referral</p>
          <h1>See exactly where your referral is.</h1>
          <p className="lead">
            Enter the reference number you were given when the referral was submitted. No phone calls, no
            emails asking for updates &mdash; completely transparent, any time you need it.
          </p>
        </section>

        <section className="section trackerSection">
          <form
            className="trackerForm"
            onSubmit={(e) => {
              e.preventDefault();
              lookup(refInput);
            }}
          >
            <div className="trackerInput">
              <Search size={20} />
              <input
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                placeholder="e.g. REF-2026-04831"
                aria-label="Referral reference number"
              />
            </div>
            <button className="btn" disabled={status === 'loading'}>
              {status === 'loading' ? 'Searching...' : 'Track Referral'}
            </button>
          </form>

          {status === 'not-found' && (
            <p className="formStatus error">
              We couldn't find a referral with that reference number. Double-check it matches exactly what
              you were given, or contact us on 0330 221 0527 if you think this is wrong.
            </p>
          )}

          {status === 'error' && (
            <p className="formStatus error">
              Something went wrong looking up that reference. Please try again shortly, or call us on
              0330 221 0527.
            </p>
          )}

          {status === 'found' && result && (
            <div className="trackerResult">
              <div className="trackerResultHead">
                <span className="referenceLabel">Reference number</span>
                <strong>{result.reference_number}</strong>
              </div>
              <ol className="trackerStages">
                {STAGES.map((label, index) => {
                  const stageNumber = index + 1;
                  const complete = stageNumber <= result.stage;
                  const current = stageNumber === result.stage;
                  return (
                    <li key={label} className={complete ? 'complete' : ''} data-current={current}>
                      {complete ? <CheckCircle2 size={22} /> : <CircleDashed size={22} />}
                      <span>{label}</span>
                      {current && <em>Current stage</em>}
                    </li>
                  );
                })}
              </ol>
              <p className="trackerUpdated">
                Last updated {new Date(result.updated_at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            </div>
          )}
        </section>

        <section className="section soft trackerNote">
          <ShieldCheck size={28} />
          <div>
            <h2>Your privacy is protected</h2>
            <p>
              This tracker only ever shows a reference number and its current stage &mdash; no personal or
              case details are displayed here. If you've lost your reference number, contact the team who
              submitted the referral, or call us directly on 0330 221 0527.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
