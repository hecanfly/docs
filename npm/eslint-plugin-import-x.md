

## eslint-plugin-import-x

`eslint-plugin-import-x` 是一款 **增强版的 ESLint 导入规范插件**，源于经典的 `eslint-plugin-import`，但解决了原插件的部分历史问题（如性能瓶颈、依赖兼容性、规则灵活性），核心作用是 **规范 ES Module/CommonJS 的导入（`import`/`require`）行为**，避免导入错误、优化依赖引入方式、提升代码一致性。

### 核心定位：为什么用它而非原 `eslint-plugin-import`？
- 原 `eslint-plugin-import` 存在依赖陈旧（如依赖 `node-resolve` 老版本）、部分规则性能差、TypeScript 支持不流畅等问题；
- `import-x` 是对其的「重构升级版」：保留核心规则，优化解析逻辑，支持最新的 Node.js/ES Module 特性，修复了原插件的已知 Bug，且兼容原插件的大部分配置，迁移成本极低。

### 核心功能（解决哪些问题？）
1. **语法与路径校验**：避免导入不存在的模块、未导出的变量、拼写错误的路径；
2. **导入风格规范**：统一导入顺序（如内置模块 → 第三方模块 → 本地模块）、禁用相对路径导入核心模块、限制单文件导入数量；
3. **依赖优化**：禁止导入未在 `package.json` 中声明的依赖、移除未使用的导入、限制循环导入；
4. **兼容性与安全**：检测导入的模块是否支持当前环境（如浏览器不支持 Node.js 内置模块）、禁止导入 devDependencies 到生产代码；
5. **TypeScript 友好**：更好地兼容 TS 路径别名（如 `@/`）、类型导入语法（`import type`）。

### 常用核心规则（实用场景）
| 规则名 | 作用 | 示例 |
|--------|------|------|
| `import-x/no-unresolved` | 禁止导入不存在的模块/路径 | 错误：`import utils from './util'`（实际路径是 `./utils`） |
| `import-x/order` | 强制导入顺序（可自定义分组） | 要求：内置模块（`fs`）→ 第三方（`lodash`）→ 本地相对路径（`./api`）→ 本地绝对路径（`@/components`） |
| `import-x/no-extraneous-dependencies` | 禁止导入未在 `package.json` 中声明的依赖 | 错误：导入了 `axios` 但未在 `dependencies`/`devDependencies` 中配置 |
| `import-x/no-unused-imports` | 移除未使用的导入 | 错误：`import { debounce } from 'lodash'` 但未使用 `debounce` |
| `import-x/prefer-absolute-path` | 强制本地模块使用绝对路径（如 `@/`） | 推荐：`import Button from '@/components/Button'` 而非 `../components/Button` |
| `import-x/no-cycle` | 禁止循环导入（避免依赖死锁） | 错误：A 导入 B，B 又导入 A |

### 安装与基础配置
#### 1. 安装依赖
```bash
# 核心插件
npm install eslint-plugin-import-x --save-dev
# 可选：解析 TypeScript 路径别名（如 tsconfig.json 中的 paths）
npm install eslint-import-resolver-typescript --save-dev
```

#### 2. ESLint 配置文件（如 `.eslintrc.js`）
```javascript
module.exports = {
  plugins: ["import-x"], // 启用插件
  rules: {
    // 基础必开规则
    "import-x/no-unresolved": "error", // 禁止未找到的模块
    "import-x/no-extraneous-dependencies": ["error", {
      devDependencies: ["**/*.test.js", "**/*.config.js"], // 允许在测试/配置文件中导入 devDeps
      peerDependencies: true // 允许导入 peerDeps（如 React）
    }],
    "import-x/no-unused-imports": "error", // 移除未使用导入
    "import-x/order": ["error", {
      groups: [
        ["builtin", "external"], // 第一组：Node 内置模块 + 第三方模块
        ["internal"], // 第二组：本地绝对路径模块（如 @/）
        ["parent", "sibling", "index"] // 第三组：父目录/同级目录/索引文件
      ],
      "newlines-between": "always" // 不同组之间空一行
    }],
    "import-x/prefer-absolute-path": ["error", {
      esmodule: true,
      commonjs: true // 对 CommonJS（require）也生效
    }]
  },
  settings: {
    // 解析配置（适配 TypeScript 路径别名）
    "import-x/resolver": {
      "typescript": {
        project: "./tsconfig.json" // 指向你的 tsconfig.json
      }
    }
  }
};
```

### 关键注意点
1. **与原插件的兼容性**：`import-x` 的规则名、配置格式基本与 `eslint-plugin-import` 一致，只需将配置中的 `import` 替换为 `import-x`（如 `import/order` → `import-x/order`）即可迁移；
2. **路径解析**：如果项目使用路径别名（如 Vue 的 `@/`、TS 的 `paths`），需安装对应的解析器（如 `eslint-import-resolver-typescript`、`eslint-import-resolver-webpack`），并在 `settings` 中配置；
3. **CommonJS 支持**：默认支持 `require` 语法（如 `const fs = require('fs')`），无需额外配置。

### 适用场景
- 中大型项目：需要统一导入规范、避免依赖混乱；
- TypeScript 项目：相比原插件，对 TS 路径别名、类型导入的支持更稳定；
- 追求性能：`import-x` 优化了规则解析逻辑，比原插件更快。

如果需要根据你的项目类型（Vue/React/TS/纯 JS）生成「定制化配置」，可以告诉我你的技术栈，我会提供直接可用的配置模板～