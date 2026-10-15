(function(root){
 'use strict';
 const T=typeof module!=='undefined'?require('./theory.js'):root.L2Theory;
 const copy=x=>JSON.parse(JSON.stringify(x));
 // Original, authored rhythmic shapes. Each is a complete bar, not a random
 // permutation of durations. Compound metre retains its dotted-crotchet pulse.
 const motifs=[
  {id:'dotted-call',meter:'4/4',style:'Cantabile',notes:[[1,'qd'],[2,'8'],[4,'q'],[3,'8'],[2,'8']]},
  {id:'offbeat-answer',meter:'4/4',style:'Lightly',notes:[[null,'8'],[3,'8'],[5,'qd'],[4,'8'],[2,'8'],[1,'8']]},
  {id:'dotted-turn',meter:'4/4',style:'Allegretto',notes:[[1,'8d'],[2,'16'],[3,'8'],[5,'8'],[4,'q'],[2,'8'],[1,'8']]},
  {id:'tied-displacement',meter:'4/4',style:'With energy',notes:[[1,'8'],[3,'8',{tieNext:true}],[3,'q'],[5,'8'],[4,'8'],[2,'q']]},
  {id:'quick-opening',meter:'4/4',style:'Giocoso',notes:[[5,'16'],[4,'16'],[3,'8'],[2,'8'],[3,'8'],[5,'qd'],[4,'8']]},
  {id:'breathing-phrase',meter:'4/4',style:'Espressivo',notes:[[3,'q'],[null,'8'],[2,'8'],[4,'8d'],[3,'16'],[1,'q']]},
  {id:'waltz-lilt',meter:'3/4',style:'Moderato',notes:[[1,'qd'],[3,'8'],[5,'8'],[4,'8']]},
  {id:'waltz-answer',meter:'3/4',style:'Dolce',notes:[[3,'8'],[4,'8'],[5,'q'],[2,'8'],[1,'8']]},
  {id:'dotted-dance',meter:'3/4',style:'Grazioso',notes:[[5,'8d'],[4,'16'],[2,'q'],[3,'q']]},
  {id:'delayed-entry',meter:'3/4',style:'Leggiero',notes:[[null,'8'],[1,'8'],[2,'8'],[4,'8'],[3,'q']]},
  {id:'compound-rise',meter:'6/8',style:'Flowing',notes:[[1,'8'],[2,'8'],[4,'8'],[3,'qd']]},
  {id:'compound-answer',meter:'6/8',style:'Andantino',notes:[[5,'qd'],[4,'8'],[2,'8'],[1,'8']]},
  {id:'compound-dotted',meter:'6/8',style:'Scherzando',notes:[[1,'8d'],[2,'16'],[3,'8'],[5,'8'],[4,'8'],[2,'8']]},
  {id:'compound-breath',meter:'6/8',style:'Dolce',notes:[[null,'8'],[3,'8'],[5,'8'],[4,'q'],[2,'8']]},
  {id:'compound-wave',meter:'6/8',style:'Con moto',notes:[[1,'8'],[3,'8'],[5,'8'],[4,'8'],[2,'8'],[1,'8']]},
  {id:'answering-semiquavers',meter:'4/4',style:'Vivace',notes:[[3,'q'],[4,'8'],[5,'16'],[4,'16'],[2,'qd'],[1,'8']]}
 ];
 function select(r,meters){return copy(T.choose(r,motifs.filter(m=>!meters||meters.includes(m.meter))));}
 function events(k,m,offset=0,shift=0){
  const es=m.notes.map(([degree,d,extra={}])=>({...copy(extra),...(degree===null?{rest:true}:{p:[T.scale(k,degree+offset,shift)]}),d}));
  const sounding=es.map((e,i)=>e.rest?-1:i).filter(i=>i>=0);
  if(sounding.length>=3){es[sounding[0]].slurStart='phrase';es[sounding[Math.min(2,sounding.length-1)]].slurEnd='phrase';}
  es[sounding.at(-1)].art='a.';
  return es;
 }
 const durationNames=['w','hd','h','qd','q','8d','8','16d','16','32'];
 function duration(beats){const d=durationNames.find(d=>Math.abs(T.beats({d})-beats)<1e-9);if(!d)throw Error('Cannot notate duration '+beats);return d;}
 function phrase(es,id){const result=copy(es);result.forEach(e=>{if(e.slurStart)e.slurStart=id+'-'+e.slurStart;if(e.slurEnd)e.slurEnd=id+'-'+e.slurEnd;});return result;}
 function transform(es,{factor=1,k,offset=0,invert=false,axis}={}){
  return copy(es).map(e=>{e.d=duration(T.beats(e)*factor);if(e.p)e.p=e.p.map(p=>{const n=T.parse(p),a=T.parse(axis||es.find(n=>n.p).p[0]),step=invert?2*a.step-n.step:n.step;const root=T.parse(k.tonic);return T.scale(k,step-root.step+offset+1);});return e;});
 }
 // Split a transformed line at bar and beat boundaries. Sustained pitched
 // fragments are tied, and slur endpoints remain on the actual first/last note.
 function pack(es,meter){
  const [n,d]=meter.split('/').map(Number),length=n*4/d,pulse=d===8?1.5:1,bars=[];let current={events:[],meter},at=0;
  for(const original of copy(es)){
   let left=T.beats(original),first=true;
   while(left>1e-9){
    const remaining=length-at;let amount=Math.min(left,remaining);
    // A value beginning off a pulse must show the next beat explicitly.
    if(at%pulse>1e-9&&amount>pulse-at%pulse+1e-9)amount=pulse-at%pulse;
    const exact=durationNames.find(d=>Math.abs(T.beats({d})-amount)<1e-9);
    if(!exact){const fit=durationNames.find(d=>T.beats({d})<=amount+1e-9);amount=T.beats({d:fit});}
    const e={...copy(original),d:duration(amount)};delete e.slurStart;delete e.slurEnd;
    if(first&&original.slurStart)e.slurStart=original.slurStart;
    if(left-amount<1e-9&&original.slurEnd)e.slurEnd=original.slurEnd;
    if(e.p&&(left-amount>1e-9||original.tieNext))e.tieNext=true;else delete e.tieNext;
    if(left-amount>1e-9)delete e.art;
    current.events.push(e);left-=amount;at+=amount;first=false;
    if(Math.abs(at-length)<1e-9){bars.push(current);current={events:[],meter};at=0;}
   }
  }
  if(current.events.length)throw Error('Phrase leaves an incomplete bar');return bars;
 }
 function excerpt(k,m){const a=events(k,m);const answer=copy(m);answer.notes=answer.notes.map(([degree,d,x])=>[degree===null?null:6-degree,d,x]);return [a,events(k,answer),events(k,m,1),events(k,m,0)].map((es,i)=>({events:phrase(es,'extract-'+i),meter:m.meter,...(i===0?{caption:'Motif A'}:{})}));}
 function study(k,m,device){
  const a=events(k,m),make=(options,id)=>phrase(transform(a,{k,...options}),id);let line=[];
  if(device==='ostinato')line=[0,1,2,3].flatMap(i=>make({},'repeat-'+i));
  if(device==='sequence')line=[0,1,2,3].flatMap(i=>make({offset:i},'sequence-'+i));
  if(device==='inversion')line=[0,1,2,3].flatMap(i=>make({invert:i%2===1},'inversion-'+i));
  if(device==='diminution')line=[make({},'original-1'),make({factor:.5},'short-1'),make({factor:.5},'short-2'),make({},'original-2'),make({factor:.5},'short-3'),make({factor:.5},'short-4')].flat();
  if(device==='augmentation')line=[make({},'original-1'),make({factor:2},'long'),make({},'original-2')].flat();
  const bars=pack(line,m.meter);bars[0].events.find(e=>e.p).dynamic='mf';bars[0].caption='A';
  if(device==='augmentation'){bars[1].caption='A · doubled values';bars[3].caption='A';}
  if(device==='diminution'){bars[1].caption='A · halved values × 2';bars[3].caption='A · halved values × 2';}
  if(device==='inversion'){bars[1].caption='A · inverted';bars[3].caption='A · inverted';}
  return {source:phrase(a,'source'),bars};
 }
 const api={motifs,select,events,phrase,transform,pack,excerpt,study,duration};if(typeof module!=='undefined')module.exports=api;else root.L2Material=api;
})(typeof window!=='undefined'?window:globalThis);
