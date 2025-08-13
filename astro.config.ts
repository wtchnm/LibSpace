// import netlify from '@astrojs/netlify'

import vercel from '@astrojs/vercel'
import tailwindcss from '@tailwindcss/vite'
import {defineConfig} from 'astro/config'

export default defineConfig({
	image: {domains: ['covers.openlibrary.org']},
	experimental: {liveContentCollections: true},
	vite: {plugins: [tailwindcss()]},
	adapter: vercel()
})
