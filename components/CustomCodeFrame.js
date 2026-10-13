'use client';
export default function CustomCodeFrame({html='',css='',js='',height=500,title='Custom code preview'}){
  const srcDoc = `<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;padding:0;}*{box-sizing:border-box;} ${css}</style></head><body>${html}<script>${js}<\/script></body></html>`;
  return <iframe title={title} className="code-frame" style={{height:Number(height)||500}} sandbox="allow-scripts allow-forms allow-popups allow-top-navigation-by-user-activation" srcDoc={srcDoc} />;
}
