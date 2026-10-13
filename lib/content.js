export function safeJson(value, fallback) {
  try { return JSON.parse(value || ''); } catch { return fallback; }
}

export function defaultBlocks(category = 'pro') {
  const common = [
    { id:'hero-1', type:'hero', heading:'Your campaign headline', text:'Use a clear promise and a single primary action.', buttonText:'Call Now', buttonUrl:'tel:+8801000000000' },
    { id:'trust-1', type:'trust', heading:'Why people trust us', text:'Add real licences, proof, process, numbers and authority.' },
    { id:'cta-1', type:'cta', heading:'Ready to talk?', text:'Speak directly with our team.', buttonText:'Call Now', buttonUrl:'tel:+8801000000000' },
  ];
  if (category === 'call') return [common[0], common[2]];
  if (category === 'trust') return [common[0], common[1], {id:'video-1',type:'video',heading:'What people say about us',text:'Add an approved YouTube video.',videoUrl:''}, common[2]];
  if (category === 'review') return [common[0], {id:'reviews-1',type:'reviews',heading:'Customer experiences',text:'Use genuine reviews only.'}, common[2]];
  if (category === 'fomo') return [common[0], {id:'text-1',type:'text',heading:'Limited opportunity',text:'Add a real deadline or availability statement. Avoid false urgency.'}, common[2]];
  return common;
}

export function extractYouTubeId(url='') {
  const match = String(url).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/);
  return match ? match[1] : '';
}

export function extractGtmId(input='') {
  const match = String(input).match(/GTM-[A-Z0-9]+/i);
  return match ? match[0].toUpperCase() : '';
}
