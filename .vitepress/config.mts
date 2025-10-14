import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: "/docs/",
    lang: "zh-CN",
    title: "飞飞",
    description: "随手一记",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "主页", link: "/" },
            { text: "vitePress", link: "/vitePress/start" },
            { text: "TypeScript", link: "/TypeScript/start" },
        ],
        sidebar: {
            "/vitePress/": [
                {
                    text: "vitePress",
                    items: [{ text: "开始", link: "/vitePress/start" }],
                },
            ],

            "/TypeScript/": [
                {
                    text: "TypeScript",
                    items: [{ text: "开始", link: "/TypeScript/start" }],
                },
            ],
        },

        socialLinks: [{ icon: "github", link: "https://github.com/hecanfly" }],

        search: {
            provider: "local",
        },
    },
});
