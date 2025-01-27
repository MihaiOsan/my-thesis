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
  authorId?: number;
  supervisorId?: number;
  level: "Undergraduate" | "Masters" | "PhD";
  proposedBy: number;
  proposalDate: Date;
  imageUrl?: string;
  dueDate?: Date;
  studentsApplications?: number[];
  requiredTechnologies?: string[];
  prerequisites?: string[];
  status:
    | "Proposed"
    | "Accepted"
    | "In Progress"
    | "Completed"
    | "Cancelled"
    | "Graded";
  documents?: UploadedDocument[];
  evaluation?: ThesisEvaluation | null;
  proposedTo?: number;
}

export interface ThesisEvaluation {
  grade: number;
  feedback: string;
  evaluationDate: Date;
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
