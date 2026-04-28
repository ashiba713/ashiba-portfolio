// config/seed.js — Populate MongoDB with Ashiba's portfolio data
// Run with: node config/seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const Project  = require('../models/Project');
const Profile  = require('../models/Profile');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

const projects = [
  {
    title: 'Early Sepsis Risk Stratification',
    description: 'A multi-modal AI system predicting sepsis 6–12 hours earlier than standard clinical tools (qSOFA/SOFA) by fusing structured ICU vitals with unstructured clinical notes using a Cross-Modal Attention Fusion architecture and SHAP explainability.',
    tag: 'Featured · Independent Research',
    stack: ['PyTorch', 'ClinicalBERT', 'TFT', 'SHAP', 'FastAPI', 'MIMIC-IV', 'Streamlit'],
    githubUrl: 'https://github.com/ashiba713',
    featured: true,
    order: 1
  },
  {
    title: 'Business Intelligence Dashboard',
    description: 'Designed and deployed interactive Power BI dashboards to visualize key business metrics. Performed end-to-end data cleaning, transformation, and analysis on real-world datasets using Python during internship at Alric Infotech.',
    tag: 'Data Analytics · Internship',
    stack: ['Power BI', 'Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    githubUrl: 'https://github.com/ashiba713',
    featured: false,
    order: 2
  },
  {
    title: 'Sentiment Analyzer',
    description: 'A Natural Language Processing application that classifies the sentiment of text inputs (positive, negative, neutral) using VADER and TextBlob, with a clean Streamlit interface for real-time analysis.',
    tag: 'NLP · Machine Learning',
    stack: ['Python', 'NLP', 'VADER', 'TextBlob', 'Streamlit'],
    githubUrl: 'https://github.com/ashiba713',
    featured: false,
    order: 3
  },
  {
    title: 'Movie Recommendation System',
    description: 'A content-based movie recommender built using Cosine Similarity on TF-IDF vectors of movie metadata. Suggests similar movies based on genre, keywords, cast, and director preferences.',
    tag: 'Machine Learning · RecSys',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'TF-IDF', 'Streamlit'],
    githubUrl: 'https://github.com/ashiba713',
    featured: false,
    order: 4
  },
  {
    title: 'Student Result Analyzer',
    description: 'Exploratory data analysis tool for academic performance data. Uncovers patterns in student results through statistical summaries, correlation heatmaps, and visual grade distribution charts.',
    tag: 'EDA · Data Visualization',
    stack: ['Python', 'Pandas', 'Seaborn', 'Matplotlib'],
    githubUrl: 'https://github.com/ashiba713',
    featured: false,
    order: 5
  },
  {
    title: 'Personal Portfolio Website',
    description: 'This very website — a full-stack web application with HTML/CSS/JS frontend, Node.js + Express backend following MVC architecture, MongoDB for data storage, and deployed on Render.',
    tag: 'Full Stack · Web',
    stack: ['Node.js', 'Express', 'MongoDB', 'HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/ashiba713',
    featured: false,
    order: 6
  }
];

const profile = {
  name: 'Ashiba Alben A',
  title: 'Aspiring Data Scientist · AI & Data Science Engineer · Patent Holder · Journal Author',
  tagline: 'Transforming raw data into actionable intelligence',
  bio: [
    "I'm a B.Tech undergraduate specialising in Artificial Intelligence & Data Science at Arunachala College of Engineering for Women, Kanyakumari. My work sits at the intersection of clinical AI, machine learning, and data storytelling.",
    "I've filed 3 patents, co-authored 2 peer-reviewed journal articles, and built an advanced clinical AI system for early sepsis detection — fusing NLP with time-series ML. I'm passionate about turning messy real-world data into insights that matter."
  ],
  location: 'Kanyakumari, Tamil Nadu, India',
  email: 'ashibaalben2006@gmail.com',
  linkedin: 'https://linkedin.com/in/ashiba-a-087aa4309',
  github: 'https://github.com/ashiba713',
  college: 'Arunachala College of Engineering for Women, Kanyakumari',
  degree: 'B.Tech – Artificial Intelligence & Data Science',
  year: '2023 – 2027',
  stats: [
    { num: '3',   label: 'Patents Filed' },
    { num: '2',   label: 'Journal Papers' },
    { num: '10+', label: 'Certifications' },
    { num: '2K+', label: 'LinkedIn Network' }
  ],
  skills: [
    { category: 'Programming',        icon: '⬡', items: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'PyTorch'] },
    { category: 'Machine Learning',   icon: '⬡', items: ['Temporal Fusion Transformer', 'ClinicalBERT', 'BioGPT', 'SHAP', 'HuggingFace', 'Scikit-learn'] },
    { category: 'Data Analytics',     icon: '⬡', items: ['EDA', 'Power BI', 'Excel Dashboards', 'Statistical Analysis', 'Data Cleaning'] },
    { category: 'AI / GenAI',         icon: '⬡', items: ['Generative AI', 'Prompt Engineering', 'n8n', 'LLM Fine-tuning'] },
    { category: 'Tools & IDEs',       icon: '⬡', items: ['Jupyter Notebook', 'Google Colab', 'MLflow', 'FastAPI', 'Streamlit', 'VS Code'] },
    { category: 'Web & Visualization',icon: '⬡', items: ['HTML', 'CSS', 'JavaScript', 'Streamlit', 'Plotly'] }
  ],
  experience: [
    {
      role: 'Data Analytics Intern',
      company: 'Alric Infotech',
      location: 'Trivandrum',
      period: 'Jun 2025 – Jul 2025',
      points: [
        'Designed and deployed interactive Power BI dashboards to visualize key business metrics, enabling data-driven decision-making for stakeholders.',
        'Performed end-to-end data cleaning, transformation, and analysis on real-world datasets using Python (Pandas, Matplotlib, Seaborn) in Jupyter Notebook.',
        'Translated raw data into visual stories through charts, KPI cards, and trend analyses, improving data accessibility for non-technical audiences.'
      ]
    },
    {
      role: 'Data Science Intern',
      company: 'Elewayte',
      location: 'Remote',
      period: 'Jan 2025 – Feb 2025',
      points: [
        'Conducted Exploratory Data Analysis (EDA) on real-world datasets, uncovering hidden patterns, correlations, and outliers to guide business insights.',
        'Built and presented data visualization reports using Python libraries, developing expertise in communicating data findings clearly.'
      ]
    }
  ],
  patents: [
    {
      title: 'Spoon for Sweetness Enhancement Using Electrical Stimulation and Microdose Sweetener',
      appNo: '202541090308',
      description: 'Sensory-modulation device using controlled electrical stimulation to amplify sweetness perception and reduce sugar intake without affecting flavour.',
      date: 'Sep 2025',
      role: 'Inventor'
    },
    {
      title: 'Smart Flower Handling and Tying Machine',
      appNo: '202541090269',
      description: 'Automated machine using optimised mechanical design and controlled actuation to streamline floral processing, reducing human error and improving productivity.',
      date: 'Sep 2025',
      role: 'Co-Inventor'
    },
    {
      title: 'AquaSentra — Integrated LiDAR-GPS Embedded System for Vessel Collision Mitigation',
      appNo: '202541039901',
      description: 'LiDAR-GPS embedded system enhancing maritime safety by detecting vessel collision risks and providing real-time border violation alerts.',
      date: '2025',
      role: 'Inventor'
    }
  ],
  publications: [
    {
      title: 'Green Engineering 4.0: Leveraging Digital Technologies',
      publisher: 'The Institution of Engineers (India)',
      date: 'Feb 2025',
      description: 'Explored how IoT, blockchain, digital twins, and simulation tools support sustainable engineering and improve resource efficiency.'
    },
    {
      title: 'IoT in Engineering: Advancing Connectivity, Security and Automation',
      publisher: 'The Institution of Engineers (India)',
      date: 'Feb 2025',
      description: "Discussed IoT's impact on predictive maintenance, data security, process automation, and real-time monitoring in modern engineering systems."
    }
  ],
  certifications: [
    { org: 'NPTEL',               name: 'Python for Data Science' },
    { org: 'Microsoft & LinkedIn',name: 'Career Essentials in Generative AI' },
    { org: 'LinkedIn Learning',   name: 'Become a Data Scientist' },
    { org: 'IBM',                 name: 'HTML, CSS & JavaScript for Beginners' },
    { org: 'Forage · Accenture', name: 'Software Engineering Job Simulation' },
    { org: 'Forage · Deloitte',  name: 'Cyber Job Simulation' },
    { org: 'LinkedIn Learning',   name: 'Ethics in the Age of Generative AI' },
    { org: 'SWAYAM / NPTEL',     name: 'Foundation of Data Science' },
    { org: 'LinkedIn Learning',   name: 'Career Skills in Data Analytics' },
    { org: 'Novitech',            name: '30-Day Data Analytics Masterclass' }
  ],
  awards: [
    'Outstanding Engineer Award – IEI ACEW Student Chapter',
    'Innovation All Star Award – Axelyrav.25 ACEW Symposium',
    'Star Performer Award – Women\'s Day IEI',
    '1st Prize – Paper Presentation: Autonomous Fruits & Vegetable Harvester',
    'Speaker / Participant – SIRAGUPOL FEMFLARE 2025'
  ]
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Project.deleteMany({});
    await Profile.deleteMany({});

    await Project.insertMany(projects);
    await Profile.create(profile);

    console.log('✅ Database seeded successfully!');
    console.log(`   → ${projects.length} projects inserted`);
    console.log('   → Profile data inserted');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seed();
