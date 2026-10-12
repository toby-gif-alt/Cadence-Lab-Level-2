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
 const q=B.generate('third-below',42);q.model.staves[0].bars.forEach((b,bi)=>b.events.forEach((e,i)=>assert.equal(T.interval(q.model.staves[1].bars[bi].events[i].p[0],e.p[0]).quantity,3)));
 const c=B.generate('clef-bass-vocal-tenor',42);assert.deepEqual(c.score.staves[0].bars,c.model.staves[0].bars);
});
