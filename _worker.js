// Cloudflare Workers 静态网站处理
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // 处理根路径，重定向到index.html
    if (url.pathname === '/') {
      return Response.redirect('/index.html', 301);
    }
    
    // 尝试从静态资源中获取文件
    const response = await env.ASSETS.fetch(request);
    
    // 如果找到文件，返回文件内容
    if (response.status === 200) {
      return response;
    }
    
    // 如果没有找到文件，尝试添加.html扩展名
    if (!url.pathname.includes('.')) {
      const htmlRequest = new Request(url.href + '.html', request);
      const htmlResponse = await env.ASSETS.fetch(htmlRequest);
      if (htmlResponse.status === 200) {
        return htmlResponse;
      }
    }
    
    // 返回404页面
    return new Response('页面未找到', { status: 404 });
  }
};