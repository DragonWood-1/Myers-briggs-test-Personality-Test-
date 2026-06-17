// Career catalogue used to generate the "Best careers for {TYPE}" pages.
// 16 types × (these variants) produces the large career-page surface area.

export interface CareerCategory {
  slug: string;
  // {TYPE} is replaced with the four-letter code, {type} with lowercase
  titleTemplate: string;
  headingTemplate: string;
  intro: string;
}

// 200+ career titles, grouped, used to populate each type's career page.
export const CAREER_POOL: string[] = [
  "Software Engineer", "Data Scientist", "Product Manager", "UX Designer", "Web Developer",
  "Systems Architect", "DevOps Engineer", "Machine Learning Engineer", "Cybersecurity Analyst",
  "Database Administrator", "Network Engineer", "IT Consultant", "Game Developer", "QA Engineer",
  "Accountant", "Financial Analyst", "Investment Banker", "Actuary", "Auditor", "Economist",
  "Management Consultant", "Operations Manager", "Project Manager", "Business Analyst",
  "Entrepreneur", "Marketing Manager", "Brand Strategist", "Sales Director", "Public Relations Specialist",
  "Human Resources Manager", "Recruiter", "Corporate Trainer", "Executive Coach",
  "Physician", "Surgeon", "Nurse", "Dentist", "Pharmacist", "Physical Therapist", "Psychologist",
  "Psychiatrist", "Counselor", "Social Worker", "Occupational Therapist", "Dietitian", "Veterinarian",
  "Teacher", "Professor", "School Counselor", "Instructional Designer", "Librarian", "Researcher",
  "Lawyer", "Judge", "Paralegal", "Policy Analyst", "Diplomat", "Politician", "Urban Planner",
  "Civil Engineer", "Mechanical Engineer", "Electrical Engineer", "Aerospace Engineer",
  "Chemical Engineer", "Biomedical Engineer", "Architect", "Industrial Designer",
  "Graphic Designer", "Illustrator", "Photographer", "Animator", "Art Director", "Writer",
  "Journalist", "Editor", "Copywriter", "Content Strategist", "Novelist", "Screenwriter",
  "Musician", "Composer", "Actor", "Film Director", "Producer", "Interior Designer", "Fashion Designer",
  "Chef", "Event Planner", "Hospitality Manager", "Travel Consultant", "Tour Guide",
  "Real Estate Agent", "Property Manager", "Insurance Agent", "Financial Planner", "Stockbroker",
  "Pilot", "Air Traffic Controller", "Logistics Manager", "Supply Chain Analyst", "Procurement Specialist",
  "Electrician", "Mechanic", "Carpenter", "Plumber", "Welder", "Machinist", "Construction Manager",
  "Paramedic", "Firefighter", "Police Officer", "Detective", "Military Officer", "Forensic Scientist",
  "Biologist", "Chemist", "Physicist", "Astronomer", "Geologist", "Environmental Scientist",
  "Statistician", "Mathematician", "Data Engineer", "Business Intelligence Analyst",
  "Customer Success Manager", "Account Executive", "Sales Engineer", "Growth Marketer",
  "SEO Specialist", "Social Media Manager", "Community Manager", "Technical Writer",
  "Nonprofit Director", "Fundraiser", "Volunteer Coordinator", "Grant Writer",
  "Speech-Language Pathologist", "Audiologist", "Radiologic Technologist", "Lab Technician",
  "Quality Manager", "Compliance Officer", "Risk Analyst", "Tax Advisor", "Bookkeeper",
  "Office Manager", "Administrative Director", "Executive Assistant", "Operations Analyst",
  "Translator", "Interpreter", "Linguist", "Curator", "Historian", "Anthropologist",
  "Sociologist", "Political Scientist", "Market Researcher", "Survey Researcher",
  "Agricultural Scientist", "Horticulturist", "Park Ranger", "Wildlife Biologist", "Marine Biologist",
  "Commercial Pilot", "Ship Captain", "Railway Engineer", "Transportation Planner",
  "Energy Analyst", "Sustainability Consultant", "Renewable Energy Engineer",
  "Robotics Engineer", "AI Researcher", "Cloud Architect", "Blockchain Developer",
  "Mobile App Developer", "Front-End Developer", "Back-End Developer", "Full-Stack Developer",
  "Site Reliability Engineer", "Solutions Architect", "Scrum Master", "Agile Coach",
  "Customer Support Lead", "Call Center Manager", "Retail Manager", "Store Owner",
  "Personal Trainer", "Fitness Instructor", "Sports Coach", "Athletic Director",
  "Dental Hygienist", "Optometrist", "Chiropractor", "Acupuncturist", "Midwife",
  "Childcare Director", "Early Childhood Educator", "Special Education Teacher",
  "Massage Therapist", "Cosmetologist", "Hairstylist", "Makeup Artist", "Esthetician",
  "Carpenter Foreman", "Site Supervisor", "Estimator", "Building Inspector",
  "Investment Manager", "Hedge Fund Analyst", "Venture Capitalist", "Private Equity Associate",
  "Corporate Strategist", "Chief Executive Officer", "Chief Financial Officer", "Chief Technology Officer",
  "Chief Operating Officer", "Chief Marketing Officer", "General Manager", "Regional Director",
];

