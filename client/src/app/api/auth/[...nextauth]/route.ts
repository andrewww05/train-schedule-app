import api from "@/shared/http/instances";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    debug: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
            httpOptions: {
                timeout: 40000,
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                const res = await api.unauthorized.post("auth/login/google", {
                    headers: {
                        Authorization: `Bearer ${account.id_token}`,
                    },
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    console.error(
                        `Backend returned ${res.status}: ${errorText}`
                    );
                    throw new Error(`Backend request failed: ${res.status}`);
                }

                const data = await res.json();

                token.backendData = data;
            }
            return token;
        },
        async session({ session, token }) {
            if (session) {
                session = Object.assign({}, session, {
                    id_token: token.id_token,
                });
                session = Object.assign({}, session, {
                    authToken: token.myToken,
                });
            }
            return session;
        },
    },
    pages: {
        signIn: "/sign-in",
        signOut: "/sign-out",
        error: "/error",
        verifyRequest: "/verify-request",
        newUser: "/new-user",
    },
});

export { handler as GET, handler as POST };

export const authOptions = handler;
