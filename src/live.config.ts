import { defineLiveCollection } from 'astro:content'
import type { LiveDataCollection, LiveDataEntry } from 'astro'
import type { LiveLoader } from 'astro/loaders'
import { SIX_MONTHS_IN_SECONDS } from './api/cache'
import { buildFinalBook, getFavoriteBooks } from './api/loader'
import type { BookSchema } from './api/schema'

// Cache for dev server
const cache = new Map<
	string,
	LiveDataCollection<BookSchema> | LiveDataEntry<BookSchema>
>()

const loader: LiveLoader<BookSchema, { workId: string; bookId: string }> = {
	name: 'books',
	async loadCollection() {
		const response = getFavoriteBooks()
		const collection: LiveDataCollection<BookSchema> = {
			entries: response.map(book => ({ id: book.id, data: book })),
			cacheHint: { maxAge: SIX_MONTHS_IN_SECONDS }
		}

		return await Promise.resolve(collection)
	},
	async loadEntry({ filter }) {
		const cacheKey = filter.workId + filter.bookId
		if (import.meta.env.DEV) {
			const entry = cache.get(cacheKey)
			if (entry && 'data' in entry) return entry
		}

		const data = await buildFinalBook(filter.workId, filter.bookId)
		const entry: LiveDataEntry<BookSchema> = {
			id: filter.bookId,
			data,
			cacheHint: { maxAge: SIX_MONTHS_IN_SECONDS }
		}

		if (import.meta.env.DEV) cache.set(cacheKey, entry)

		return entry
	}
}

const books = defineLiveCollection({ loader })

export const collections = { books }
