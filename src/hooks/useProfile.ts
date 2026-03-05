import { useState, useEffect } from 'react';
import { cvApi } from '../api/cvApi';
import type { Profile } from '../types/cv.types';

interface UseProfileReturn {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProfile = (): UseProfileReturn => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await cvApi.getProfile();
      setProfile(data);
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, isLoading, error, refetch: fetchProfile };
};