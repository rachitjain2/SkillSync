import { 
  TalentProfile, 
  JobOpportunity, 
  RoadmapSprint, 
  SkillAnalysisCategory, 
  CopilotMessage,
  Candidate,
  PromptQuery,
  TeamMember,
  Testimonial,
  PricingPlan
} from '../types';

export const INITIAL_TALENT_PROFILES: Record<string, TalentProfile> = {
  'rachit-jain': {
    id: 'rachit-jain',
    fullName: 'Rachit Jain',
    handle: '@rachit_ai',
    title: 'Aspiring AI / ML Engineer & CS Scholar',
    email: 'rachit.jain@skillsync.io',
    location: 'Bangalore, India (Open to Remote / Relocation)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    bio: 'Motivated AI/ML engineer and computer science student with a strong foundation in Python, Machine Learning algorithms, C++, and SQL databases. Passionate about building neural networks and intelligent data systems.',
    targetRole: 'AI / ML Engineer',
    targetSalary: '$110,000 - $145,000 / $52/hr Internship',
    overallMatchReadiness: 92,
    zeroKnowledgeHash: 'Verified Candidate ID #RJ-8402',
    linkedinUrl: 'https://linkedin.com/in/rachitjain2',
    linkedinVerified: true,
    aiExecutiveSummary: 'Your combination of Python + Machine Learning + project experience makes you highly suitable for AI/ML internships and entry-level engineering roles.',
    metrics: {
      codeVelocity: '3.4x baseline',
      algorithmicRank: 'Top 2.1%',
      systemDesignScore: '92/100',
      aiPairingProficiency: 'Mastery (96%)',
    },
    skills: [
      { id: 's1', name: 'Python', category: 'Core Language', proficiency: 96, verified: true, yearsOfExperience: 3, marketDemandPercentile: 99 },
      { id: 's2', name: 'Machine Learning', category: 'AI & ML', proficiency: 94, verified: true, yearsOfExperience: 2, marketDemandPercentile: 98 },
      { id: 's3', name: 'C++', category: 'Core Language', proficiency: 90, verified: true, yearsOfExperience: 3, marketDemandPercentile: 95 },
      { id: 's4', name: 'SQL', category: 'Database & Storage', proficiency: 88, verified: true, yearsOfExperience: 2, marketDemandPercentile: 94 },
      { id: 's5', name: 'AI & Deep Learning', category: 'AI & ML', proficiency: 92, verified: true, yearsOfExperience: 2, marketDemandPercentile: 97 },
      { id: 's6', name: 'PyTorch & TensorFlow', category: 'AI & ML', proficiency: 86, verified: true, yearsOfExperience: 2, marketDemandPercentile: 96 },
      { id: 's7', name: 'Data Structures & Algorithms', category: 'Core Language', proficiency: 92, verified: true, yearsOfExperience: 3, marketDemandPercentile: 97 },
      { id: 's8', name: 'FastAPI Microservices', category: 'Frontend & Web', proficiency: 82, verified: true, yearsOfExperience: 1, marketDemandPercentile: 90 },
      { id: 's9', name: 'Cloud Deployment (AWS / Azure)', category: 'Cloud & DevOps', proficiency: 64, verified: false, yearsOfExperience: 1, marketDemandPercentile: 93 },
    ],
    experience: [
      {
        id: 'exp1',
        role: 'AI / ML Research Intern',
        company: 'NeuralCraft Systems',
        location: 'Remote',
        period: '2024 - Present',
        current: true,
        description: 'Developed computer vision and NLP pipelines for automated document classification and semantic search using PyTorch and HuggingFace transformers.',
        highlightedSkills: ['Python', 'Machine Learning', 'PyTorch', 'SQL'],
        impactMetrics: [
          'Improved model classification accuracy from 84% to 93.6% on benchmark datasets',
          'Optimized inference latency by 35% through quantization and batch processing',
          'Authored comprehensive documentation and unit tests for ML pipeline components'
        ]
      },
      {
        id: 'exp2',
        role: 'Software Development Intern (Backend)',
        company: 'DataStream Technologies',
        location: 'Bangalore, India',
        period: '2023 - 2024',
        current: false,
        description: 'Constructed RESTful API microservices in Python and SQL to handle asynchronous telemetry ingestion from 50,000+ IoT endpoints.',
        highlightedSkills: ['Python', 'SQL', 'C++', 'FastAPI', 'PostgreSQL'],
        impactMetrics: [
          'Reduced API response times by 28% through database indexing and connection pooling',
          'Implemented automated CI/CD validation pipelines with 99.4% test coverage'
        ]
      }
    ],
    projects: [
      {
        id: 'proj1',
        title: 'Multi-Modal RAG Knowledge Assistant',
        tagline: 'Retrieval-augmented generation assistant for technical documentation',
        description: 'End-to-end question-answering system combining vector search (Qdrant), sentence embeddings, and open-source LLM reasoning with an interactive web UI.',
        tags: ['Python', 'Machine Learning', 'PyTorch', 'SQL', 'FastAPI'],
        githubUrl: 'https://github.com/rachitjain/multimodal-rag-assistant',
        liveUrl: 'https://rag-assistant-demo.vercel.app',
        stars: 420,
        aiVerificationScore: 95
      },
      {
        id: 'proj2',
        title: 'Real-Time Edge Vision Pipeline in C++',
        tagline: 'High-performance object detection and tracking in C++ and OpenCV',
        description: 'C++ real-time inference engine optimized for embedded hardware utilizing multithreading and SIMD instructions.',
        tags: ['C++', 'AI & Deep Learning', 'OpenCV', 'Algorithms'],
        githubUrl: 'https://github.com/rachitjain/edge-vision-cpp',
        stars: 280,
        aiVerificationScore: 92
      }
    ],
    education: [
      {
        id: 'edu1',
        degree: 'B.Tech in Computer Science & Artificial Intelligence',
        institution: 'National Institute of Technology',
        year: '2022 - 2026',
        honors: 'Dean\'s Honor List (GPA 3.91/4.00)',
        coursework: ['Machine Learning', 'Data Structures & Algorithms', 'Database Management Systems', 'Object Oriented Programming in C++', 'Linear Algebra & Statistics']
      }
    ],
    certifications: [
      { name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', date: '2024', verified: true },
      { name: 'Machine Learning with Python', issuer: 'Stanford Online / Coursera', date: '2023', verified: true }
    ]
  },

  'alex-rivera': {
    id: 'alex-rivera',
    fullName: 'Alex Rivera',
    handle: '@alexrivera',
    title: 'Senior Full-Stack & AI Systems Engineer',
    email: 'alex.rivera.dev@gmail.com',
    location: 'San Francisco, CA (Open to Remote)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    bio: 'Full-stack builder with 6+ years shipping high-throughput TypeScript applications, modern Next.js interfaces, real-time token streaming pipelines, and distributed vector search architectures.',
    targetRole: 'Senior / Staff AI Full-Stack Engineer',
    targetSalary: '$190,000 - $240,000 + Equity',
    overallMatchReadiness: 94,
    zeroKnowledgeHash: 'Verified Candidate ID #8942-SF',
    aiExecutiveSummary: 'Exceptional candidate for AI Product and Platform Engineering roles with proven production experience.',
    metrics: {
      codeVelocity: '3.8x baseline',
      algorithmicRank: 'Top 1.2%',
      systemDesignScore: '96/100',
      aiPairingProficiency: 'Mastery (98%)',
    },
    skills: [
      { id: 's1', name: 'TypeScript & Next.js (App Router)', category: 'Frontend & Web', proficiency: 98, verified: true, yearsOfExperience: 6, marketDemandPercentile: 99 },
      { id: 's2', name: 'Python (FastAPI & AsyncIO)', category: 'Core Language', proficiency: 94, verified: true, yearsOfExperience: 5, marketDemandPercentile: 98 },
      { id: 's3', name: 'LLM Token Streaming & vLLM Serving', category: 'AI & ML', proficiency: 92, verified: true, yearsOfExperience: 3, marketDemandPercentile: 99 },
      { id: 's4', name: 'Vector Databases (Pinecone & Qdrant)', category: 'Database & Storage', proficiency: 91, verified: true, yearsOfExperience: 3, marketDemandPercentile: 95 },
    ],
    experience: [],
    projects: [],
    education: [],
    certifications: []
  },

  'sarah-lin': {
    id: 'sarah-lin',
    fullName: 'Sarah Lin',
    handle: '@sarah_mlops',
    title: 'Staff ML Infrastructure & Cloud Platform Lead',
    email: 'sarah.lin.ops@proton.me',
    location: 'Seattle, WA (Remote)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    bio: 'Platform & ML infrastructure leader with 8+ years scaling GPU compute clusters, Kubernetes orchestrators, and automated infrastructure as code.',
    targetRole: 'Staff ML Platform / Infra Engineer',
    targetSalary: '$220,000 - $270,000 + Equity',
    overallMatchReadiness: 97,
    zeroKnowledgeHash: 'Verified Candidate ID #4910-SEA',
    aiExecutiveSummary: 'Top-tier ML Infrastructure specialist with deep expertise in distributed compute.',
    metrics: {
      codeVelocity: '4.1x baseline',
      algorithmicRank: 'Top 0.8%',
      systemDesignScore: '98/100',
      aiPairingProficiency: 'Mastery (99%)',
    },
    skills: [
      { id: 's1', name: 'Kubernetes & GPU Cluster Orchestration', category: 'Cloud & DevOps', proficiency: 99, verified: true, yearsOfExperience: 7, marketDemandPercentile: 99 },
      { id: 's2', name: 'Terraform & Pulumi (IaC)', category: 'Cloud & DevOps', proficiency: 96, verified: true, yearsOfExperience: 6, marketDemandPercentile: 96 },
    ],
    experience: [],
    projects: [],
    education: [],
    certifications: []
  }
};

export const MOCK_JOB_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: 'job-1',
    title: 'AI Engineer Intern',
    company: 'Microsoft',
    companyLogo: 'https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?w=100&auto=format&fit=crop&q=80',
    location: 'Redmond, WA / Remote',
    workStyle: 'Hybrid',
    type: 'Full-Time',
    salaryRange: '$48 - $56/hr + Housing Stipend',
    experienceLevel: 'Mid-Level',
    department: 'Applied AI & Copilot Foundations',
    matchScore: 92,
    matchBreakdown: {
      skillMatch: 95,
      experienceAlignment: 90,
      projectRelevance: 94,
      domainFit: 89
    },
    aiRationale: 'Exceptional 92% match for Rachit Jain. Your proven proficiency in Python, Machine Learning fundamentals, SQL, and deep learning models directly maps to Microsoft Copilot applied modeling. Gaining hands-on AWS/Azure cloud deployment experience will bring this match to near 100%.',
    keyMatchHighlights: [
      'Strong command of Python, PyTorch, and classical Machine Learning algorithms',
      'Solid relational database and SQL query optimization foundation',
      'Demonstrated project work in Multimodal RAG Question-Answering'
    ],
    matchedSkills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'C++'],
    missingSkills: [
      {
        skillName: 'AWS',
        category: 'Cloud & DevOps',
        importance: 'Critical',
        difficultyToAcquire: 'Fast (1-2 weeks)',
        marketDemand: 'Top 5% in Enterprise AI',
        suggestedResource: 'AWS Certified Cloud Practitioner & SageMaker Deployment Lab'
      },
      {
        skillName: 'Docker',
        category: 'Cloud & DevOps',
        importance: 'Recommended',
        difficultyToAcquire: 'Fast (1-2 weeks)',
        marketDemand: 'Top 8% in AI Infrastructure',
        suggestedResource: 'Docker for Data Science & ML Containerization'
      }
    ],
    description: 'Join Microsoft as an AI Engineer Intern to build the next generation of intelligent Copilot experiences. You will collaborate with senior researchers and engineers to train, evaluate, and fine-tune machine learning models across vast enterprise datasets.',
    responsibilities: [
      'Implement data preprocessing, feature engineering, and model training in Python',
      'Optimize query pipelines and vector embeddings against large-scale SQL and distributed data stores',
      'Collaborate with product teams to evaluate model accuracy and inference latency'
    ],
    requirements: [
      'Currently pursuing B.S., M.S., or B.Tech in Computer Science, AI, or related technical field',
      'Strong coding proficiency in Python and familiarity with C++ or SQL',
      'Demonstrated academic or personal projects in machine learning or deep learning'
    ],
    benefits: [
      'Competitive hourly compensation ($48 - $56/hr)',
      'Full housing stipend or corporate housing assistance',
      '1-on-1 mentorship with Principal AI Researchers',
      'Fast-track return offer consideration for full-time roles'
    ],
    postedAt: '1 day ago',
    applied: false,
    saved: true
  },
  {
    id: 'job-2',
    title: 'Machine Learning Engineering Intern',
    company: 'Google DeepMind',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
    location: 'Mountain View, CA / London (Hybrid)',
    workStyle: 'Hybrid',
    type: 'Full-Time',
    salaryRange: '$52 - $60/hr + Relocation',
    experienceLevel: 'Mid-Level',
    department: 'Applied ML & Neural Architectures',
    matchScore: 90,
    matchBreakdown: {
      skillMatch: 92,
      experienceAlignment: 88,
      projectRelevance: 91,
      domainFit: 89
    },
    aiRationale: 'Strong 90% match. Google DeepMind values strong algorithmic foundations in C++ and deep mathematical intuition in Python/PyTorch. Your real-time edge vision project in C++ demonstrates low-level performance understanding.',
    keyMatchHighlights: [
      'C++ algorithm optimization and data structures mastery',
      'PyTorch deep learning experimentation background',
      'High academic percentile in Computer Science & AI'
    ],
    matchedSkills: ['Python', 'C++', 'Machine Learning', 'Data Structures & Algorithms', 'PyTorch'],
    missingSkills: [
      {
        skillName: 'Distributed Training (JAX)',
        category: 'Distributed Systems',
        importance: 'Recommended',
        difficultyToAcquire: 'Moderate (3-5 weeks)',
        marketDemand: 'Top 2% in Frontier Research',
        suggestedResource: 'JAX Fundamentals & TPU Scaling Curriculum'
      },
      {
        skillName: 'Docker',
        category: 'Cloud & DevOps',
        importance: 'Bonus',
        difficultyToAcquire: 'Fast (1-2 weeks)',
        marketDemand: 'Top 10%',
        suggestedResource: 'Reproducible ML with Docker & Linux'
      }
    ],
    description: 'Work alongside world-class scientists to develop novel neural architectures, evaluate foundation model capabilities, and scale training pipelines.',
    responsibilities: [
      'Design, train, and benchmark neural network models in Python and C++',
      'Contribute to open research initiatives and reproducibility studies',
      'Optimize tensor computation throughput across accelerator clusters'
    ],
    requirements: [
      'Pursuing degree in Computer Science, Math, or Engineering',
      'Solid command of C++ and Python',
      'Passion for solving foundational AI challenges'
    ],
    benefits: [
      'Top-tier intern salary and housing relocation stipend',
      'Access to state-of-the-art TPU and GPU clusters',
      'Publishing and patent co-authorship opportunities'
    ],
    postedAt: '3 days ago',
    applied: false,
    saved: true
  },
  {
    id: 'job-3',
    title: 'Generative AI & Data Systems Intern',
    company: 'Amazon (AWS)',
    companyLogo: 'https://images.unsplash.com/photo-1523474255658-4af61b168344?w=100&auto=format&fit=crop&q=80',
    location: 'Seattle, WA / Bangalore (Hybrid)',
    workStyle: 'Hybrid',
    type: 'Full-Time',
    salaryRange: '$45 - $54/hr + Benefits',
    experienceLevel: 'Mid-Level',
    department: 'AWS Bedrock & Applied AI',
    matchScore: 86,
    matchBreakdown: {
      skillMatch: 88,
      experienceAlignment: 85,
      projectRelevance: 87,
      domainFit: 84
    },
    aiRationale: 'Solid 86% match. Amazon AWS Bedrock seeks candidates with strong Python, SQL, and API building skills. Gaining AWS SageMaker and Lambda deployment proficiency will boost this match to 96%.',
    keyMatchHighlights: [
      'Strong relational database and SQL query design background',
      'Experience building FastAPI microservices in Python',
      'Hands-on RAG document retrieval project'
    ],
    matchedSkills: ['Python', 'SQL', 'FastAPI Microservices', 'Machine Learning', 'TensorFlow'],
    missingSkills: [
      {
        skillName: 'AWS (S3 / SageMaker)',
        category: 'Cloud & DevOps',
        importance: 'Critical',
        difficultyToAcquire: 'Fast (1-2 weeks)',
        marketDemand: 'Top 3% in Cloud AI',
        suggestedResource: 'AWS Certified Solutions Architect & SageMaker Immersion Day'
      }
    ],
    description: 'Help build scalable cloud services that power generative AI for millions of developers worldwide. Implement microservices, optimize SQL pipelines, and integrate foundation models.',
    responsibilities: [
      'Build resilient API endpoints in Python and SQL',
      'Assist in deploying containerized machine learning microservices',
      'Analyze telemetry data to optimize query performance and resource allocation'
    ],
    requirements: [
      'Enrolled in Computer Science or related degree',
      'Proficiency in Python and SQL',
      'Interest in cloud architectures and scalable backend services'
    ],
    benefits: [
      'Competitive compensation and wellness stipends',
      'Comprehensive AWS certification exam vouchers',
      'Mentorship from Senior AWS Solutions Architects'
    ],
    postedAt: '2 days ago',
    applied: false,
    saved: false
  },
  {
    id: 'job-4',
    title: 'Junior AI Applied Scientist',
    company: 'Anthropic',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA / Remote',
    workStyle: 'Remote',
    type: 'Full-Time',
    salaryRange: '$120,000 - $150,000 + Equity',
    experienceLevel: 'Mid-Level',
    department: 'Applied Alignment & Tool Evaluation',
    matchScore: 85,
    matchBreakdown: {
      skillMatch: 88,
      experienceAlignment: 82,
      projectRelevance: 86,
      domainFit: 84
    },
    aiRationale: 'Good 85% match. Anthropic values strong Python fluency, foundational ML comprehension, and rigorous experimental testing. Enhancing your alignment evaluations understanding will make you a prime candidate.',
    keyMatchHighlights: [
      'Strong Python and Deep Learning fundamentals',
      'Experience constructing automated evaluation testbeds',
      'Curious, self-directed engineering mindset'
    ],
    matchedSkills: ['Python', 'Machine Learning', 'AI & Deep Learning', 'Data Structures & Algorithms'],
    missingSkills: [
      {
        skillName: 'LLM Alignment Guardrails',
        category: 'AI & ML',
        importance: 'Recommended',
        difficultyToAcquire: 'Fast (1-2 weeks)',
        marketDemand: 'Top 8% in Frontier Labs',
        suggestedResource: 'Constitutional AI & Model Evaluation Benchmarks Guide'
      }
    ],
    description: 'Join Anthropic to evaluate, test, and improve foundation model reasoning across coding, mathematics, and agentic workflows.',
    responsibilities: [
      'Develop automated benchmark evaluation suites in Python',
      'Analyze model failure modes and draft data curation scripts',
      'Work alongside research scientists on model alignment'
    ],
    requirements: [
      'Strong programming skills in Python and PyTorch',
      'Deep interest in AI safety and empirical evaluation',
      'Excellent written and analytical communication skills'
    ],
    benefits: [
      'Full healthcare, vision, and dental coverage',
      'Annual learning stipend and home office budget',
      'Meaningful equity grant'
    ],
    postedAt: '4 days ago',
    applied: false,
    saved: true
  },
  {
    id: 'job-5',
    title: 'AI Research Intern (FAIR)',
    company: 'Meta',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    location: 'Menlo Park, CA / Remote',
    workStyle: 'Remote',
    type: 'Full-Time',
    salaryRange: '$55 - $64/hr + Housing',
    experienceLevel: 'Mid-Level',
    department: 'Fundamental AI Research (FAIR)',
    matchScore: 89,
    matchBreakdown: {
      skillMatch: 92,
      experienceAlignment: 86,
      projectRelevance: 90,
      domainFit: 88
    },
    aiRationale: 'Strong 89% match. Meta FAIR looks for candidates with strong foundational PyTorch, C++ SIMD, and vision/NLP pipeline experience. Your edge vision project in C++ and RAG knowledge assistant in PyTorch demonstrate direct research alignment.',
    keyMatchHighlights: [
      'Deep understanding of PyTorch tensor operations and C++ SIMD optimizations',
      'Proven experience building computer vision and NLP pipelines',
      'Solid mathematical and algorithmic problem-solving rank (Top 2.1%)'
    ],
    matchedSkills: ['Python', 'C++', 'PyTorch & TensorFlow', 'Machine Learning', 'SQL'],
    missingSkills: [
      {
        skillName: 'Triton Kernel Optimization',
        category: 'AI & ML',
        importance: 'Recommended',
        difficultyToAcquire: 'Moderate (3-5 weeks)',
        marketDemand: 'Top 3% in Compute Research',
        suggestedResource: 'OpenAI Triton GPU Programming Tutorial & FlashAttention'
      },
      {
        skillName: 'Docker',
        category: 'Cloud & DevOps',
        importance: 'Recommended',
        difficultyToAcquire: 'Fast (1-2 weeks)',
        marketDemand: 'Top 6%',
        suggestedResource: 'Containerization for AI Research'
      }
    ],
    description: 'Collaborate with world-leading FAIR researchers to pioneer novel multi-modal reasoning models, vision-language architectures, and high-efficiency open source algorithms.',
    responsibilities: [
      'Implement and benchmark novel neural network architectures in PyTorch',
      'Evaluate model scaling laws and token efficiency across large datasets',
      'Publish research findings at premier conferences (NeurIPS, ICML, CVPR)'
    ],
    requirements: [
      'Enrolled in B.Tech, M.S. or Ph.D. in Computer Science, Machine Learning or related field',
      'High proficiency in Python, PyTorch, and C++',
      'Strong research mindset and experimental rigor'
    ],
    benefits: [
      'Top-of-market hourly compensation ($55 - $64/hr)',
      'Full relocation package and corporate luxury housing in the Bay Area',
      'Direct co-authorship on peer-reviewed research papers'
    ],
    postedAt: 'Just now',
    applied: false,
    saved: false
  },
  {
    id: 'job-6',
    title: 'Founding ML Engineer Intern',
    company: 'Cognition Labs',
    companyLogo: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA (On-Site)',
    workStyle: 'On-Site',
    type: 'Founding Engineer',
    salaryRange: '$50 - $58/hr + Equity Grant',
    experienceLevel: 'Mid-Level',
    department: 'Autonomous Reasoning & Coding Agents',
    matchScore: 88,
    matchBreakdown: {
      skillMatch: 90,
      experienceAlignment: 85,
      projectRelevance: 91,
      domainFit: 86
    },
    aiRationale: 'Great 88% match. Cognition builds Devin, the autonomous AI software engineer. Your dual fluency in C++ algorithms and Python/FastAPI microservices makes you an adaptable builder for agent execution kernels.',
    keyMatchHighlights: [
      'High algorithmic problem-solving rank (Top 2.1%)',
      'FastAPI microservices experience handling high concurrency',
      'Hands-on vector search and retrieval-augmented generation'
    ],
    matchedSkills: ['Python', 'C++', 'SQL', 'FastAPI Microservices', 'Machine Learning'],
    missingSkills: [
      {
        skillName: 'Docker Sandboxed Execution',
        category: 'Cloud & DevOps',
        importance: 'Critical',
        difficultyToAcquire: 'Fast (1-2 weeks)',
        marketDemand: 'Top 4% in Coding Agents',
        suggestedResource: 'Docker Sandboxes & MicroVM Isolation'
      },
      {
        skillName: 'AWS',
        category: 'Cloud & DevOps',
        importance: 'Recommended',
        difficultyToAcquire: 'Fast (1-2 weeks)',
        marketDemand: 'Top 5%',
        suggestedResource: 'AWS ECS & Fargate Cluster Deployment'
      }
    ],
    description: 'Join an elite founding team building autonomous AI software engineers capable of reasoning through complex multi-repo architectures.',
    responsibilities: [
      'Develop evaluation harnesses for autonomous coding agents',
      'Optimize vector retrieval benchmarks and memory structures',
      'Ship high-impact features in a fast-paced startup environment'
    ],
    requirements: [
      'Strong problem solver with proficiency in Python, C++, and database systems',
      'Demonstrated high ownership and ability to build end-to-end projects',
      'Comfortable working on-site in San Francisco'
    ],
    benefits: [
      'Substantial equity grant and high intern stipend',
      'Direct mentorship from competitive programming and AI champions',
      'Full catered meals and premium compute allocation'
    ],
    postedAt: '2 days ago',
    applied: false,
    saved: false
  }
];

