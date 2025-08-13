import type {AstroGlobal, CacheHint} from 'astro'

export function setCacheHeaders(
	instance: AstroGlobal,
	cacheHint: CacheHint | undefined
) {
	if (cacheHint?.maxAge) {
		instance.response.headers.set(
			'Cache-Control',
			`s-maxage=${cacheHint.maxAge}`
		)
	}
	if (cacheHint?.lastModified) {
		instance.response.headers.set(
			'Last-Modified',
			cacheHint.lastModified.toUTCString()
		)
	}
}
