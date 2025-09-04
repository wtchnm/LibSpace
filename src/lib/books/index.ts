import type { LiveDataCollection, LiveDataEntry } from 'astro'
import type { BookSchema } from './schema'
import type { LiveLoader } from 'astro/loaders'
import { buildFinalBook, getTrendingBooks } from './api'

export const bookLoader: LiveLoader<
	BookSchema,
	{ workId: string; bookId: string }
> = {
	name: 'books',
	async loadCollection() {
		const response = await getTrendingBooks()
		const collection: LiveDataCollection<BookSchema> = {
			entries: response.map(book => ({ id: book.id, data: book }))
		}

		return await Promise.resolve(collection)
	},
	async loadEntry({ filter }) {
		const data = await buildFinalBook(filter.workId, filter.bookId)

		return { id: filter.bookId, data }
	}
}
