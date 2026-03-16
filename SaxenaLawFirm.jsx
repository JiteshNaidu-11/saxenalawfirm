import { useState, useEffect, useRef, useCallback } from "react";

/* ─── PALETTE ─────────────────────────────────────── */
const C = {
  navy:   "#0F2D5E",
  blue:   "#1A4A9C",
  mid:    "#2E6DD4",
  sky:    "#5B9BF0",
  pale:   "#EBF2FF",
  pale2:  "#F4F8FF",
  white:  "#FFFFFF",
  text:   "#0D1F3C",
  muted:  "#5A6A8A",
  border: "#D4E3F7",
};

/* ─── DATA ─────────────────────────────────────────── */
const TEAM = [
  {
    id: 1,
    name: "Adv. Rajesh Saxena",
    role: "Founder & Senior Partner",
    exp: "25+ Years",
    spec: "Criminal Law & Civil Litigation",
    img: "https://i.pravatar.cc/400?img=11",
    bar: "Bar Council of Maharashtra & Goa",
    edu: "LL.B – Government Law College, Mumbai | LL.M – University of Delhi",
    awards: ["Best Criminal Lawyer Award 2018 – Nashik Bar Association", "Senior Advocate Designation – Bombay High Court 2015"],
    bio: `Adv. Rajesh Saxena is the founding partner of Saxena Law Firm with over 25 years of practice in criminal and civil law. He established the firm in 1999 with a single mission: to provide every client, regardless of background, access to skilled and dedicated legal representation.

Over the course of his career, Adv. Saxena has appeared in hundreds of cases before the District Courts, Bombay High Court, and the Supreme Court of India. His methodical approach to case strategy and his command of procedural law have earned him a reputation as one of the most formidable advocates in the Nashik region.

Outside the courtroom, Adv. Saxena is deeply involved in legal aid initiatives, providing pro bono services to underprivileged clients through the District Legal Services Authority. He is also a regular speaker at law college seminars on criminal procedure and evidence law.`,
    cases: ["Successfully defended a murder accused in a high-profile case before the Bombay High Court (2022)", "Secured full acquittal in a complex cheating and fraud case involving 14 accused parties (2020)", "Won landmark property dispute restoring ₹6.2 Cr worth of land to original owners (2019)"],
    quote: "Justice is not a privilege of the wealthy. It is the right of every person who walks through our door.",
  },
  {
    id: 2,
    name: "Adv. Priya Saxena",
    role: "Managing Partner",
    exp: "18+ Years",
    spec: "Corporate Law & Family Law",
    img: "https://i.pravatar.cc/400?img=47",
    bar: "Bar Council of Maharashtra & Goa",
    edu: "LL.B – ILS Law College, Pune | MBA – Symbiosis Institute of Management",
    awards: ["Outstanding Woman Advocate Award 2021 – Nashik District Bar", "Corporate Law Excellence Award 2019 – FICCI"],
    bio: `Adv. Priya Saxena joined the firm in 2006 and has since risen to the position of Managing Partner, overseeing the firm's corporate and family law departments. With a rare dual qualification in law and management, she brings a uniquely commercial perspective to legal disputes.

Her practice focuses on helping businesses navigate complex regulatory environments, draft watertight contracts, and resolve commercial disputes efficiently — often avoiding costly litigation altogether. She has advised startups, SMEs, and large corporations across sectors including real estate, manufacturing, and IT services.

In family law, Adv. Priya is known for her compassionate yet results-driven approach. She understands that family disputes are deeply personal, and she works to protect the interests of her clients — especially children — with the utmost sensitivity.`,
    cases: ["Advised on a ₹120 Cr merger transaction involving two Pune-based manufacturing firms (2023)", "Secured favourable child custody and maintenance orders in a contested international divorce (2022)", "Drafted and enforced a shareholders' agreement preventing hostile takeover of a family business (2021)"],
    quote: "The best legal outcome is one where my client can move forward with clarity, stability, and confidence.",
  },
  {
    id: 3,
    name: "Adv. Arjun Mehta",
    role: "Senior Associate",
    exp: "12+ Years",
    spec: "Real Estate & Contract Law",
    img: "https://i.pravatar.cc/400?img=13",
    bar: "Bar Council of Maharashtra & Goa",
    edu: "LL.B – Dr. Ambedkar Law University | LL.M (Real Property) – National Law School, Bangalore",
    awards: ["Rising Star Advocate 2017 – Maharashtra State Bar Council", "Real Estate Law Specialist Certification – ICSI 2018"],
    bio: `Adv. Arjun Mehta is the firm's lead advocate for real estate and contract matters. With an LL.M specialising in real property law, he brings technical depth to an area of practice that touches millions of ordinary people — from first-time homebuyers to large developers.

Arjun has handled matters across the full spectrum of real estate law: RERA complaints, title verification, property registration disputes, builder-buyer conflicts, and landlord-tenant litigation. His command of both transactional and litigation aspects makes him an invaluable resource for clients navigating Maharashtra's complex property landscape.

He also advises businesses on commercial contracts, vendor agreements, and procurement documentation, ensuring that his clients' interests are protected at the negotiation stage — not just in court.`,
    cases: ["Filed and won a landmark RERA complaint against a Nashik developer on behalf of 38 flat buyers (2023)", "Successfully challenged a fraudulent property title transfer worth ₹3.8 Cr in District Court (2022)", "Drafted and negotiated a 200-acre land development agreement for a real estate consortium (2021)"],
    quote: "In real estate, prevention is always better than cure. A well-drafted document today can prevent a decade of litigation tomorrow.",
  },
  {
    id: 4,
    name: "Adv. Kavita Sharma",
    role: "Associate Attorney",
    exp: "8+ Years",
    spec: "Wills, Estates & Family Law",
    img: "https://i.pravatar.cc/400?img=44",
    bar: "Bar Council of Maharashtra & Goa",
    edu: "LL.B – Mumbai University | Diploma in Family Law – NLSIU Bangalore",
    awards: ["Young Advocate of the Year 2020 – Nashik Bar Association"],
    bio: `Adv. Kavita Sharma joined Saxena Law Firm in 2016 and has built a focused practice in wills, estate planning, and family law. She has a particular talent for helping families navigate sensitive legal matters — succession disputes, divorce proceedings, custody arrangements — with both competence and compassion.

Kavita is highly regarded for her work in estate planning, where she helps clients structure their assets, draft comprehensive wills, and set up trusts to ensure their wishes are carried out seamlessly. Her meticulous attention to detail and her ability to explain complex legal concepts in plain language make her a favourite among clients.

She is also deeply committed to women's legal rights, regularly providing free legal advice through women's helpline organisations in Nashik district.`,
    cases: ["Successfully probated and administered an estate worth ₹8 Cr across multiple contested claimants (2023)", "Drafted a comprehensive family trust structure protecting assets for a multi-generational business family (2022)", "Secured a divorce decree and full maintenance rights for a client in a high-conflict matrimonial case (2021)"],
    quote: "Planning for the future is an act of love for the people you leave behind. I take that responsibility seriously.",
  },
  {
    id: 5,
    name: "Adv. Sunil Patil",
    role: "Senior Associate",
    exp: "10+ Years",
    spec: "Labour Law & Service Matters",
    img: "https://i.pravatar.cc/400?img=15",
    bar: "Bar Council of Maharashtra & Goa",
    edu: "LL.B – Pune University | PG Diploma in Labour Law – Symbiosis",
    awards: ["Excellence in Labour Law Practice – Maharashtra Bar 2020"],
    bio: `Adv. Sunil Patil heads the firm's labour and employment law practice. Over a decade, he has represented both employers and employees in a wide range of industrial disputes, service matters, and employment-related litigation before the Labour Court, Industrial Tribunal, and High Court.

His deep understanding of the Industrial Disputes Act, Factories Act, and ESIC/PF regulations enables him to provide comprehensive compliance advice to businesses while also vigorously defending the rights of workers facing unfair termination, unpaid wages, or unsafe working conditions.

Sunil is well known in Nashik's industrial corridor for his practical, no-nonsense approach to resolving workplace disputes — often achieving settlements that save both employers and employees from the time and cost of prolonged litigation.`,
    cases: ["Represented 240 workers in a mass illegal retrenchment case, securing full reinstatement and back wages (2023)", "Advised a manufacturing company through a complete labour law compliance audit, avoiding ₹1.2 Cr in penalties (2022)", "Won a landmark service matter before the High Court for a dismissed government employee (2021)"],
    quote: "Every worker deserves dignity, and every employer deserves clarity. My job is to bridge that gap with the law.",
  },
  {
    id: 6,
    name: "Adv. Meera Joshi",
    role: "Associate Attorney",
    exp: "6+ Years",
    spec: "Consumer Law & Civil Disputes",
    img: "https://i.pravatar.cc/400?img=45",
    bar: "Bar Council of Maharashtra & Goa",
    edu: "LL.B – Nashik University | Certificate in Consumer Protection Law – NLU Delhi",
    awards: ["Consumer Rights Champion Award – District Forum 2022"],
    bio: `Adv. Meera Joshi is the youngest member of the Saxena Law Firm team but has quickly established herself as a formidable advocate in consumer law and civil disputes. Since joining the firm in 2018, she has filed and won dozens of cases before the District Consumer Disputes Redressal Forum and the State Commission.

Her practice covers insurance claim disputes, defective goods complaints, service deficiency cases against banks and telecom companies, and misleading advertisement complaints. She has a particular passion for holding large corporations accountable to ordinary consumers — and a track record to match.

In addition to consumer law, Meera handles a range of civil matters including recovery suits, cheque bounce cases under Section 138 NI Act, and injunction applications.`,
    cases: ["Won ₹45 lakh compensation against a leading insurance company for wrongful claim rejection (2023)", "Filed and won 12 simultaneous Section 138 NI Act cheque bounce cases for a MSME client (2022)", "Secured permanent injunction against unfair business practices by a builder in Nashik (2021)"],
    quote: "Every consumer has rights. My mission is to make sure those rights are not just words on paper.",
  },
];