export const INITIAL_ROADMAP_SPRINTS: RoadmapSprint[] = [
  {
    id: 'sprint-1',
    sprintNumber: 1,
    title: 'Sprint 1: AWS Cloud Deployment & Model Serving',
    subtitle: 'Close critical skill gap for Microsoft, Amazon, & Google AI roles',
    focusArea: 'Cloud Deployment & AWS Architecture',
    targetOpportunityId: 'job-1',
    targetOpportunityTitle: 'AI Engineer Intern @ Microsoft',
    tasks: [
      {
        id: 'task-1-1',
        title: 'Deploy FastAPI ML Inference Microservice on AWS EC2 / ECS',
        description: 'Package your PyTorch model into a Docker container and deploy it with an automated CI/CD pipeline and health check monitoring.',
        skillTag: 'AWS / Docker',
        completed: true,
        estimatedHours: 6,
        difficulty: 'Intermediate',
        resourceType: 'Hands-on Project',
        resourceTitle: 'AWS Containerized Microservice Deployment & Docker Guide',
        resourceLink: 'https://aws.amazon.com/getting-started/hands-on/deploy-docker-containers/'
      },
      {
        id: 'task-1-2',
        title: 'Master AWS SageMaker Model Endpoints & Auto-Scaling',
        description: 'Set up an autoscaling real-time inference endpoint on Amazon SageMaker with serverless latency tracking.',
        skillTag: 'AWS SageMaker',
        completed: false,
        estimatedHours: 8,
        difficulty: 'Intermediate',
        resourceType: 'Interactive Lab',
        resourceTitle: 'Amazon SageMaker Developer Guide & Immersion Lab',
        resourceLink: 'https://docs.aws.amazon.com/sagemaker/'
      },
      {
        id: 'task-1-3',
        title: 'Implement SQL Query Optimization & Connection Pooling',
        description: 'Benchmark PostgreSQL query plans (EXPLAIN ANALYZE) and configure connection pooling for high-throughput AI API workloads.',
        skillTag: 'SQL & Database',
        completed: true,
        estimatedHours: 4,
        difficulty: 'Intermediate',
        resourceType: 'Interactive Lab',
        resourceTitle: 'PostgreSQL Indexing & High-Concurrency Performance Tuning',
        resourceLink: 'https://www.postgresql.org/docs/current/performance-tips.html'
      }
    ]
  },
  {
    id: 'sprint-2',
    sprintNumber: 2,
    title: 'Sprint 2: Distributed Training & Large-Scale Embeddings',
    subtitle: 'Target qualification for Google DeepMind & OpenAI roles',
    focusArea: 'Deep Learning Scalability',
    targetOpportunityId: 'job-2',
    targetOpportunityTitle: 'Machine Learning Engineering Intern @ Google DeepMind',
    tasks: [
      {
        id: 'task-2-1',
        title: 'Implement PyTorch DistributedDataParallel (DDP) Multi-GPU Training',
        description: 'Train a transformer model across multiple GPU worker nodes with gradient accumulation and mixed-precision (FP16).',
        skillTag: 'PyTorch / DDP',
        completed: false,
        estimatedHours: 10,
        difficulty: 'Advanced',
        resourceType: 'Code Challenge',
        resourceTitle: 'PyTorch Distributed Training Tutorial & Best Practices',
        resourceLink: 'https://pytorch.org/tutorials/intermediate/ddp_tutorial.html'
      }
    ]
  }
];

