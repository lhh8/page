# 咸鱼资源永久发布页

这是一个简单的静态网站，用于展示咸鱼资源的发布地址和相关信息。

## 项目结构

```
├── index.html          # 主页面
├── config.json         # 配置文件，包含网站信息和地址
├── wrangler.toml       # Cloudflare Wrangler 配置文件
├── package.json        # 项目依赖和脚本
├── _headers            # Cloudflare Pages 头部配置
├── _redirects          # Cloudflare Pages 重定向配置
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── main.js         # 主要JavaScript功能
│   └── particles.js    # 粒子背景效果
├── images/             # 图片资源
│   ├── favicon.ico
│   ├── logo.png
│   └── qrcode.png
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions 部署配置
```

## 部署到 Cloudflare Pages

### 方法一：使用 GitHub Actions 自动部署（推荐）

1. 将此项目推送到您的 GitHub 仓库
2. 在 Cloudflare 控制台中获取您的 API Token 和 Account ID：
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - 转到 "My Profile" > "API Tokens"
   - 创建一个自定义令牌，权限包括 "Zone:Zone:Read" 和 "Account:Cloudflare Pages:Edit"
   - 获取您的 Account ID（可在 Cloudflare Dashboard 右侧边栏找到）
3. 在 GitHub 仓库设置中添加以下 Secrets：
   - `CLOUDFLARE_API_TOKEN`: 您的 Cloudflare API Token
   - `CLOUDFLARE_ACCOUNT_ID`: 您的 Cloudflare Account ID
4. 推送代码到 main 分支，GitHub Actions 将自动部署到 Cloudflare Pages

注意：如果之前使用过旧版本的部署配置，可能需要清除 GitHub Actions 缓存或重新触发构建。

### 方法二：手动部署

1. 安装 Wrangler CLI：
   ```bash
   npm install -g wrangler
   ```

2. 登录 Cloudflare：
   ```bash
   wrangler login
   ```

3. 部署项目：
   ```bash
   npx wrangler pages deploy . --project-name xianyuziyuan --commit-dirty=true
   ```

### 方法三：通过 Cloudflare Dashboard

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 Pages 部分
3. 点击"创建项目"
4. 选择"上传资产"或连接到您的 Git 仓库
5. 上传项目文件或连接仓库
6. 设置构建配置（无需构建命令，输出目录为根目录）
7. 部署项目

### 部署结果

成功部署后，您的网站将可以通过以下 URL 访问：
- 临时部署 URL：`https://<随机字符串>.xianyuziyuan.pages.dev`
- 主分支 URL：`https://master.xianyuziyuan.pages.dev`
- 自定义域名（如果您配置了）：`https://yourdomain.com`

## 配置说明

您可以通过修改 `config.json` 文件来自定义网站内容：

- `siteInfo`: 网站基本信息（标题、收藏提示）
- `addresses`: 地址列表（标题、URL）
- `accessTips`: 访问提示信息
- `footer`: 页脚版权信息

## 自定义

- 修改 `css/style.css` 来自定义样式
- 修改 `js/main.js` 来自定义功能
- 替换 `images/` 目录中的图片资源

## 本地开发

1. 安装依赖：
   ```bash
   npm install
   ```
2. 启动本地开发服务器：
   ```bash
   npm run dev
   ```
3. 访问 http://localhost:8788 查看网站

## 注意事项

- 这是一个纯静态网站，无需服务器端支持
- 所有内容都通过 JavaScript 动态加载
- 粒子背景效果使用了 Canvas API
- 网站已针对移动设备优化
- `_headers` 和 `_redirects` 文件提供了额外的 Cloudflare Pages 配置