(function(){
 'use strict';const $=id=>document.getElementById(id),B=L2Bank;let current,revealed=false,cycle=[];
 Object.entries(B.families).forEach(([id,title])=>$('family').add(new Option(title,id)));
 function available(){return B.templates.filter(t=>($('family').value==='all'||t.family===$('family').value)&&($('year').value==='all'||t.source.some(s=>String(s.year)===$('year').value)));}
 function setup(){const familyList=B.templates.filter(t=>$('family').value==='all'||t.family===$('family').value);[...$('year').options].forEach(o=>o.disabled=o.value!=='all'&&!familyList.some(t=>t.source.some(s=>String(s.year)===o.value)));if($('year').selectedOptions[0].disabled)$('year').value='all';const list=available();$('template').replaceChildren();list.forEach(t=>$('template').add(new Option(t.title,t.id)));$('count').textContent=`${list.length} exercises in this selection · ${B.templates.length} templates overall`;cycle=[];}
 function seed(){return crypto.getRandomValues(new Uint32Array(1))[0];}
 function load(id,n){L2Playback.stop();current=B.generate(id,n);revealed=false;const errors=L2Validator.validate(current);if(errors.length)throw Error(errors.join('; '));
  $('family-label').textContent=B.families[current.family];$('title').textContent=current.title;$('variant').textContent='L2-'+n.toString(36).toUpperCase();$('context').textContent=current.context;
  $('provenance').textContent='Original generated practice · informed by '+current.source.map(s=>`${s.year} ${s.part}`).join(' · ');
  $('tasks').replaceChildren(...current.tasks.map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));
  $('fields').replaceChildren(...current.fields.map((f,i)=>{const wrap=document.createElement('div'),label=document.createElement('label'),input=document.createElement('input');label.htmlFor='answer-'+i;label.textContent=f.label;input.id='answer-'+i;input.autocomplete='off';input.placeholder='Your answer';input.addEventListener('input',save);wrap.append(label,input);return wrap;}));
  $('notes').value='';$('model').hidden=true;$('play-model').disabled=true;$('reveal').disabled=false;$('status').textContent=current.kind==='paper'?'Write notation on paper or print the question before comparing.':'Type your answers or work on paper, then compare.';
  $('model-score').replaceChildren();$('answer').replaceChildren();$('comparison').replaceChildren();$('checks').replaceChildren();render();
  try{const saved=JSON.parse(localStorage.getItem('l2-draft-'+current.id)||'null');if(saved){$('notes').value=saved.notes||'';current.fields.forEach((f,i)=>$('answer-'+i).value=saved.fields[i]||'');}}catch{}
  const url=new URL(location.href);url.searchParams.set('exercise',id);url.searchParams.set('seed',n);history.replaceState(null,'',url);$('template').value=id;
 }
 function save(){if(!current)return;try{localStorage.setItem('l2-draft-'+current.id,JSON.stringify({notes:$('notes').value,fields:current.fields.map((f,i)=>$('answer-'+i).value)}));}catch{}}
 function render(){L2Renderer.render($('score'),current.score);L2Renderer.render($('writing-score'),current.writingScore);if(revealed)L2Renderer.render($('model-score'),current.model);}
 function next(){const list=available();if(!cycle.length)cycle=list.map(t=>t.id).sort(()=>.5-Math.random());const id=cycle.pop();load(id,seed());}
 function normal(v){return v.trim().replace(/♭/g,'b').replace(/♯/g,'#').replace(/\b(?:rd|th|nd|st)\b/g,'').replace(/(\d)(st|nd|rd|th)/g,'$1').replace(/\s/g,'').replace(/octave|8ve/gi,'8');}
 function reveal(){save();revealed=true;$('model').hidden=false;$('reveal').disabled=true;$('play-model').disabled=!current.model;L2Playback.stop();
  const snapshots=current.fields.map((f,i)=>({label:f.label,value:$('answer-'+i).value,model:f.answer,match:[f.answer,...(f.aliases||[])].some(a=>current.family==='harmony'&&current.templateId==='harmony-roman'?normal(a)===normal($('answer-'+i).value):normal(a).toLowerCase()===normal($('answer-'+i).value).toLowerCase())}));
  snapshots.forEach(s=>{const p=document.createElement('p');p.textContent=`${s.label} — your answer: ${s.value||'(on paper / blank)'} · model: ${s.model}${s.value?(s.match?' · text matches':' · compare the musical evidence'):''}`;$('comparison').append(p);});
  $('answer').replaceChildren(...current.answer.map(a=>{const li=document.createElement('li');li.textContent=a;return li;}));
  const names=['Achievement direction','Merit direction','Excellence direction'];current.checks.forEach((c,i)=>{const label=document.createElement('label'),input=document.createElement('input'),span=document.createElement('span'),strong=document.createElement('strong');input.type='checkbox';strong.textContent=names[i];span.append(strong,document.createTextNode(c));label.append(input,span);$('checks').append(label);});
  L2Renderer.render($('model-score'),current.model);$('status').textContent='Compare your own notation and explanation. Text matching is a convenience check; alternative valid answers require self-assessment.';
 }
 function print(kind){if(kind==='model'&&!revealed)return;document.body.dataset.print=kind;window.print();}
 $('family').onchange=()=>{setup();next();};$('year').onchange=()=>{setup();next();};$('template').onchange=()=>load($('template').value,seed());$('new').onclick=next;$('reveal').onclick=reveal;$('notes').addEventListener('input',save);$('print-question').onclick=()=>print('question');$('print-model').onclick=()=>print('model');
 $('copy-link').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);$('status').textContent='Link copied. It recreates this exact question and score.';}catch{$('status').textContent='Copy this URL from your browser address bar to share the question.';}};
 async function play(which){const bpm=Math.max(40,Math.min(160,Number($('tempo').value)||96));$('tempo').value=bpm;try{await L2Playback.play(which==='model'?current.model:current.score,bpm);$('status').textContent=which==='model'?'Playing model notation.':'Playing only the supplied notation.';}catch(e){$('status').textContent='Audio could not start: '+e.message;}}
 $('play-question').onclick=()=>play('question');$('play-model').onclick=()=>{if(revealed&&current.model)play('model');};$('stop').onclick=()=>{L2Playback.stop();$('status').textContent='Playback stopped.';};window.addEventListener('resize',()=>{L2Playback.stop();render();});window.addEventListener('afterprint',()=>delete document.body.dataset.print);
 setup();const params=new URLSearchParams(location.search),id=params.get('exercise'),n=params.get('seed');if(B.templates.some(t=>t.id===id)&&/^\d+$/.test(n||'')&&Number(n)<=4294967295)load(id,Number(n));else load('transpose-bb-written',seed());
 window.L2App={load,reveal,get question(){return current;},get revealed(){return revealed;}};
})();
