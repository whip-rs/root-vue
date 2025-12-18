<template lang="pug">
	.hero.flex.container
		h1 Root Vue Template Repo
		p home.vue
		Button(@click="handleClick") Click the Button
		p Click count: {{ count }}

	</template>

<style scoped>
	.hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100dvh;
		text-align: center;
		gap: 1rem;
		}

</style>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
function handleClick() {
	count.value++
	}
// Touch the values in the script so TypeScript's `noUnusedLocals` doesn't error when Pug template usage is not picked up by the TS checker.
void count.value
void handleClick
</script>
