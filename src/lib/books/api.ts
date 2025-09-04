import { db, Trending } from 'astro:db'
import {
	AuthorResponseSchema,
	BOOK_URL,
	BookResponseSchema,
	BookSchema,
	TrendingBooksResponseSchema,
	OPEN_LIBRARY_URL,
	WORK_URL,
	WorkResponseSchema
} from './schema'
import { getStore } from '@netlify/blobs'

const REQUEST_INIT: RequestInit = {
	headers: { 'User-Agent': 'LibSpace/1.0 (wtchnm@icloud.com)' }
}

async function fetchWithCache(url: string) {
	const store = getStore('api-cache')
	const cached = await store.get(url, { type: 'json' })
	if (cached) return cached

	const request = await fetch(url, REQUEST_INIT)
	const data = await request.json()
	store.setJSON(url, data)
	return data
}

export async function getTrendingBooks() {
	const books = await db.select().from(Trending).limit(10)
	return TrendingBooksResponseSchema.parse(books)
}

async function getWork(id: string) {
	const data = await fetchWithCache(WORK_URL.replace(':id', id))
	return WorkResponseSchema.parse(data)
}

async function getBook(id: string) {
	const data = await fetchWithCache(BOOK_URL.replace(':id', id))
	return BookResponseSchema.parse(data)
}

async function getAuthor(id: string) {
	const data = await fetchWithCache(`${OPEN_LIBRARY_URL}${id}.json`)
	return AuthorResponseSchema.parse(data)
}

export async function buildFinalBook(workId: string, bookId: string) {
	const [work, book] = await Promise.all([getWork(workId), getBook(bookId)])
	const authors = await Promise.all(work.authors?.map(getAuthor) ?? [])

	return BookSchema.parse({
		...work,
		...book,
		bookId,
		workId,
		id: crypto.randomUUID(),
		authors: authors.join(', '),
		coverUrl: book.covers,
		date: book.publish_date,
		pages: book.number_of_pages ?? book.pagination,
		description: book.description ?? work.description,
		isbn: book.isbn_13 ?? book.isbn_10
	})
}
