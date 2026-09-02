import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium' });
for (const [w,h,mob,dpr,tag] of [[390,844,true,3,'mobile@3x'],[1440,900,false,2,'desktop@2x'],[2560,1440,false,1,'2560@1x']]) {
  const ctx = await b.newContext({ viewport:{width:w,height:h}, isMobile:mob, hasTouch:mob, deviceScaleFactor:dpr });
  const p = await ctx.newPage();
  await p.goto('http://127.0.0.1:3216', { waitUntil:'networkidle' });
  const total = await p.evaluate(() => document.body.scrollHeight);
  for (let y=0; y<total; y+=600) { await p.evaluate(v=>scrollTo(0,v), y); await p.waitForTimeout(200); }
  await p.waitForTimeout(1200);
  const rows = await p.evaluate((dpr) => [...document.querySelectorAll('img')]
    .filter(i => i.getBoundingClientRect().width > 0)
    .map(i => {
      const r = i.getBoundingClientRect();
      const need = r.width * dpr;
      return { src: i.currentSrc.replace(/.*url=/,'').split('&')[0], css: Math.round(r.width), natural: i.naturalWidth, ratio: +(i.naturalWidth/need).toFixed(2) };
    }), dpr);
  console.log(`\n--- ${tag} ---`);
  for (const r of rows) console.log(`  ${r.ratio < 1 ? 'UNDER' : '  ok '} css=${String(r.css).padStart(4)} natural=${String(r.natural).padStart(4)} ratio=${r.ratio}  ${decodeURIComponent(r.src)}`);
  await ctx.close();
}
await b.close();
