const {test}=require('node:test');const assert=require('node:assert/strict');const T=require('../theory.js'),B=require('../question-bank.js'),V=require('../validator.js');
test('independent enharmonic interval fixtures',()=>{
 for(const [a,b,answer] of [['C4','E4','major 3'],['C4','Eb4','minor 3'],['F4','B4','augmented 4'],['B3','F4','diminished 5'],['C4','C5','perfect 8'],['Eb4','C5','major 6'],['A3','F4','minor 6']])assert.equal(T.interval(a,b).name,answer);
 assert.notEqual(T.interval('F4','B4').name,T.interval('F4','Cb5').name);
});
test('instrument direction and exact spelling fixtures',()=>{
 assert.equal(T.transpose('C4',1,2),'D4');assert.equal(T.transpose('F4',1,2),'G4');assert.equal(T.transpose('G#4',1,2),'A#4');assert.equal(T.transpose('Eb4',5,9),'C5');assert.equal(T.transpose('C5',-5,-9),'Eb4');assert.equal(T.transpose('C4',4,7),'G4');assert.equal(T.transpose('G4',-4,-7),'C4');
});
test('durations and fret positions are independently checkable',()=>{
 assert.equal(T.beats({d:'qd'}),1.5);assert.equal(T.beats({d:'hd'}),3);assert.equal(T.beats({d:'w'}),4);assert.equal(T.beats({d:'8'}),.5);
 assert.equal(T.tabPitch({str:4,fret:3},'bass'),31);assert.equal(T.tabPitch({str:1,fret:0},'guitar'),64);assert.equal(T.toTab('E1','bass').str,4);
});
test('all templates validate over 100 seeds, including zero',()=>{
 assert.equal(B.templates.length,48);for(const t of B.templates)for(let seed=0;seed<100;seed++)assert.deepEqual(V.validate(B.generate(t.id,seed)),[],t.id+' seed '+seed);
});
test('seed recreates full question and models',()=>{for(const t of B.templates)assert.deepEqual(B.generate(t.id,91276),B.generate(t.id,91276));});
test('validator catches musical corruption',()=>{
 const q=B.generate('transpose-eb-concert',22);q.model.staves[0].bars[0].events[1].p=['C7'];assert(V.validate(q).includes('Transposition spelling mismatch'));
 const tab=B.generate('tab-bass-to-tab',9);tab.model.staves[0].bars[0].events[1].positions[0].fret++;assert(V.validate(tab).includes('TAB pitch mismatch'));
 const c=B.generate('complete-quartet',3);c.model.staves[3].bars[1].events[0].p=['C1'];assert(V.validate(c).includes('Model bass mismatch'));
});
test('diatonic third completion and octave-preserving clef change',()=>{
 const q=B.generate('third-below',42);q.model.staves[0].bars.forEach((b,bi)=>b.events.forEach((e,i)=>{const lower=q.model.staves[1].bars[bi].events[i];assert.equal(e.d,lower.d);if(e.p)assert.equal(T.interval(lower.p[0],e.p[0]).quantity,3);else assert(lower.rest);}));
 const c=B.generate('clef-bass-vocal-tenor',42);assert.deepEqual(c.score.staves[0].bars,c.model.staves[0].bars);
});
const M=require('../musical-material.js');
function heard(es){const output=[];let tied=false;for(const e of es){const pitches=e.p?.join('+')||'rest',beats=T.beats(e),prev=output.at(-1);if(prev&&prev.pitches===pitches&&(tied||pitches==='rest'))prev.beats+=beats;else output.push({pitches,beats});tied=Boolean(e.tieNext);}return output;}
test('all 16 authored rhythmic shapes fill their own metre and have variety',()=>{
 assert.equal(M.motifs.length,16);const meters=new Set(),rhythms=new Set();for(const m of M.motifs){meters.add(m.meter);rhythms.add(m.meter+':'+m.notes.map(n=>n[1]+(n[0]===null?'r':'')).join(','));const [n,d]=m.meter.split('/').map(Number);assert.equal(m.notes.reduce((s,n)=>s+T.beats({d:n[1]}),0),n*4/d,m.id);assert(new Set(m.notes.map(n=>n[1])).size>=2||m.id==='compound-wave');}assert.equal(meters.size,3);assert.equal(rhythms.size,16);
});
test('augmentation and diminution preserve every pitch and scale note/rest lengths exactly',()=>{
 const k={tonic:'C4',sig:'C'};for(const m of M.motifs)for(const device of ['augmentation','diminution']){const result=M.study(k,m,device),original=heard(result.source),scaled=factor=>original.map(e=>({...e,beats:e.beats*factor}));const expected=(device==='augmentation'?[original,scaled(2),original]:[original,scaled(.5),scaled(.5),original,scaled(.5),scaled(.5)]).flat();assert.deepEqual(heard(result.bars.flatMap(b=>b.events)),expected,m.id+' '+device);assert.equal(result.bars.length,4);}
});
test('sequence retains rhythm; inversion reflects intervals about its own first pitch',()=>{
 const k={tonic:'C4',sig:'C'};for(const m of M.motifs){const src=M.events(k,m),inv=M.transform(src,{k,invert:true}),seq=M.transform(src,{k,offset:2}),axis=T.parse(src.find(e=>e.p).p[0]).step;src.forEach((e,i)=>{assert.equal(e.d,inv[i].d);assert.equal(e.d,seq[i].d);assert.equal(Boolean(e.rest),Boolean(inv[i].rest));if(e.p){assert.equal(T.parse(inv[i].p[0]).step+T.parse(e.p[0]).step,2*axis);assert.equal(T.parse(seq[i].p[0]).step-T.parse(e.p[0]).step,2);}});}
});
test('seeded motif practice changes rhythmic material and metre, not only the key',()=>{
 const shapes=new Set(),meters=new Set();for(let seed=0;seed<200;seed++){const q=B.generate('compose-augmentation',seed);shapes.add(q.motifStudy.catalogueId);meters.add(q.motifStudy.meter);assert.equal(q.score.staves[0].bars.length,4);assert.equal(q.model.staves[0].bars.length,4);}assert.equal(shapes.size,16);assert.equal(meters.size,3);
});
test('broken or dangling ties and slurs are rejected',()=>{
 const q=B.generate('compose-augmentation',42);q.model.staves[0].bars[0].events[0].tieNext=true;assert(V.validate(q).includes('Tie must continue to the same spelled pitches'));const s=B.generate('compose-ostinato',42);s.model.staves[0].bars[0].events[0].slurStart='never-ended';assert(V.validate(s).includes('Unfinished slur'));
});
