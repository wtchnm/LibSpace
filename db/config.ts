import { SHELF_STATUS_ENUM } from '@/lib/shelf'
import { column, defineDb, defineTable, sql } from 'astro:db'

const User = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		name: column.text(),
		email: column.text(),
		emailVerified: column.boolean(),
		image: column.text({ optional: true }),
		createdAt: column.date(),
		updatedAt: column.date()
	}
})

const Session = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		userId: column.text({ references: () => User.columns.id }),
		token: column.text(),
		expiresAt: column.date(),
		ipAddress: column.text({ optional: true }),
		userAgent: column.text({ optional: true }),
		createdAt: column.date(),
		updatedAt: column.date()
	}
})

const Account = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		userId: column.text({ references: () => User.columns.id }),
		accountId: column.text(),
		providerId: column.text(),
		accessToken: column.text({ optional: true }),
		refreshToken: column.text({ optional: true }),
		accessTokenExpiresAt: column.date({ optional: true }),
		refreshTokenExpiresAt: column.date({ optional: true }),
		scope: column.text({ optional: true }),
		idToken: column.text({ optional: true }),
		password: column.text({ optional: true }),
		createdAt: column.date(),
		updatedAt: column.date()
	}
})

const Verification = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		identifier: column.text(),
		value: column.text(),
		expiresAt: column.date(),
		createdAt: column.date(),
		updatedAt: column.date()
	}
})

const Shelf = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		status: column.text({ enum: SHELF_STATUS_ENUM }),
		userId: column.text({ references: () => User.columns.id }),
		bookId: column.text(),
		workId: column.text(),
		title: column.text(),
		coverUrl: column.text(),
		createdAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
		updatedAt: column.date({ default: sql`CURRENT_TIMESTAMP` })
	}
})

const Trending = defineTable({
	columns: {
		id: column.text({ primaryKey: true }),
		bookId: column.text(),
		workId: column.text(),
		title: column.text(),
		coverUrl: column.text(),
		createdAt: column.date({ default: sql`CURRENT_TIMESTAMP` }),
		updatedAt: column.date({ default: sql`CURRENT_TIMESTAMP` })
	}
})

export default defineDb({
	tables: { User, Session, Account, Verification, Shelf, Trending }
})
