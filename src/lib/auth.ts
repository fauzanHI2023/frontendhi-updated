import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
declare module "next-auth" {
  interface User {
    guid: string;
    id: any;
    user_name: string;
    passwd: string;
    email: string;
    full_name: string;
    user_status: number;
    phone_id: string;
    register_date: string;
    branch_id: string;
    is_new_task: number;
    activkey: string;
    parent_alias_id: string;
    company_id: number;
    auth_key: string;
    expired_key: string;
    deleted_by: number;
    deleted_stamp: string;
    _history: string;
    phpDonorData?: any[];
  }
}
let userDataGoogle: any;

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    error: "/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Sign in",
      type: "credentials",
      credentials: {
        usernameOrEmail: {
          label: "Email or Username",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.usernameOrEmail || !credentials.password) {
          return null;
        }

        const user = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/login-api/login`,
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              usernameOrEmail: credentials.usernameOrEmail,
              password: credentials.password,
            }),
            cache: "no-cache",
            headers: { "Content-Type": "application/json" },
          }
        );
        const ress = await user.json();
        if (!ress?.success) {
          return null;
        }
        return {
          ...ress.user,
          phpDonorData: ress.phpDonorData,
          randomKey: "Random",
        };
      },
    }),
  ],
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    },
  },
  callbacks: {
    async signIn({ account, profile }: any) {
      if (account.provider === "google") {
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/login-api/get-logged-in-google`,
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              email: profile.email,
            }),
            cache: "no-cache",
            headers: { "Content-Type": "application/json" },
          }
        );
        const ress = await user.json();
        if (!ress?.success) {
          return false;
        }
        userDataGoogle = {
          ...ress.user,
          phpDonorData: ress.phpDonorData,
          signOutFromGoogle: false,
          randomKey: "Random",
        };
        console.log("phpDonorData:", ress.phpDonorData);
        return {
          ...ress.user,
          phpDonorData: ress.phpDonorData,
          randomKey: "Random",
        };
      } else {
        // Update userDataGoogle for non-Google sign-in
        userDataGoogle = {
          ...profile, // or whatever data you want to store
          signOutFromGoogle: false,
        };
      }
      return true;
    },    
    async session({ session, token }: any) {
      if (token?.phpDonorData) {
        const donorData = token.phpDonorData[0]; 
        return {
          ...session,
          user: {
            ...session.user,
            ...token,
            address: donorData?.address || session.user.address,
            birth_place: donorData?.birth_place || session.user.birth_place,
            phpDonorData: token.phpDonorData,
            signOutFromGoogle: token.signOutFromGoogle || false,
          },
        };
      }
      return session;
    },      
    async jwt({ token, user, account, session, trigger }: any) {
      console.log("Log Session", session, token);
      if (trigger === "update") {
        token.full_name = session?.full_name || token.full_name;
        token.email = session?.email || token.email;

        if (session?.phpDonorData && session.phpDonorData.length > 0) {
          const donorData = session.phpDonorData[0];
          
          token.address = donorData.address || token.address;
          token.birth_place = donorData.birth_place || token.birth_place;
        }
      }      
    
      // Regular token processing
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          ...u,
          ...userDataGoogle,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
    
      if (account?.provider === "google" && token?.signOut) {
        return {
          ...token,
          signOutFromGoogle: true,
        };
      }
    
      return token;
    },    
  },
};
