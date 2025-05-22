// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://eulucastiagolt.github.io',
	base: '/counterjs',
	integrations: [
		starlight({
			title: 'CounterJS',
			description: 'A lightweight and powerful library for creating countdown timers in JavaScript',
			social: [
				{ 
					icon: 'github', 
					label: 'GitHub',
					href: 'https://github.com/eulucastiagolt/counterjs'
				}
			],
			
			// Internationalization configuration
			locales: {
				// English as the default language
				en: {
					label: 'English',
					lang: 'en',
				},
				// Brazilian Portuguese
				'pt-br': {
					label: 'Português (Brasil)',
					lang: 'pt-BR',
				},
			},
			defaultLocale: 'en',

			// Sidebar configuration
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
					translations: { 'pt-br': 'Guias' }
				},
				{
					label: 'API',
					slug: 'guides/api',
					translations: { 'pt-br': 'API' }
				},
				{
					label: 'Examples',
					slug: 'guides/example',
					translations: { 'pt-br': 'Exemplos' }
				}
			],

			// Enable edit links
			editLink: {
				baseUrl: 'https://github.com/eulucastiagolt/counterjs/edit/main/docs/src/content/docs/',
			},

			// Using default Starlight styling
		}),
	],
});
