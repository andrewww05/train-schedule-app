import ky from 'ky';
import '@/envConfig';

export default class Api {
    private static accessToken: string | null = null;

    private static kyInstance = ky.create({
        prefixUrl: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    private static getToken(): string | null {
        return this.accessToken || localStorage.getItem('token');
    }

    private static setToken(token: string): void {
        this.accessToken = token;
        localStorage.setItem('token', token);
    }

    private static async refreshToken(): Promise<string> {
        try {
            const response = await this.kyInstance.get('auth/refresh');
            // @ts-ignore
            const { accessToken } = await response.json();
            this.setToken(accessToken);
            return accessToken;
        } catch (error) {
            throw new Error('unauthorized');
        }
    }

    public static authorized = this.kyInstance.extend({
        hooks: {
            beforeRequest: [
                (request) => {
                    const token = Api.getToken();
                    if (token) {
                        request.headers.set('Authorization', `Bearer ${token}`);
                    }
                }
            ],
            afterResponse: [
                async (request, options, response) => {
                    if (response.status === 401) {
                        try {
                            await Api.refreshToken();
                            const token = Api.getToken();
                            if (token) {
                                request.headers.set('Authorization', `Bearer ${token}`);
                            }
                            return ky(request, options);
                        } catch (error) {
                            throw new Error('unauthorized');
                        }
                    }
                }
            ]
        }
    });

    public static raw = this.kyInstance;
}