const FOCUS_AREAS = [
  {
    id: 1,
    icon: "⚖️",
    title: "Criminal Defense",
    tagline: "Protecting your freedom with skilled, strategic defense",
    color: "#1A4A9C",
    article: {
      intro: "Criminal law is one of the most consequential areas of legal practice — the stakes could not be higher. At Saxena Law Firm, we have defended clients across every category of criminal charge with the same level of dedication and rigour.",
      sections: [
        { heading: "What We Handle", body: "Our criminal defense practice covers the full spectrum of offenses under the Indian Penal Code, including crimes against persons (assault, murder, kidnapping), property offenses (theft, dacoity, fraud), economic offenses (cheating, forgery, money laundering), and cybercrime. We appear before Magistrate Courts, Sessions Courts, the Bombay High Court, and the Supreme Court." },
        { heading: "Our Approach", body: "We begin every criminal matter with a thorough review of the FIR, charge sheet, and evidence. Our team scrutinises police procedures, identifies evidentiary defects, and builds a defense strategy anchored in facts and law. We are experienced in bail applications, anticipatory bail, discharge applications, and full trial defense." },
        { heading: "Protecting Your Rights", body: "We firmly believe that every accused person — regardless of the charge — is entitled to a vigorous and ethical defense. We ensure that our clients understand their rights at every stage: the right to silence, the right to bail, the right to a fair trial, and the right to legal representation from the moment of arrest." },
        { heading: "Notable Outcomes", body: "Our team has secured acquittals in murder trials, obtained bail in NDPS cases where bail is typically restricted, won discharge applications before framing of charges, and successfully challenged unconstitutional police action before the High Court." },
      ],
    },
  },
  {
    id: 2,
    icon: "🏛️",
    title: "Civil Litigation",
    tagline: "Resolving disputes with strategic precision and persistence",
    color: "#2E6DD4",
    article: {
      intro: "Civil litigation encompasses a vast range of legal disputes between private parties — and navigating the Indian civil court system requires both deep legal knowledge and the patience to see complex matters through to resolution.",
      sections: [
        { heading: "Scope of Practice", body: "Our civil litigation team handles money recovery suits, specific performance of contracts, injunction applications (temporary and permanent), declaratory suits, partition suits, and appeals at all levels. We appear regularly in Civil Courts, the City Civil Court, the High Court, and before arbitral tribunals." },
        { heading: "Commercial Disputes", body: "We handle complex commercial disputes involving breached contracts, supply chain failures, partnership dissolution, and shareholder conflicts. Our team combines legal strategy with commercial understanding to help clients achieve outcomes that protect their long-term business interests." },
        { heading: "Property & Title Disputes", body: "Disputes over property — whether involving fraud, inheritance, boundary conflicts, or builder defaults — are among the most emotionally charged legal matters. Our team has extensive experience in establishing and defending property rights through thorough title investigation and litigation." },
        { heading: "Alternate Dispute Resolution", body: "Where appropriate, we actively explore mediation, conciliation, and arbitration as alternatives to protracted court proceedings. Our advocates are trained mediators who can guide parties toward fair, binding settlements that save time, cost, and relationships." },
      ],
    },
  },
  {
    id: 3,
    icon: "👨‍👩‍👧",
    title: "Family Law",
    tagline: "Guiding families through difficult times with care and clarity",
    color: "#1A4A9C",
    article: {
      intro: "Family law matters are among the most personal and emotionally demanding legal situations a person can face. At Saxena Law Firm, we combine professional excellence with genuine human sensitivity to guide our clients through divorce, custody, and matrimonial disputes.",
      sections: [
        { heading: "Matrimonial Matters", body: "We handle divorce petitions under the Hindu Marriage Act, Special Marriage Act, and personal laws applicable to all communities. Whether a matter is contested or mutual, we ensure that our clients' rights regarding matrimonial property, maintenance, and custody are fully protected." },
        { heading: "Child Custody & Welfare", body: "The welfare of children is always our paramount concern in custody matters. We help clients navigate guardianship applications, custody arrangements, visitation rights, and — where required — international parental child abduction issues under the Hague Convention framework." },
        { heading: "Maintenance & Alimony", body: "We advise and represent clients in maintenance proceedings under Section 125 CrPC, Section 24 HMA, and personal law provisions. We work to ensure fair and enforceable maintenance orders that reflect the actual financial circumstances of all parties." },
        { heading: "Domestic Violence", body: "We provide compassionate and urgent assistance to victims of domestic violence, helping them obtain protection orders, residence orders, and compensation under the Protection of Women from Domestic Violence Act, 2005. We work closely with support organisations to ensure clients have a complete safety net." },
      ],
    },
  },
  {
    id: 4,
    icon: "🏢",
    title: "Corporate Law",
    tagline: "Sound legal foundations for businesses at every stage",
    color: "#2E6DD4",
    article: {
      intro: "Businesses face legal challenges at every stage of their lifecycle — from incorporation and fundraising to day-to-day compliance and eventual succession. Our corporate law team is equipped to be your legal partner at every milestone.",
      sections: [
        { heading: "Business Formation & Structure", body: "We advise on the most appropriate legal structure for new ventures — private limited company, LLP, partnership, or sole proprietorship — and handle all aspects of incorporation, including MOA/AOA drafting, regulatory filings, and initial compliance setup." },
        { heading: "Contracts & Agreements", body: "Well-drafted contracts are the foundation of secure business relationships. Our team drafts and reviews shareholder agreements, joint venture agreements, vendor contracts, employment contracts, franchise agreements, and technology licensing agreements with meticulous attention to risk allocation and enforceability." },
        { heading: "Regulatory & Compliance", body: "We help businesses stay compliant with SEBI regulations, GST, the Companies Act 2013, FEMA, and sector-specific regulations. Our proactive compliance audits help identify and address risks before they become liabilities." },
        { heading: "Mergers, Acquisitions & Restructuring", body: "Our team advises on the legal aspects of M&A transactions, including due diligence, deal structuring, regulatory approvals, and post-merger integration. We have advised on transactions across manufacturing, retail, real estate, and services sectors." },
      ],
    },
  },
  {
    id: 5,
    icon: "🏠",
    title: "Real Estate Law",
    tagline: "Protecting property rights at every stage of the transaction",
    color: "#1A4A9C",
    article: {
      intro: "Real estate transactions represent some of the most significant financial decisions in a person's life. Our real estate law practice ensures that every aspect of your property dealings — from purchase to dispute resolution — is handled with expertise and care.",
      sections: [
        { heading: "Property Transactions", body: "We conduct thorough title searches and due diligence before any property transaction, identifying encumbrances, litigation risks, and title defects that could affect your purchase. We draft and review sale agreements, conveyance deeds, development agreements, and lease documents to protect your interests." },
        { heading: "RERA Matters", body: "The Real Estate (Regulation and Development) Act, 2016 has transformed the landscape for flat buyers and developers alike. We file and defend complaints before the Maharashtra RERA Authority, handling cases of delayed possession, project abandonment, false representations, and illegal alterations." },
        { heading: "Landlord-Tenant Disputes", body: "We advise and represent both landlords and tenants in disputes relating to rent, eviction, leave and licence agreements, and rent control matters. Our team is experienced in navigating the complexities of both rent control legislation and modern leave and licence frameworks." },
        { heading: "Land Acquisition", body: "We represent landowners facing compulsory acquisition proceedings under the Land Acquisition Act, ensuring fair compensation, proper procedure, and — where appropriate — successful challenges to acquisition notifications before the High Court." },
      ],
    },
  },
  {
    id: 6,
    icon: "📋",
    title: "Wills & Estates",
    tagline: "Securing your family's future with careful planning",
    color: "#2E6DD4",
    article: {
      intro: "Estate planning is one of the most important gifts you can give your family — and one of the most frequently postponed. Our Wills & Estates practice helps individuals and families plan with foresight, ensuring that their wishes are honoured and their loved ones protected.",
      sections: [
        { heading: "Will Drafting & Registration", body: "We draft comprehensive, legally watertight wills that clearly express your wishes regarding the distribution of your assets. We advise on the most appropriate type of will for your circumstances — simple will, mutual will, or conditional will — and handle registration where appropriate." },
        { heading: "Probate & Administration", body: "When a loved one passes away, the legal process of probate and estate administration can be overwhelming. We guide executors and administrators through the court process, asset identification, creditor settlement, and final distribution to beneficiaries." },
        { heading: "Trusts & Succession Planning", body: "For families with significant assets or complex family structures, trusts offer powerful tools for tax-efficient wealth transfer, asset protection, and structured succession. We design and implement private trusts, charitable trusts, and family settlement agreements tailored to your unique circumstances." },
        { heading: "Contested Estates & Succession Disputes", body: "Unfortunately, inheritance disputes are common — and can be deeply damaging to family relationships. Our team handles succession disputes, challenges to wills, claims under the Hindu Succession Act, and Muslim personal law inheritance matters with both legal rigour and personal sensitivity." },
      ],
    },
  },
];

