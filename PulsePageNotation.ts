// Owns animated score geometry; material input only. No UI or timing decisions.
import {PHRASE, Snapshot} from "./PulsePageTransport"
@component
export class PulsePageNotation extends BaseScriptComponent {
 @input material!: Material
 @input ink: vec4 = new vec4(0.93,0.96,0.86,1)
 @input accent: vec4 = new vec4(1,0.63,0.19,1)
 private heads: RenderMeshVisual[] = []
 private beats: SceneObject[] = []
 private cursor!: SceneObject
 private ready = false
 onAwake() { this.createEvent("OnStartEvent").bind(()=>this.build()) }
 private shape(name:string, points:number[][], color:vec4): RenderMeshVisual {
  const o=global.scene.createSceneObject(name);o.setParent(this.sceneObject)
  const b=new MeshBuilder([{name:"position",components:3},{name:"color",components:4}])
  b.topology=MeshTopology.Triangles;b.indexType=MeshIndexType.UInt16
  const v:number[]=[];for(const p of points)v.push(p[0],p[1],p[2]||0,color.x,color.y,color.z,color.w)
  b.appendVerticesInterleaved(v);const indices:number[]=[]
  for(let i=1;i<points.length-1;i++)indices.push(0,i,i+1)
  b.appendIndices(indices);b.updateMesh()
  const r=o.createComponent("Component.RenderMeshVisual") as RenderMeshVisual
  r.mesh=b.getMesh();r.mainMaterial=this.material;return r
 }
 private rect(name:string,x:number,y:number,w:number,h:number,c:vec4) {
  return this.shape(name,[[x-w/2,y-h/2,0],[x+w/2,y-h/2,0],[x+w/2,y+h/2,0],[x-w/2,y+h/2,0]],c)
 }
 private oval(name:string,x:number,y:number,rx:number,ry:number,c:vec4, hollow=false) {
  const pts:number[][]=[];for(let i=0;i<32;i++){const a=i*Math.PI/16;pts.push([x+Math.cos(a)*rx,y+Math.sin(a)*ry+Math.cos(a)*.12,.03])}
  if(!hollow)return this.shape(name,pts,c)
  // Ring triangles preserve the open half-note head.
  const o=global.scene.createSceneObject(name);o.setParent(this.sceneObject)
  const b=new MeshBuilder([{name:"position",components:3},{name:"color",components:4}]);b.indexType=MeshIndexType.UInt16
  const v:number[]=[],idx:number[]=[]
  for(let i=0;i<32;i++){const a=i*Math.PI/16;for(const k of [1,.57])v.push(x+Math.cos(a)*rx*k,y+(Math.sin(a)*ry+Math.cos(a)*.12)*k,.03,c.x,c.y,c.z,c.w)}
  for(let i=0;i<32;i++){const n=(i+1)%32;idx.push(i*2,n*2,n*2+1,i*2,n*2+1,i*2+1)}
  b.appendVerticesInterleaved(v);b.appendIndices(idx);b.updateMesh();const r=o.createComponent("Component.RenderMeshVisual") as RenderMeshVisual;r.mesh=b.getMesh();r.mainMaterial=this.material;return r
 }
 private notePos(i:number) {const n=PHRASE[i],bar=Math.floor(n.start/4),row=Math.floor(bar/2);return new vec2(-14+(bar%2)*19+(n.start%4)*3.6,3-row*10+(n.step-2)*.46)}
 private build() {
  if(!this.material)throw new Error("PulsePage notation material missing")
  const mint=new vec4(.56,.86,.76,1)
  for(let row=0;row<2;row++){
   const y=3-row*10
   // A code-authored G clef wraps the second staff line; no font dependency.
   const path:number[][]=[]
   for(let j=0;j<=60;j++){const a=j/60*Math.PI*3.6,r=.12+j/60*1.05;path.push([-17.8+Math.cos(a)*r,y+.92+Math.sin(a)*r])}
   path.push([-17.55,y+4.9],[-17.1,y+5.3],[-16.9,y+4.5],[-17.65,y+2.8],[-17.9,y-1.1],[-18.4,y-1.4],[-18.7,y-.95])
   for(let j=1;j<path.length;j++){const a=path[j-1],b=path[j],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.sqrt(dx*dx+dy*dy),nx=-dy/len*.07,ny=dx/len*.07;this.shape("Treble clef",[[a[0]-nx,a[1]-ny,.02],[b[0]-nx,b[1]-ny,.02],[b[0]+nx,b[1]+ny,.02],[a[0]+nx,a[1]+ny,.02]],this.ink)}
   for(let l=0;l<5;l++)this.rect("Staff",0,y+l*.92,39,.055,mint)
   for(const x of [-19.5,-.5,19.5])this.rect("Barline",x,y+1.84,.065,3.68,mint)
  }
  PHRASE.forEach((n,i)=>{
   const p=this.notePos(i);this.heads.push(this.oval("Note"+i,p.x,p.y,.50,.34,this.ink,n.duration===2))
   const up=n.step<6;this.rect("Stem"+i,p.x+(up?.43:-.43),p.y+(up?1.55:-1.55),.075,3.1,this.ink)
   if(n.step===0)this.rect("Middle C ledger",p.x,p.y,1.5,.065,this.ink)
   if(n.duration===.5){const x=p.x+.43,y=p.y+3.1;this.shape("Eighth flag",[[x,y,0],[x+1,y-.75,0],[x+.35,y-1.45,0],[x+.6,y-.65,0]],this.ink)}
  })
  const c=this.oval("Current note",0,0,.77,.59,this.accent,true);this.cursor=c.getSceneObject()
  for(let i=0;i<4;i++){const o=this.oval("Beat"+(i+1),0,0,.38,.38,mint).getSceneObject();o.getTransform().setLocalPosition(new vec3(-4.5+i*3,-10,.04));this.beats.push(o)}
  this.ready=true
 }
 render(s:Snapshot) {
  if(!this.ready)return
  const p=this.notePos(s.note);this.cursor.getTransform().setLocalPosition(new vec3(p.x,p.y,.08))
  this.cursor.enabled=s.phase!=="finished" && s.phase!=="count-in"
  this.beats.forEach((o,i)=>o.getTransform().setLocalScale(new vec3(i===s.beat?1.5:1,i===s.beat?1.5:1,1)))
 }
}