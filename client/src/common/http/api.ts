import ky from 'ky';
import '@/envConfig';

export default class Api {
    private static kyInstance = ky.create({
        prefixUrl: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    public static authorized = this.kyInstance;

    public static raw = this.kyInstance;
}
