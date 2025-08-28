import { defineLiveCollection } from 'astro:content'
import { bookLoader } from './lib/books'

const books = defineLiveCollection({ loader: bookLoader })

export const collections = { books }
