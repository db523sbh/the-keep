import { getCollection, type CollectionEntry } from 'astro:content';

export type FeedItem =
	| { type: 'social'; entry: CollectionEntry<'social'> }
	| { type: 'reviews'; entry: CollectionEntry<'reviews'> }
	| { type: 'shrines'; entry: CollectionEntry<'shrines'> }
	| { type: 'portfolio'; entry: CollectionEntry<'portfolio'> };

export async function getFeed(): Promise<FeedItem[]> {
	const [social, reviews, shrines, portfolio] = await Promise.all([
		getCollection('social', ({ data }) => !data.draft),
		getCollection('reviews', ({ data }) => !data.draft),
		getCollection('shrines', ({ data }) => !data.draft),
		getCollection('portfolio', ({ data }) => !data.draft),
	]);

	const items: FeedItem[] = [
		...social.map((entry) => ({ type: 'social' as const, entry })),
		...reviews.map((entry) => ({ type: 'reviews' as const, entry })),
		...shrines.map((entry) => ({ type: 'shrines' as const, entry })),
		...portfolio.map((entry) => ({ type: 'portfolio' as const, entry })),
	];

	return items.sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf());
}
