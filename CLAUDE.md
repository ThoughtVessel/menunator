# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Menunator is a Next.js 15 application built with React 19, TypeScript, and Tailwind CSS v4. The project uses the App Router architecture with Turbopack for fast development and builds.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application with Turbopack  
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Architecture

This is a standard Next.js App Router application:

- **App Directory**: `src/app/` contains all routes and layouts
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global Tailwind styles
- **TypeScript Configuration**: Path aliases configured with `@/*` pointing to `src/*`
- **Styling**: Tailwind CSS v4 with PostCSS configuration
- **Fonts**: Geist Sans and Geist Mono from Google Fonts

## Key Technologies

- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript support
- **Tailwind CSS v4** for styling
- **ESLint** with Next.js and TypeScript rules

## Development Notes

- The project uses Turbopack for both development and production builds
- TypeScript strict mode is enabled
- ESLint extends `next/core-web-vitals` and `next/typescript` configurations
- Font optimization is handled through `next/font/google`