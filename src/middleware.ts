import {defineMiddleware} from 'astro:middleware'
import type {Element, Root} from 'hast'
import {isCssLink} from 'hast-util-is-css-link'
import {rehype} from 'rehype'
import {visit} from 'unist-util-visit'

const rehypeInstance = rehype().use(() => (tree: Root) => {
	let head: Element | undefined
	const links: Element[] = []
	visit(tree, 'element', node => {
		if (node.tagName === 'head') head = node
		if (isCssLink(node))
			links.push({
				type: 'element',
				tagName: 'link',
				properties: {
					rel: 'preload',
					as: 'style',
					// biome-ignore lint/complexity/useLiteralKeys: TS conflict
					href: node.properties['href']
				},
				children: []
			})
	})
	head?.children.unshift(...links)
})

export const onRequest = defineMiddleware(async (_, next) => {
	const response = await next()
	if (response.headers.get('content-type') !== 'text/html') return response

	const html = await response.text()
	const file = await rehypeInstance.process(html)

	return new Response(file.toString(), response)
})
