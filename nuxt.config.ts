// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "vblacklist – Kiểm tra trạng thái website trên mọi nhà mạng nhanh nhất!",
      meta: [
        // SEO
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
        { name: 'robots', content: 'index, follow' },
        { name: 'revisit-after', content: '1 days' },
        { name: "description", content: "Kiểm tra website bị chặn hay hoạt động bình thường trên Viettel, VNPT, MobiFone… trong 1 giây. vblacklist cung cấp cảnh báo realtime & dịch vụ bảo vệ website chống chặn." },
        { name: "keywords", content: "check blacklist website, kiểm tra website bị chặn, trạng thái website nhà mạng, chặn web viettel, web bị khóa, bảo vệ website, vblacklist, kiểm tra domain" },
        { name: 'Copyright', content: 'copyright © 2025 by vblacklist' },
        { name: 'author', content: 'vblacklist.com' },
        { name: 'Generator', content: 'vblacklist.com' },
        { name: 'google-site-verification', content: 'Or8J7Lypbzupjdy8g3wBtujvDORRV5puLTzzuKl-Jno' },
        // Open Graph (Facebook, Zalo, Telegram…)
        { property: "og:title", content: "vblacklist – Công cụ kiểm tra website bị chặn chính xác nhất 2025" },
        { property: "og:description", content: "Xem trang web có bị chặn trên Viettel, VNPT, MobiFone, FPT không. Cập nhật realtime 24/7, báo cáo chi tiết từng ISP. Hỗ trợ dịch vụ bảo vệ website chống chặn." },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://vblacklist.com" },

        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Kiểm tra website bị chặn chỉ 1 giây – vblacklist" },
        { name: "twitter:description", content: "Cảnh báo website bị chặn theo thời gian thực và gợi ý cách bảo vệ website an toàn." },
      ],
      link: [
        { rel: "shortcut icon", href: "/favicon.ico" }
      ],
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-L9FRDPH0H0",
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L9FRDPH0H0');
          `,
          type: 'text/javascript',
          charset: 'utf-8'
        }
      ],
    }
  },
  typescript: {
    strict: true
  },
  css: [
    '~/assets/css/typography.css',
    '~/assets/css/tailwind.css',
    '~/assets/css/vendor.css',
    '~/assets/css/global.css',
    "@/assets/css/slider.css"
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    [
      '@nuxtjs/i18n',
      {
        /* module options */
      }
    ]
  ],
  runtimeConfig: {
    public: {
      brandName: "Blacklist",
      authHost: "https://apiclient.vblacklist.com/",
      host: "https://vblacklist.com/" ,
      reamls: process.env.REALMS,
      clientId: process.env.CLIENT_ID,
      siteKey: process.env.SITE_KEY
    }
  },
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      redirectOn: 'root' // recommended
    },
    /* module options */
    vueI18n: './i18n.config.ts' // if you are using custom path, default
  }
});
