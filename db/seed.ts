import { db, Trending } from 'astro:db'

export default async function () {
	await db.insert(Trending).values([
		{
			id: 'OL19970603M',
			workId: 'OL2577482W',
			title: 'The Last Wish',
			coverUrl: 'https://covers.openlibrary.org/b/id/8747762-L.jpg'
		},
		{
			workId: 'OL82563W',
			id: 'OL39492768M',
			title: "Harry Potter and the Sorcerer's Stone",
			coverUrl: 'https://covers.openlibrary.org/b/id/14656853-L.jpg'
		},
		{
			workId: 'OL257943W',
			id: 'OL25420333M',
			title: 'A Game of Thrones',
			coverUrl: 'https://covers.openlibrary.org/b/id/14860650-L.jpg'
		},
		{
			workId: 'OL27482W',
			id: 'OL51709286M',
			title: 'The Hobbit',
			coverUrl: 'https://covers.openlibrary.org/b/id/14627222-L.jpg'
		},
		{
			workId: 'OL27513W',
			id: 'OL26449223M',
			title: 'The Fellowship of the Ring',
			coverUrl: 'https://covers.openlibrary.org/b/id/8172083-L.jpg'
		},
		{
			workId: 'OL893415W',
			id: 'OL26242482M',
			title: 'Dune',
			coverUrl: 'https://covers.openlibrary.org/b/id/15092781-L.jpg'
		},
		{
			workId: 'OL8479867W',
			id: 'OL35447857M',
			title: 'The Name of the Wind',
			coverUrl: 'https://covers.openlibrary.org/b/id/12391248-L.jpg'
		},
		{
			workId: 'OL15358691W',
			id: 'OL24383834M',
			title: 'The Way of Kings',
			coverUrl: 'https://covers.openlibrary.org/b/id/14658322-L.jpg'
		},
		{
			workId: 'OL8369445W',
			id: 'OL15987639M',
			title: 'The Lies of Locke Lamora',
			coverUrl: 'https://covers.openlibrary.org/b/id/12901690-L.jpg'
		},
		{
			workId: 'OL8400950W',
			id: 'OL7878939M',
			title: 'The Blade Itself',
			coverUrl: 'https://covers.openlibrary.org/b/id/14543422-L.jpg'
		}
	])
}
