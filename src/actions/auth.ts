import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { auth } from '@/lib/auth'

const SignInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(128)
})
const SignUpSchema = SignInSchema.extend({ name: z.string().min(1) })

export async function withSetCookie<T extends { headers: Headers }>(
	promise: Promise<T>
) {
	const response = await promise
	return {
		...response,
		headers: { 'set-cookie': response.headers.get('set-cookie') ?? undefined }
	}
}

export const signIn = defineAction({
	accept: 'form',
	input: SignInSchema,
	handler: (input, context) =>
		withSetCookie(
			auth.api.signInEmail({
				body: input,
				headers: context.request.headers,
				returnHeaders: true
			})
		)
})

export const signUp = defineAction({
	accept: 'form',
	input: SignUpSchema,
	handler: (input, context) =>
		withSetCookie(
			auth.api.signUpEmail({
				body: input,
				headers: context.request.headers,
				returnHeaders: true
			})
		)
})

export const signOut = defineAction({
	handler: (_input, context) =>
		withSetCookie(
			auth.api.signOut({
				headers: context.request.headers,
				returnHeaders: true
			})
		)
})
