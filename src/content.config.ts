import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseFields = {
	title: z.string(),
	date: z.coerce.date(),
	draft: z.boolean().default(false),
};

const social = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/social' }),
	schema: z.object({
		...baseFields,
		source: z.string(),
		originalUrl: z.string().url(),
		image: z.string().optional(),
	}),
});

const reviews = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
	schema: z.object({
		...baseFields,
		filmTitle: z.string(),
		filmYear: z.number().int(),
		rating: z.number().min(0).max(5),
		letterboxdUrl: z.string().url(),
		poster: z.string(),
	}),
});

const shrines = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/shrines' }),
	schema: z.object({
		...baseFields,
		subject: z.string(),
		heroImage: z.string(),
		gallery: z.array(z.string()).optional(),
		accentColor: z.string().optional(),
	}),
});

const portfolio = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
	schema: z.object({
		...baseFields,
		summary: z.string(),
		role: z.string(),
		tech: z.array(z.string()),
		links: z
			.object({
				live: z.string().url().optional(),
				repo: z.string().url().optional(),
			})
			.optional(),
		cover: z.string(),
	}),
});

export const collections = { social, reviews, shrines, portfolio };