// Variant pages requested by the brief: "Best careers for X", "...for X women",
// "Best remote jobs for X", etc. Each variant × 16 types is its own page.
export const CAREER_VARIANTS: CareerCategory[] = [
  {
    slug: "best-careers-for",
    titleTemplate: "Best Careers for {TYPE} ({YEAR})",
    headingTemplate: "Best Careers for {TYPE} — The {NICK}",
    intro:
      "The {TYPE} personality type thrives in roles that match its natural strengths. Below are the careers where {TYPE}s tend to excel, why they fit, and what to look for in a workplace.",
  },
  {
    slug: "best-careers-for-women",
    titleTemplate: "Best Careers for {TYPE} Women",
    headingTemplate: "Best Careers for {TYPE} Women",
    intro:
      "{TYPE} women bring a distinctive blend of strengths to the workplace. These careers play to those strengths while offering the autonomy, growth and meaning {TYPE}s value most.",
  },
  {
    slug: "best-remote-jobs-for",
    titleTemplate: "Best Remote Jobs for {TYPE}",
    headingTemplate: "Best Remote Jobs for {TYPE}",
    intro:
      "Remote work suits the {TYPE} type when it offers focus, flexibility and clear outcomes. These remote-friendly roles align with how {TYPE}s prefer to work.",
  },
  {
    slug: "highest-paying-careers-for",
    titleTemplate: "Highest-Paying Careers for {TYPE}",
    headingTemplate: "Highest-Paying Careers for {TYPE}",
    intro:
      "Looking to maximize earning potential while staying true to your strengths? These high-paying careers are a strong match for the {TYPE} personality.",
  },
  {
    slug: "best-careers-for-introverted",
    titleTemplate: "Best Careers for Introverted {TYPE}",
    headingTemplate: "Best Careers for Introverted {TYPE}",
    intro:
      "If you're a {TYPE} who recharges with focused, independent work, these careers offer depth, autonomy and minimal draining interruptions.",
  },
];

// Deterministic helper: pick a stable subset of careers for a given type so each
// page is consistent across builds.
export function careersForType(careerMatches: string[], seed: number, count = 12): string[] {
  const pool = Array.from(new Set([...careerMatches, ...CAREER_POOL]));
  const result: string[] = [];
  let idx = seed % pool.length;
  while (result.length < Math.min(count, pool.length)) {
    const c = pool[idx % pool.length];
    if (!result.includes(c)) result.push(c);
    idx += 7; // co-prime-ish stride for spread
  }
  return result;
}
