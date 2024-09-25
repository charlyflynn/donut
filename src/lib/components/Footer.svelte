<script lang="ts">
	import { type Content, isFilled } from '@prismicio/client';
	import { PrismicLink } from '@prismicio/svelte';
	import IconInstagram from '~icons/fa-brands/instagram';

	export let settings: Content.SettingsDocument;
</script>

<footer class="text-slate-600">
	<div
		class="container mx-auto flex mt-20 flex-col items-center justify-between gap-6 py-8 sm:flex-row"
	>
		<div
			class="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start"
		>
			<a
				href="/"
				class="text-xl font-extrabold tracking-tighter text-slate-100 transition-color duration-150 hover:text-yellow-400"
				>{settings.data.name}</a
			>
			<span
				class="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
				aria-hidden="true">/</span
			>
			<p class="text-sm text-slate-300">
				©{new Date().getFullYear()}
				{settings.data.name}
			</p>
		</div>
		<nav class="navigation" aria-label="Footer Navigation">
			<ul class="flex items-center gap-1">
				{#each settings.data.nav_item as { link, label }, index}
					{#if index > 0}
						<span
							class="hidden text-4xl font-extralight leading-[0] text-slate-400 sm:inline"
							aria-hidden="true">/</span
						>
					{/if}
					<li>
						<PrismicLink
							field={link}
							class="block px-3 py-1 text-base font-bold text-slate-100 transition-colors duraiton-150 hover:text-yellow-400"
							>{label}</PrismicLink
						>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="socials text-slate-100 inline-flex justify-center sm:justify-end">
			{#if isFilled.link(settings.data.instagram_link)}
				<PrismicLink
					field={settings.data.instagram_link}
					class="p-2 text-2xl text-slate-300 transform transition-all duration-150 hover:scale-125 hover:text-yellow-400"
				>
					<IconInstagram aria-label={settings.data.name + ' on Instagram'} />
				</PrismicLink>
			{/if}
		</div>
	</div>
</footer>
