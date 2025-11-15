// Cloudflare Pages 函数处理程序
// 这个文件确保项目被识别为Pages项目而不是Workers项目

export default {
  async fetch(request, env, ctx) {
    // 简单的静态文件服务
    const url = new URL(request.url);
    
    // 处理API请求
    if (url.pathname.startsWith('/api/')) {
      return new Response('API endpoint', { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // 其他请求交给Pages静态文件处理
    return fetch(request);
  }
}