import type { Certification, ContactForm, Education, Experience, Language, Profile, Project, Skill } from "../types/cv.types";
import { api } from "./axiosConfig";


export const cvApi = {
    getProfile: async () : Promise<Profile> => {
        const response = await api.get('/api/profile');
        return response.data;
    }
    ,
    updateProfile: async (data: Partial<Profile>): Promise<Profile> => {
        const response = await api.put('/api/profile', data);
        return response.data;
    },
    createExperience: async (data: Omit<Experience, 'id'>): Promise<Experience> => {
        const response = await api.post('/api/experiences', data);
        return response.data;
    },
    updateExperience: async (id: number, data: Omit<Experience, 'id'>): Promise<Experience> => {
        const response = await api.put<Experience>(`/api/experiences/${id}`, data);
        return response.data;
    },
    deleteExperience: async (id: number): Promise<void> => {
        await api.delete(`/api/experiences/${id}`);
    },

    createProject: async (data: Omit<Project, 'id'>): Promise<Project> => {
        const response = await api.post<Project>('/api/projects', data);
        return response.data;
    },
    
    updateProject: async (id: number, data: Omit<Project, 'id'>): Promise<Project> => {
        const response = await api.put<Project>(`/api/projects/${id}`, data);
        return response.data;
    },

    deleteProject: async (id: number): Promise<void> => {
        await api.delete(`/api/projects/${id}`);
    },
    
    createSkill: async (data: Omit<Skill, 'id'>): Promise<Skill> => {
        const response = await api.post<Skill>('/api/skills', data);
        return response.data;
    },

    updateSkill: async (id: number, data: Omit<Skill, 'id'>): Promise<Skill> => {
        const response = await api.put<Skill>(`/api/skills/${id}`, data);
        return response.data;
    },

    deleteSkill: async (id: number): Promise<void> => {
        await api.delete(`/api/skills/${id}`);
    },

    createEducation: async (data: Omit<Education, 'id'>): Promise<Education> => {
        const response = await api.post<Education>('/api/education', data);
        return response.data;
    },

    updateEducation: async (id: number, data: Omit<Education, 'id'>): Promise<Education> => {
        const response = await api.put<Education>(`/api/education/${id}`, data);
        return response.data;
    },

    deleteEducation: async (id: number): Promise<void> => {
        await api.delete(`/api/education/${id}`);
    },

    createCertification: async (data: Omit<Certification, 'id'>): Promise<Certification> => {
        const response = await api.post<Certification>('/api/certifications', data);
        return response.data;
    },

    updateCertification: async (id: number, data: Omit<Certification, 'id'>): Promise<Certification> => {
        const response = await api.put<Certification>(`/api/certifications/${id}`, data);
        return response.data;
    },

    deleteCertification: async (id: number): Promise<void> => {
        await api.delete(`/api/certifications/${id}`);
    },

    createLanguage: async (data: Omit<Language, 'id'>): Promise<Language> => {
        const response = await api.post<Language>('/api/languages', data);
        return response.data;
    },

    updateLanguage: async (id: number, data: Omit<Language, 'id'>): Promise<Language> => {
        const response = await api.put<Language>(`/api/languages/${id}`, data);
        return response.data;
    },

    deleteLanguage: async (id: number): Promise<void> => {
        await api.delete(`/api/languages/${id}`);
    },

    downloadCv: async (): Promise<void> => {
        const response = await api.get('/api/cv/download', {
            responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'CV-NuriaOlivares.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    },

    chat: async (message: string): Promise<string> => {
        const response = await api.post<{ message: string }>('/api/chat', { message });
        return response.data.message;
    },

    contactForm: async (form: ContactForm): Promise<void> => {
        await api.post('/api/contact', form);
    }
}