export const MOCK_SKILL_ANALYSIS: SkillAnalysisCategory[] = [
  {
    category: 'Core Programming & Algorithms',
    overallScore: 94,
    skillsCount: 4,
    marketPercentile: 98.6,
    topSkills: ['Python', 'C++', 'Data Structures & Algorithms', 'Object Oriented Design'],
    growthPotential: 'Top 1.5% percentile. Strong foundation in algorithmic problem solving.'
  },
  {
    category: 'AI & Machine Learning Foundations',
    overallScore: 92,
    skillsCount: 4,
    marketPercentile: 97.4,
    topSkills: ['Machine Learning', 'AI & Deep Learning', 'PyTorch', 'TensorFlow'],
    growthPotential: 'High Proficiency. Strong grasp of neural network architectures and evaluation metrics.'
  },
  {
    category: 'Databases & Backend Systems',
    overallScore: 86,
    skillsCount: 3,
    marketPercentile: 92.0,
    topSkills: ['SQL', 'FastAPI Microservices', 'PostgreSQL'],
    growthPotential: 'Solid. Ready for high-concurrency API development.'
  },
  {
    category: 'Cloud Infrastructure & DevOps',
    overallScore: 64,
    skillsCount: 2,
    marketPercentile: 78.0,
    topSkills: ['Cloud Deployment (AWS / Azure Foundations)', 'Docker (Basics)'],
    growthPotential: 'Primary Growth Area. Gaining AWS SageMaker skills will boost match score by 8-12%.'
  }
];

