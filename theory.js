(function(root){
  'use strict';
  const letters='CDEFGAB', semis=[0,2,4,5,7,9,11];
  function parse(p){const m=/^([A-G])([#b]{0,2})(-?\d)$/.exec(p);if(!m)throw Error('Invalid pitch '+p);return {letter:m[1],acc:m[2],oct:+m[3],step:letters.indexOf(m[1])+7*(+m[3]),midi:12*(+m[3]+1)+semis[letters.indexOf(m[1])]+[...m[2]].reduce((s,a)=>s+(a==='#'?1:-1),0)};}
  function from(step,midi){const li=((step%7)+7)%7,oct=Math.floor(step/7),delta=midi-(12*(oct+1)+semis[li]);if(Math.abs(delta)>2)throw Error('Unusable spelling');return letters[li]+(delta>0?'#'.repeat(delta):'b'.repeat(-delta))+oct;}
  function transpose(p,steps,semitones){const n=parse(p);return from(n.step+steps,n.midi+semitones);}
  function interval(a,b){let x=parse(a),y=parse(b);if(x.step>y.step)[x,y]=[y,x];const quantity=y.step-x.step+1,simple=(quantity-1)%7+1,oct=Math.floor((quantity-1)/7),base=[0,2,4,5,7,9,11][simple-1]+12*oct,diff=y.midi-x.midi-base,perfect=[1,4,5].includes(simple);let quality;if(perfect)quality=diff===0?'perfect':diff===1?'augmented':diff===-1?'diminished':null;else quality=diff===0?'major':diff===-1?'minor':diff===1?'augmented':diff===-2?'diminished':null;if(!quality)throw Error('Unsupported interval');return {quality,quantity,semitones:y.midi-x.midi,name:quality+' '+quantity};}
  const keys=[{name:'C major',sig:'C',tonic:'C4'},{name:'G major',sig:'G',tonic:'G4'},{name:'D major',sig:'D',tonic:'D4'},{name:'F major',sig:'F',tonic:'F4'},{name:'Bb major',sig:'Bb',tonic:'Bb4'},{name:'A major',sig:'A',tonic:'A4'},{name:'Eb major',sig:'Eb',tonic:'Eb4'}];
  function scale(key,degree,octaveShift=0){const d=degree-1,oct=Math.floor(d/7),idx=((d%7)+7)%7;return transpose(key.tonic,d+octaveShift*7,[0,2,4,5,7,9,11][idx]+oct*12+octaveShift*12);}
  function chord(key,degree,seventh=false){return [0,2,4,...(seventh?[6]:[])].map(d=>scale(key,degree+d));}
  function rng(seed){let s=seed>>>0;return ()=>{s=(s+0x6D2B79F5)>>>0;let t=Math.imul(s^(s>>>15),1|s);t^=t+Math.imul(t^(t>>>7),61|t);return ((t^(t>>>14))>>>0)/4294967296;};}
  function choose(r,a){return a[Math.floor(r()*a.length)];}
  const tuning={guitar:['E4','B3','G3','D3','A2','E2'],bass:['G2','D2','A1','E1']};
  function toTab(p,instrument){const n=parse(p).midi;const options=tuning[instrument].map((open,i)=>({str:i+1,fret:n-parse(open).midi})).filter(x=>x.fret>=0&&x.fret<=12);if(!options.length)throw Error('Outside TAB range '+p);return options.sort((a,b)=>a.fret-b.fret)[0];}
  function tabPitch(pos,instrument){return parse(tuning[instrument][pos.str-1]).midi+pos.fret;}
  function beats(e){const d={w:4,h:2,q:1,'8':.5,'16':.25,'32':.125};let b=d[e.d.replace(/d/g,'')];const dots=(e.d.match(/d/g)||[]).length;b*=2-Math.pow(.5,dots);return e.tuplet?b*e.tuplet.ratio:b;}
  function transposeScore(score,steps,semitones){const s=JSON.parse(JSON.stringify(score));s.staves.forEach(st=>st.bars.forEach(bar=>bar.events.forEach(e=>{if(e.p)e.p=e.p.map(p=>transpose(p,steps,semitones));})));return s;}
  const api={parse,from,transpose,interval,keys,scale,chord,rng,choose,tuning,toTab,tabPitch,beats,transposeScore};
  if(typeof module!=='undefined')module.exports=api;else root.L2Theory=api;
})(typeof window!=='undefined'?window:globalThis);
