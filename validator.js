(function(root){
 'use strict';const T=typeof module!=='undefined'?require('./theory.js'):root.L2Theory;
 function validate(q){const errors=[];
  if(!q.tasks.length||!q.answer.length||q.checks.length!==3)errors.push('Incomplete teaching contract');
  if(!q.source.length)errors.push('Missing provenance');
  for(const [name,s] of [['question',q.score],['model',q.model],['writing',q.writingScore]]){if(!s)continue;const count=s.staves[0].bars.length;
   s.staves.forEach(st=>{if(st.bars.length!==count)errors.push('Misaligned staves');st.bars.forEach((b,i)=>{
    const [n,d]=b.meter.split('/').map(Number),expected=n*4/d,total=b.events.reduce((a,e)=>a+T.beats(e),0);
    if(!st.blank&&!b.blank&&Math.abs(expected-total)>1e-8)errors.push(`${name} ${st.label} bar ${i+1}: ${total} beats, expected ${expected}`);
    b.events.forEach(e=>{if(e.p)e.p.forEach(p=>{try{T.parse(p);}catch(err){errors.push(err.message);}});if(e.positions)e.positions.forEach((pos,pi)=>{if(T.tabPitch(pos,st.instrument)!==T.parse(e.p[pi]).midi)errors.push('TAB pitch mismatch');});});
   });
   const events=st.bars.flatMap(b=>b.events),slurs=new Set();
   events.forEach((e,i)=>{if(e.tieNext&&(!e.p||!events[i+1]?.p||JSON.stringify(e.p)!==JSON.stringify(events[i+1].p)))errors.push('Tie must continue to the same spelled pitches');if(e.slurStart){if(slurs.has(e.slurStart))errors.push('Duplicate open slur');slurs.add(e.slurStart);}if(e.slurEnd){if(!slurs.has(e.slurEnd))errors.push('Slur ends without a start');slurs.delete(e.slurEnd);}});
   if(slurs.size)errors.push('Unfinished slur');
   });
  }
  if(q.transposition){const a=q.score.staves[0],b=q.model.staves[0];a.bars.forEach((bar,bi)=>bar.events.forEach((e,ei)=>{const m=b.bars[bi].events[ei];if(e.d!==m.d||Boolean(e.rest)!==Boolean(m.rest)||e.art!==m.art)errors.push('Transposition changed rhythm/articulation');if(e.p)e.p.forEach((p,pi)=>{if(T.transpose(p,q.transposition.steps,q.transposition.semitones)!==m.p[pi])errors.push('Transposition spelling mismatch');});}));}
  if(q.completionEvidence){q.completionEvidence.chords.forEach((ch,i)=>{const modelPitches=q.model.staves.flatMap(st=>st.bars[i].events.flatMap(e=>e.p||[]));const pcs=new Set(modelPitches.map(p=>((T.parse(p).midi%12)+12)%12));if(ch.some(p=>!pcs.has(T.parse(p).midi%12)))errors.push('Model omits defining chord tone');const bassStaff=q.model.staves.at(-1),lowest=Math.min(...bassStaff.bars[i].events.flatMap(e=>e.p||[]).map(p=>T.parse(p).midi));if(lowest!==T.parse(q.completionEvidence.bass[i]).midi)errors.push('Model bass mismatch');});}
  return errors;
 }
 const api={validate};if(typeof module!=='undefined')module.exports=api;else root.L2Validator=api;
})(typeof window!=='undefined'?window:globalThis);
