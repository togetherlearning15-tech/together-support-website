import {
  BedDouble,
  Building2,
  CheckCircle,
  ClipboardCheck,
  GraduationCap,
  HeartHandshake,
  Home,
  KeyRound,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';

export type Property = {
  id: number;
  title: string;
  area: string;
  city: string;
  postcode: string;
  status: string;
  type: string;
  rooms: string;
  suitable: string;
  supportLevel: string;
  accessibility: string;
};

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/#services' },
  { label: 'Commissioners', href: '/commissioners' },
  { label: 'Landlords', href: '/landlords' },
  { label: 'Track a Referral', href: '/track-referral' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/#contact' }
];

export const properties: Property[] = [
  {
    id: 1,
    title: '34 Milsom Street',
    area: 'Easton',
    city: 'Bristol',
    postcode: 'BS5 0SS',
    status: 'Available',
    type: 'Supported accommodation',
    rooms: 'Rooms available',
    suitable: 'Adults with housing-related support needs',
    supportLevel: 'Medium support',
    accessibility: 'Assessment required'
  }
];

export const services = [
  [Home, 'Supported Accommodation', 'Safe, managed accommodation for adults with housing support needs.'],
  [HeartHandshake, 'Housing-Related Support', 'Tenancy sustainment, routines, appointments, wellbeing and independence.'],
  [ShieldCheck, 'Safeguarding & Risk', 'Risk-aware support planning, safeguarding referrals and multi-agency working.'],
  [Building2, 'Property Management', 'Professional landlord communication, inspections and property oversight.'],
  [Users, 'Who We Support', 'Homeless adults, care leavers, mental health, ex-offenders, recovery and domestic abuse.'],
  [CheckCircle, 'Move-On Planning', 'Helping people develop skills and progress towards independent living.'],
  [BedDouble, 'Tenancy Sustainment', 'Practical support to help residents maintain accommodation and routines.'],
  [ClipboardCheck, 'Assessment & Matching', 'Clear referral review to match people with suitable accommodation.'],
  [KeyRound, 'Landlord Partnerships', 'Long-term, responsible partnerships with landlords and property owners.']
] as const;

export type ServiceDetail = {
  slug: string;
  icon: typeof Home;
  title: string;
  summary: string;
  intro: string;
  whoItsFor: string[];
  whatsIncluded: string[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: 'supported-accommodation',
    icon: Home,
    title: 'Supported Accommodation',
    summary: 'Safe, managed accommodation for adults with housing support needs.',
    intro:
      'Our supported accommodation gives adults a safe, well-maintained place to live alongside structured, on-site support. Every property is managed to a consistent standard, with clear house expectations and regular contact from a named support worker.',
    whoItsFor: [
      'Adults experiencing or at risk of homelessness',
      'People stepping down from hospital, care or prison with housing support needs',
      'Individuals who need a stable base while support and move-on plans are put in place'
    ],
    whatsIncluded: [
      'Furnished, inspected accommodation with regular property checks',
      'A named support worker and structured support plan',
      'Safeguarding-led house management and 24/7 emergency contact route',
      'Support with benefits, budgeting and settling into the property'
    ]
  },
  {
    slug: 'housing-related-support',
    icon: HeartHandshake,
    title: 'Housing-Related Support',
    summary: 'Tenancy sustainment, routines, appointments, wellbeing and independence.',
    intro:
      'Housing-related support helps people build the everyday skills and routines that keep a tenancy stable — from budgeting and appointments to wellbeing and confidence. Support is person-centred and reviewed regularly against agreed outcomes.',
    whoItsFor: [
      'People in supported or general needs housing who need practical, ongoing support',
      'Individuals working towards independent living',
      'Referrers looking for measurable, outcome-focused support delivery'
    ],
    whatsIncluded: [
      'One-to-one support sessions on a schedule agreed with the referrer',
      'Support with appointments, benefits, budgeting and daily living skills',
      'Regular outcome reviews shared with commissioners where required',
      'Clear escalation routes for risk or safeguarding concerns'
    ]
  },
  {
    slug: 'floating-support',
    icon: Users,
    title: 'Floating Support',
    summary: 'Flexible, community-based support for people in their own tenancy.',
    intro:
      'Floating support is delivered directly into a person\u2019s own home or community tenancy, rather than an on-site scheme. It gives people the independence of their own front door with the reassurance of regular, structured support visits.',
    whoItsFor: [
      'People who already hold a tenancy but need support to sustain it',
      'Individuals moving on from supported accommodation into independent living',
      'Local authorities commissioning community-based, non-accommodation support'
    ],
    whatsIncluded: [
      'Scheduled home visits from a dedicated support worker',
      'Support with tenancy obligations, bills and household management',
      'Signposting to health, employment and community services',
      'Step-down support intensity as independence increases'
    ]
  },
  {
    slug: 'tenancy-sustainment',
    icon: BedDouble,
    title: 'Tenancy Sustainment',
    summary: 'Practical support to help residents maintain accommodation and routines.',
    intro:
      'Tenancy sustainment support focuses on keeping people housed by tackling the practical and personal issues that put a tenancy at risk — arrears, anti-social behaviour, isolation or breakdowns in routine — before they escalate.',
    whoItsFor: [
      'Residents at risk of losing their accommodation',
      'People who need support maintaining routines and tenancy responsibilities',
      'Landlords and local authorities seeking to reduce avoidable tenancy breakdown'
    ],
    whatsIncluded: [
      'Early identification of tenancy risk and a tailored sustainment plan',
      'Support liaising with landlords, letting agents and local authorities',
      'Practical help with routines, budgeting and household management',
      'Regular reviews tracking tenancy stability over time'
    ]
  },
  {
    slug: 'safeguarding-and-risk',
    icon: ShieldCheck,
    title: 'Safeguarding & Risk',
    summary: 'Risk-aware support planning, safeguarding referrals and multi-agency working.',
    intro:
      'Safeguarding sits at the centre of everything we deliver. Every referral is assessed for risk before acceptance, every support plan is risk-aware, and our team works closely with local safeguarding boards and multi-agency partners.',
    whoItsFor: [
      'Commissioners and referrers who need assurance around risk management',
      'People with complex needs requiring a coordinated, multi-agency response',
      'Partners requiring clear safeguarding escalation and reporting routes'
    ],
    whatsIncluded: [
      'Pre-placement risk assessment and suitability review',
      'Trained staff following documented safeguarding policies and procedures',
      'Clear escalation pathways to local safeguarding boards and statutory partners',
      'Incident reporting and regular safeguarding audits'
    ]
  },
  {
    slug: 'property-management',
    icon: Building2,
    title: 'Property Management',
    summary: 'Professional landlord communication, inspections and property oversight.',
    intro:
      'We manage properties to a professional standard on behalf of landlord partners — handling day-to-day communication, routine inspections and maintenance coordination, so landlords get consistent income with genuine oversight.',
    whoItsFor: [
      'Landlords considering a long-term partnership with a support provider',
      'Property owners who want hands-off, professionally managed lettings',
      'Agents managing portfolios suitable for supported housing use'
    ],
    whatsIncluded: [
      'Scheduled property inspections with written reports',
      'A single named contact for maintenance and tenancy queries',
      'Guaranteed rent arrangements discussed on a property-by-property basis',
      'Proactive communication ahead of any issues, not just when something goes wrong'
    ]
  }
];

export const process = [
  ['1', 'Referral received', 'Councils, professionals, landlords or self-referrals submit details.'],
  ['2', 'Assessment', 'We review support needs, risks, suitability and accommodation requirements.'],
  ['3', 'Property matching', 'We identify available accommodation or discuss upcoming options.'],
  ['4', 'Move-in planning', 'Support plans, safety checks and practical arrangements are agreed.'],
  ['5', 'Ongoing support', 'Residents receive structured housing-related support and reviews.'],
  ['6', 'Move-on outcomes', 'The goal is stability, independence and better long-term outcomes.']
];

export const whoWeSupport = [
  [Home, 'Homeless Adults', 'Safe accommodation and housing-related support for people experiencing homelessness.'],
  [HeartHandshake, 'Mental Health', 'Supportive housing pathways for people with mental health support needs.'],
  [GraduationCap, 'Care Leavers', 'Practical support to build confidence, routines and independence.'],
  [ShieldCheck, 'Domestic Abuse', 'Safe, respectful support with safeguarding and multi-agency working.'],
  [RotateCcw, 'Substance Misuse Recovery', 'Stable accommodation that supports recovery, structure and positive routines.'],
  [Users, 'Ex-Offenders', 'Risk-aware accommodation support focused on stability and move-on outcomes.'],
  [ClipboardCheck, 'Complex Needs', 'Coordinated support for people with multiple or overlapping needs.'],
  [Sparkles, 'Move-on Support', 'Helping people progress towards independent living and long-term stability.']
] as const;

export const impact = [
  ['People Supported', 'Growing Every Month'],
  ['Local Authority Referrals', 'Accepted'],
  ['Landlord Partnerships', 'Expanding'],
  ['Safeguarding', 'At the Heart of Everything We Do']
];

// Headline figures for the animated homepage counters.
// NOTE: replace these with Together Support's actual verified figures before launch.
export type ImpactStat = { value: number; suffix: string; label: string };
export const impactStats: ImpactStat[] = [
  { value: 350, suffix: '+', label: 'People Supported' },
  { value: 40, suffix: '+', label: 'Properties Managed' },
  { value: 15, suffix: '+', label: 'Referral Partners' },
  { value: 92, suffix: '%', label: 'Success Rate' },
  { value: 6, suffix: '+', label: 'Years of Experience' }
];

export type TrustPartner = { name: string; type: string };
export const trustPartners: TrustPartner[] = [
  { name: 'Bristol City Council', type: 'Local authority' },
  { name: 'South Gloucestershire Council', type: 'Local authority' },
  { name: 'NHS', type: 'Health partner' },
  { name: 'Housing Associations', type: 'Registered providers' },
  { name: 'Community Organisations', type: 'Voluntary sector' }
];

export const commissionerReasons = [
  ['ShieldCheck', 'Safeguarding-led delivery', 'Every referral is risk-assessed before acceptance and every support plan is safeguarding-aware from day one.'],
  ['ClipboardCheck', 'Clear, fast referral pathway', 'A single referral form and a named assessment lead means faster decisions and less back-and-forth.'],
  ['BarChart3', 'Outcomes you can report on', 'Structured KPI and outcome reporting that maps to commissioning frameworks and contract requirements.'],
  ['Scale', 'Transparent governance', 'Documented policies, regular audits and clear lines of accountability from support worker to registered manager.']
] as const;

export const commissionerReferralCriteria = [
  'Adults aged 18+ presenting with, or at risk of, homelessness',
  'People stepping down from hospital, care, prison or other statutory settings',
  'Individuals with mental health, substance misuse, care-experience or domestic abuse related support needs',
  'People who can be safely accommodated within a shared or self-contained supported setting following assessment'
];

export const commissionerReferralSteps = [
  ['1', 'Referral submitted', 'Via our online referral form, by phone or by email from a professional or self-referral.'],
  ['2', 'Initial review', 'Our assessment lead reviews suitability, risk and accommodation availability, usually within 2 working days.'],
  ['3', 'Assessment', 'Where needed, a fuller assessment is carried out with the referrer and, where appropriate, the person being referred.'],
  ['4', 'Property matching', 'We identify suitable accommodation and confirm arrangements with the referrer and prospective resident.'],
  ['5', 'Placement & support plan', 'A support plan is agreed, move-in is arranged, and regular reviews begin from day one.']
];

export const commissionerGovernance = [
  ['Registered & regulated', 'Together Support operates under documented policies covering safeguarding, health & safety, complaints and data protection.'],
  ['Named accountability', 'Every service has a registered manager and every referral has a named assessment lead you can contact directly.'],
  ['Regular audits', 'Internal audits of support plans, property standards and safeguarding practice, with findings acted on and tracked.'],
  ['Multi-agency working', 'We work openly with social workers, probation, health teams and safeguarding boards as part of standard practice.']
];

export const commissionerKpis = [
  'Referral acknowledgement and assessment turnaround times',
  'Occupancy and void rates across managed accommodation',
  'Move-on and independent living outcomes',
  'Safeguarding incidents, response times and resolution',
  'Resident and referrer satisfaction feedback'
];

export const landlordReasons = [
  ['MessageCircle', 'Guaranteed communication', 'A named point of contact for every property, with regular updates rather than radio silence between issues.'],
  ['ShieldCheck', 'Compliance handled', 'Gas, electrical and fire safety compliance tracked and coordinated on your behalf, with reminders before anything lapses.'],
  ['Building2', 'Property care you can see', 'Scheduled inspections with written reports, so you know the condition of your property without having to chase.'],
  ['Banknote', 'Reliable, consistent income', 'Rent arrangements agreed up front, with the stability of a long-term professional tenant relationship.']
] as const;

export const landlordFaqs = [
  ['What condition does my property need to be in?', 'Properties need to meet standard safety and habitability requirements, including a valid gas safety certificate, EICR and smoke/carbon monoxide alarms. We\u2019ll walk through any work needed together before a placement begins.'],
  ['Who do I contact if something goes wrong?', 'You\u2019ll have a single named contact on our property partnerships team for maintenance queries, inspections or anything else — no call centres, no starting from scratch each time.'],
  ['How often is my property inspected?', 'We carry out scheduled inspections and provide a written report after each visit, so you always know the condition of your property.'],
  ['What kind of tenancy or licence arrangement is used?', 'This depends on the property and service type, and is agreed and documented clearly with you before any placement, along with rent and notice arrangements.'],
  ['How long are landlord partnerships typically?', 'We aim to build long-term partnerships rather than short lets, giving you consistent income and giving residents the stability of not having to move on unnecessarily.']
];

export const heroSlides = [
  {
    src: '/hero-house-front.png',
    title: 'Modern supported accommodation',
    text: 'Safe, well-presented homes for people who need housing-related support.'
  },
  {
    src: '/hero-support-kitchen.png',
    title: 'Practical daily support',
    text: 'Person-centred support that helps people build confidence and routines.'
  },
  {
    src: '/hero-support-meeting.png',
    title: 'Support planning and move-on',
    text: 'Warm, professional conversations focused on stability and independence.'
  }
];
