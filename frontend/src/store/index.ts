import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axiosInstance from '@/utils/axios';
import { toast } from 'react-toastify';

export type SignUpData = {
  name: string;
  email: string;
  password: string;
  image: string;
};

export type LoginData = {
  email: string;
  password: string;
};

type AuthStore = {
  user: SignUpData | null;
  error: string | null;
  loading: boolean;
  isAuth: boolean;
  signUp: (data: SignUpData) => Promise<void>;
  singIn: (data: LoginData) => Promise<void>;
};

const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    user: null,
    error: null,
    loading: false,
    isAuth: false,
    signUp: async (data: SignUpData) => {
      set({ loading: true, error: null });
      try {
        const response = await axiosInstance.post(`/users/signup`, data);
        console.log('[signUp] response: ', response);
        if (response.status >= 200 && response.status < 300) {
          set({ user: response.data, loading: false });
          toast.info('회원가입 성공!');
        } else {
          set({ error: response.data.message, loading: false });
          toast.info('회원가입 실패!');
        }
      } catch (error) {
        set({ error: (error as Error).message, loading: false });
      }
      set({ loading: false });
    },
    singIn: async (data: LoginData) => {
      set({ loading: true, error: null });
      try {
        const response = await axiosInstance.post(`/users/singIn`, data);
        console.log('[login] response: ', response);
        if (response.status >= 200 && response.status < 300) {
          set({ user: response.data, isAuth: true, loading: false });
          console.log('로그인 성공! 로컬스토리지에 user 저장해야함');
        } else {
          set({ error: response.data.message, loading: false });
          toast.info('로그인 실패!');
        }
      } catch (error) {
        set({ error: (error as Error).message, loading: false });
      }
      set({ loading: false });
    }
  }))
);

export default useAuthStore;
