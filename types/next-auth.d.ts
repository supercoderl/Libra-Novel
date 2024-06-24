import NextAuth, { DefaultSession, User, DefaultJWT } from 'next-auth';

declare module 'next-auth' {
    type UserSession = DefaultSession['user'];
    // interface Session {
    //     user: UserSession;
    //     accessToken: string;
    //     accessTokenExpiry: number;
    //     error: string;
    // }

    interface CredentialsInputs {
        email: string;
        password: string;
    }

    interface Session extends DefaultSession {
        accessToken: {
            token: string,
            expireMinutes: number
        } | null;
        refreshToken: {
            token: string,
            expireMinutes: number
        } | null;
        user: any,
        expires: Date
    }

    interface User {
        accessToken: {
            token: string,
            expireMinutes: number
        } | null;
        refreshToken: {
            token: string,
            expireMinutes: number
        } | null;
        id: string;
        roles: number[] | null;
    }
}

declare module '@auth/core/jwt' {
    interface JWT extends DefaultJWT {
        accessToken: {
            token: string,
            expireMinutes: number
        },
        refreshToken: {
            token: string,
            expireMinutes: number
        }
    }
}