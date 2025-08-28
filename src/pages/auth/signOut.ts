import { actions } from 'astro:actions'
import type { APIRoute } from 'astro'
import { _redirectWithHeaders } from '../../lib/utils'

export const prerender = false

export const POST: APIRoute = async context => {
	const { data } = await context.callAction(actions.auth.signOut, null)

	return _redirectWithHeaders(data?.headers ?? new Headers())
}
