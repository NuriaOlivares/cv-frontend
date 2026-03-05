export interface Profile {
    id: number;
    fullName: string;
    title: string;
    summary: string;
    email: string;
    phone?: string;
    linkedin?: string;
    github?: string;
    experiences: Experience[];
    projects: Project[];
    skills: Skill[];
    education: Education[];
    certifications: Certification[];
    languages: Language[];
}

export interface Experience {
    id: number;
    role: string;
    company: string;
    description?: string;
    startDate: string;
    endDate?: string;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    techStack?: string;
    githubUrl?: string;
    url?: string;
}

export interface Skill {
    id: number;
    name: string;
    category: SkillCategory;
    categoryDisplayName: string;
    displayOrder?: number;
}

export type SkillCategory =
    | 'LANGUAGES'
    | 'FRAMEWORKS_AND_APIS'
    | 'CLOUD_AND_DEVOPS'
    | 'DATABASES'
    | 'TESTING_AND_QUALITY'
    | 'PRACTICES_AND_METHODOLOGIES';

export interface Education {
    id: number;
    institution: string;
    degree: string;
    location?: string;
    startDate: string;
    endDate?: string;
    description?: string;
    displayOrder?: number;
}

export interface Certification {
    id: number;
    name: string;
    issuer?: string;
    issueDate?: string;
    credentialUrl?: string;
    displayOrder?: number;
}

export interface Language {
    id: number;
    name: string;
    level: LevelCategory;
    levelDisplayName: string;
    displayOrder?: number;
}

export type LevelCategory =
    | 'NATIVE'
    | 'PROFESSIONAL'
    | 'CONVERSATIONAL'
    | 'BEGINNER'
    | 'LEARNING';

export interface LoginRequest {
    userId: string;
    password: string;
}

export interface LoginResponse {
    userId: string;
    role: 'ROLE_ADMIN' | 'ROLE_VIEWER';
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}