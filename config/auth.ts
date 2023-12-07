import { IUser } from "@/model/IUser";
import { OAuthService } from "@/services/common/OAuthService";
import type { User } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { pages } from "next/dist/build/templates/app-page";
import { Auth } from "@auth/core"
import { type TokenSet } from "@auth/core/types"
import { HttpService } from "@/services/common/HttpService";

export const { auth, handlers: { GET, POST }} = NextAuth({
  secret: '111',
  providers: [
    Credentials({
      credentials: {
        email: { label: 'email', type: 'email', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        // return null;
        // 1. Check the data
        const [ login, password, tokenCaptcha ] = ['', '', ''];

        // // 2. Try to authoruze at the backend API
        const apiResponse = await OAuthService.signIn({ login, password, tokenCaptcha });
        // console.log('apiResponse = ', apiResponse);        
        if (typeof apiResponse === 'string') return null;
        const { accessToken, refreshToken } = apiResponse;

        return {
          accessToken,
          refreshToken,
          id: '123',
          email: 'test',
        } as User;

        // if (!credentials?.email || !credentials?.password) return null;
        // console.log('credentials = ', credentials);
        
        
        // return { email: 'danilove@bk.ru' } as User;
      },      
    })
  ],
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log('callback signIn', user, account, profile, email, credentials);      
      return true
    },
    async redirect({ url, baseUrl }) {
      // console.log('callback redirect', url, baseUrl);
      return baseUrl
    },
    async session({ session, user, token }) {
      console.log('!!! -> callback session', session, user, token);
      token.accessToken && ((session as any).accessToken = token.accessToken)
      token.refreshToken && ((session as any).refreshToken = token.refreshToken)
      return session
    },

    async jwt({ token, user, account, profile, trigger }) {
      console.log('!!! -> JWT', (user as any)?.accessToken, (user as any)?.refreshToken );
      
      (user as any)?.accessToken && (token.accessToken = (user as any)?.accessToken);
      (user as any)?.refreshToken && (token.refreshToken = (user as any)?.refreshToken);

      if ((user as any).accessToken) {
        // Save the access token and refresh token in the JWT on the initial login
        return {
          access_token: (user as any).accessToken,
          expires_at: Math.floor(Date.now() / 1000 + 60000),
          refresh_token: (user as any).refreshToken,
        }
      } else if (Date.now() < +(token as any)?.expires_at * 1000) {
        // If the access token has not expired yet, return it
        return token
      } else {
        // If the access token has expired, try to refresh it
        try {
          // https://accounts.google.com/.well-known/openid-configuration
          // We need the `token_endpoint`.
          const { accessToken, refreshToken } = await HttpService.post(`oauth/refresh/`, {
            isTryRefresh: false,
            headers: {
              'Content-Type': 'application/json',
            },
            body: { refreshToken: (token as any)?.refresh_token },
          });
          

          const tokens: TokenSet = {
            access_token: accessToken,
            expires_at: Math.floor(Date.now() / 1000 + 60),
            refresh_token: refreshToken,
          }

          return {
            ...token, // Keep the previous token properties
            ...tokens,
          }
        } catch (error) {
          console.error("Error refreshing access token", error)
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const }
        }
      }

      return token;
    }
  },
  
});

// declare module "@auth/core/types" {
//   interface Session {
//     error?: "RefreshAccessTokenError"
//   }
// }

// declare module "@auth/core/jwt" {
//   interface JWT {
//     access_token: string
//     expires_at: number
//     refresh_token: string
//     error?: "RefreshAccessTokenError"
//   }
// }