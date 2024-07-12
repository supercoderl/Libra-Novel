import { NextAuthConfig, User } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import DiscordProvider from 'next-auth/providers/discord';
import { login, loginByProvider } from './app/actions/authActions';
import { encodeEmailToNumber } from './utils/text';

const authConfig: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req): Promise<any> {
        const res = await login({
          email: credentials?.email,
          password: credentials?.password
        });

        if (res.succeeded) {
          // Any object returned will be saved in `user` property of the JWT
          var result: User = {
            accessToken: res.data.accessToken,
            refreshToken: res.data.refreshToken,
            id: res.data.user.userID,
            email: res.data.user.email || "",
            roles: res.data.user.roles,
            avatar: res.data.user.avatar,
            name: res.data.user.fullName
          };
          return result;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login' //sigin page
  },
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(profile);
      if(account?.provider)
      {
        const res = await loginByProvider({
          email: profile?.email,
          userID: String(profile?.id || "password"),
          avatar: account?.provider === "discord" ? profile?.image_url : account?.provider === "google" ? profile?.picture : profile?.avatar_url,
          provider: account?.provider,
          firstName: account?.provider === "google" ? profile?.family_name : account?.provider === "discord" ? profile?.global_name : profile?.login,
          lastName: account?.provider === "google" ? profile?.given_name : null,
          userCode: encodeEmailToNumber(profile?.email)
        });

        if (res.succeeded) {
          user.email = res.data.user.email;
          user.name = res.data.user.fullName;
          user.accessToken = res.data.accessToken;
          user.refreshToken = res.data.refreshToken;
          user.id = res.data.user.userID;
          user.roles = res.data.user.roles;
          user.avatar = res.data.user.avatar;
        }

        return true;
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      const currentTime = Math.floor(Date.now() / 1000);

      if (trigger === "update") {
        token.accessToken = {
          token: session.accessToken.token,
          expireMinutes: session.accessToken.expireMinutes,
        };
        token.refreshToken = {
          token: session.refreshToken.token,
          expireMinutes: session.refreshToken.expireMinutes
        };

        token.exp = currentTime + session.accessToken.expireMinutes * 60;
        token.email = session.user.email;
        token.roles = session.user.roles;
        token.picture = session.user.avatar;
        token.name = session.user.name;

        return token;
      }

      if (user && user.accessToken && user.refreshToken) {
        token.accessToken = {
          token: user.accessToken.token,
          expireMinutes: user.accessToken.expireMinutes,
        };
        token.refreshToken = {
          token: user.refreshToken.token,
          expireMinutes: user.refreshToken.expireMinutes
        };

        token.exp = currentTime + user.accessToken.expireMinutes * 60;
        token.email = user.email;
        token.roles = user.roles;
        token.picture = user.avatar;
        token.name = user.name;
        token.id = user.id;

        return token;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        user: {
          roles: token?.roles,
          avatar: token?.picture,
          name: token?.name,
          email: token?.email,
          id: token?.id
        },
        expires: new Date((token.exp ? token.exp : 1) * 1000),
      };
    },
  },
} satisfies NextAuthConfig;

export default authConfig;