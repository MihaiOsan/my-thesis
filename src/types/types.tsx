// src/types/types.ts

export interface User {
  id: number;
  email: string;
  password: string; // doar pt demo (in realitate ar fi un hash)
  role: "student" | "teacher" | "researcher" | "admin";
  name: string;
  avatarUrl?: string; // poză de profil opțională
  bio?: string; // o descriere scurtă a utilizatorului
  institution?: string; // instituția/organizația din care face parte
  contactMethods?: {
    email: boolean;
    phone: boolean;
    messagingPlatform: boolean;
  }; // preferințele de contact
}

export interface Thesis {
  id: number;
  title: string;
  description: string;

  // ID-ul utilizatorului care a creat/propus tema
  authorId?: number;

  // ID-ul unui user cu rol teacher/researcher (dacă există)
  supervisorId?: number;

  // Nivelul lucrării (Licență, Masterat, Doctorat)
  level: "Undergraduate" | "Masters" | "PhD";

  // Data propunerii temei
  proposalDate: Date;

  imageUrl?: string;

  // Termenul limită estimat
  dueDate?: Date;

  studentsApplications?: number[];

  // Lista de tehnologii necesare
  requiredTechnologies?: string[];

  // Cunoștințe necesare (de ex. "Python", "Machine Learning")
  prerequisites?: string[];

  status: "Proposed" | "Accepted" | "In Progress" | "Completed" | "Cancelled";
  documents?: UploadedDocument[];
  evaluation?: ThesisEvaluation | null;
}

export interface ThesisEvaluation {
  grade: number;
  feedback: string;
  evaluatorId: number; // ID-ul utilizatorului care a efectuat evaluarea
  evaluationDate: Date; // Data evaluării
}

export interface UploadedDocument {
  id: number; // ID unic al documentului
  name: string; // Numele documentului
  url: string; // URL-ul unde poate fi accesat documentul (de exemplu, într-un sistem de stocare)
  uploadedAt: Date; // Data și ora încărcării
  uploadedBy: number; // ID-ul utilizatorului care a încărcat documentul
  documentType: "Report" | "Code" | "Presentation" | "Other"; // Tipul documentului
  description?: string; // O scurtă descriere a documentului
}

export interface Message {
  id: number;
  senderId: number; // ID-ul utilizatorului care a trimis mesajul
  recipientId: number; // ID-ul utilizatorului care primește mesajul
  thesisId: number; // ID-ul lucrării la care se referă
  content: string; // Conținutul mesajului
  timestamp: Date; // Data și ora trimiterii mesajului
  isRead: boolean; // Dacă a fost citit sau nu
}

export interface Feedback {
  id: number;
  thesisId: number; // ID-ul lucrării la care se referă feedback-ul
  authorId: number; // ID-ul utilizatorului care a lăsat feedback
  content: string; // Conținutul feedback-ului
  createdAt: Date; // Data creării
}
