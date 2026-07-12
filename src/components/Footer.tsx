import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footerBrand">
        <img src="/together-support-logo.png" alt="Together Support logo" width={74} height={74} />
        <strong>Together Support Ltd</strong>
        <span>Safe homes • Stronger futures • Better lives</span>
        <span>Company No: 12247622</span>
      </div>
      <div>
        <strong>Website</strong>
        <Link to="/about">About</Link>
        <Link to="/#services">Services</Link>
        <Link to="/#properties">Properties</Link>
        <Link to="/#referrals">Referrals</Link>
        <Link to="/careers">Careers</Link>
      </div>
      <div>
        <strong>For Partners</strong>
        <Link to="/commissioners">Commissioner Centre</Link>
        <Link to="/landlords">Landlord Centre</Link>
        <Link to="/track-referral">Track a Referral</Link>
        <Link to="/faq">FAQ</Link>
      </div>
      <div>
        <strong>Support</strong>
        <span>Privacy Policy</span>
        <span>Cookies</span>
        <Link to="/#contact">Contact</Link>
      </div>
      <div>
        <strong>Contact</strong>
        <span>27–31 Church Road, Bristol, BS5 9JJ</span>
        <span>0330 221 0527</span>
        <span>admin@togsupport.co.uk</span>
        <span>recruitment@togsupport.co.uk</span>
        <span>www.togsupport.co.uk</span>
      </div>
    </footer>
  );
}
