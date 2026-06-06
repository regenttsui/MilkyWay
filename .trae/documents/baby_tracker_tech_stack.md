# 婴儿记录PWA应用 - 技术栈文档

## 1. 技术架构

### 1.1 框架选型
- **前端框架**：React 18
- **构建工具**：Vite
- **理由**：
  - React拥有丰富的生态系统
  - Vite提供快速的开发体验和构建效率
  - 成熟稳定，社区支持良好

### 1.2 语言选型
- **编程语言**：TypeScript
- **理由**：
  - 类型安全，减少运行时错误
  - 更好的IDE支持和代码提示
  - 提高代码可维护性

## 2. 核心技术栈

### 2.1 UI组件库
- **组件库**：Material-UI (MUI) 或 Chakra UI
- **理由**：
  - 组件丰富，开箱即用
  - 良好的移动端支持
  - 主题定制灵活

### 2.2 图表库
- **图表库**：Chart.js 或 ECharts
- **理由**：
  - 轻量级，易于集成
  - 支持多种图表类型
  - 良好的移动端适配

### 2.3 状态管理
- **状态管理**：React Context API + useReducer
- **理由**：
  - 简单场景无需引入复杂的状态管理库
  - 减少依赖，降低复杂度
  - React原生支持

### 2.4 路由
- **路由方案**：React Router v6
- **理由**：
  - React生态标准路由库
  - 功能完善，使用简单
  - 支持嵌套路由和动态路由

### 2.5 时间处理
- **时间库**：day.js
- **理由**：
  - 轻量级，API简洁
  - 完美替代moment.js
  - 支持多种格式化

## 3. PWA相关技术

### 3.1 PWA配置
- **Workbox**：Vite PWA插件
- **功能**：
  - Service Worker管理
  - 缓存策略配置
  - 离线支持

### 3.2 Web App Manifest
- 配置应用图标
- 配置应用名称
- 配置主题色
- 配置显示模式

## 4. 数据存储

### 4.1 本地存储
- **存储方案**：localStorage
- **数据格式**：JSON
- **结构设计**：
  ```typescript
  interface Record {
    id: string;
    type: 'feeding' | 'poop';
    timestamp: number;
    data: FeedingData | PoopData;
  }

  interface FeedingData {
    type: 'formula' | 'breastfeeding-direct' | 'breastfeeding-bottle';
    amount?: number; // 毫升
  }

  interface PoopData {
    shape: string;
    color: string;
  }
  ```

## 5. 项目结构

```
milkyway/
├── public/
│   ├── icons/              # PWA图标
│   └── manifest.json       # Web App Manifest
├── src/
│   ├── components/         # 公共组件
│   ├── pages/              # 页面组件
│   ├── hooks/              # 自定义Hooks
│   ├── context/            # Context管理
│   ├── types/              # TypeScript类型定义
│   ├── utils/              # 工具函数
│   ├── styles/             # 全局样式
│   ├── App.tsx             # 根组件
│   └── main.tsx            # 入口文件
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 6. 开发工具

### 6.1 代码质量
- **ESLint**：代码规范检查
- **Prettier**：代码格式化

### 6.2 版本控制
- **Git**：版本控制

## 7. 构建与部署

### 7.1 构建命令
- 开发：`npm run dev`
- 构建：`npm run build`
- 预览：`npm run preview`

### 7.2 部署方案

#### 7.2.1 Cloudflare Pages（推荐）
- **优势**：
  - 全球CDN，访问速度快
  - 免费额度充足
  - 自动HTTPS
  - 与GitHub/GitLab无缝集成，自动部署
  - 支持自定义域名
- **部署配置**：
  - 构建命令：`npm run build`
  - 构建输出目录：`dist`
  - 环境变量：无需特殊配置
- **部署步骤**：
  1. 将代码推送到GitHub/GitLab仓库
  2. 在Cloudflare Pages中创建新项目
  3. 连接到代码仓库
  4. 配置构建设置
  5. 完成部署

#### 7.2.2 其他可选方案
- GitHub Pages
- Vercel
- Netlify
- 支持HTTPS（PWA必需）
