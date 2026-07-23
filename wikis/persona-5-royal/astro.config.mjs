import { defineConfig } from 'astro/config';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      workbox: {
        // Guarda en caché archivos estáticos y recursos multimedia de la wiki
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,json}']
      },
      manifest: {
        name: 'Persona 5 Royal Wiki',
        short_name: 'P5R Wiki',
        description: 'Guía y base de datos completa de Persona 5 Royal',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait', // Fija la orientación vertical típica de las wikis móviles
        theme_color: '#d10000',  // El rojo carmesí icónico de Persona 5
        background_color: '#000000', // Fondo negro puro para la pantalla de carga (Splash Screen)
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable' // Permite que Android adapte el icono a formas redondas/cuadradas
          }
        ]
      }
    })
  ]
});