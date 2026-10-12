(function(){
 'use strict';
 const T=window.L2Theory;
 function render(target,score){
  target.replaceChildren();if(!score)return;const VF=window.Vex.Flow;
  const width=Math.max(320,Math.min(1100,target.clientWidth||850));
  const count=score.staves[0].bars.length,per=width<600?1:2;
  for(let start=0;start<count;start+=per){
   const container=document.createElement('div');container.className='score-system';target.append(container);
   const n=Math.min(per,count-start),h=score.staves.length*185+45,columns=Array.from({length:n},()=>[]);
   const renderer=new VF.Renderer(container,VF.Renderer.Backends.SVG);renderer.resize(width,h);const ctx=renderer.getContext();ctx.setFont('Arial',12);
   score.staves.forEach((staff,si)=>{
    const y=60+si*185;ctx.fillText(staff.label,12,y-38);
    if(staff.text&&start===0)ctx.fillText(staff.text,12,y+(staff.clef==='tab'?128:107));
    const tab=staff.clef==='tab',clef=staff.clef==='vocal-tenor'?'treble':staff.clef;
    for(let j=0;j<n;j++){
     const bi=start+j,bar=staff.bars[bi],x=12+j*(width-24)/n,w=(width-24)/n;
     const stave=tab?new VF.TabStave(x,y,w,{num_lines:staff.instrument==='bass'?4:6}):new VF.Stave(x,y,w);
     if(j===0){stave.addClef(tab?'tab':clef,undefined,staff.clef==='vocal-tenor'||staff.octave===-1?'8vb':undefined);if(!tab&&staff.key)stave.addKeySignature(staff.key);}
     const prev=staff.bars[bi-1];if(!bar.hideMeter&&(bi===0||j===0||bar.meter!==prev?.meter))stave.addTimeSignature(bar.meter);
     stave.setContext(ctx).draw();ctx.fillText(String(bi+1),x+5,y-18);if(bar.text)ctx.fillText(bar.text,x+40,y-18);
     if(staff.blank||bar.blank){
      // Supplied chord labels remain visible over an empty writing stave.
      bar.events.forEach((e,ei)=>{if(e.label)ctx.fillText(e.label,x+80+ei*(w-100)/Math.max(1,bar.events.length),y-16);});continue;
     }
     const state={};const keyNotes=signature(staff.key);const notes=bar.events.map(e=>{
      let note;
      const display=(e.p||[]).map(p=>staff.clef==='vocal-tenor'||staff.octave===-1?T.transpose(p,7,12):p);
      if(tab){
       note=e.rest?new VF.StaveNote({clef:'treble',keys:['b/4'],duration:e.d.replace(/d/g,'')+'r'}):new VF.TabNote({positions:e.positions,duration:e.d.replace(/d/g,'')},true);
       if(!e.rest){note.render_options.draw_stem=true;note.render_options.draw_dots=true;}
      }else{
       const duration=e.d.replace(/d/g,'')+(e.rest?'r':'');
       note=new VF.StaveNote({clef,keys:e.rest?[clef==='bass'?'d/3':clef==='alto'?'c/4':clef==='tenor'?'a/3':'b/4']:display.map(p=>{const a=T.parse(p);return a.letter.toLowerCase()+a.acc+'/'+a.oct;}),duration,auto_stem:true});
       if(!e.rest)display.forEach((p,pi)=>{const a=T.parse(p),id=a.letter+a.oct,prior=state[id]??keyNotes[a.letter]??'';if(a.acc!==prior){note.addModifier(new VF.Accidental(a.acc||'n'),pi);state[id]=a.acc;}});
      }
      const dots=(e.d.match(/d/g)||[]).length;if(dots){for(let d=0;d<dots;d++)VF.Dot.buildAndAttach([note],{all:true});}
      if(e.art&&!e.rest)note.addModifier(new VF.Articulation(e.art).setPosition(VF.Modifier.Position.ABOVE),0);
      if(e.label)note.addModifier(new VF.Annotation(e.label).setFont('Arial',12,'bold').setVerticalJustification(VF.Annotation.VerticalJustify.TOP),0);
      if(e.lyric)note.addModifier(new VF.Annotation(e.lyric).setFont('Arial',11).setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM),0);
      return note;
     });
     if(!notes.length)continue;
     const [num,den]=bar.meter.split('/').map(Number);const voice=new VF.Voice({num_beats:num,beat_value:den}).setStrict(false).addTickables(notes);
     columns[j].push({voice,stave,notes,tab,den});
    }
   });
   columns.forEach(column=>{if(!column.length)return;const begin=Math.max(...column.map(c=>c.stave.getNoteStartX())),end=Math.min(...column.map(c=>c.stave.getNoteEndX()));const formatter=new VF.Formatter();column.forEach(c=>{c.stave.setNoteStartX(begin);formatter.joinVoices([c.voice]);});formatter.format(column.map(c=>c.voice),Math.max(80,end-begin-20));column.forEach(c=>{c.voice.draw(ctx,c.stave);if(!c.tab)VF.Beam.generateBeams(c.notes,{groups:c.den===8?[new VF.Fraction(3,8)]:[new VF.Fraction(1,4)]}).forEach(b=>b.setContext(ctx).draw());});});
   const svg=container.querySelector('svg');svg.setAttribute('viewBox',`0 0 ${width} ${h}`);svg.setAttribute('role','img');svg.setAttribute('aria-label',score.staves.map(s=>s.label).join(', '));
  }
 }
 function signature(key){const map={};const major=String(key||'C');const sharp={G:1,D:2,A:3,E:4,B:5,'F#':6,'C#':7,Em:1,Bm:2,'F#m':3,'C#m':4,'G#m':5,'D#m':6};const flat={F:1,Bb:2,Eb:3,Ab:4,Db:5,Gb:6,Cb:7,Dm:1,Gm:2,Cm:3,Fm:4,Bbm:5,Ebm:6};'FCGDAEB'.slice(0,sharp[major]||0).split('').forEach(l=>map[l]='#');'BEADGCF'.slice(0,flat[major]||0).split('').forEach(l=>map[l]='b');return map;}
 window.L2Renderer={render,signature};
})();
