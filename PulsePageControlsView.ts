// Passive UIKit view. Owns layout and intent events; no transport decisions.
import {FlexLayout} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexLayout"
import {FlexItem} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexItem"
import {FlexAlign,FlexDirection,FlexJustify} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes"
import {BackPlate} from "SpectaclesUIKit.lspkg/Scripts/BackPlate"
import {Button} from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button"
import {ElementContent} from "SpectaclesUIKit.lspkg/Scripts/Components/Content/ElementContent"
import Event from "SpectaclesInteractionKit.lspkg/Utils/Event"
import {Snapshot} from "./PulsePageTransport"
const TYPE_SCALE={Title2:{size:93,weight:700},Body:{size:39,weight:500},Caption:{size:38,weight:500},Button:{size:39,weight:500}}
type Role=keyof typeof TYPE_SCALE
const FONT_SIZE_SCALE=1
function roleSize(role:Role){return TYPE_SCALE[role].size*FONT_SIZE_SCALE*100/110}
function applyTextRole(t:Text,role:Role){t.size=roleSize(role);(t as Text & {weight?:number}).weight=TYPE_SCALE[role].weight}
@component
export class PulsePageControlsView extends BaseScriptComponent {
 readonly onToggle=new Event<void>()
 readonly onRestart=new Event<void>()
 readonly onTempo=new Event<void>()
 private status!:Text
 private caption!:Text
 private playLabel!:ElementContent
 private tempoLabel!:ElementContent
 private tempoButton!:Button
 onAwake(){this.createEvent("OnStartEvent").bind(()=>this.build())}
 private obj(parent:SceneObject,name:string){const o=global.scene.createSceneObject(name);o.setParent(parent);return o}
 private layout(parent:SceneObject,w:number,h:number,dir:FlexDirection,gap:number) {
  const o=this.obj(parent,"Layout");o.getTransform().setLocalPosition(new vec3(0,0,.1))
  const f=o.createComponent(FlexLayout.getTypeName()) as FlexLayout
  f.autoDiscoverItemsOnStart=false
  f.onInitialized.add(()=>{f.width=w;f.height=h;f.direction=dir;f.justifyContent=FlexJustify.Center;f.alignItems=FlexAlign.Center;f.rowGap=gap;f.columnGap=gap})
  return o
 }
 private item(parent:SceneObject,w:number,h:number,name:string) {
  const o=this.obj(parent,name),i=o.createComponent(FlexItem.getTypeName()) as FlexItem
  i.overrideWidth=w;i.overrideHeight=h;i.flexShrink=0
  const f=parent.getComponent(FlexLayout.getTypeName()) as FlexLayout;f.addItems([i]);return o
 }
 private text(parent:SceneObject,w:number,h:number,value:string,role:Role) {
  const o=this.item(parent,w,h,value),t=o.createComponent("Component.Text") as Text
  o.getTransform().setLocalPosition(new vec3(0,0,.3));t.text=value;t.depthTest=true;applyTextRole(t,role)
  t.horizontalAlignment=HorizontalAlignment.Center;t.verticalAlignment=VerticalAlignment.Center
  t.horizontalOverflow=HorizontalOverflow.Overflow;t.verticalOverflow=VerticalOverflow.Overflow
  t.layoutRect=Rect.create(-w/2,w/2,-h/2,h/2);t.textFill.color=new vec4(.94,.97,.9,1);return t
 }
 private button(parent:SceneObject,name:string,w:number,label:string,action:()=>void) {
  const o=this.item(parent,w,6,name),b=o.createComponent(Button.getTypeName()) as Button
  b.setVariant({theme:"SnapOS2",shape:"Rectangle",style:"PrimaryNeutral"});b.size=new vec3(w,6,1)
  const ec=o.createComponent(ElementContent.getTypeName()) as ElementContent
  ec.text=label;ec.textSize=roleSize("Button");ec.autoResize=false
  b.initialize();b.onTriggerUp.add(action);return {b,ec}
 }
 private build() {
  this.sceneObject.createComponent("Component.Canvas")
  const plate=this.sceneObject.createComponent(BackPlate.getTypeName()) as BackPlate;plate.size=new vec2(44,40)
  const col=this.layout(this.sceneObject,42,38,FlexDirection.Column,.7)
  this.text(col,40,4,"PulsePage","Title2")
  this.text(col,40,2,"C major  ·  Treble  ·  4/4","Body")
  this.item(col,40,16,"Score space")
  this.status=this.text(col,40,3,"Start when you are ready","Body")
  const rowHost=this.item(col,40,6,"Controls"),row=this.layout(rowHost,40,6,FlexDirection.Row,1)
  this.playLabel=this.button(row,"PulsePage Start Pause",13,"Start",()=>this.onToggle.invoke()).ec
  this.button(row,"PulsePage Restart",12,"Restart",()=>this.onRestart.invoke())
  const tempo=this.button(row,"PulsePage Tempo",13,"80 BPM",()=>this.onTempo.invoke());this.tempoLabel=tempo.ec;this.tempoButton=tempo.b
  this.caption=this.text(col,41,3,"Built-in phrase · tempo guided · no grading","Caption")
 }
 render(s:Snapshot) {
  if(!this.status)return
  const active=s.phase==="playing"||s.phase==="count-in"
  this.playLabel.text=active?"Pause":s.phase==="paused"?"Resume":"Start"
  this.tempoLabel.text=active?"Pause to change":s.bpm+" BPM"
  this.status.text=s.phase==="count-in"?"Count in  ·  "+s.count+" / 4":s.phase==="playing"?"Bar "+s.bar+" / 4  ·  Beat "+(s.beat+1):s.phase==="paused"?"Paused  ·  position held":s.phase==="finished"?"Phrase complete  ·  Restart to practise again":"Start when you are ready"
  this.caption.text=active?"Follow the amber note":s.phase==="finished"?"Practice complete · no performance grading":"Built-in phrase · tempo guided · no grading"
 }
}