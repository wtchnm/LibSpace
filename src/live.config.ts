import {defineLiveCollection} from 'astro:content'
import type {LiveDataCollection, LiveDataEntry} from 'astro'
import type {LiveLoader} from 'astro/loaders'
import {buildFinalBook, getTrendingBooks} from './api/loader'
import {BookSchema, TRENDING_URL} from './api/schema'

// Cache for dev server
const cache = new Map<
	string,
	LiveDataCollection<BookSchema> | LiveDataEntry<BookSchema>
>()

const loader: LiveLoader<BookSchema, {workId: string; bookId: string}> = {
	name: 'books',
	async loadCollection() {
		if (import.meta.env.DEV) {
			const entry = cache.get(TRENDING_URL)
			if (entry && 'entries' in entry) return entry
		}

		const response = await getTrendingBooks()
		const collection: LiveDataCollection<BookSchema> = {
			entries: response.map(e => {
				const edition = e.editions.docs[0]
				return {
					id: e.key,
					data: BookSchema.parse({
						id: e.key,
						bookId: edition?.key,
						title: edition?.title,
						coverUrl: edition?.cover_i
					})
				}
			}),
			cacheHint: {
				// 1 day
				maxAge: 60 * 60 * 24,
				lastModified: new Date()
			}
		}

		if (import.meta.env.DEV) cache.set(TRENDING_URL, collection)

		return collection
	},
	async loadEntry({filter}) {
		const cacheKey = filter.workId + filter.bookId
		if (import.meta.env.DEV) {
			const entry = cache.get(cacheKey)
			if (entry && 'data' in entry) return entry
		}

		const data = await buildFinalBook(filter.workId, filter.bookId)
		const entry: LiveDataEntry<BookSchema> = {
			id: filter.bookId,
			data,
			cacheHint: {
				// 1 day
				maxAge: 60 * 60 * 24,
				lastModified: new Date()
			}
		}

		if (import.meta.env.DEV) cache.set(cacheKey, entry)

		return entry
	}
}

const books = defineLiveCollection({loader})

export const collections = {books}
