import {
	AuthorResponseSchema,
	BASE_URL,
	BOOK_URL,
	BookResponseSchema,
	BookSchema,
	TRENDING_URL,
	TrendingResponseSchema,
	WORK_URL,
	WorkResponseSchema
} from './schema'

const fetchInit: RequestInit = {
	headers: {'User-Agent': 'Shelf/1.0 (wtchnm@icloud.com)'}
}

export async function getTrendingBooks() {
	const request = await fetch(TRENDING_URL, fetchInit)
	const data = await request.json()
	return TrendingResponseSchema.parse(data)
}

async function getWork(id: string) {
	const request = await fetch(WORK_URL.replace(':id', id), fetchInit)
	const data = await request.json()
	return WorkResponseSchema.parse(data)
}

async function getBook(id: string) {
	const request = await fetch(BOOK_URL.replace(':id', id), fetchInit)
	const data = await request.json()
	return BookResponseSchema.parse(data)
}

async function getAuthor(id: string) {
	const request = await fetch(`${BASE_URL}${id}.json`, fetchInit)
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
		id: workId,
		authors: authors.join(', '),
		coverUrl: book.covers,
		date: book.publish_date,
		pages: book.number_of_pages ?? book.pagination,
		description: work.description ?? book.description,
		isbn: book.isbn_13 ?? book.isbn_10
	})
}
