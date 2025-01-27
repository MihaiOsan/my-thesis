import { Thesis } from "../types/types";

export const mockTheses: Thesis[] = [
  {
    id: 101,
    title: "Sistem de recomandări cu AI",
    description: "Proiect de licență, implementare sistem de recomandări.",
    authorId: 2, // Alexandru Ionescu
    supervisorId: 4, // Nu poate avea coordonator în starea "Proposed"
    proposedBy: 4,
    imageUrl: "https://drmcnatty.com/wp-content/uploads/2024/10/AI2.webp",
    status: "Graded",
    documents: [
      {
        id: 1,
        name: "Proiect initial.docx",
        url: "https://example.com/documents/1",
        uploadedAt: new Date("2025-01-10"),
        uploadedBy: 2,
        documentType: "Report",
        description: "Documentul inițial al proiectului",
      },
      {
        id: 2,
        name: "Cerere acceptare.pdf",
        url: "https://example.com/documents/2",
        uploadedAt: new Date("2025-01-12"),
        uploadedBy: 2,
        documentType: "Other",
        description: "Cererea de acceptare pentru proiect",
      },
    ],
    level: "Undergraduate",
    proposalDate: new Date("2025-01-01"),
    requiredTechnologies: ["Python", "TensorFlow", "Docker"],
    prerequisites: ["AI Basics", "Data Science"],
    evaluation: {
      grade: 9,
      evaluationDate: new Date("2025-01-01"),
      feedback: "good",
    },
  },
  {
    id: 102,
    title: "Analiza Big Data pentru e-learning",
    description:
      "Disertație care investighează tehnici de big data aplicate în platformele de e-learning pentru personalizarea conținutului.",
    authorId: undefined,
    supervisorId: 4,
    proposedBy: 4,
    status: "Proposed",
    imageUrl:
      "https://ailleron.com/wp-content/uploads/2024/01/big-data-in-banking.jpg",
    documents: [],
    level: "Masters",
    proposalDate: new Date("2025-02-15"),
    requiredTechnologies: ["Hadoop", "Spark", "Scala"],
    prerequisites: ["Big Data Fundamentals", "Distributed Computing"],
  },
  {
    id: 103,
    title: "Proiect de cercetare în Deep Learning",
    description: "Aplicații de clasificare imagini, rețele convoluționale.",
    authorId: 2,
    supervisorId: 1,
    proposedBy: 2,
    status: "Accepted",
    documents: [
      {
        id: 3,
        name: "Prezentare finala.pptx",
        url: "https://example.com/documents/3",
        uploadedAt: new Date("2025-01-15"),
        uploadedBy: 2,
        documentType: "Presentation",
        description: "Prezentare finală pentru proiect",
      },
    ],
    level: "PhD",
    proposalDate: new Date("2025-03-01"),
    requiredTechnologies: ["PyTorch", "OpenCV", "Jupyter"],
    prerequisites: ["Advanced Machine Learning", "Computer Vision Basics"],
  },

  {
    id: 114,
    title: "Optimizarea proceselor industriale cu algoritmi genetici",
    description: "Explorarea metodelor de optimizare în producție.",
    authorId: 5, // Studentul Elena Radu
    supervisorId: 4, // Profesorul Mihai Popescu
    proposedBy: 4,
    status: "In Progress",
    documents: [],
    level: "Masters",
    proposalDate: new Date("2025-01-10"),
    requiredTechnologies: ["MATLAB", "Python", "Simulink"],
    prerequisites: ["Optimization Basics", "Genetic Algorithms"],
  },
  {
    id: 115,
    title: "Simularea fluxurilor de trafic urban",
    description: "Modelarea și simularea traficului urban pentru orașe smart.",
    authorId: 9,
    proposedBy: 9,
    status: "Proposed",
    documents: [],
    level: "Undergraduate",
    proposalDate: new Date("2025-02-01"),
    requiredTechnologies: ["AnyLogic", "Python", "GIS"],
    prerequisites: ["Simulation Basics", "Transportation Engineering"],
    proposedTo: 4,
  },
  {
    id: 116,
    title: "Analiza predicțiilor financiare",
    description:
      "Disertație care investighează modele de predicție pentru piața de capital.",
    authorId: undefined,
    supervisorId: 7,
    proposedBy: 7,
    status: "Proposed",
    documents: [],
    level: "Masters",
    proposalDate: new Date("2025-05-10"),
    requiredTechnologies: ["R", "Shiny", "ggplot2"],
    prerequisites: ["Econometrics", "Time Series Analysis"],
  },
  {
    id: 117,
    title: "Sistem distribuit de procesare video",
    description:
      "Proiect de cercetare pentru procesarea în timp real a fluxurilor video.",
    authorId: undefined,
    supervisorId: 10,
    proposedBy: 10,
    status: "Proposed",
    documents: [],
    level: "Masters",
    proposalDate: new Date("2025-06-15"),
    requiredTechnologies: ["OpenCV", "Kafka", "Docker"],
    prerequisites: ["Distributed Systems", "Video Processing"],
  },
  {
    id: 118,
    title: "Aplicații IoT pentru monitorizarea mediului",
    description:
      "Studiu asupra aplicării dispozitivelor IoT pentru colectarea datelor de mediu.",
    authorId: undefined,
    supervisorId: 4,
    proposedBy: 4,
    status: "Proposed",
    studentsApplications: [3, 5],
    documents: [],
    level: "Undergraduate",
    proposalDate: new Date("2025-07-20"),
    requiredTechnologies: ["Arduino", "Node.js", "InfluxDB"],
    prerequisites: ["IoT Fundamentals", "Environmental Science"],
  },
  {
    id: 119,
    title: "Metode de clustering pentru date genetice",
    description:
      "Explorarea tehnicilor de clustering aplicate datelor din domeniul biologiei computaționale.",
    authorId: undefined,
    supervisorId: 10,
    proposedBy: 10,
    status: "Proposed",
    documents: [],
    level: "PhD",
    proposalDate: new Date("2025-09-30"),
    requiredTechnologies: ["R", "Bioconductor", "t-SNE"],
    prerequisites: ["Biostatistics", "Genomics Data Analysis"],
  },
  {
    id: 120,
    title: "Rețele neuronale pentru detectarea fraudelor",
    description: "Proiect de cercetare care investighează frauda online.",
    authorId: undefined,
    supervisorId: 7,
    proposedBy: 7,
    status: "Proposed",
    documents: [],
    level: "Masters",
    proposalDate: new Date("2025-08-25"),
    requiredTechnologies: ["PyTorch", "NumPy", "Flask"],
    prerequisites: ["Deep Learning Basics", "Fraud Detection Techniques"],
  },
  {
    id: 121,
    title: "Automatizarea proceselor logistice",
    description: "Proiect ce explorează optimizarea livrărilor folosind AI.",
    authorId: undefined,
    supervisorId: 4,
    proposedBy: 4,
    status: "Proposed",
    documents: [],
    level: "Masters",
    proposalDate: new Date("2025-04-05"),
    requiredTechnologies: ["Python", "Pandas", "Scikit-learn"],
    prerequisites: ["Machine Learning Fundamentals", "Operations Research"],
  },
  // Adaugă alte teme, păstrând autorul ca student
];
