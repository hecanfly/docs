

## eslint-plugin-eslint-comments

eslint-plugin-eslint-comments 是一款 ESLint 插件，核心作用是规范 ESLint 专属注释（如 /* eslint-disable */）的使用。

核心功能

检测无效或多余的 ESLint 注释，比如禁用了不存在的规则。

限制注释的使用场景，避免滥用 eslint-disable 跳过关键代码检查。

强制注释添加说明，明确禁用规则的原因和范围。

常用规则示例

* eslint-comments/no-unused-disable：禁止未使用的 eslint-disable 注释。
* eslint-comments/require-description：要求 eslint-disable 必须附带说明。
* eslint-comments/no-disable-all：禁止使用 eslint-disable-all（避免全局跳过检查）。
* 
安装与使用

安装依赖：npm install eslint-plugin-eslint-comments --save-dev。

在 ESLint 配置文件（如 .eslintrc）中启用插件和规则：

```json
{
    "plugins": ["eslint-comments"],
    "rules": {
        "eslint-comments/no-unused-disable": "error",
        "eslint-comments/require-description": "warn"
    }
}
```