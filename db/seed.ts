import { db, Trending } from 'astro:db'

export default async function () {
	await db.insert(Trending).values([
		{
			id: '01991547-4824-782e-bfbc-d43f2eb4b5ba',
			bookId: 'OL19970603M',
			workId: 'OL2577482W',
			title: 'The Last Wish',
			coverUrl: 'https://covers.openlibrary.org/b/id/8747762-L.jpg'
		},
		{
			id: '01991547-4824-7907-a8ce-7e4954835820',
			bookId: 'OL39492768M',
			workId: 'OL82563W',
			title: "Harry Potter and the Sorcerer's Stone",
			coverUrl: 'https://covers.openlibrary.org/b/id/14656853-L.jpg'
		},
		{
			id: '01991547-4824-79a4-a314-da7cdde3a95f',
			bookId: 'OL25420333M',
			workId: 'OL257943W',
			title: 'A Game of Thrones',
			coverUrl: 'https://covers.openlibrary.org/b/id/14860650-L.jpg'
		},
		{
			id: '01991547-4824-7432-b36c-62434b1ad081',
			bookId: 'OL51709286M',
			workId: 'OL27482W',
			title: 'The Hobbit',
			coverUrl: 'https://covers.openlibrary.org/b/id/14627222-L.jpg'
		},
		{
			id: '01991547-4824-747a-83b4-cad0f0ba51a1',
			bookId: 'OL26449223M',
			workId: 'OL27513W',
			title: 'The Fellowship of the Ring',
			coverUrl: 'https://covers.openlibrary.org/b/id/8172083-L.jpg'
		},
		{
			id: '01991547-4824-7172-b04d-a5f1d8d22306',
			bookId: 'OL26242482M',
			workId: 'OL893415W',
			title: 'Dune',
			coverUrl: 'https://covers.openlibrary.org/b/id/15092781-L.jpg'
		},
		{
			id: '01991547-4824-7c47-bef4-80e85b5151d9',
			bookId: 'OL35447857M',
			workId: 'OL8479867W',
			title: 'The Name of the Wind',
			coverUrl: 'https://covers.openlibrary.org/b/id/12391248-L.jpg'
		},
		{
			id: '01991547-4824-7733-90a4-538ac57d38b3',
			bookId: 'OL24383834M',
			workId: 'OL15358691W',
			title: 'The Way of Kings',
			coverUrl: 'https://covers.openlibrary.org/b/id/14658322-L.jpg'
		},
		{
			id: '01991547-4824-75f6-8734-13b9b5c2e301',
			bookId: 'OL15987639M',
			workId: 'OL8369445W',
			title: 'The Lies of Locke Lamora',
			coverUrl: 'https://covers.openlibrary.org/b/id/12901690-L.jpg'
		},
		{
			id: '01991547-4824-7885-9af7-0b283a9739a8',
			bookId: 'OL7878939M',
			workId: 'OL8400950W',
			title: 'The Blade Itself',
			coverUrl: 'https://covers.openlibrary.org/b/id/14543422-L.jpg'
		}
	])
}
