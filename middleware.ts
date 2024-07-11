// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import NextAuth from 'next-auth';
import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    // if (!req.auth) {
    //     const url = req.url.replace(req.nextUrl.pathname, '/login');
    //     return Response.redirect(url);
    // }
});

export const createMiddleware = ({
    //Add locales you want in the app
    locales: ['en', 'vi'],

    // default locale if no match
    defaultLocale: 'en'
});

export const config = { matcher: ['/(vi|en)/:path*'] };