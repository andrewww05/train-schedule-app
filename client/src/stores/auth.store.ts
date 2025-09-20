import Api from '@/common/http/api';
import { createStore } from 'zustand/vanilla';

export interface AuthState {
    status: 'loading' | 'unauthorized' | 'authorized';
    accessToken: string | null;
}

export interface AuthActions {
    fetchRefresh(): Promise<void>;
    setAccessToken(accessToken: string): void;
}

export type AuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
    status: 'loading',
    accessToken: null,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
    return createStore<AuthStore>()((set) => ({
        ...initState,
        async fetchRefresh() {
            set({ status: 'loading' });

            try {
                const res = await Api.raw.get('auth/refresh');

                if (res.status < 200 || res.status > 299) throw new Error(res.statusText);

                const { accessToken } = await res.json() as any;

                set({ status: 'authorized', accessToken });
            } catch (error) {
                set({ status: 'unauthorized', accessToken: null });
            }
        },
        setAccessToken(accessToken) {
            set({ accessToken });
        }
    }));
};