const BLOG_POSTS = [
  {
    id: 1,
    category: "Criminal Law",
    title: "What to Do If You Are Arrested in India: A Step-by-Step Legal Guide",
    excerpt: "Being arrested is a frightening experience. Understanding your rights — and exercising them immediately — can make a significant difference to your case.",
    date: "12 February 2025",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    author: "Adv. Rajesh Saxena",
    authorImg: "https://i.pravatar.cc/80?img=11",
    content: [
      { heading: "Your Rights Begin the Moment of Arrest", body: "Under Article 22 of the Constitution of India, every arrested person has the right to be informed of the grounds of arrest, the right to consult a lawyer of their choice, and the right to be produced before a magistrate within 24 hours. These rights cannot be waived by the police." },
      { heading: "Do Not Resist — But Do Not Consent to Searches Without a Warrant", body: "While you should not physically resist arrest, you are under no obligation to assist the police beyond identifying yourself. You are not required to answer investigative questions, consent to a search of your phone or home without a valid warrant, or make any statement without legal counsel present." },
      { heading: "Contact a Lawyer Immediately", body: "Your first and most important action after arrest should be to contact a criminal defense lawyer. Do not attempt to explain your innocence to the police without counsel — even innocent explanations can be misconstrued or selectively used. A lawyer will advise you on whether to apply for bail, when to speak, and how to protect your case from the outset." },
      { heading: "The Bail Process Explained", body: "Bail is a legal right, not a favour. Depending on the nature of the offense, you may be entitled to anticipatory bail (before arrest), regular bail (after arrest), or interim bail (temporary). An experienced advocate can assess your situation and file the appropriate application before the competent court within hours of arrest." },
      { heading: "What Happens After the First 24 Hours?", body: "If not released on bail, you will be produced before a magistrate who may remand you to police custody (for up to 15 days in total) or judicial custody. During this period, your lawyer can file a bail application and begin building your defense. Do not lose hope — and do not attempt to influence witnesses or tamper with evidence, as this can seriously damage your case." },
    ],
  },
  {
    id: 2,
    category: "Real Estate",
    title: "RERA 2025: What Every Flat Buyer in Maharashtra Must Know",
    excerpt: "Maharashtra's RERA authority has stepped up enforcement in 2025. Here is what buyers need to know about their rights and remedies against defaulting builders.",
    date: "28 January 2025",
    readTime: "9 min read",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    author: "Adv. Arjun Mehta",
    authorImg: "https://i.pravatar.cc/80?img=13",
    content: [
      { heading: "The RERA Promise and the Ground Reality", body: "The Real Estate (Regulation and Development) Act, 2016 was a landmark law designed to protect homebuyers from the endemic delays, broken promises, and fund diversions that had plagued Indian real estate for decades. In Maharashtra, MahaRERA has been one of the most active RERA authorities in the country — but enforcement remains uneven." },
      { heading: "Your Key Rights as a Flat Buyer", body: "Under RERA, every registered project must disclose its timeline, carpet area, amenities, and financial statements on the MahaRERA portal. Builders cannot collect more than 10% of the sale price before a registered agreement for sale. If possession is delayed, you are entitled to interest at SBI MCLR + 2% for every month of delay — or a full refund with interest if you choose to withdraw." },
      { heading: "Filing a RERA Complaint: A Practical Guide", body: "Complaints under RERA must be filed online at the MahaRERA portal. You will need the project registration number, your agreement for sale, payment receipts, and any correspondence with the builder. The process is relatively accessible, but having legal representation significantly improves the speed and outcome of your complaint." },
      { heading: "Recent 2025 Developments in Maharashtra", body: "In early 2025, MahaRERA introduced a new conciliation forum for first-stage dispute resolution, mandatory quarterly project updates from developers, and stricter penalties for non-compliance. The authority has also begun proactively auditing stalled projects and appointing recovery officers to enforce outstanding compensation orders." },
      { heading: "When to Hire a Lawyer", body: "While minor complaints can sometimes be handled independently, complex cases — involving fraud, large amounts, or multiple buyers — benefit enormously from legal representation. An experienced RERA advocate will draft a precise complaint, present evidence effectively before the adjudicating officer, and enforce any order obtained against the builder's assets." },
    ],
  },
  {
    id: 3,
    category: "Family Law",
    title: "Child Custody Laws in India: What Courts Actually Consider",
    excerpt: "When parents separate, the question of who cares for the children becomes paramount. Here is a clear guide to how Indian courts decide custody — and what you can do to protect your child's interests.",
    date: "15 January 2025",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=600&q=80",
    author: "Adv. Kavita Sharma",
    authorImg: "https://i.pravatar.cc/80?img=44",
    content: [
      { heading: "The Paramount Principle: Welfare of the Child", body: "In all custody decisions, Indian courts are guided by a single overriding principle: the welfare and best interests of the child. This is not merely a guideline — it is a constitutional imperative grounded in Article 21 and reflected in the Guardians and Wards Act, 1890, the Hindu Minority and Guardianship Act, 1956, and personal law statutes." },
      { heading: "Types of Custody Arrangements", body: "Indian courts may grant physical custody (day-to-day care and residence), legal custody (decision-making authority over education, health, religion), or joint custody (shared between both parents). There is a growing trend toward joint custody arrangements that allow both parents to remain meaningfully involved in their child's life." },
      { heading: "What Factors Do Courts Actually Weigh?", body: "Courts consider the child's age (particularly for young children, maternal care is given significant weight), the emotional bond between each parent and child, each parent's financial stability and lifestyle, the child's own preferences (especially if above 9–10 years), continuity of education and social environment, and — critically — any history of domestic violence, abuse, or substance use by either parent." },
      { heading: "The Role of the Child in Proceedings", body: "Courts have wide discretion to interact directly with children, particularly older children, to understand their preferences. This interaction typically happens in-camera (in the judge's chambers without the parents present) to allow the child to speak freely. A child's stated preference is persuasive but not decisive." },
      { heading: "Practical Steps If You Are in a Custody Dispute", body: "Document your involvement in your child's daily life — school pickups, medical appointments, activities. Avoid speaking negatively about the other parent in front of the child, as courts view this very unfavourably. Comply strictly with any interim orders regarding visitation, even if you disagree with them. And above all — prioritise your child's emotional stability throughout the process." },
    ],
  },
  {
    id: 4,
    category: "Corporate Law",
    title: "Founders' Agreements: Why Every Startup Needs One Before It Needs a Lawyer",
    excerpt: "Most startup disputes could have been avoided with a well-drafted founders' agreement on day one. Here is what it should cover — and why the conversation is worth having early.",
    date: "5 January 2025",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
    author: "Adv. Priya Saxena",
    authorImg: "https://i.pravatar.cc/80?img=47",
    content: [
      { heading: "The Most Common Startup Legal Mistake", body: "In our experience advising early-stage companies, the single most common — and most expensive — mistake founders make is starting a business together without a written agreement. Equity splits decided over coffee, vesting schedules that exist only in someone's memory, and exit provisions that were never discussed: these are the seeds of disputes that later tear companies apart." },
      { heading: "What a Founders' Agreement Must Cover", body: "At minimum, a founders' agreement should address: equity ownership and the basis for each founder's stake; a vesting schedule (typically 4 years with a 1-year cliff); IP assignment — ensuring that all IP created by founders belongs to the company, not the individual; roles, responsibilities, and decision-making processes; what happens if a founder wants to leave, is incapacitated, or passes away; and non-compete and non-solicitation obligations." },
      { heading: "Vesting: Protecting the Company from a Departing Founder", body: "Vesting is probably the most important — and most misunderstood — concept in a founders' agreement. Without vesting, a co-founder who leaves after six months walks away with the same equity as one who stayed for five years. Standard four-year vesting with a one-year cliff means a founder earns no equity in their first year, then vests 25% on the anniversary and the remainder monthly over the next three years." },
      { heading: "Investor-Readiness", body: "Beyond preventing internal disputes, a solid founders' agreement significantly improves a company's investor-readiness. Sophisticated angel investors and venture funds conduct legal due diligence before investing — and a company with clear IP assignment, clean cap table documentation, and well-drafted founder arrangements signals professionalism and reduces perceived risk." },
    ],
  },
  {
    id: 5,
    category: "Labour Law",
    title: "Wrongful Termination in India: Your Rights and Your Remedies",
    excerpt: "Being dismissed from employment is stressful and often unexpected. Understanding whether your termination was lawful — and what you can do if it was not — is the first step to protecting yourself.",
    date: "20 December 2024",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    author: "Adv. Sunil Patil",
    authorImg: "https://i.pravatar.cc/80?img=15",
    content: [
      { heading: "What Makes a Termination 'Wrongful' Under Indian Law?", body: "Indian labour law provides significant protections against arbitrary dismissal, particularly for workers in the 'organised sector' covered by the Industrial Disputes Act, 1947. A termination is generally unlawful if it is done without following proper procedure, without valid cause, in violation of standing orders, in retaliation for union activity or protected speech, or without payment of legal dues including notice pay, gratuity, and retrenchment compensation." },
      { heading: "The IDA Framework: Who Is Protected?", body: "The Industrial Disputes Act protections apply primarily to 'workmen' — a broad category that includes most non-managerial employees. Employees in supervisory or managerial roles have fewer statutory protections under the IDA but may have strong contractual claims under general civil law and service law principles." },
      { heading: "Mandatory Procedures Before Dismissal", body: "For misconduct-related dismissals, employers must conduct a domestic inquiry that follows principles of natural justice: the employee must receive a written charge sheet, have an opportunity to respond, be allowed to examine evidence and witnesses, and receive a speaking order. Failure to conduct a proper inquiry is itself grounds for challenging the dismissal." },
      { heading: "Remedies Available to Wrongfully Dismissed Employees", body: "If your dismissal is found to be illegal, the Labour Court can order reinstatement (with full back wages), monetary compensation in lieu of reinstatement, and payment of all outstanding dues. The choice between reinstatement and compensation depends on the specific facts — in some cases, particularly where trust has broken down, compensation is the more practical remedy." },
    ],
  },
  {
    id: 6,
    category: "Consumer Law",
    title: "How to File a Consumer Forum Complaint and Actually Win",
    excerpt: "India's consumer courts have become more accessible and effective. Here is a practical guide to filing a complaint — from the first step to getting your compensation.",
    date: "8 December 2024",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    author: "Adv. Meera Joshi",
    authorImg: "https://i.pravatar.cc/80?img=45",
    content: [
      { heading: "The Consumer Protection Act 2019: A Stronger Framework", body: "The Consumer Protection Act, 2019 significantly strengthened the framework for consumer redressal in India. It introduced product liability claims against manufacturers and sellers, enhanced the jurisdiction of consumer forums, allowed e-complaints, and enabled class action complaints where a defect or deficiency affects multiple consumers." },
      { heading: "Which Forum Has Jurisdiction Over Your Case?", body: "The forum you file in depends on the value of your claim: the District Consumer Disputes Redressal Commission (up to ₹1 crore), the State Commission (₹1 crore to ₹10 crore), and the National Commission (above ₹10 crore). Claims involving e-commerce can be filed in the consumer's place of residence, regardless of where the business operates." },
      { heading: "Preparing Your Complaint: The Evidence That Wins Cases", body: "A strong consumer complaint needs documentary evidence: purchase receipts, invoices, product photographs, warranty cards, communication with the company (emails, WhatsApp messages, complaint tickets), and expert reports where relevant. Courts are increasingly accepting digital evidence, so preserve screenshots and e-mails carefully." },
      { heading: "Common Complaints That Succeed", body: "Insurance claim rejections without valid reason, delayed possession by builders, defective products from e-commerce platforms, overcharging by hospitals and diagnostic centres, and unfair charges by banks and telecom companies are among the most successful categories of consumer complaints. The key is clear documentation and a precise statement of the deficiency or defect." },
    ],
  },
];

