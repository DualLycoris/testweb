项目结构

- 根目录（保留原静态站点文件，便于对照迁移）
  - index.html 、 dao.html 、 qi.html 、 wan.html 、 about.html 、 contact.html 、 products.html 、 services.html
  - css/ 、 js/ 、 images/
- 新增后端（Django + DRF）
  - requirements.txt
  - backend/
    - manage.py
    - config/ （ settings.py 、 urls.py ）
    - api/ （注册/登录/JWT、 /me ）
    - news/ （News 模型 + 只读 API + Admin）
    - messages_app/ （Message 模型 + CRUD API + Admin）
- 新增前端（Vue3 SPA）
  - frontend/
    - package.json 、 vite.config.ts 、 tsconfig.json
    - public/images/ 、 public/videos/ （确保访问路径仍是 /images/... 、 /videos/... ）
    - src/ （ App.vue 、 router/ 、 stores/ 、 api/ 、 views/ 、 components/ ）
后端（Django + DRF）关键代码

- 模型
  - News ： backend/news/models.py:4 （ title/summary/content/published_at/image/video ）
  - Message ： backend/messages_app/models.py:5 （ name/email/phone/subject/content/created_at ， user 可选关联）
- API 路由
  - 总路由： backend/config/urls.py:7 （ /api/auth/ 、 /api/news/ 、 /api/messages/ ）
  - 认证： backend/api/urls.py:7 （ /register 、 /token 、 /token/refresh 、 /me ）
- 权限规则（满足“游客可看留言，登录才能提交”）
  - backend/messages_app/views.py:11 ： list/retrieve 允许匿名； create 需要登录；其它操作需要管理员
- Admin
  - backend/news/admin.py:6 、 backend/messages_app/admin.py:6 已注册，管理员可发布新闻、管理留言
- 分页与 JWT
  - backend/config/settings.py:70 （DRF 分页默认 PAGE_SIZE=10 ，JWT 认证已启用）
前端（Vue3 + Router + Pinia + Axios + Element Plus）关键代码

- 应用入口
  - frontend/src/main.ts:1 ：注册 Pinia 、 Vue Router 、 Element Plus
  - frontend/src/App.vue:1 ：统一 Navbar + RouterView + Footer
- 路由（含 /news/:id 、 /login 、 /register ）
  - frontend/src/router/index.ts:15
- 认证状态（JWT 存储、登录/注册、 /me 、refresh）
  - frontend/src/stores/auth.ts:18
- API 调用（自动注入 Authorization: Bearer ... + 401 自动 refresh 重试）
  - frontend/src/api/client.ts:5
- 首页改造（轮播图支持图/视频、画廊 lightbox、视频区、新闻列表、留言入口）
  - frontend/src/views/HomeView.vue:1
- 联系我们页（联系信息 + 留言表单 + 留言列表，同一套 API）
  - frontend/src/views/ContactView.vue:1
- Tabs 全部由 Vue/ElementPlus 实现（无原生 tabs.js ）
  - 示例： frontend/src/views/DaoView.vue:1 、 frontend/src/views/QiView.vue:1 、 frontend/src/views/WanView.vue:1 、 frontend/src/views/ServicesView.vue:1 、 frontend/src/views/ProductsView.vue:1
- 开发期前后端联调（Vite 代理 /api 、 /media 到 Django）
  - frontend/vite.config.ts:13
已实现的 API 约定

- 公开
  - GET /api/news/ 、 GET /api/news/:id/
  - GET /api/messages/
- 需登录
  - POST /api/messages/
  - GET /api/auth/me/
- 认证
  - POST /api/auth/register/
  - POST /api/auth/token/ 、 POST /api/auth/token/refresh/
安装与运行（开发）

- 后端
  - pip install -r requirements.txt
  - python backend/manage.py migrate
  - python backend/manage.py createsuperuser
  - python backend/manage.py runserver 0.0.0.0:8000
- 前端
  - cd frontend
  - npm install
  - npm run dev （默认 http://localhost:5173 ，会自动代理到后端 8000 ）
部署建议（生产）

- 构建前端： cd frontend && npm run build 产物在 frontend/dist/
- 静态与媒体
  - 静态（前端构建产物）建议由 Nginx 直接托管，或拷贝到 Django static 后走 collectstatic
  - 媒体（新闻上传的图片/视频）走 Django MEDIA_ROOT ，生产用 Nginx 代理 /media/
- 反向代理
  - Nginx： /api 、 /admin 代理到 Django； / 指向前端 dist （history 模式要做 try_files 回退到 index.html ）
- 配置项
  - 生产环境务必替换 backend/config/settings.py:6 的 SECRET_KEY 、关闭 DEBUG 、收紧 ALLOWED_HOSTS 与 CORS 策略