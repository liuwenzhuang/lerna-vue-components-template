# lerna + Yarn Workspaces管理Vue组件库

## 创建模块

```bash
$ yarn lerna-create package-name [onlyCopy]
```

- package-name 表示模块名称，如page-header
- onlyCopy 表示不创建模块，只复制/重写一些配置文件等，可对于已存在的模块使用

> 在`scripts/lerna/create.js`脚本中，对模块默认加上了域，可自行更改为自己的域，或不使用域。

复制/重写的文件包括：

|源|目的|备注|
|-----|------|----|
|scripts/vue/shims-tsx.d.ts|packages/package-name/lib|-|
|scripts/vue/shims-vue.d.ts|packages/package-name/lib|-|
|scripts/vue/Template.vue|packages/package-name/lib|使用`PackageName`重写类名，`package-name`重写样式类名|
|scripts/vue/index.ts|packages/package-name/lib|使用`PackageName`重写类名，`package-name`重写组件名|
|scripts/typescript/tsconfig.json|packages/package-name/|-|
|scripts/rollup/rollup.config.js|packages/package-name/|使用`PackageName`重写其中的`output.name`属性|
|packages/package-name/package.json|packages/package-name/package.json|重写一些配置脚本、入口文件等|

> `package-name`指的是使用连字符的命名规则，`PackageName`指转换后的首字母大写的驼峰命名规则。
