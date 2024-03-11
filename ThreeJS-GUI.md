> gui 图形用户界面 Graphical User Interface

排名: [control-panel vs controlkit vs dat.gui vs lil-gui vs tweakpane | npm trends](https://npmtrends.com/control-panel-vs-controlkit-vs-dat.gui-vs-lil-gui-vs-tweakpane)

### lil-gui 最火
```js
gui = new GUI.GUI({ container: document.getElementById('ui') })

// Controls for colors (RGBA)
const colorFolder = gui.addFolder('Colors')
{
  const colorController = colorFolder
	.addColor(uniforms.bottomColor, 'value')
	.name('bottomColor')
	.onChange(updateUniforms)
  colorController.onChange(() => {
	uniforms.bottomColor.value.set(
	  colorController.getValue().r,
	  colorController.getValue().g,
	  colorController.getValue().b,
	  uniforms.bottomColor.value.w
	)
  })

  const alphaController = colorFolder.add(uniforms.bottomColor.value, 'w', 0, 1, 0.01)
  alphaController.name('bottomColor Alpha')
  alphaController.onChange(() => {
	uniforms.bottomColor.value.w = alphaController.getValue()
  })
}
```

### tweakpane 上升最快
```js
pane = new tweakpane.Pane();

const animationFolder = pane.addFolder({ title: "Animations" });

const animationController = animationFolder.addButton({
title: clip.name,
});
animationController.on("click", animationParams.play);

animationFolder.addBinding(animationParams, "loop", {
label: "Loop Animation",
});
animationFolder.on("change", (ev) => {
if (ev.target.key === "loop") {
  action.setLoop(ev.value ? THREE.LoopRepeat : THREE.LoopOnce);
}
});



```


### dat.gui(不再维护了)
```js
滑块实时调参
	import dat from 'three/examples/jsm/libs/dat.gui.module';    
	2.const gui = new dat.GUI();
	  const datas= {  X:0, Y:0,Z:0 } //监听项
	  const f1 = gui.addFolder('柜子和门');//分组
			//最简单  
			f1.add(mesh.position, 'x', -1000, 1000);
			//复杂
			f1 .add(datas, "X", -1000, 1000).name('相机X').onChange(()=> mesh.position.set(datas.positionX, datas.positionY, datas.positionZ)  );                
			f1.open();
```
