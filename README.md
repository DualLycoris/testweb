# testweb 项目

这是一个将原静态网站迁移为现代前后端分离架构的示例项目。

- **后端**：Django + Django REST Framework（DRF），提供 RESTful API、JWT 认证、新闻发布与留言管理。
- **前端**：Vue 3（Composition API） + Vite + Vue Router + Pinia + Element Plus，构建单页应用（SPA）。
- **目标**：保留原静态站点所有页面内容与风格，同时增加动态功能

## 目录结构
testweb/  
├── old/                # 原静态页面  
│  
├── requirements.txt    # 后端 Python 依赖  
│  
├── backend/            # Django 项目  
│   ├── manage.py  
│   ├── config/         # 项目配置（settings.py、urls.py 等）  
│   ├── api/            # 认证相关（注册、登录、JWT、/me）  
│   ├── news/           # 新闻模型、序列化器、视图、Admin  
│   └── messages_app/   # 留言模型、序列化器、视图、Admin  
│  
└── frontend/           # Vue 3 前端项目  
│   ├── package.json  
│   ├── vite.config.ts  
│   ├── tsconfig.json  
│   ├── public/  
│   │   ├── images/     # 图片路径  
│   │   │   ├── galary/     # 画廊图片路径  
│   │   │   └── banner/     # 循环播放图片路径  
│   │   └── videos/     # 视频资源  
│   └── src/  
│   │   ├── main.ts  
│   │   ├── App.vue  
│   │   ├── router/     # 路由配置（含 /news/:id、/login、/register 等）  
│   │   ├── stores/     # Pinia 状态管理（auth 认证状态）  
│   │   ├── api/        # Axios 封装（自动注入 token、401 自动 refresh）  
│   │   ├── views/      # 页面视图（HomeView、DaoView、QiView 等）  
│   │   └── components/ # 公共组件（Navbar、Footer、Tabs 等）  

  
## 功能亮点

- **首页改造**：轮播支持图片与视频交替、公司图片画廊（lightbox）、视频展示区、最新新闻动态列表、留言入口。
- **新闻发布**：管理员通过 Django Admin 发布新闻
- **留言系统**：游客可查看留言列表，登录用户能提交留言。
- **用户认证**：注册 / 登录（JWT）
- **响应式设计**：使用 Element Plus，确保移动端友好。

## API 接口（关键路径）

### 公开接口
- `GET /api/news/` → 新闻列表（分页）
- `GET /api/news/<id>/` → 新闻详情
- `GET /api/messages/` → 留言列表（分页）

### 需要登录
- `POST /api/messages/` → 提交留言
- `GET /api/auth/me/` → 当前用户信息

### 认证接口
- `POST /api/auth/register/` → 注册
- `POST /api/auth/token/` → 登录获取 token
- `POST /api/auth/token/refresh/` → 刷新 token

## 本地开发运行

### 1. 后端（Django）

```bash
# 安装依赖
pip install -r requirements.txt

# 执行数据库迁移（使用 SQLite，无需额外安装数据库）
python backend/manage.py migrate

# 创建超级用户（用于访问 Admin 后台发布新闻、管理留言）
python backend/manage.py createsuperuser

# 启动开发服务器
python backend/manage.py runserver 0.0.0.0:8000
```

访问后台管理：http://127.0.0.1:8000/admin/  
默认用户名：admin  密码：123456

### 2. 前端（Vue + Vite）
安装并配置完成npm和vue3环境后，执行以下命令：
```bash
cd frontend
npm install
npm run dev
```
默认访问地址：http://localhost:5173

## 部署建议
前端图片资源放置于 `frontend/public/images/` 目录下，命名为 `galary-1.jpg`、`banner-1.jpg` 等
也可使用图床，将图片 URL 配置到前端代码中。（位于`frontend\src\views\HomeView.vue` 中）