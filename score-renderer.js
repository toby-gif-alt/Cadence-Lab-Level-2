(function(){
 'use strict';
 const T=window.L2Theory;
 function render(target,score){
  target.replaceChildren();if(!score)return;const VF=window.Vex.Flow;
  const densest=Math.max(1,...score.staves.flatMap(s=>s.bars.map(b=>b.events.length)));
  const width=Math.max(320,Math.min(1100,target.clientWidth||850),densest*19+120);
  const count=score.staves[0].bars.length,per=width<600?1:score.preferredBarsPerSystem===4&&width>=900&&densest<=8?4:2;
  const sideLabels=score.staves.length>1&&width>=600,left=sideLabels?108:12;
  const references=score.staves.map(()=>[]);
  for(let start=0;start<count;start+=per){
   const container=document.createElement('div');container.className='score-system';container.style.minWidth=width+'px';target.append(container);
   const n=Math.min(per,count-start),columns=Array.from({length:n},()=>[]),staveColumns=Array.from({length:n},()=>[]);
   // Keep related parts together, reserving extra room only for lyrics or TAB.
   const staffYs=[];let nextY=60;
   score.staves.forEach(st=>{staffYs.push(nextY);const lyrics=st.bars.slice(start,start+n).some(b=>b.events.some(e=>e.lyric));nextY+=st.clef==='tab'?(st.instrument==='bass'?155:175):sideLabels?(lyrics?130:105):lyrics?155:135;});
   const h=staffYs.at(-1)+(score.staves.at(-1).clef==='tab'?165:140);
   const renderer=new VF.Renderer(container,VF.Renderer.Backends.SVG);renderer.resize(width,h);const ctx=renderer.getContext();ctx.setFont('Arial',12);
   score.staves.forEach((staff,si)=>{
    const y=staffYs[si];if(sideLabels){const words=staff.label.split(' '),lines=[];let line='';words.forEach(word=>{if((line+' '+word).trim().length>13&&line){lines.push(line);line=word;}else line=(line+' '+word).trim();});if(line)lines.push(line);lines.forEach((text,i)=>ctx.fillText(text,8,y+60+(i-(lines.length-1)/2)*14));}else ctx.fillText(staff.label,12,y-22);
    if(staff.text&&start===0)ctx.fillText(staff.text,left,y-8);
    const tab=staff.clef==='tab',clef=staff.clef==='vocal-tenor'?'treble':staff.clef;
    for(let j=0;j<n;j++){
     const bi=start+j,bar=staff.bars[bi],x=left+j*(width-left-12)/n,w=(width-left-12)/n;
     const stave=tab?new VF.TabStave(x,y,w,{num_lines:staff.instrument==='bass'?4:6}):new VF.Stave(x,y,w);
     if(j===0){stave.addClef(tab?'tab':clef,undefined,staff.clef==='vocal-tenor'||staff.octave===-1?'8vb':undefined);if(!tab&&staff.key)stave.addKeySignature(staff.key);}
     const prev=staff.bars[bi-1];if(!bar.hideMeter&&(bi===0||bar.meter!==prev?.meter))stave.addTimeSignature(bar.meter);
     stave.setContext(ctx).draw();staveColumns[j].push(stave);if(si===0&&!bar.events.some(e=>e.label))ctx.fillText(String(bi+1),x+5,y+12);if(bar.text)ctx.fillText(bar.text,x+40,y+12);if(bar.caption)ctx.fillText(bar.caption,x+40,y+12);
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
      if(e.dynamic)note.addModifier(new VF.Annotation(e.dynamic).setFont('Times New Roman',15,'italic').setVerticalJustification(VF.Annotation.VerticalJustify.BOTTOM),0);
      references[si].push({event:e,note,ctx,system:start});
      return note;
     });
     if(!notes.length)continue;
     const [num,den]=bar.meter.split('/').map(Number);
     // Attach beams before formatting and drawing: VexFlow then suppresses the
     // flags and lets the beam determine consistent stem directions/lengths.
     const beams=tab?[]:VF.Beam.generateBeams(notes,{groups:den===8?[new VF.Fraction(3,8)]:[new VF.Fraction(1,4)]});
     const voice=new VF.Voice({num_beats:num,beat_value:den}).setStrict(false).addTickables(notes);
     columns[j].push({voice,stave,notes,beams});
    }
   });
   columns.forEach(column=>{if(!column.length)return;const begin=Math.max(...column.map(c=>c.stave.getNoteStartX())),end=Math.min(...column.map(c=>c.stave.getNoteEndX()));const formatter=new VF.Formatter();column.forEach(c=>{c.stave.setNoteStartX(begin);formatter.joinVoices([c.voice]);});formatter.format(column.map(c=>c.voice),Math.max(80,end-begin-20));column.forEach(c=>{c.voice.draw(ctx,c.stave);c.beams.forEach(b=>b.setContext(ctx).draw());});});
   if(score.staves.length>1)staveColumns.forEach((staves,j)=>{ctx.openGroup('staveconnector');new VF.StaveConnector(staves[0],staves.at(-1)).setType(VF.StaveConnector.type.SINGLE_LEFT).setContext(ctx).draw();if(j===0)new VF.StaveConnector(staves[0],staves.at(-1)).setType(score.staves.every(s=>s.label.startsWith('Piano'))||(score.staves.length===2&&score.staves[0].label==='Right hand'&&score.staves[1].label==='Left hand')?VF.StaveConnector.type.BRACE:VF.StaveConnector.type.BRACKET).setContext(ctx).draw();ctx.closeGroup();});
   const svg=container.querySelector('svg');svg.setAttribute('viewBox',`0 0 ${width} ${h}`);svg.setAttribute('role','img');svg.setAttribute('aria-label',score.staves.map(s=>s.label).join(', '));
  }
  references.forEach(staff=>{
   const slurs=new Map();
   const draw=(kind,first,last)=>{
    if(!first||!last)return;
    const segment=(a,b,ctx)=>{ctx.openGroup(kind);if(kind==='tie'){const indices=(a||b).event.p.map((_,i)=>i);new VF.StaveTie({first_note:a?.note||null,last_note:b?.note||null,first_indices:indices,last_indices:indices}).setContext(ctx).draw();}else new VF.Curve(a?.note||null,b?.note||null,{thickness:1.2,y_shift:6,cps:[{x:0,y:8},{x:0,y:8}]}).setContext(ctx).draw();ctx.closeGroup();};
    if(first.system===last.system)segment(first,last,first.ctx);else{segment(first,null,first.ctx);segment(null,last,last.ctx);}
   };
   staff.forEach((ref,i)=>{const e=ref.event;if(e.tieNext)draw('tie',ref,staff[i+1]);if(e.slurStart)slurs.set(e.slurStart,ref);if(e.slurEnd){draw('phrase-slur',slurs.get(e.slurEnd),ref);slurs.delete(e.slurEnd);}});
  });
 }
 function signature(key){const map={};const major=String(key||'C');const sharp={G:1,D:2,A:3,E:4,B:5,'F#':6,'C#':7,Em:1,Bm:2,'F#m':3,'C#m':4,'G#m':5,'D#m':6};const flat={F:1,Bb:2,Eb:3,Ab:4,Db:5,Gb:6,Cb:7,Dm:1,Gm:2,Cm:3,Fm:4,Bbm:5,Ebm:6};'FCGDAEB'.slice(0,sharp[major]||0).split('').forEach(l=>map[l]='#');'BEADGCF'.slice(0,flat[major]||0).split('').forEach(l=>map[l]='b');return map;}
 window.L2Renderer={render,signature};
})();
