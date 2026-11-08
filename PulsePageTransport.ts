// Owns musical data and transport. Pure logic: no Lens, UI, clocks, or timers.
export const PHRASE = [
 {step:0,duration:1,start:0},{step:2,duration:1,start:1},{step:4,duration:1,start:2},{step:5,duration:1,start:3},
 {step:4,duration:2,start:4},{step:3,duration:1,start:6},{step:2,duration:1,start:7},
 {step:1,duration:.5,start:8},{step:2,duration:.5,start:8.5},{step:3,duration:1,start:9},{step:4,duration:1,start:10},{step:6,duration:1,start:11},
 {step:5,duration:1,start:12},{step:4,duration:1,start:13},{step:0,duration:2,start:14}
]
export type Phase = "ready"|"count-in"|"playing"|"paused"|"finished"
export type Snapshot = {phase:Phase,bpm:number,beat:number,bar:number,note:number,position:number,count:number}
export class PulsePageTransport {
 phase:Phase="ready"
 bpm=80
 position=-4
 private held:Phase="count-in"
 toggle() {
  if(this.phase==="finished")return
  if(this.phase==="playing"||this.phase==="count-in"){this.held=this.phase;this.phase="paused"}
  else {this.phase=this.phase==="ready"?"count-in":this.held}
 }
 restart(){this.position=-4;this.phase="ready";this.held="count-in"}
 cycleTempo(){if(this.phase==="ready"||this.phase==="paused"||this.phase==="finished")this.bpm=this.bpm===60?80:this.bpm===80?100:60}
 advance(seconds:number) {
  if(!Number.isFinite(seconds)||seconds<0)throw new Error("Invalid elapsed seconds")
  if(this.phase!=="playing"&&this.phase!=="count-in")return
  this.position=Math.min(16,this.position+seconds*this.bpm/60)
  const halfBeat=Math.round(this.position*2)/2
  if(Math.abs(this.position-halfBeat)<1e-9)this.position=halfBeat
  if(this.position>=16){this.phase="finished";return}
  this.phase=this.position<0?"count-in":"playing"
 }
 snapshot():Snapshot {
  const p=Math.max(0,Math.min(this.position,15.999999))
  let note=0;for(let i=0;i<PHRASE.length;i++)if(p>=PHRASE[i].start)note=i
  return {phase:this.phase,bpm:this.bpm,beat:((Math.floor(this.position)%4)+4)%4,bar:Math.min(4,Math.floor(p/4)+1),note,position:this.position,count:Math.min(4,Math.floor(this.position+4)+1)}
 }
}