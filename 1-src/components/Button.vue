<template lang="pug">
	button(v-bind="$attrs" @click="onClick")
		globe-white
		slot
	</template>

<style scoped>
	button {
		padding: .75rem 1rem;
		border:  1px solid #555;
		border-radius: .5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: .75rem;
	}
	svg {
		height: 1.5rem;
		fill:  gray;
	}
	</style>

<script setup lang="ts">
	const emit = defineEmits < {
		(e: 'click', event: MouseEvent): void
	} > ()

	function onClick(event: MouseEvent) {
		emit('click', event)
	}
	// Ensure TypeScript (noUnusedLocals) doesn't incorrectly flag template-only usage
	void onClick
	</script>
