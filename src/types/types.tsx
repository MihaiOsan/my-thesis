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
  evaluationDate?: Date;
}

export interface UploadedDocument {
  id: number; // ID unic al documentului
  name: string; // Numele documentului
  url: string; // URL-ul unde poate fi accesat documentul (de exemplu, într-un sistem de stocare)
  uploadedAt?: Date; // Data și ora încărcării
  uploadedBy: number; // ID-ul utilizatorului care a încărcat documentul
  documentType: "Report" | "Code" | "Presentation" | "Other"; // Tipul documentului
  description?: string; // O scurtă descriere a documentului
}

