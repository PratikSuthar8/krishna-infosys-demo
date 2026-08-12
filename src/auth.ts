import NextAuth from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

const tenantId = process.env.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      issuer: `https://login.microsoftonline.com/${tenantId}/v2.0`,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        const p = profile as {
          email?: string;
          preferred_username?: string;
          name?: string;
        };
        token.email = p.email || p.preferred_username || token.email;
        token.name = p.name || token.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = (token.email as string) || session.user.email;
        session.user.name = (token.name as string) || session.user.name;
      }
      return session;
    },
    async authorized({ auth, request }) {
      const path = request.nextUrl.pathname;
      if (!path.startsWith("/admin")) return true;
      if (path.startsWith("/admin/login")) return true;
      return !!auth?.user;
    },
  },
  trustHost: true,
});
