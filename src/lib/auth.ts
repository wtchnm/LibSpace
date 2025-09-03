import { Account, db, Session, User, Verification } from 'astro:db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite',
		schema: {
			user: User,
			session: Session,
			account: Account,
			verification: Verification
		}
	}),
	emailAndPassword: { enabled: true },
	advanced: { useSecureCookies: import.meta.env.PROD },
	session: { cookieCache: { enabled: true, maxAge: 5 * 60 } }
})