/* ─── HOOKS ───────────────────────────────────────── */
const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, dir = "up", style = {} }) => {
  const [ref, inView] = useInView();
  const map = { up: "translateY(32px)", left: "translateX(-32px)", right: "translateX(32px)", none: "none" };
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : map[dir], transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
};

/* ─── GLOBAL STYLES ───────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #fff; color: #0D1F3C; overflow-x: hidden; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-thumb { background: #2E6DD4; border-radius: 3px; }

  .serif { font-family: 'DM Serif Display', serif; }
  .sans  { font-family: 'DM Sans', sans-serif; }

  /* Buttons */
  .btn-navy { background:#0F2D5E; color:#fff; font-family:'DM Sans',sans-serif; font-weight:600; font-size:13px; letter-spacing:1.2px; text-transform:uppercase; padding:13px 30px; border:2px solid #0F2D5E; cursor:pointer; border-radius:3px; transition:all .28s; }
  .btn-navy:hover { background:#1A4A9C; border-color:#1A4A9C; transform:translateY(-2px); box-shadow:0 8px 24px rgba(15,45,94,.25); }
  .btn-outline { background:transparent; color:#0F2D5E; font-family:'DM Sans',sans-serif; font-weight:600; font-size:13px; letter-spacing:1.2px; text-transform:uppercase; padding:11px 28px; border:2px solid #0F2D5E; cursor:pointer; border-radius:3px; transition:all .28s; }
  .btn-outline:hover { background:#0F2D5E; color:#fff; transform:translateY(-2px); }
  .btn-white { background:#fff; color:#0F2D5E; font-family:'DM Sans',sans-serif; font-weight:700; font-size:13px; letter-spacing:1.2px; text-transform:uppercase; padding:13px 30px; border:2px solid #fff; cursor:pointer; border-radius:3px; transition:all .28s; }
  .btn-white:hover { background:transparent; color:#fff; transform:translateY(-2px); }
  .btn-ghost-w { background:transparent; color:rgba(255,255,255,.85); font-family:'DM Sans',sans-serif; font-weight:600; font-size:13px; letter-spacing:1.2px; text-transform:uppercase; padding:11px 28px; border:2px solid rgba(255,255,255,.45); cursor:pointer; border-radius:3px; transition:all .28s; }
  .btn-ghost-w:hover { border-color:#fff; color:#fff; background:rgba(255,255,255,.08); transform:translateY(-2px); }

  /* Cards */
  .lift { transition:transform .32s ease, box-shadow .32s ease; cursor:pointer; }
  .lift:hover { transform:translateY(-6px); box-shadow:0 16px 48px rgba(15,45,94,.13); }

  /* Team card */
  .team-card { overflow:hidden; border-radius:8px; border:1px solid #D4E3F7; background:#fff; transition:all .32s; cursor:pointer; }
  .team-card:hover { transform:translateY(-6px); box-shadow:0 16px 52px rgba(15,45,94,.15); border-color:#97BEF0; }
  .team-card:hover .team-img { transform:scale(1.05); }
  .team-img { width:100%; height:260px; object-fit:cover; object-position:top; transition:transform .5s ease; display:block; }
  .team-overlay { background:linear-gradient(to top,rgba(15,45,94,.92) 0%,transparent 60%); position:absolute; inset:0; opacity:0; transition:opacity .32s; display:flex; align-items:flex-end; padding:20px; }
  .team-card:hover .team-overlay { opacity:1; }

  /* Focus card */
  .focus-card { border-radius:8px; border:1px solid #D4E3F7; padding:32px 26px; background:#fff; cursor:pointer; transition:all .32s; position:relative; overflow:hidden; }
  .focus-card::before { content:''; position:absolute; bottom:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#0F2D5E,#2E6DD4); transform:scaleX(0); transform-origin:left; transition:transform .32s; }
  .focus-card:hover { transform:translateY(-5px); box-shadow:0 16px 48px rgba(15,45,94,.12); border-color:#97BEF0; }
  .focus-card:hover::before { transform:scaleX(1); }

  /* Blog card */
  .blog-card { border-radius:8px; border:1px solid #D4E3F7; overflow:hidden; background:#fff; cursor:pointer; transition:all .32s; }
  .blog-card:hover { transform:translateY(-5px); box-shadow:0 16px 48px rgba(15,45,94,.12); border-color:#97BEF0; }
  .blog-card:hover .blog-img { transform:scale(1.04); }
  .blog-img { width:100%; height:200px; object-fit:cover; transition:transform .5s ease; display:block; }

  /* Nav */
  .nav-link { font-family:'DM Sans',sans-serif; font-weight:500; font-size:13px; letter-spacing:1.2px; text-transform:uppercase; border:none; background:none; cursor:pointer; padding:4px 0; position:relative; transition:color .2s; }
  .nav-link::after { content:''; position:absolute; bottom:0; left:0; width:0; height:2px; transition:width .25s; }
  .nav-link-dark { color:#1A4A9C; }
  .nav-link-dark:hover { color:#0F2D5E; }
  .nav-link-dark::after { background:#2E6DD4; }
  .nav-link-dark:hover::after { width:100%; }
  .nav-link-light { color:rgba(255,255,255,.78); }
  .nav-link-light:hover { color:#fff; }
  .nav-link-light::after { background:#fff; }
  .nav-link-light:hover::after { width:100%; }

  /* Page transition */
  .page-enter { animation: pageIn .45s cubic-bezier(.4,0,.2,1) both; }
  .page-exit  { animation: pageOut .3s ease both; }
  @keyframes pageIn  { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
  @keyframes pageOut { from { opacity:1; } to { opacity:0; } }

  /* Hero animations */
  @keyframes hFadeUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
  @keyframes hFadeRight{ from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:none} }
  @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes scrollBob { 0%,100%{opacity:1;transform:translateY(0)} 50%{opacity:.3;transform:translateY(6px)} }
  @keyframes pulse     { 0%,100%{box-shadow:0 0 0 0 rgba(46,109,212,.4)} 70%{box-shadow:0 0 0 12px rgba(46,109,212,0)} }

  .h-a1{animation:hFadeRight .7s ease .15s both}
  .h-a2{animation:hFadeUp .75s ease .3s both}
  .h-a3{animation:hFadeUp .75s ease .5s both}
  .h-a4{animation:hFadeUp .75s ease .65s both}
  .h-a5{animation:hFadeUp .75s ease .82s both}
  .float{animation:floatY 5s ease-in-out infinite}
  .bob{animation:scrollBob 2s ease-in-out infinite}
  .pulse-dot{animation:pulse 2.2s infinite}

  /* Divider */
  .divider { height:3px; background:linear-gradient(90deg,#0F2D5E,#2E6DD4,#EBF2FF); border:none; border-radius:2px; }

  /* Dot bg */
  .dot-bg { background-image:radial-gradient(circle,rgba(46,109,212,.09) 1px,transparent 0); background-size:26px 26px; }
  .dot-bg-w { background-image:radial-gradient(circle,rgba(255,255,255,.09) 1px,transparent 0); background-size:26px 26px; }

  /* Inputs */
  input,textarea,select { outline:none; transition:border-color .22s,box-shadow .22s; }
  input:focus,textarea:focus,select:focus { border-color:#2E6DD4!important; box-shadow:0 0 0 3px rgba(46,109,212,.1)!important; }

  /* Article prose */
  .prose p   { font-size:16px; line-height:1.9; color:#3a4a6a; margin-bottom:20px; }
  .prose h3  { font-family:'DM Serif Display',serif; font-size:22px; color:#0F2D5E; margin:36px 0 12px; }
  .prose ul  { padding-left:20px; margin-bottom:20px; }
  .prose ul li { font-size:15.5px; line-height:1.8; color:#3a4a6a; margin-bottom:8px; }

  /* Back btn */
  .back-btn { display:inline-flex; align-items:center; gap:8px; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:500; color:#2E6DD4; cursor:pointer; border:none; background:none; letter-spacing:.5px; transition:gap .2s; padding:0; }
  .back-btn:hover { gap:12px; }

  /* Stat number */
  @keyframes countUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }

  @media(max-width:900px){
    .hide-mob{display:none!important}
    .show-mob{display:flex!important}
    .g2{grid-template-columns:1fr!important}
    .g3{grid-template-columns:1fr 1fr!important}
    .g4{grid-template-columns:1fr 1fr!important}
  }
  @media(max-width:580px){
    .g3{grid-template-columns:1fr!important}
    .g4{grid-template-columns:1fr!important}
    .g-stat{grid-template-columns:1fr 1fr!important}
  }
`;

/* ─── SECTION LABEL ───────────────────────────────── */
const SLabel = ({ children }) => (
  <div className="sans" style={{ fontSize: 11, letterSpacing: 4, color: C.mid, textTransform: "uppercase", marginBottom: 12 }}>{children}</div>
);

const SHeading = ({ children }) => (
  <h2 className="serif" style={{ fontSize: "clamp(30px,3.8vw,50px)", color: C.navy, lineHeight: 1.1, marginBottom: 16 }}>{children}</h2>
);

/* ─── NAVBAR ───────────────────────────────────────── */
const Navbar = ({ page, setPage, scrolled, mobileOpen, setMobileOpen }) => {
  const navLinks = ["Home", "About", "Focus Areas", "Team", "Blog", "Contact"];
  const isHome = page === "home";
  const showLight = isHome && !scrolled;

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled || !isHome ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: scrolled || !isHome ? "blur(16px)" : "none", boxShadow: scrolled || !isHome ? "0 2px 20px rgba(15,45,94,.09)" : "none", borderBottom: scrolled || !isHome ? `1px solid ${C.border}` : "none", transition: "all .3s", padding: "0 5%" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => setPage("home")}>
          <div style={{ width: 40, height: 40, background: showLight ? "#fff" : C.navy, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Serif Display',serif", fontSize: 20, fontWeight: 400, color: showLight ? C.navy : "#fff", transition: "all .3s" }}>S</div>
          <div>
            <div className="serif" style={{ fontSize: 17, letterSpacing: 1, color: showLight ? "#fff" : C.navy, lineHeight: 1.1, transition: "color .3s" }}>SAXENA</div>
            <div className="sans" style={{ fontSize: 8.5, letterSpacing: 4, color: showLight ? "rgba(255,255,255,.65)" : C.mid, marginTop: 1, transition: "color .3s" }}>LAW FIRM</div>
          </div>
        </div>

        {/* Desktop */}
        <div className="hide-mob" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {navLinks.map(l => (
            <button key={l} className={`nav-link ${showLight ? "nav-link-light" : "nav-link-dark"}`}
              onClick={() => { if (l === "Home") setPage("home"); else if (l === "Blog") setPage("blog"); else { setPage("home"); setTimeout(() => { const el = document.getElementById(l.toLowerCase().replace(/ /g, "-")); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 80); } }}>
              {l}
            </button>
          ))}
          <button className="btn-navy" style={{ fontSize: 11.5, padding: "9px 20px" }} onClick={() => { setPage("home"); setTimeout(() => { document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }, 80); }}>Free Consultation</button>
        </div>

        {/* Mobile ham */}
        <button onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }} className="g3" >
          {[0, 1, 2].map(i => <div key={i} style={{ width: i === 2 ? 14 : 22, height: 2, background: showLight ? "#fff" : C.navy, borderRadius: 2 }} />)}
        </button>
      </div>
      {mobileOpen && (
        <div style={{ background: "#fff", borderTop: `1px solid ${C.border}`, padding: "16px 5%" }}>
          {navLinks.map(l => (
            <button key={l} className="nav-link nav-link-dark" style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 0", borderBottom: `1px solid ${C.pale}` }}
              onClick={() => { setMobileOpen(false); if (l === "Blog") setPage("blog"); else { setPage("home"); setTimeout(() => { document.getElementById(l.toLowerCase().replace(/ /g, "-"))?.scrollIntoView({ behavior: "smooth" }); }, 80); } }}>
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

/* ─── HOME PAGE ────────────────────────────────────── */
const HomePage = ({ setPage, setActiveTeam, setActiveFocus, setActiveBlog }) => {
  const statsRef = useRef(null);
  const [counts, setCounts] = useState([0, 0, 0]);
  const [cDone, setCDone] = useState(false);
  const statNums = [2500, 25, 98];
  const statLabels = ["Cases", "Years", "Satisfaction"];

  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div>
      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", background: `linear-gradient(145deg, ${C.navy} 0%, #163472 45%, #1F55B0 100%)`, display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .4 }} />
        <div style={{ position: "absolute", right: "-6%", top: "8%", width: 480, height: 480, borderRadius: "50%", border: "1px solid rgba(255,255,255,.06)" }} />
        <div style={{ position: "absolute", right: "4%", top: "16%", width: 340, height: 340, borderRadius: "50%", border: "1px solid rgba(255,255,255,.04)" }} />
        <div style={{ position: "absolute", left: "-10%", bottom: "-14%", width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,.018)" }} />

        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "120px 5% 80px", width: "100%", display: "grid", gridTemplateColumns: "1.2fr .8fr", gap: 56, alignItems: "center" }}>
          <div>
            <div className="h-a1" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#7EC8E3", display: "inline-block" }} />
              <span className="sans" style={{ fontSize: 11, letterSpacing: 2.5, color: "rgba(255,255,255,.82)", textTransform: "uppercase" }}>Established 1999 · Nashik, Maharashtra</span>
            </div>

            <h1 className="serif h-a2" style={{ fontSize: "clamp(38px,5.5vw,70px)", color: "#fff", lineHeight: 1.08, marginBottom: 22 }}>
              Defending Rights.<br />
              <span style={{ color: "#7EC8E3" }}>Delivering Justice.</span>
            </h1>

            <p className="sans h-a3" style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.88, color: "rgba(255,255,255,.68)", maxWidth: 500, marginBottom: 40 }}>
              25+ years of trusted legal representation across criminal, civil, corporate and family law — by advocates who genuinely care about your outcome.
            </p>

            <div className="h-a4" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-white" onClick={() => scrollTo("contact")}>Book Free Consultation</button>
              <button className="btn-ghost-w" onClick={() => scrollTo("focus-areas")}>Our Practice Areas</button>
            </div>

            <div ref={statsRef} className="h-a5" style={{ display: "flex", gap: 40, marginTop: 52, paddingTop: 36, borderTop: "1px solid rgba(255,255,255,.12)" }}>
              {[["2500+", "Cases"], ["25+", "Years"], ["98%", "Satisfaction"]].map(([n, l]) => (
                <div key={l}>
                  <div className="serif" style={{ fontSize: 30, color: "#7EC8E3" }}>{n}</div>
                  <div className="sans" style={{ fontSize: 10.5, letterSpacing: 2, color: "rgba(255,255,255,.38)", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating card */}
          <div className="float hide-mob" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ background: "rgba(255,255,255,.97)", borderRadius: 10, padding: "26px 28px", boxShadow: "0 24px 64px rgba(10,20,60,.3)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>⚖️</span>
                <div><div className="serif" style={{ fontSize: 17, color: C.navy }}>Free Legal Consultation</div>
                  <div className="sans" style={{ fontSize: 12, color: C.muted }}>Speak with a senior advocate today</div></div>
              </div>
              <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, marginBottom: 14 }} />
              {["Criminal Defense", "Family & Divorce", "Property Disputes", "Corporate Matters"].map(it => (
                <div key={it} style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", background: C.pale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.mid }} />
                  </div>
                  <span className="sans" style={{ fontSize: 13.5, color: "#374466" }}>{it}</span>
                </div>
              ))}
              <button className="btn-navy" style={{ width: "100%", marginTop: 14 }} onClick={() => scrollTo("contact")}>Get Started →</button>
            </div>
            <div style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 10, padding: "15px 20px", display: "flex", alignItems: "center", gap: 13 }}>
              <span style={{ fontSize: 24 }}>📞</span>
              <div><div className="sans" style={{ fontSize: 10, letterSpacing: 2.5, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>Call Now</div>
                <div className="serif" style={{ fontSize: 19, color: "#fff" }}>+91 98765 43210</div></div>
            </div>
          </div>

          {/* Mobile Phone Button */}
          <div className="show-mob" style={{ display: "none" }}>
            <div style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 10, padding: "15px 20px", display: "flex", alignItems: "center", gap: 13 }}>
              <span style={{ fontSize: 24 }}>📞</span>
              <div><div className="sans" style={{ fontSize: 10, letterSpacing: 2.5, color: "rgba(255,255,255,.5)", textTransform: "uppercase" }}>Call Now</div>
                <div className="serif" style={{ fontSize: 19, color: "#fff" }}>+91 98765 43210</div></div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", textAlign: "center", animation: "hFadeUp .7s ease 1.1s both" }}>
          <div className="sans" style={{ fontSize: 9.5, letterSpacing: 3, color: "rgba(255,255,255,.3)", textTransform: "uppercase", marginBottom: 9 }}>Scroll</div>
          <div className="bob" style={{ width: 1, height: 32, background: "linear-gradient(to bottom,rgba(255,255,255,.5),transparent)", margin: "0 auto" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "108px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="g2">
          <FadeIn dir="left">
            <div style={{ position: "relative" }}>
              <div style={{ background: C.pale, borderRadius: 8, padding: "44px 38px", position: "relative", borderLeft: `5px solid ${C.blue}` }}>
                <div className="serif" style={{ fontSize: 52, color: C.blue, opacity: .18, lineHeight: 1, marginBottom: 10 }}>"</div>
                <p className="sans" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.82, color: "#2a3a5e", marginBottom: 28 }}>
                  Law is not merely a profession for us — it is a responsibility to uphold truth, protect the innocent, and ensure justice prevails in every matter we handle.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                  <img src="https://i.pravatar.cc/80?img=11" alt="RS" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <div className="serif" style={{ fontSize: 15, color: C.navy }}>Adv. Rajesh Saxena</div>
                    <div className="sans" style={{ fontSize: 10.5, letterSpacing: 2, color: C.mid, textTransform: "uppercase" }}>Founder & Senior Partner</div>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", bottom: -18, right: -18, background: C.navy, color: "#fff", padding: "17px 22px", borderRadius: 6, boxShadow: "0 10px 32px rgba(15,45,94,.28)", textAlign: "center" }}>
                <div className="serif" style={{ fontSize: 28 }}>25+</div>
                <div className="sans" style={{ fontSize: 10, opacity: .8, letterSpacing: 1.5 }}>Years of Practice</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn dir="right">
            <div>
              <SLabel>About Our Firm</SLabel>
              <SHeading>A Firm Built on <span style={{ color: C.mid }}>Trust & Results</span></SHeading>
              <hr className="divider" style={{ width: 70, margin: "0 0 24px" }} />
              <p className="sans" style={{ fontSize: 15.5, fontWeight: 300, lineHeight: 1.9, color: C.muted, marginBottom: 18 }}>
                Founded in 1999, Saxena Law Firm has grown into one of the most respected full-service law firms in Maharashtra, with 15+ experienced advocates and a track record spanning over 2,500 cases.
              </p>
              <p className="sans" style={{ fontSize: 15.5, fontWeight: 300, lineHeight: 1.9, color: C.muted, marginBottom: 32 }}>
                We believe every client deserves personalised, strategic legal representation — from the first consultation to the final judgment.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
                {["Client-First Approach", "Transparent Communication", "Strong Courtroom Advocacy", "Proven Track Record"].map(v => (
                  <div key={v} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                    <div style={{ width: 18, height: 18, borderRadius: 3, background: C.pale, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <span style={{ color: C.blue, fontSize: 10, fontWeight: 700 }}>✓</span>
                    </div>
                    <span className="sans" style={{ fontSize: 13.5, color: "#3a4a6a" }}>{v}</span>
                  </div>
                ))}
              </div>
              <button className="btn-navy" onClick={() => scrollTo("team")}>Meet Our Founders</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section id="focus-areas" style={{ padding: "108px 5%", background: "#F2F7FF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 58 }}>
              <SLabel>Our Focus</SLabel>
              <SHeading>Areas of <span style={{ color: C.mid }}>Legal Practice</span></SHeading>
              <hr className="divider" style={{ width: 80, margin: "0 auto 18px" }} />
              <p className="sans" style={{ fontSize: 15.5, fontWeight: 300, color: C.muted, maxWidth: 490, margin: "0 auto", lineHeight: 1.8 }}>
                Click on any area to read a detailed guide on what we do, how we approach cases, and what outcomes you can expect.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="g3">
            {FOCUS_AREAS.map((f, i) => (
              <FadeIn key={f.id} delay={i * 0.07}>
                <div className="focus-card" onClick={() => { setActiveFocus(f); setPage("focus"); window.scrollTo(0, 0); }}>
                  <div style={{ width: 50, height: 50, borderRadius: 6, background: C.pale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, marginBottom: 16 }}>{f.icon}</div>
                  <h3 className="serif" style={{ fontSize: 20, color: C.navy, marginBottom: 8 }}>{f.title}</h3>
                  <hr style={{ border: "none", borderTop: `2px solid ${C.pale}`, marginBottom: 12 }} />
                  <p className="sans" style={{ fontSize: 13.5, fontWeight: 300, color: C.muted, lineHeight: 1.78, marginBottom: 16 }}>{f.tagline}</p>
                  <div className="sans" style={{ fontSize: 12.5, fontWeight: 600, color: C.mid, display: "flex", alignItems: "center", gap: 5 }}>Read More →</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "64px 5%", background: `linear-gradient(135deg,${C.navy},${C.blue})`, position: "relative", overflow: "hidden" }} ref={statsRef}>
        <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .35 }} />
        <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, position: "relative" }} className="g-stat">
          {[["Cases Handled", "+"], ["Years of Practice", "+"], ["Client Satisfaction", "%"], ["Expert Advocates", "+"]].map(([l, s], i) => (
            <div key={l} style={{ textAlign: "center", padding: "20px 12px" }}>
              <div className="serif" style={{ fontSize: "clamp(42px,4.5vw,62px)", color: "#fff", lineHeight: 1, marginBottom: 10 }}>{counts[i]}{s}</div>
              <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,.2)", width: 40, margin: "0 auto 12px" }} />
              <div className="sans" style={{ fontSize: 11, letterSpacing: 2.5, color: "rgba(255,255,255,.55)", textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ padding: "108px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 58 }}>
              <SLabel>Our Founders</SLabel>
              <SHeading>Meet Our <span style={{ color: C.mid }}>Founders</span></SHeading>
              <hr className="divider" style={{ width: 80, margin: "0 auto 18px" }} />
              <p className="sans" style={{ fontSize: 15.5, fontWeight: 300, color: C.muted, maxWidth: 460, margin: "0 auto" }}>
                Click on any founder to read their full profile, specialisation, and notable case highlights.
              </p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="g3">
            {TEAM.map((m, i) => (
              <FadeIn key={m.id} delay={i * 0.08}>
                <div className="team-card" onClick={() => { setActiveTeam(m); setPage("attorney"); window.scrollTo(0, 0); }}>
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img className="team-img" src={m.img} alt={m.name} />
                    <div className="team-overlay">
                      <div className="sans" style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Click to read full profile →</div>
                    </div>
                  </div>
                  <div style={{ padding: "20px 20px 22px", borderTop: `3px solid ${C.pale}` }}>
                    <div className="serif" style={{ fontSize: 18, color: C.navy, marginBottom: 4 }}>{m.name}</div>
                    <div className="sans" style={{ fontSize: 10.5, letterSpacing: 1.8, color: C.mid, textTransform: "uppercase", marginBottom: 8 }}>{m.role}</div>
                    <div className="sans" style={{ fontSize: 13, color: C.muted }}>{m.spec} · {m.exp}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "108px 5%", background: "#F2F7FF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 58 }}>
              <SLabel>Client Stories</SLabel>
              <SHeading>What Our Clients <span style={{ color: C.mid }}>Say</span></SHeading>
              <hr className="divider" style={{ width: 80, margin: "0 auto" }} />
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="g3">
            {[
              { n: "Suresh Patel", r: "Business Owner", t: "Saxena Law Firm handled our corporate dispute with exceptional skill. Their strategic approach and clear communication made the entire process smooth. Highly recommended.", img: "https://i.pravatar.cc/60?img=12" },
              { n: "Meena Gupta", r: "Homeowner", t: "I was dealing with a complex property dispute and felt completely lost. Adv. Saxena's team was professional, empathetic, and resolved everything in my favour.", img: "https://i.pravatar.cc/60?img=48" },
              { n: "Rahul Verma", r: "IT Professional", t: "Fast, reliable, and focused on results. They handled my criminal case with total dedication. I am truly grateful to this incredible team for their unwavering support.", img: "https://i.pravatar.cc/60?img=14" },
            ].map((t, i) => (
              <FadeIn key={t.n} delay={i * .12}>
                <div className="lift" style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "32px 24px", position: "relative" }}>
                  <div style={{ position: "absolute", top: 16, right: 20, fontSize: 48, color: C.pale, fontFamily: "Georgia", fontWeight: 700, lineHeight: 1 }}>"</div>
                  <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                    {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#F5A623", fontSize: 13 }}>★</span>)}
                  </div>
                  <p className="sans" style={{ fontSize: 14.5, fontWeight: 300, lineHeight: 1.85, color: "#3a4a6a", marginBottom: 22, fontStyle: "italic" }}>"{t.t}"</p>
                  <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, marginBottom: 18 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={t.img} alt={t.n} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
                    <div>
                      <div className="serif" style={{ fontSize: 15, color: C.navy }}>{t.n}</div>
                      <div className="sans" style={{ fontSize: 11, color: C.mid }}>{t.r}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section id="blog-preview" style={{ padding: "108px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 50 }}>
              <div>
                <SLabel>From Our Desk</SLabel>
                <SHeading>Legal <span style={{ color: C.mid }}>Insights & Articles</span></SHeading>
                <hr className="divider" style={{ width: 72 }} />
              </div>
              <button className="btn-outline" onClick={() => { setPage("blog"); window.scrollTo(0, 0); }}>View All Articles →</button>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="g3">
            {BLOG_POSTS.slice(0, 3).map((p, i) => (
              <FadeIn key={p.id} delay={i * .08}>
                <div className="blog-card" onClick={() => { setActiveBlog(p); setPage("post"); window.scrollTo(0, 0); }}>
                  <div style={{ overflow: "hidden" }}>
                    <img className="blog-img" src={p.img} alt={p.title} />
                  </div>
                  <div style={{ padding: "20px 20px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <span className="sans" style={{ fontSize: 10, letterSpacing: 2, color: C.mid, textTransform: "uppercase", background: C.pale, padding: "3px 10px", borderRadius: 100 }}>{p.category}</span>
                      <span className="sans" style={{ fontSize: 11.5, color: "#9aaac4" }}>{p.readTime}</span>
                    </div>
                    <h3 className="serif" style={{ fontSize: 18, color: C.navy, lineHeight: 1.3, marginBottom: 10 }}>{p.title}</h3>
                    <p className="sans" style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.75, marginBottom: 16 }}>{p.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <img src={p.authorImg} alt={p.author} style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
                        <span className="sans" style={{ fontSize: 12, color: C.muted }}>{p.author}</span>
                      </div>
                      <span className="sans" style={{ fontSize: 11.5, color: "#9aaac4" }}>{p.date}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "108px 5%", background: "#F2F7FF" }}>
        <div style={{ maxWidth: 1300, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 58 }}>
              <SLabel>Get In Touch</SLabel>
              <SHeading>Book a <span style={{ color: C.mid }}>Free Consultation</span></SHeading>
              <hr className="divider" style={{ width: 80, margin: "0 auto 18px" }} />
              <p className="sans" style={{ fontSize: 15.5, color: C.muted, maxWidth: 440, margin: "0 auto" }}>Your first consultation is completely free. Speak with our senior advocates today.</p>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.7fr", gap: 30 }} className="g2">
            <FadeIn dir="left">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[["📍", "Office Address", "14, Legal Complex, Court Road\nNashik, Maharashtra 422001"], ["📞", "Phone", "+91 98765 43210\n+91 253 234 5678"], ["✉️", "Email", "contact@saxenalawfirm.com"], ["🕐", "Hours", "Mon – Sat: 10:00 AM – 7:00 PM\n24/7 Emergency Support"]].map(([ic, lb, vl]) => (
                  <div key={lb} style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, padding: "18px 20px", display: "flex", gap: 13, alignItems: "flex-start", borderLeft: `4px solid ${C.mid}` }}>
                    <span style={{ fontSize: 20 }}>{ic}</span>
                    <div>
                      <div className="sans" style={{ fontSize: 10, letterSpacing: 2, color: C.mid, textTransform: "uppercase", marginBottom: 4 }}>{lb}</div>
                      <div className="sans" style={{ fontSize: 14, color: "#2a3a5e", lineHeight: 1.7, whiteSpace: "pre-line" }}>{vl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn dir="right">
              <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "42px 38px", boxShadow: "0 8px 40px rgba(15,45,94,.07)" }}>
                <div className="serif" style={{ fontSize: 22, color: C.navy, marginBottom: 24 }}>Send Us a Message</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  {[["Full Name", "Your full name"], ["Phone", "+91 xxxxx xxxxx"]].map(([l, p]) => (
                    <div key={l}>
                      <label className="sans" style={{ fontSize: 11, fontWeight: 600, color: "#3a4a6a", letterSpacing: 1, display: "block", marginBottom: 6 }}>{l}</label>
                      <input placeholder={p} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 4, padding: "11px 13px", fontSize: 14, color: "#2a3a5e", fontFamily: "'DM Sans',sans-serif", background: "#fafcff" }} />
                    </div>
                  ))}
                </div>
                {[["Email", "your@email.com"], ["Legal Matter", null]].map(([l, p]) => (
                  <div key={l} style={{ marginBottom: 16 }}>
                    <label className="sans" style={{ fontSize: 11, fontWeight: 600, color: "#3a4a6a", letterSpacing: 1, display: "block", marginBottom: 6 }}>{l}</label>
                    {p ? <input placeholder={p} style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 4, padding: "11px 13px", fontSize: 14, color: "#2a3a5e", fontFamily: "'DM Sans',sans-serif", background: "#fafcff" }} />
                      : <select style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 4, padding: "11px 13px", fontSize: 14, color: "#3a4a6a", fontFamily: "'DM Sans',sans-serif", background: "#fafcff" }}>
                        <option value="">Select area</option>
                        {FOCUS_AREAS.map(f => <option key={f.id}>{f.title}</option>)}
                      </select>}
                  </div>
                ))}
                <div style={{ marginBottom: 24 }}>
                  <label className="sans" style={{ fontSize: 11, fontWeight: 600, color: "#3a4a6a", letterSpacing: 1, display: "block", marginBottom: 6 }}>Describe Your Case</label>
                  <textarea rows={4} placeholder="Briefly describe your legal situation..." style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 4, padding: "11px 13px", fontSize: 14, color: "#2a3a5e", fontFamily: "'DM Sans',sans-serif", background: "#fafcff", resize: "vertical" }} />
                </div>
                <button className="btn-navy" style={{ width: "100%", padding: "14px" }}>Submit & Book Consultation →</button>
                <p className="sans" style={{ fontSize: 11.5, color: "#8a9ab8", textAlign: "center", marginTop: 12 }}>We respond within 2 business hours. All inquiries are strictly confidential.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.navy, borderTop: `4px solid ${C.mid}` }}>
        <div style={{ maxWidth: 1300, margin: "0 auto", padding: "50px 5% 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 38 }} className="g4">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 15 }}>
                <div style={{ width: 40, height: 40, background: "#fff", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Serif Display',serif", fontSize: 20, color: C.navy }}>S</div>
                <div>
                  <div className="serif" style={{ fontSize: 18, color: "#fff", letterSpacing: 1 }}>SAXENA</div>
                  <div className="sans" style={{ fontSize: 8.5, color: "#7EC8E3", letterSpacing: 4 }}>LAW FIRM</div>
                </div>
              </div>
              <p className="sans" style={{ fontSize: 13, color: "rgba(255,255,255,.42)", lineHeight: 1.8, maxWidth: 270, marginBottom: 16 }}>Dedicated to delivering justice with integrity since 1999. Your trusted legal partner across Maharashtra.</p>
              <div className="sans" style={{ fontSize: 11, color: "rgba(255,255,255,.28)", fontStyle: "italic" }}>"Audi Alteram Partem"</div>
            </div>
            {[["Quick Links", ["Home", "About", "Focus Areas", "Team", "Blog", "Contact"]], ["Practice Areas", FOCUS_AREAS.map(f => f.title)], ["Contact", ["+91 98765 43210", "contact@saxenalawfirm.com", "Court Road, Nashik", "Mon–Sat: 10AM–7PM"]]].map(([title, items]) => (
              <div key={title}>
                <div className="sans" style={{ fontSize: 10, letterSpacing: 3, color: "#7EC8E3", textTransform: "uppercase", marginBottom: 14, fontWeight: 600 }}>{title}</div>
                <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,.12)", marginBottom: 14, width: 28 }} />
                {items.map(it => (
                  <div key={it} className="sans" style={{ fontSize: 12.5, color: "rgba(255,255,255,.38)", marginBottom: 8, cursor: "pointer", transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "rgba(255,255,255,.8)"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,.38)"}>{it}</div>
                ))}
              </div>
            ))}
          </div>
          <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,.08)", marginBottom: 20 }} />
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <div className="sans" style={{ fontSize: 11.5, color: "rgba(255,255,255,.25)" }}>© 2025 Saxena Law Firm. All Rights Reserved.</div>
            <div className="sans" style={{ fontSize: 11.5, color: "rgba(255,255,255,.25)" }}>Privacy Policy · Terms · Disclaimer</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ─── ATTORNEY DETAIL PAGE ─────────────────────────── */
const AttorneyPage = ({ attorney, setPage }) => (
  <div className="page-enter" style={{ paddingTop: 90 }}>
    {/* Hero Banner */}
    <div style={{ background: `linear-gradient(145deg,${C.navy},${C.blue})`, padding: "64px 5% 56px", position: "relative", overflow: "hidden" }}>
      <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .35 }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <button className="back-btn" onClick={() => { setPage("home"); setTimeout(() => document.getElementById("team")?.scrollIntoView({ behavior: "smooth" }), 80); }} style={{ color: "rgba(255,255,255,.7)", marginBottom: 28 }}>
          ← Back to Team
        </button>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 36, alignItems: "center" }} className="g2">
          <img src={attorney.img} alt={attorney.name} style={{ width: 140, height: 140, borderRadius: "50%", objectFit: "cover", border: "4px solid rgba(255,255,255,.25)", flexShrink: 0 }} />
          <div>
            <div className="sans" style={{ fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,.55)", textTransform: "uppercase", marginBottom: 8 }}>{attorney.role}</div>
            <h1 className="serif" style={{ fontSize: "clamp(28px,4vw,46px)", color: "#fff", marginBottom: 10 }}>{attorney.name}</h1>
            <div className="sans" style={{ fontSize: 14, color: "rgba(255,255,255,.65)", marginBottom: 14 }}>{attorney.spec}</div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 100, padding: "4px 14px" }} className="sans">
                <span style={{ fontSize: 11, letterSpacing: 1.5, color: "rgba(255,255,255,.75)", textTransform: "uppercase" }}>{attorney.exp} Experience</span>
              </span>
              <span style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 100, padding: "4px 14px" }} className="sans">
                <span style={{ fontSize: 11, letterSpacing: 1.5, color: "rgba(255,255,255,.75)", textTransform: "uppercase" }}>{attorney.bar}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Body */}
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 5%", display: "grid", gridTemplateColumns: "1fr 340px", gap: 48, alignItems: "start" }} className="g2">
      {/* Main */}
      <div>
        {/* Quote */}
        <div style={{ background: C.pale, borderLeft: `5px solid ${C.blue}`, borderRadius: "0 8px 8px 0", padding: "24px 28px", marginBottom: 40 }}>
          <div className="serif" style={{ fontSize: 38, color: C.blue, opacity: .2, lineHeight: 1, marginBottom: 6 }}>"</div>
          <p className="serif" style={{ fontSize: 20, fontStyle: "italic", color: C.navy, lineHeight: 1.72 }}>"{attorney.quote}"</p>
        </div>

        {/* Bio */}
        <div className="sans" style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.92, color: "#3a4a6a" }}>
          {attorney.bio.split("\n\n").map((para, i) => <p key={i} style={{ marginBottom: 20 }}>{para}</p>)}
        </div>

        {/* Notable Cases */}
        <div style={{ marginTop: 44 }}>
          <h2 className="serif" style={{ fontSize: 26, color: C.navy, marginBottom: 20 }}>Notable Cases & Outcomes</h2>
          <hr className="divider" style={{ width: 60, marginBottom: 24 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {attorney.cases.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 16, background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, padding: "18px 20px", borderLeft: `4px solid ${C.mid}` }}>
                <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>🏆</span>
                <p className="sans" style={{ fontSize: 14.5, color: "#3a4a6a", lineHeight: 1.75 }}>{c}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ background: "#F2F7FF", border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px" }}>
          <div className="sans" style={{ fontSize: 10.5, letterSpacing: 2.5, color: C.mid, textTransform: "uppercase", marginBottom: 14 }}>Education</div>
          <p className="sans" style={{ fontSize: 14, color: "#3a4a6a", lineHeight: 1.75 }}>{attorney.edu.split("|").map((e, i) => <span key={i} style={{ display: "block", marginBottom: 4 }}>{e.trim()}</span>)}</p>
        </div>
        <div style={{ background: "#F2F7FF", border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px" }}>
          <div className="sans" style={{ fontSize: 10.5, letterSpacing: 2.5, color: C.mid, textTransform: "uppercase", marginBottom: 14 }}>Awards & Recognition</div>
          {attorney.awards.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ color: "#F5A623", fontSize: 14, flexShrink: 0 }}>★</span>
              <span className="sans" style={{ fontSize: 13.5, color: "#3a4a6a", lineHeight: 1.65 }}>{a}</span>
            </div>
          ))}
        </div>
        <div style={{ background: C.navy, borderRadius: 8, padding: "24px" }}>
          <div className="sans" style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,.55)", textTransform: "uppercase", marginBottom: 10 }}>Book a Consultation</div>
          <p className="sans" style={{ fontSize: 13.5, color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: 18 }}>Speak directly with {attorney.name.split(" ")[1]} about your legal matter.</p>
          <button className="btn-white" style={{ width: "100%" }} onClick={() => { setPage("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 80); }}>Book Free Consultation</button>
        </div>
      </div>
    </div>
  </div>
);

/* ─── FOCUS AREA PAGE ──────────────────────────────── */
const FocusPage = ({ focus, setPage }) => (
  <div className="page-enter" style={{ paddingTop: 90 }}>
    <div style={{ background: `linear-gradient(145deg,${C.navy},${C.blue})`, padding: "64px 5% 56px", position: "relative", overflow: "hidden" }}>
      <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .35 }} />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
        <button className="back-btn" onClick={() => { setPage("home"); setTimeout(() => document.getElementById("focus-areas")?.scrollIntoView({ behavior: "smooth" }), 80); }} style={{ color: "rgba(255,255,255,.7)", marginBottom: 28 }}>
          ← Back to Practice Areas
        </button>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>
          <span className="sans" style={{ fontSize: 11, letterSpacing: 2.5, color: "rgba(255,255,255,.75)", textTransform: "uppercase" }}>Practice Area</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
          <span style={{ fontSize: 42 }}>{focus.icon}</span>
          <h1 className="serif" style={{ fontSize: "clamp(28px,4.5vw,52px)", color: "#fff" }}>{focus.title}</h1>
        </div>
        <p className="sans" style={{ fontSize: 17, color: "rgba(255,255,255,.65)", maxWidth: 540, lineHeight: 1.75 }}>{focus.article.intro}</p>
      </div>
    </div>

    <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 5%" }}>
      <div className="prose">
        {focus.article.sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 40, background: i % 2 === 0 ? "#fff" : "#F2F7FF", border: `1px solid ${C.border}`, borderRadius: 8, padding: "32px 36px", borderLeft: `4px solid ${C.mid}` }}>
            <h3 className="serif" style={{ fontSize: 24, color: C.navy, marginBottom: 14, marginTop: 0 }}>{s.heading}</h3>
            <p className="sans" style={{ fontSize: 15.5, lineHeight: 1.9, color: "#3a4a6a", marginBottom: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: `linear-gradient(135deg,${C.navy},${C.blue})`, borderRadius: 10, padding: "40px 40px", marginTop: 40, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, position: "relative", overflow: "hidden" }}>
        <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .3 }} />
        <div style={{ position: "relative" }}>
          <div className="serif" style={{ fontSize: 26, color: "#fff", marginBottom: 6 }}>Need advice on {focus.title}?</div>
          <div className="sans" style={{ fontSize: 14, color: "rgba(255,255,255,.62)" }}>Our specialists are available for a free initial consultation.</div>
        </div>
        <button className="btn-white" style={{ position: "relative" }} onClick={() => { setPage("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 80); }}>
          Book Free Consultation
        </button>
      </div>
    </div>
  </div>
);

/* ─── BLOG PAGE ────────────────────────────────────── */
const BlogPage = ({ setPage, setActiveBlog }) => (
  <div className="page-enter" style={{ paddingTop: 90 }}>
    <div style={{ background: `linear-gradient(145deg,${C.navy},${C.blue})`, padding: "64px 5% 56px", position: "relative", overflow: "hidden" }}>
      <div className="dot-bg-w" style={{ position: "absolute", inset: 0, opacity: .4 }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <button className="back-btn" onClick={() => setPage("home")} style={{ color: "rgba(255,255,255,.7)", marginBottom: 24 }}>← Back to Home</button>
        <SLabel>Legal Insights</SLabel>
        <h1 className="serif" style={{ fontSize: "clamp(32px,4.5vw,58px)", color: "#fff", marginBottom: 18 }}>Our Blog</h1>
        <p className="sans" style={{ fontSize: 16, color: "rgba(255,255,255,.62)", maxWidth: 520, lineHeight: 1.8 }}>
          Plain-language guides to the legal questions our clients ask most frequently — written by our advocates.
        </p>
      </div>
    </div>

    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 5%" }}>
      {/* Featured */}
      <div style={{ marginBottom: 56 }}>
        <div className="sans" style={{ fontSize: 10.5, letterSpacing: 3, color: C.mid, textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>Featured Article</div>
        <div className="lift" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden", cursor: "pointer" }} className="g2"
          onClick={() => { setActiveBlog(BLOG_POSTS[0]); setPage("post"); window.scrollTo(0, 0); }}>
          <img src={BLOG_POSTS[0].img} alt={BLOG_POSTS[0].title} style={{ width: "100%", height: 340, objectFit: "cover", display: "block" }} />
          <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
              <span className="sans" style={{ fontSize: 10, letterSpacing: 2, color: C.mid, textTransform: "uppercase", background: C.pale, padding: "3px 10px", borderRadius: 100 }}>{BLOG_POSTS[0].category}</span>
              <span className="sans" style={{ fontSize: 11.5, color: "#9aaac4" }}>{BLOG_POSTS[0].readTime}</span>
            </div>
            <h2 className="serif" style={{ fontSize: "clamp(20px,2.2vw,28px)", color: C.navy, lineHeight: 1.3, marginBottom: 14 }}>{BLOG_POSTS[0].title}</h2>
            <p className="sans" style={{ fontSize: 14.5, color: C.muted, lineHeight: 1.8, marginBottom: 24 }}>{BLOG_POSTS[0].excerpt}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src={BLOG_POSTS[0].authorImg} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
              <span className="sans" style={{ fontSize: 13, color: C.muted }}>{BLOG_POSTS[0].author}</span>
              <span className="sans" style={{ fontSize: 12, color: "#9aaac4", marginLeft: 8 }}>{BLOG_POSTS[0].date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
        {["All", ...new Set(BLOG_POSTS.map(p => p.category))].map(cat => (
          <span key={cat} className="sans" style={{ fontSize: 11.5, padding: "6px 16px", borderRadius: 100, border: `1px solid ${C.border}`, background: cat === "All" ? C.navy : "#fff", color: cat === "All" ? "#fff" : C.muted, cursor: "pointer", transition: "all .2s", letterSpacing: .5 }}
            onMouseEnter={e => { if (cat !== "All") { e.currentTarget.style.background = C.pale; e.currentTarget.style.borderColor = C.mid; } }}
            onMouseLeave={e => { if (cat !== "All") { e.currentTarget.style.background = "#fff"; e.currentTarget.style.borderColor = C.border; } }}>
            {cat}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 22 }} className="g3">
        {BLOG_POSTS.map((p, i) => (
          <div key={p.id} className="blog-card" onClick={() => { setActiveBlog(p); setPage("post"); window.scrollTo(0, 0); }} style={{ animationDelay: `${i * .07}s` }}>
            <div style={{ overflow: "hidden" }}><img className="blog-img" src={p.img} alt={p.title} /></div>
            <div style={{ padding: "18px 18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span className="sans" style={{ fontSize: 9.5, letterSpacing: 2, color: C.mid, textTransform: "uppercase", background: C.pale, padding: "3px 9px", borderRadius: 100 }}>{p.category}</span>
                <span className="sans" style={{ fontSize: 11, color: "#9aaac4" }}>{p.readTime}</span>
              </div>
              <h3 className="serif" style={{ fontSize: 17, color: C.navy, lineHeight: 1.32, marginBottom: 8 }}>{p.title}</h3>
              <p className="sans" style={{ fontSize: 13, color: C.muted, lineHeight: 1.72, marginBottom: 14 }}>{p.excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <img src={p.authorImg} alt="" style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover" }} />
                  <span className="sans" style={{ fontSize: 11.5, color: C.muted }}>{p.author}</span>
                </div>
                <span className="sans" style={{ fontSize: 11, color: "#9aaac4" }}>{p.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── BLOG POST PAGE ───────────────────────────────── */
const BlogPostPage = ({ post, setPage, setActiveBlog }) => (
  <div className="page-enter" style={{ paddingTop: 90 }}>
    {/* Hero */}
    <div style={{ position: "relative", height: 420, overflow: "hidden" }}>
      <img src={post.img} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(.45)" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top,rgba(15,45,94,.85),transparent 60%)` }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 5% 48px" }}>
        <div style={{ maxWidth: 820 }}>
          <button className="back-btn" onClick={() => setPage("blog")} style={{ color: "rgba(255,255,255,.65)", marginBottom: 20 }}>← Back to Blog</button>
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <span className="sans" style={{ fontSize: 10.5, letterSpacing: 2, color: "#fff", textTransform: "uppercase", background: "rgba(255,255,255,.18)", border: "1px solid rgba(255,255,255,.25)", padding: "3px 12px", borderRadius: 100 }}>{post.category}</span>
            <span className="sans" style={{ fontSize: 12, color: "rgba(255,255,255,.65)" }}>{post.readTime} · {post.date}</span>
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(24px,3.5vw,42px)", color: "#fff", lineHeight: 1.22 }}>{post.title}</h1>
        </div>
      </div>
    </div>

    <div style={{ maxWidth: 820, margin: "0 auto", padding: "56px 5%" }}>
      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 44, padding: "18px 22px", background: C.pale, borderRadius: 8, border: `1px solid ${C.border}` }}>
        <img src={post.authorImg} alt={post.author} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover" }} />
        <div>
          <div className="serif" style={{ fontSize: 16, color: C.navy }}>{post.author}</div>
          <div className="sans" style={{ fontSize: 12, color: C.muted }}>Saxena Law Firm · {post.date}</div>
        </div>
      </div>

      {/* Intro */}
      <p className="sans" style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.85, color: C.navy, marginBottom: 36, borderLeft: `4px solid ${C.mid}`, paddingLeft: 20, fontStyle: "italic" }}>
        {post.excerpt}
      </p>

      {/* Sections */}
      <div className="prose">
        {post.content.map((s, i) => (
          <div key={i} style={{ marginBottom: 36 }}>
            <h3 className="serif" style={{ fontSize: 24, color: C.navy, marginBottom: 14, marginTop: 0 }}>{s.heading}</h3>
            <p className="sans" style={{ fontSize: 15.5, lineHeight: 1.9, color: "#3a4a6a", marginBottom: 0 }}>{s.body}</p>
          </div>
        ))}
      </div>

      {/* Divider & more articles */}
      <hr style={{ border: "none", borderTop: `1px solid ${C.border}`, margin: "52px 0 40px" }} />
      <div className="serif" style={{ fontSize: 24, color: C.navy, marginBottom: 24 }}>More Articles</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }} className="g2">
        {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map(p => (
          <div key={p.id} className="blog-card" onClick={() => { setActiveBlog(p); window.scrollTo(0, 0); }}>
            <div style={{ overflow: "hidden" }}><img className="blog-img" src={p.img} alt={p.title} style={{ height: 150 }} /></div>
            <div style={{ padding: "14px 16px 18px" }}>
              <span className="sans" style={{ fontSize: 9.5, letterSpacing: 2, color: C.mid, textTransform: "uppercase", background: C.pale, padding: "2px 8px", borderRadius: 100 }}>{p.category}</span>
              <h4 className="serif" style={{ fontSize: 15, color: C.navy, lineHeight: 1.35, marginTop: 8 }}>{p.title}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Back CTA */}
      <div style={{ textAlign: "center", marginTop: 48 }}>
        <button className="btn-outline" onClick={() => setPage("blog")}>← View All Articles</button>
      </div>
    </div>
  </div>
);

/* ─── ROOT APP ─────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTeam, setActiveTeam] = useState(null);
  const [activeFocus, setActiveFocus] = useState(null);
  const [activeBlog, setActiveBlog] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const renderPage = () => {
    switch (page) {
      case "attorney": return activeTeam ? <AttorneyPage attorney={activeTeam} setPage={setPage} /> : null;
      case "focus":    return activeFocus ? <FocusPage focus={activeFocus} setPage={setPage} /> : null;
      case "blog":     return <BlogPage setPage={setPage} setActiveBlog={setActiveBlog} />;
      case "post":     return activeBlog ? <BlogPostPage post={activeBlog} setPage={setPage} setActiveBlog={setActiveBlog} /> : null;
      default:         return <HomePage setPage={setPage} setActiveTeam={setActiveTeam} setActiveFocus={setActiveFocus} setActiveBlog={setActiveBlog} />;
    }
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <Navbar page={page} setPage={setPage} scrolled={scrolled} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      {renderPage()}
    </>
  );
}
