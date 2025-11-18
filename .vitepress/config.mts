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
            { text: "Prettier_ESLint", link: "/Prettier_ESLint/start" },
            { text: "Practice", link: "/Practice/start" },
            { text: "MAC", link: "/MAC/start" },
            { text: "npm", link: "/docs/npm/start" },
        ],
        sidebar: {
            "/Practice/": [
                {
                    text: "Practice",
                    items: [{ text: "开始", link: "/Practice/start" }],
                },
            ],

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

            "/Prettier_ESLint/": [
                {
                    text: "Prettier_ESLint",
                    items: [{ text: "开始", link: "/Prettier_ESLint/start" }],
                },
            ],

            "/MAC/": [
                {
                    text: "MAC",
                    items: [
                        { text: "开始", link: "/MAC/start" },
                        { text: "开启Root", link: "/MAC/enable-sudo" },
                        { text: "安装brew", link: "/MAC/安装brew" },
                        { text: "安装Maccy", link: "/MAC/安装Maccy" },
                    ],
                },
            ],

            "/docs/": [
                {
                    text: "npm",
                    items: [
                        { text: "开始", link: "/docs/npm/start" },
                        { text: "@types/node", link: "/docs/npm/@types-node" },
                        { text: "eslint", link: "/docs/npm/eslint" },
                    ],
                },
            ],
        },

        socialLinks: [{ icon: "github", link: "https://github.com/hecanfly" }],

        search: {
            provider: "local",
        },
    },
});
