# 静态发布页

这是一个简单的静态网站，部署在 Cloudflare Pages 上。

## 功能

- 显示多个网站链接
- 域名运行时间统计
- 粒子背景效果
- 响应式设计

## 部署

此项目使用 Cloudflare Pages 进行部署。当推送到 `master` 或 `main` 分支时，会自动触发部署流程。

## 本地开发

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动本地开发服务器：
   ```bash
   npm run dev
   ```

## 手动部署

```bash
npm run deploy
```