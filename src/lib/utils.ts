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

// See https://github.com/withastro/language-tools/issues/476#issuecomment-2359666785
export function _redirectWithHeaders(headers: Headers, location = '/') {
	return new Response(null, {
		status: 303,
		headers: { ...headers, Location: location }
	})
}
