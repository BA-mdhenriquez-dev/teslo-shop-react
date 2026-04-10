import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse } from '../interfaces/auth.response';

export const registerAction = async (
  email: string,
  password: string,
  fullName: string,
): Promise<AuthResponse> => {
  try {
    const { data } = await tesloApi.post('/auth/register', {
      email,
      password,
      fullName,
    });

    console.log({ data });

    return data;
  } catch (err: any) {
    console.log(err.code);
    console.log(err.message);
    console.log(err.response);
    throw err;
  }
};
