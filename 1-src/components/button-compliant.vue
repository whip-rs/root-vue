<!--
  button-compliant.vue
  An accessible, polymorphic, typed Vue Button base for design systems.

  Features:
  - Polymorphic tag support (`tag`) — defaults to `button`, switches to `a` if `href` present.
  - Native button behavior when `tag` is `button`, otherwise `role="button"` and keyboard activation
  - Proper handling of `disabled` and `loading` states (prevents interaction)
  - Accessibility: `aria-label`, `aria-pressed`, `aria-expanded`, `aria-labelledby`, `aria-disabled`
  - Slots: `default` (label), `icon`, `loader`
  - Emits: `click`, `focus`, `blur`, `keydown`
  - Exposes `focus()` and `blur()` for programmatic focus control via `ref`
  Usage examples:
  // Basic button
  <Button>Save</Button>

  // Anchor link (polymorphic)
  <Button tag="a" href="/docs">Docs</Button>

  // Using the icon slot
  <Button>
    <template #icon>
      <GlobeIcon />
    </template>
    Continue
  </Button>

  // Loading state with loader slot
  <Button :loading="true">
    <template #loader>
      <Spinner />
    </template>
    Saving...
  </Button>

  - Class hooks for `variant` and `size` so design systems can provide CSS
  - No default styles; this is a behavior-first component intended for integration with your design system
-->

<template lang="pug">
  //- Polymorphic element. If href is present and tag is 'button', it defaults to 'a'
  component(:is="computedTag" ref="el" v-bind="$attrs" :class="computedClass" :type="buttonType" :href="href" :target="target" :rel="computedRel" :download="download" :name="isNativeButton ? name : undefined" :value="isNativeButton ? value : undefined" :disabled="isNativeButton ? disabled : undefined" :aria-disabled="disabled ? 'true' : undefined" :aria-pressed="ariaPressed" :aria-expanded="ariaExpanded" :aria-label="ariaLabel" :tabindex="tabIndex" :role="computedRole" @click="onClick" @keydown="onKeyDown" @focus="onFocus" @blur="onBlur")
      //- loader appears before the label for accessibility
      template(v-if="loading" #loader)
        slot(name="loader")
      //- Default slot (label) with optional icon slot
      template(#default)
        span
          slot(name="icon")
          slot
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  tag: { type: String as PropType<string>, default: 'button' },
  type: { type: String as PropType<'button'|'submit'|'reset'>, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  href: { type: String as PropType<string | undefined>, default: undefined },
  target: { type: String as PropType<'_self'|'_blank'|'_parent'|'_top'|string | undefined>, default: undefined },
  rel: { type: String as PropType<string | undefined>, default: undefined },
  download: { type: String as PropType<string | undefined>, default: undefined },
  name: { type: String as PropType<string | undefined>, default: undefined },
  value: { type: [String, Number, Boolean] as PropType<string | number | boolean | undefined>, default: undefined },
  ariaLabel: { type: String as PropType<string | undefined>, default: undefined },
  ariaLabelledBy: { type: String as PropType<string | undefined>, default: undefined },
  ariaPressed: { type: Boolean as PropType<boolean | undefined>, default: undefined },
  ariaExpanded: { type: Boolean as PropType<boolean | undefined>, default: undefined },
  prevent: { type: Boolean, default: false },
  stop: { type: Boolean, default: false },
  autofocus: { type: Boolean, default: false },
  variant: { type: String as PropType<'primary'|'secondary'|'tertiary'|'link'|'ghost'|string>, default: undefined },
  size: { type: String as PropType<'xs'|'sm'|'md'|'lg'|'xl'|string>, default: undefined },
  fullWidth: { type: Boolean, default: false },
  round: { type: Boolean, default: false },
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'keydown', event: KeyboardEvent): void
}>()

const el = ref<HTMLElement | null>(null)

const isNativeButton = computed(() => props.tag === 'button' || props.tag === undefined)
const computedTag = computed(() => {
  if (props.href && (!props.tag || props.tag === 'button')) return 'a'
  return props.tag || 'button'
})
const buttonType = computed(() => (isNativeButton.value ? props.type : undefined))
const computedRel = computed(() => {
  if (props.rel) return props.rel
  if (props.target === '_blank') return 'noopener noreferrer'
  return undefined
})
const isDisabledOrLoading = computed(() => props.disabled || props.loading)
const computedClass = computed(() => {
  const classes: Record<string, boolean | undefined> = {
    'is-fullwidth': props.fullWidth,
    'is-round': props.round,
    'is-loading': props.loading,
    'is-disabled': props.disabled,
  }
  if (props.variant) classes[`btn--${props.variant}`] = true
  if (props.size) classes[`btn--${props.size}`] = true
  return classes
})
const tabIndex = computed(() => {
  if (isNativeButton.value) return undefined
  return props.disabled ? -1 : 0
})
const computedRole = computed(() => {
  if (isNativeButton.value) return undefined
  if (computedTag.value === 'a') return undefined // anchors have native semantics
  return 'button'
})

function onClick(event: MouseEvent) {
  if (isDisabledOrLoading.value) {
    event.preventDefault()
    return
  }
  if (props.prevent) event.preventDefault()
  if (props.stop) event.stopPropagation()
  emit('click', event)
}

function onKeyDown(event: KeyboardEvent) {
  emit('keydown', event)
  if (isDisabledOrLoading.value) return
  if (!isNativeButton.value) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      // Cast to MouseEvent for emit compatibility
      emit('click', event as unknown as MouseEvent)
    }
  }
}

function onFocus(event: FocusEvent) {
  emit('focus', event)
}

function onBlur(event: FocusEvent) {
  emit('blur', event)
}

onMounted(() => {
  if (props.autofocus) {
    el.value?.focus()
  }
})

function focus(options?: FocusOptions) {
  el.value?.focus(options)
}

function blur() {
  el.value?.blur()
}

defineExpose({ focus, blur })

// Template usage may not be picked up by TypeScript in some environments (Pug),
// so reference these items to avoid `noUnusedLocals` errors in the linter/checker.
void buttonType
void tabIndex
void computedRole
void onClick
void onKeyDown
void onFocus
void onBlur
void el
void computedTag
void isNativeButton
void computedRel
void isDisabledOrLoading
void computedClass
</script>

<!-- Intentionally no styles; this is a minimal accessible button component for reference -->
