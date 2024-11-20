// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["@/assets/tailwind.css", "@/assets/base.css"],
  modules: [
    "@hypernym/nuxt-anime",
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
  ],
  primevue: {
    options: {
      theme: "none",
    },
  },
  postcss: {
    plugins: {
      "postcss-import": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
