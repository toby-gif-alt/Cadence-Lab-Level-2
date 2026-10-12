(function(){
 'use strict';let ctx=null,nodes=[];
 function timeline(score){const result=[];score.staves.forEach(st=>{let time=0;st.bars.forEach(b=>{let at=time;b.events.forEach(e=>{const duration=L2Theory.beats(e);if(!st.blank&&!b.blank&&e.p&&!e.rest)e.p.forEach(p=>result.push({midi:L2Theory.parse(p).midi,at,duration}));at+=duration;});const [n,d]=b.meter.split('/').map(Number);time+=n*4/d;});});return result;}
 function stop(){nodes.forEach(n=>{try{n.stop();}catch{}});nodes=[];}
 async function play(score,bpm){stop();ctx??=new (window.AudioContext||window.webkitAudioContext)();await ctx.resume();const unit=60/bpm,origin=ctx.currentTime+.06;timeline(score).forEach(e=>{const o=ctx.createOscillator(),gain=ctx.createGain(),start=origin+e.at*unit,end=start+e.duration*unit;o.type='triangle';o.frequency.value=440*Math.pow(2,(e.midi-69)/12);gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(.035,start+.012);gain.gain.setValueAtTime(.035,Math.max(start+.012,end-.035));gain.gain.linearRampToValueAtTime(0,end);o.connect(gain);gain.connect(ctx.destination);o.start(start);o.stop(end+.01);nodes.push(o);});}
 window.L2Playback={timeline,play,stop};
})();
