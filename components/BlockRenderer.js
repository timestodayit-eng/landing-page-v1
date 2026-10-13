import CustomCodeFrame from './CustomCodeFrame';
import { extractYouTubeId } from '../lib/content';
export default function BlockRenderer({block,preview=false}){
  if(block.type==='custom') return <CustomCodeFrame html={block.html||''} css={block.css||''} js={block.js||''} height={block.height||500} />;
  const cls=preview?'preview-section':'public-section';
  const yt=extractYouTubeId(block.videoUrl||'');
  return <section className={cls}><div className={preview?'':'public-inner'}>
    {block.type==='hero'?<h1>{block.heading}</h1>:<h2>{block.heading}</h2>}
    {block.text && <p>{block.text}</p>}
    {block.type==='video' && yt && <iframe className="yt" src={`https://www.youtube.com/embed/${yt}?rel=0`} allowFullScreen title={block.heading||'Video'} />}
    {(block.type==='hero'||block.type==='cta') && block.buttonText && <a className={preview?'btn':'public-cta'} href={block.buttonUrl||'#'}>{block.buttonText}</a>}
  </div></section>;
}
