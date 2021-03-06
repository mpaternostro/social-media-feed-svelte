import { api } from '../_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { Locals } from '$lib/types';

// GET /posts.json
export const get: RequestHandler<Locals> = async (request) => {
	// request.locals.userid comes from src/hooks.js
	const response = await api(request, `posts`);

	if (response.status === 404) {
		// there are not any posts.
		// start with an empty array
		return { body: [] };
	}

	return response;
};

// POST /posts/add.json
export const post: RequestHandler<Locals, FormData> = async (request) => {
	const response = await api(request, `posts/add`, {
		// because index.svelte posts a FormData object,
		// request.body is _also_ a (readonly) FormData
		// object, which allows us to get form data
		// with the `body.get(key)` method
		text: request.body.get('text')
	});

	return response;
};
