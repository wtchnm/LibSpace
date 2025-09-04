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

const REQUEST_INIT: RequestInit = {
	headers: { 'User-Agent': 'LibSpace/1.0 (wtchnm@icloud.com)' }
}

export async function getTrendingBooks() {
	const books = await db.select().from(Trending).limit(10)
	return TrendingBooksResponseSchema.parse(books)
}

async function getWork(id: string) {
	const request = await fetch(WORK_URL.replace(':id', id), REQUEST_INIT)
	const data = await request.json()
	return WorkResponseSchema.parse(data)
}

async function getBook(id: string) {
	const request = await fetch(BOOK_URL.replace(':id', id), REQUEST_INIT)
	const data = await request.json()
	return BookResponseSchema.parse(data)
}

async function getAuthor(id: string) {
	const request = await fetch(`${OPEN_LIBRARY_URL}${id}.json`, REQUEST_INIT)
	const data = await request.json()
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