export const INITIAL_COPILOT_MESSAGES: CopilotMessage[] = [
  {
    id: 'msg-1',
    sender: 'copilot',
    timestamp: 'Just now',
    text: 'Hello Rachit! I am your **SkillSync AI Career Copilot**.\n\nHere is your immediate career standing today:\n1. **Your Strongest Advantage:** Your combination of **Python + Machine Learning + C++ + SQL** makes you highly suitable for AI/ML engineering internships.\n2. **Top Match:** You are a **92% match** for the **AI Engineer Intern role at Microsoft**.\n3. **Recommended Next Step:** Improving your **AWS Cloud Deployment & Docker** skills will increase your average match score by an estimated **8-12%** across all matched roles.\n\nHow would you like to prepare today?',
    suggestedPrompts: [
      'Conduct a mock interview for the Microsoft AI Engineer Intern role',
      'Explain the step-by-step roadmap to master AWS SageMaker deployment',
      'Critique my RAG project description for tech resumes',
      'Give me 5 practice C++ algorithm questions asked at Google DeepMind'
    ]
  }
];

export const SAMPLE_RESUME_TEXTS = {
  'rachit-jain': `RACHIT JAIN
Bangalore, India | rachit.jain@skillsync.io | github.com/rachitjain

SUMMARY
Motivated AI / ML Engineer and Computer Science student with practical experience building deep learning pipelines, natural language processing models, and high-performance C++ systems.`,

  'alex-rivera': `ALEX RIVERA
San Francisco, CA | alex.rivera.dev@gmail.com | github.com/alexrivera

SUMMARY
Senior Full-Stack & AI Systems Engineer with 6+ years shipping high-throughput TypeScript applications and vector search architectures.`,

  'sarah-lin': `SARAH LIN
Seattle, WA | sarah.lin.ops@proton.me | github.com/sarahlin

SUMMARY
Staff ML Infrastructure & Cloud Platform Lead with 8+ years scaling GPU compute clusters.`
};

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Rachit Jain',
    handle: '@rachit_ai',
    role: 'AI / ML Engineer',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    matchScore: 92.4,
    skills: [
      { name: 'Python', level: 96, verified: true },
      { name: 'Machine Learning', level: 94, verified: true },
      { name: 'C++', level: 90, verified: true },
      { name: 'SQL', level: 88, verified: true },
      { name: 'AI & Deep Learning', level: 92, verified: true },
    ],
    zeroKnowledgeHash: 'Verified Candidate ID #RJ-8402',
    aiScreeningSummary: 'Strong mastery in Python, Machine Learning fundamentals, and C++ algorithm optimization.',
    status: 'Ready for Sandbox',
    metrics: {
      codeVelocity: '3.4x avg',
      algorithmicRank: 'Top 2.1%',
      systemDesignScore: '92/100',
      aiPairingProficiency: 'Mastery (96%)',
    },
    recentProject: 'Multi-Modal RAG Knowledge Assistant',
    githubStars: 420,
  }
];

export const MOCK_PROMPTS: PromptQuery[] = [
  {
    id: 'p1',
    query: 'Find AI / ML Engineering Interns with strong Python + Machine Learning + SQL backgrounds',
    category: 'AI / ML Engineering',
    tags: ['Python', 'Machine Learning', 'C++', 'SQL'],
    reasoningSteps: [
      'Analyzing requirements for foundational ML, Python fluency, and database management...',
      'Matching candidate repositories and benchmark coding scores...',
      'Rachit Jain identified with 92% match score.'
    ],
    resultCandidateIds: ['cand-1'],
    matchSummary: 'Found top candidate matching Python, Machine Learning, C++, and SQL requirements.',
  }
];

export const MOCK_TEAM: TeamMember[] = [];
export const MOCK_TESTIMONIALS: Testimonial[] = [];
export const MOCK_PRICING: PricingPlan[] = [];
