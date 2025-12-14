# Vue 3 + TypeScript + Vite (Root Template)

This is a highly opinionated, AI-optimized template for modern Vue 3 development.

## 📂 Directory Structure

Distinct separation of concerns to keep the root clean:

- **`0-cfg/`**: All configuration files (`vite.config.ts`, `tsconfig.*`, etc.).
- **`1-src/`**: Source code (Vue, TS, CSS).
- **`2-dist/`**: Build artifacts.
- **`public/`**: Disabled/Deleted. Static assets go in `1-src/assets`.

## ⚡ Key Features

- **Auto-Imports**: `ref`, `computed`, `useRouter`, `useRoute` (via `unplugin-auto-import`).
- **Auto-Components**: Components in `1-src/components` are auto-imported (via `unplugin-vue-components`).
- **Pages**: Route components live in `1-src/pages/` (migrated from `1-src/views/`).
- **Auto-CSS**: All CSS in `1-src/css/**/*.css` (recursive) is automatically ingested globally.
- **SVG as Component**: `import Icon from './icon.svg?component'`.
- **Chrome Workspaces**: Automated setup via `npm install` for live-editing CSS (Source Map enabled).
- **Theme Logic**: System-preference aware (Light/Dark supports).

## 🛠️ Tech Stack

- **Vue 3** (Composition API, `<script setup lang="ts">`)
- **Pug** Templates (`<template lang="pug">`)
- **TypeScript** (Strict Mode)
- **Pinia** (State Management)
- **Vue Router** (SPA Routing)
- **VueUse** (Standard Composables)

## 🚀 Commands

- `npm run dev` - Start Dev Server (with Sourcemaps enabled).
- `npm run build` - Type-check and build to `2-dist`.
- `npm run preview` - Preview build.

## 🤖 AI Context

If you are an AI Assistant working on this repo:
- Do not create config files in root; check `0-cfg/`.
- Do not create `src/`; use `1-src/`.
- Component imports are likely unnecessary due to plugins.
