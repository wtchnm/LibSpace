import type { AstroGlobal, CacheHint } from 'astro'

export const SIX_MONTHS_IN_SECONDS = 60 * 60 * 24 * 180

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
}
