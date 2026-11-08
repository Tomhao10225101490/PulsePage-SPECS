// Coordinates one frame-driven transport, the passive view, and notation.
import {PulsePageTransport} from "./PulsePageTransport"
import {PulsePageControlsView} from "./PulsePageControlsView"
import {PulsePageNotation} from "./PulsePageNotation"
@component
export class PulsePageApp extends BaseScriptComponent {
 @input ui!:PulsePageControlsView
 @input score!:PulsePageNotation
 readonly transport=new PulsePageTransport()
 onAwake() {
  this.createEvent("OnStartEvent").bind(()=>{
   if(!this.ui||!this.score)throw new Error("PulsePage references are not wired")
   this.ui.onToggle.add(()=>this.transport.toggle())
   this.ui.onRestart.add(()=>this.transport.restart())
   this.ui.onTempo.add(()=>this.transport.cycleTempo())
   console.log("PulsePage ready · native import fix v2 · PulsePageTransport / ControlsView / Notation")
  })
  this.createEvent("UpdateEvent").bind(()=>{if(!this.ui||!this.score)return;this.transport.advance(getDeltaTime());const s=this.transport.snapshot();this.ui.render(s);this.score.render(s)})
 }
}