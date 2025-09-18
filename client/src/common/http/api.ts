import ky from 'ky';

export default class Api {
    private static kyInstance = ky.create({
        prefixUrl: process.env.API_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    public static authorized = this.kyInstance;

    public static raw = this.kyInstance;
}
