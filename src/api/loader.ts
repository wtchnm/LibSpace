import {z} from 'astro/zod'
import {
	AuthorResponseSchema,
	BASE_URL,
	BOOK_URL,
	BookResponseSchema,
	BookSchema,
	WORK_URL,
	WorkResponseSchema
} from './schema'

const REQUEST_INIT: RequestInit = {
	headers: {'User-Agent': 'Shelf/1.0 (wtchnm@icloud.com)'}
}

const FAVORITE_BOOKS = [
	{
		id: 'OL82563W',
		bookId: 'OL26629979M',
		title: "Harry Potter and the Philosopher's Stone",
		coverUrl: 'https://covers.openlibrary.org/b/id/15109429-L.jpg'
	},
	{
		id: 'OL257943W',
		bookId: 'OL25420333M',
		title: 'A Game of Thrones',
		coverUrl: 'https://covers.openlibrary.org/b/id/14860650-L.jpg'
	},
	{
		id: 'OL27482W',
		bookId: 'OL51709286M',
		title: 'The Hobbit',
		coverUrl: 'https://covers.openlibrary.org/b/id/14627222-L.jpg'
	},
	{
		id: 'OL27513W',
		bookId: 'OL26449223M',
		title: 'The Fellowship of the Ring',
		coverUrl: 'https://covers.openlibrary.org/b/id/8172083-L.jpg'
	},
	{
		id: 'OL893415W',
		bookId: 'OL26242482M',
		title: 'Dune',
		coverUrl: 'https://covers.openlibrary.org/b/id/15092781-L.jpg'
	},
	{
		id: 'OL8479867W',
		bookId: 'OL35447857M',
		title: 'The Name of the Wind',
		coverUrl: 'https://covers.openlibrary.org/b/id/12391248-L.jpg'
	},
	{
		id: 'OL15358691W',
		bookId: 'OL24383834M',
		title: 'The Way of Kings',
		coverUrl: 'https://covers.openlibrary.org/b/id/14658322-L.jpg'
	},
	{
		id: 'OL8369445W',
		bookId: 'OL15987639M',
		title: 'The Lies of Locke Lamora',
		coverUrl: 'https://covers.openlibrary.org/b/id/12901690-L.jpg'
	},
	{
		id: 'OL8400950W',
		bookId: 'OL7878939M',
		title: 'The Blade Itself',
		coverUrl: 'https://covers.openlibrary.org/b/id/14543422-L.jpg'
	},
	{
		id: 'OL2577482W',
		bookId: 'OL19970603M',
		title: 'The Last Wish',
		coverUrl: 'https://covers.openlibrary.org/b/id/8747762-L.jpg'
	}
]
export function getFavoriteBooks() {
	return z.array(BookSchema).parse(FAVORITE_BOOKS)
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
	const request = await fetch(`${BASE_URL}${id}.json`, REQUEST_INIT)
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
		description: book.description ?? work.description,
		isbn: book.isbn_13 ?? book.isbn_10
	})
}
