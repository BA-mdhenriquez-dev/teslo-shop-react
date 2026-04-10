import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse } from '../interfaces/auth.response';

export const loginAction = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post('/auth/login', {
      email,
      password,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
