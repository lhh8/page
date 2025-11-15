// Cloudflare Pages 函数示例
// 如果需要，可以在这里添加服务器端逻辑

export async function onRequest(context) {
  // 获取请求信息
  const { request, env, params } = context;
  
  // 返回响应
  return new Response(
    JSON.stringify({ message: "Hello from Cloudflare Pages Functions!" }),
    { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    }
  );
}