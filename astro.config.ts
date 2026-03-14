import db from '@astrojs/db'
import netlify from '@astrojs/netlify'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'

export default defineConfig({
	security: { csp: true },
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Inter',
			cssVariable: '--font-inter',
			weights: ['100 900']
		}
	],
	image: { domains: ['covers.openlibrary.org'] },
	vite: { plugins: [tailwindcss()] },
	adapter: netlify({ devFeatures: false }),
	integrations: [db()]
})
