# MilkyWay - 婴儿记录助手

一个专门为新手父母设计的PWA应用，帮助您轻松记录和追踪宝宝的喝奶和大便情况。

## ✨ 功能特性

- 📝 **喝奶记录** - 记录喝奶时间、类型（奶粉/亲喂/瓶喂）、喝奶量
- 💩 **大便记录** - 记录大便时间、形状和颜色
- 📊 **数据统计** - 按日/周/月查看统计数据，支持图表可视化
- 💾 **数据导出/导入** - JSON格式备份，安全存储在本地
- 🌙 **深色模式** - 支持浅色/深色/跟随系统主题切换
- 📱 **PWA支持** - 可安装到主屏幕，离线使用
- 🔒 **隐私安全** - 所有数据都存储在本地，不上传任何服务器

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

### 生成PWA图标（可选）

```bash
npm run generate-icons
```

## 🛠️ 技术栈

- **前端框架** - React 19
- **构建工具** - Vite
- **语言** - TypeScript
- **路由** - React Router v7
- **样式** - Tailwind CSS (CDN)
- **图表** - Chart.js + react-chartjs-2
- **时间处理** - Day.js
- **PWA** - vite-plugin-pwa

## 📱 应用截图

（可添加应用截图）

## 🎨 主题切换

应用支持三种主题模式：
- ☀️ 浅色模式
- 🌙 深色模式
- ⚙️ 跟随系统

在「设置」页面可以轻松切换主题，主题设置会自动保存。

## 💾 数据存储

所有数据都安全地存储在浏览器的 `localStorage` 中，确保：
- ✅ 完全离线使用
- ✅ 隐私安全，不上传服务器
- ✅ 支持导出备份和导入恢复

## 🌐 部署

### Cloudflare Pages（推荐）

1. 将代码推送到 GitHub/GitLab 仓库
2. 在 Cloudflare Pages 中创建新项目
3. 连接到您的代码仓库
4. 配置：
   - **构建命令**: `npm run build`
   - **输出目录**: `dist`
5. 点击部署！

### 其他选项

- GitHub Pages
- Vercel
- Netlify

## 📝 开发记录

- 使用 `RecordContext` 管理应用数据
- 使用 `ThemeContext` 管理主题状态
- 支持移动端触摸友好设计
- 活泼可爱的配色方案

## 📄 License

MIT

---

Made with ❤️ for new parents
