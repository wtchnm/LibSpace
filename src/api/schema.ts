import {z} from 'astro/zod'

export const BASE_URL = 'https://openlibrary.org'
export const WORK_URL = `${BASE_URL}/works/:id.json`
export const BOOK_URL = `${BASE_URL}/books/:id.json`

const COVER_URL = 'https://covers.openlibrary.org/b/id/:id-L.jpg'

export const BookSchema = z.object({
	id: z.string(),
	title: z.string().optional().default('Title not available'),
	coverUrl: z.string().optional().default('/not-found.png'),
	bookId: z.string().optional(),
	authors: z.string().optional().default('Authors not available'),
	description: z.string().optional().default('Description not available'),
	date: z.string().optional().default('Not available'),
	pages: z.coerce.string().optional().default('0'),
	publishers: z.string().optional().default('Not available'),
	isbn: z.string().optional().default('Not available'),
	subjects: z.string().optional().default('Subjects not available')
})
export type BookSchema = z.infer<typeof BookSchema>

export const WorkResponseSchema = BookSchema.pick({title: true}).extend({
	description: z
		.string()
		.or(z.object({value: z.string()}))
		.transform(d => {
			const value = typeof d === 'string' ? d : d.value
			if (value.length > 736) return `${value.slice(0, 736)}...`
			return value
		})
		.optional(),
	authors: z
		.array(z.object({author: z.object({key: z.string()})}))
		.transform(a => a.map(author => author.author.key))
		.optional(),
	subjects: z
		.array(z.string())
		.transform(s => s.slice(0, 3).join(', '))
		.optional()
})

export const BookResponseSchema = WorkResponseSchema.pick({
	description: true
}).extend({
	publish_date: z.string().optional(),
	number_of_pages: z.number().optional(),
	pagination: z.string().optional(),
	publishers: z
		.array(z.string())
		.transform(p => p.join(', '))
		.optional(),
	isbn_10: z
		.array(z.string())
		.transform(i => i.join(', '))
		.optional(),
	isbn_13: z
		.array(z.string())
		.transform(i => i.join(', '))
		.optional(),
	covers: z
		.array(z.number())
		.transform(c => (c[0] ? COVER_URL.replace(':id', c[0].toString()) : null))
})

export const AuthorResponseSchema = z
	.object({name: z.string()})
	.transform(a => a.name)
