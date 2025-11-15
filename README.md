# 静态发布页配置系统

这个项目使用配置文件来管理网站内容，使其他应用也能轻松访问这些配置数据。

## 文件结构

- `config.json` - 包含网站所有配置数据的JSON文件
- `index.html` - 主页面，从配置文件动态加载内容
- `api-example.html` - 演示如何从外部应用访问配置数据的示例页面
- `api.js` - 提供简单的API接口，方便其他应用获取配置数据

## 配置文件结构

`config.json` 包含以下部分：

```json
{
  "siteInfo": {
    "title": "网站标题",
    "bookmarkTip": "收藏提示文本"
  },
  "addresses": [
    {
      "title": "地址标题",
      "url": "地址URL"
    }
  ],
  "accessTips": {
    "title": "提示标题",
    "tips": ["提示1", "提示2", "提示3"]
  },
  "footer": {
    "copyright": "版权信息"
  }
}
```

## 如何使用配置数据

### 在JavaScript中

```javascript
fetch('config.json')
  .then(response => response.json())
  .then(config => {
    // 使用配置数据
    console.log(config.addresses);
  })
  .catch(error => console.error('加载配置失败:', error));
```

### 在Node.js中

```javascript
const { getConfig } = require('./api.js');
const config = getConfig();
console.log(config.addresses);
```

## 部署到Cloudflare Pages

1. 登录Cloudflare账户
2. 在左侧菜单中选择"Pages"
3. 点击"创建项目"按钮
4. 选择"上传资产"选项
5. 将整个项目文件夹拖放到上传区域
6. 点击"部署站点"
7. 在项目设置中添加自定义域名 `588838.xyz`

## 更新配置

只需修改`config.json`文件，无需修改HTML或JavaScript代码。网站会自动加载最新的配置数据。

## 注意事项

- 确保Web服务器支持JSON文件的MIME类型（通常默认支持）
- 如果使用CDN，可能需要配置缓存策略，确保配置文件更新能及时生效
- 配置文件中的URL必须是完整的绝对URL（包含协议）