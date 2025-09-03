import { z } from 'astro/zod'
import { ActionError, defineAction } from 'astro:actions'
import { db, eq, and, Shelf, sql } from 'astro:db'
import { auth } from '@/lib/auth'
import { SHELF_STATUS_ENUM } from '@/lib/shelf'

const BaseSchema = z.object({ bookId: z.string() })

export const get = defineAction({
	input: BaseSchema,
	handler: async (input, context) => {
		const session = await auth.api.getSession({
			headers: context.request.headers
		})
		if (!session) {
			throw new ActionError({
				code: 'UNAUTHORIZED',
				message: 'You must be signed in to get books from your shelf'
			})
		}

		const entry = await db
			.select()
			.from(Shelf)
			.where(
				and(eq(Shelf.bookId, input.bookId), eq(Shelf.userId, session.user.id))
			)
			.get()

		return entry
	}
})

export const upsert = defineAction({
	accept: 'form',
	input: BaseSchema.extend({ status: z.enum(SHELF_STATUS_ENUM) }),
	handler: async (input, context) => {
		const session = await auth.api.getSession({
			headers: context.request.headers
		})

		if (!session) {
			throw new ActionError({
				code: 'UNAUTHORIZED',
				message:
					'You must be signed in to insert or update books from your shelf'
			})
		}

		const entry = await db
			.select()
			.from(Shelf)
			.where(
				and(eq(Shelf.bookId, input.bookId), eq(Shelf.userId, session.user.id))
			)
			.get()

		if (entry) {
			await db
				.update(Shelf)
				.set({ ...input, updatedAt: sql`CURRENT_TIMESTAMP` })
				.where(eq(Shelf.id, entry.id))
		} else {
			await db
				.insert(Shelf)
				.values({ ...input, id: crypto.randomUUID(), userId: session.user.id })
		}

		return { success: true }
	}
})

export const remove = defineAction({
	accept: 'form',
	input: BaseSchema,
	handler: async (input, context) => {
		const session = await auth.api.getSession({
			headers: context.request.headers
		})

		if (!session) {
			throw new ActionError({
				code: 'UNAUTHORIZED',
				message: 'You must be signed in to remove books from your shelf'
			})
		}

		await db
			.delete(Shelf)
			.where(
				and(eq(Shelf.userId, session.user.id), eq(Shelf.bookId, input.bookId))
			)

		return { success: true }
	}
})
