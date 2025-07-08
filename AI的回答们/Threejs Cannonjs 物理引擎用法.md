---
title: Threejs Cannonjs 物理引擎用法
created: 2025-07-03
source: Cherry Studio
tags: 
---
# Threejs Cannonjs 物理引擎用法

### 🧑‍💻 User：three.js cannon的用法



---

### 🤖 Assistant



Three.js Cannon.js 的用法可以概括为以下几个核心步骤：

1.  **引入库:**
    首先，你需要将 Cannon.js 库引入到你的项目中。你可以通过 CDN 或者 npm/yarn 来引入。

    **CDN 引入:**
    ```html
    <script src="https://cdn.jsdelivr.net/npm/cannon-es@0.19.0/dist/cannon.min.js"></script>
    ```
    或者使用较新的 `cannon-es`：
    ```html
    <script src="https://cdn.jsdelivr.net/npm/cannon-es@0.19.0/dist/cannon-es.js"></script>
    ```

    **npm/yarn 引入:**
    ```bash
    npm install cannon-es
    # 或者
    yarn add cannon-es
    ```
    然后在你的 JavaScript 文件中引入：
    ```javascript
    import * as CANNON from 'cannon-es';
    ```

2.  **创建物理世界 (World):**
    Cannon.js 的核心是 `World` 对象，它代表了你的物理模拟环境。你可以在这里设置重力、碰撞体、联系等。

    ```javascript
    // 创建物理世界
    const world = new CANNON.World();

    // 设置重力 (例如，地球的重力在 Y 轴负方向)
    world.gravity.set(0, -9.82, 0);
    ```

3.  **创建物理材料 (Material):**
    物理材料定义了物体碰撞时的属性，例如摩擦力和弹性（反弹系数）。你可以创建自定义材料或者使用默认材料。

    ```javascript
    // 创建地面材料
    const groundMaterial = new CANNON.Material('groundMaterial');
    groundMaterial.friction = 0.5; // 摩擦力
    groundMaterial.restitution = 0.1; // 弹性 (0: 不反弹, 1: 完全反弹)

    // 创建球体材料
    const sphereMaterial = new CANNON.Material('sphereMaterial');
    sphereMaterial.friction = 0.3;
    sphereMaterial.restitution = 0.7; // 球体更弹
    ```

4.  **创建物理形状 (Shape) 和刚体 (Body):**
    Cannon.js 中的每个物理对象都是一个 `Body`。`Body` 需要一个 `Shape` 来定义其几何形状，以及一些属性，如质量、位置、方向等。

    **常见形状:**
    *   `CANNON.Box(halfExtents)`: 立方体，`halfExtents` 是一个三维向量，表示从中心到面的距离。
    *   `CANNON.Sphere(radius)`: 球体，`radius` 是半径。
    *   `CANNON.Plane()`: 平面，通常用于地面。
    *   `CANNON.Cylinder(radiusTop, radiusBottom, height, numSegments)`: 圆柱体。
    *   `CANNON.Particle()`: 一个没有形状的粒子，通常用于布料模拟或其他特殊情况。
    *   还有其他更复杂的形状，如 `ConvexPolyhedron`。

    **创建刚体:**
    ```javascript
    // 创建一个地面刚体
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({
        mass: 0, // 质量为0表示它是一个静态的物体，不会移动
        shape: groundShape,
        material: groundMaterial // 应用地面材料
    });
    // 地面通常是水平的，所以需要旋转
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody);

    // 创建一个球体刚体
    const sphereShape = new CANNON.Sphere(0.5); // 半径为0.5
    const sphereBody = new CANNON.Body({
        mass: 1, // 质量为1
        position: new CANNON.Vec3(0, 10, 0), // 起始位置
        shape: sphereShape,
        material: sphereMaterial // 应用球体材料
    });
    world.addBody(sphereBody);
    ```

5.  **创建 Three.js 几何体和网格 (Geometry & Mesh):**
    在 Three.js 中，你需要创建对应的几何体和网格来可视化你的物理对象。

    ```javascript
    // Three.js 场景和渲染器设置 (省略)

    // 创建 Three.js 地面
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterialThree = new THREE.MeshPhongMaterial({ color: 0x888888 });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterialThree);
    groundMesh.rotation.x = -Math.PI / 2; // 与物理世界的旋转一致
    scene.add(groundMesh);

    // 创建 Three.js 球体
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterialThree = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterialThree);
    scene.add(sphereMesh);
    ```

6.  **同步物理世界和 Three.js 场景:**
    在每一帧的渲染循环中，你需要将 Cannon.js 物理世界的状态（位置、方向）同步到 Three.js 的网格上。

    ```javascript
    const fixedTimeStep = 1 / 60; // 物理步长，通常设置为 60Hz 或 120Hz
    const maxSubSteps = 3; // 最大子步数，用于处理高帧率下的物理精度

    function animate() {
        requestAnimationFrame(animate);

        // 更新物理世界
        world.step(fixedTimeStep, undefined, maxSubSteps);

        // 同步 Three.js 网格到物理刚体
        groundMesh.position.copy(groundBody.position);
        groundMesh.quaternion.copy(groundBody.quaternion);

        sphereMesh.position.copy(sphereBody.position);
        sphereMesh.quaternion.copy(sphereBody.quaternion);

        // 渲染 Three.js 场景
        renderer.render(scene, camera);
    }

    animate();
    ```

7.  **添加碰撞体之间的联系 (Contact Materials):**
    你可以通过 `world.addContactMaterial()` 来定义两个不同物理材料之间碰撞的属性。这比在每个刚体上单独设置材料更灵活。

    ```javascript
    // 定义地面和球体碰撞的联系
    const groundSphereContactMaterial = new CANNON.ContactMaterial(
        groundMaterial,
        sphereMaterial,
        {
            friction: 0.4, // 地面与球体的摩擦力
            restitution: 0.6 // 地面与球体的弹性
        }
    );
    world.addContactMaterial(groundSphereContactMaterial);
    ```

**一个简单的示例流程总结:**

1.  **初始化:** 创建 `CANNON.World`，设置重力。
2.  **创建材质:** 定义碰撞体可能使用的物理材质（摩擦力、弹性）。
3.  **创建刚体:**
    *   为每个物理对象创建一个 `CANNON.Body`。
    *   为刚体指定一个 `shape`（如 `Box`, `Sphere`, `Plane`）。
    *   设置刚体的质量 (`mass`)，静态物体质量为 0。
    *   设置刚体的初始位置 (`position`) 和方向 (`quaternion`)。
    *   指定刚体的物理材质。
    *   将刚体添加到 `world` 中。
4.  **同步 Three.js:**
    *   为每个物理刚体创建一个对应的 Three.js 网格。
    *   在渲染循环 (`animate` 函数) 中：
        *   调用 `world.step()` 来更新物理模拟。
        *   将物理刚体的 `position` 和 `quaternion` 同步到对应的 Three.js 网格上。
        *   渲染 Three.js 场景。

**关键概念:**

*   **World:** 物理模拟的容器，包含所有物理对象和全局属性。
*   **Body:** 物理世界中的一个实体，具有质量、位置、速度、形状等属性。
*   **Shape:** 定义了刚体的几何形状，例如 `Box`, `Sphere`, `Plane`。
*   **Material:** 定义了物体碰撞时的属性，如摩擦力和弹性。
*   **ContactMaterial:** 定义了两种不同材质之间碰撞时的特定属性。
*   **quaternion:** 用于表示三维空间中的旋转，比欧拉角更稳定。
*   **Vec3:** Cannon.js 中用于表示三维向量的类。

**注意事项:**

*   **坐标系:** Cannon.js 和 Three.js 都使用左手坐标系，但 Three.js 的 Y 轴向上，而 Cannon.js 的 Y 轴通常向下（如果重力设置是负的）。在同步时要注意旋转的匹配。
*   **质量:** 质量为 `0` 的刚体是静态的，不会受到力的影响，也不会与其他物体发生碰撞响应（除非它们是动态的）。
*   **步长 (`fixedTimeStep`):** 物理引擎的更新频率。过小可能影响性能，过大可能导致物理不准确。
*   **集成方法:** Cannon.js 提供了不同的数值积分方法（如 `GSSolver`），默认的 `SAP` (Sweep and Prune) 对大量静态物体表现更好。

理解了这些基本步骤和概念，你就可以开始在 Three.js 中使用 Cannon.js 来创建各种各样的物理交互场景了。



---

### 🧑‍💻 User：相当于一个虚拟的物理世界，和一个现实世界，里面的物体要一一对应？



---

### 🤖 Assistant



你这个比喻非常贴切！

是的，你可以把 Three.js 的场景想象成你的 **现实世界（或者说我们肉眼所见的世界）**，而 Cannon.js 的 `World` 以及其中的 `Body` 和 `Shape` 则构成了你的 **虚拟物理世界**。

要让这两个世界协同工作，你说的“里面的物体要一一对应”是绝对正确的。

*   **Three.js 的 Mesh (网格)**：这是你在 Three.js 中创建的可视化对象，比如一个立方体、一个球体、一个模型。它们是你在屏幕上看到的、可以渲染出来的东西。
*   **Cannon.js 的 Body (刚体)**：这是在 Cannon.js 物理引擎中代表一个具有物理属性的实体。它有质量、位置、速度、受力等物理概念，可以参与碰撞、受重力影响、产生反应等。

**一一对应的关系体现在：**

1.  **可视化与物理的映射：**
    *   如果你想让一个 Three.js 的立方体网格受到重力下落并与其他物体碰撞，那么你需要为它创建一个与之几何形状、大小和初始位置都相对应的 Cannon.js `Body`（通常是 `CANNON.Box`）。
    *   你不能只创建 Three.js 的网格而不创建 Cannon.js 的刚体，否则它就只是一个静止的图形，没有物理行为。反之，你也可以创建 Cannon.js 的刚体，但如果不创建对应的 Three.js 网格，那么这个物理对象就不会被渲染出来，你也就看不到它的运动。

2.  **状态的同步：**
    *   由于 Three.js 的网格本身没有物理属性，它的位置和旋转是固定的（除非你手动去改变它）。而 Cannon.js 的刚体则会在物理引擎的计算下不断改变其位置和旋转。
    *   为了让可视化与物理运动同步，你需要在每一帧的渲染循环中，把 Cannon.js 刚体计算出来的最新 **位置 (position)** 和 **方向 (quaternion)** 同步到它对应的 Three.js 网格上。这就是前面代码示例中 `sphereMesh.position.copy(sphereBody.position);` 和 `sphereMesh.quaternion.copy(sphereBody.quaternion);` 这样的操作。

**类比的总结：**

想象你正在玩一个有重力的游戏：

*   **你的角色模型**：这就是 Three.js 的 `Mesh`。它长什么样，什么颜色，什么姿势，都是它。
*   **角色背后运行的物理计算**：这就是 Cannon.js 的 `World` 和 `Body`。它计算角色的重力、跳跃的弧线、碰撞的反应等。

为了让游戏画面中的角色能够按照物理规律移动，游戏引擎就需要不断地把物理计算出来的角色的 **精确位置和方向**，应用到 **角色模型** 上。模型自己不会“思考”物理，它只是被动地根据物理引擎的指令来更新自己的位置和旋转。

所以，“虚拟的物理世界”和“现实世界（我们看到的画面）”需要通过“一一对应的物体”来建立联系，并且需要通过“状态同步”来保持一致。这就是 Three.js + Cannon.js 的核心工作流程。



---

### 🧑‍💻 User：那我要弹开一个物体，是怎么操作



---

### 🤖 Assistant



要用 Cannon.js 弹开一个物体，本质上是给这个物体的 Cannon.js `Body` 施加一个力（Force）或者冲量（Impulse）。冲量通常更容易控制弹开的效果。

以下是几种常见的方法和操作步骤：

**核心思路：**

*   **找到目标物体的 `CANNON.Body`。**
*   **确定施加力的方向和大小。**
*   **使用 Cannon.js 提供的函数将力或冲量施加到 `Body` 上。**

**具体操作方法：**

1.  **使用 `applyForce(force, worldPoint)`:**
    这个函数会给物体在指定的世界坐标点 (`worldPoint`) 施加一个力 (`force`)。力会根据物体的质量和时间，改变物体的速度，从而产生运动。

    *   `force`: 一个 `CANNON.Vec3`，表示力的方向和大小。
    *   `worldPoint`: 一个 `CANNON.Vec3`，表示力作用在物体上的具体位置。如果为 `null`，则力会作用在物体的质心（center of mass）。

    **示例：从上方给球体施加一个向上的力（模拟向上推一下）**

    假设你已经有了 `sphereBody`（一个 `CANNON.Body`）和一个表示向上方向的 `CANNON.Vec3` 变量 `upwardForceVector`。

    ```javascript
    // 定义一个向上的力，例如 50 牛顿
    const upwardForceMagnitude = 50;
    const upwardForceVector = new CANNON.Vec3(0, upwardForceMagnitude, 0);

    // 施加力到球体的质心
    sphereBody.applyForce(upwardForceVector, null);
    ```

    **解释：**
    当这个 `applyForce` 函数被调用时，Cannon.js 会在下一帧的物理步长中计算这个力对 `sphereBody` 的影响。如果你想让这个力持续一段时间，你可能需要在动画循环中不断调用它，或者使用其他更高级的力学模型。

2.  **使用 `applyImpulse(impulse, worldPoint)`:**
    这是最常用的方法，用来模拟瞬间的“推”、“打”等动作。冲量是质量和速度变化的乘积 (`impulse = mass * delta_velocity`)，它会立即改变物体的速度，而不需要考虑施加力的持续时间。

    *   `impulse`: 一个 `CANNON.Vec3`，表示冲量的方向和大小。
    *   `worldPoint`: 一个 `CANNON.Vec3`，表示冲量作用在物体上的具体位置。如果为 `null`，则冲量会作用在物体的质心。

    **示例：用鼠标点击球体，使其向鼠标点击方向弹开**

    假设你在点击事件中获取了点击的 Three.js 网格的物理刚体 `sphereBody`，以及点击在世界空间中的三维点 `clickWorldPoint`。

    ```javascript
    // 定义一个向某个方向的冲量，例如 (10, 0, 0)
    const impulseMagnitude = 10;
    const impulseDirection = new CANNON.Vec3(1, 0, 0); // 例如向 X 轴正方向

    const impulseVector = new CANNON.Vec3();
    impulseVector.copy(impulseDirection);
    impulseVector.normalize(); // 确保方向是单位向量
    impulseVector.scale(impulseMagnitude); // 缩放冲量大小

    // 施加冲量到球体的质心 (或点击点)
    sphereBody.applyImpulse(impulseVector, null); // 作用在质心
    // 或者作用在点击点附近，以产生旋转效果
    // sphereBody.applyImpulse(impulseVector, clickWorldPoint);
    ```

    **解释：**
    `applyImpulse` 会立即修改物体的角速度和线速度，使其在下一帧的物理步长中开始按照新的速度运动。如果你想从一个特定的点施加冲量（例如用锤子敲击物体的边缘），那么通过 `worldPoint` 参数来指定施加点，这还会产生一个扭矩，让物体旋转。

3.  **直接修改速度 (Velocity):**
    虽然不推荐直接修改速度（因为它绕过了物理引擎的计算），但在某些非常特殊的场景下，或者当你想要一个非常直接、不考虑外力因素的瞬间改变时，可以考虑。但通常情况下，`applyImpulse` 是更好的选择。

    **示例：立即给球体一个向上的速度**

    ```javascript
    const upwardVelocityMagnitude = 5;
    const upwardVelocityVector = new CANNON.Vec3(0, upwardVelocityMagnitude, 0);

    // 直接设置线性速度
    sphereBody.velocity.set(upwardVelocityVector.x, upwardVelocityVector.y, upwardVelocityVector.z);

    // 如果需要，也可以设置角速度
    // const angularVelocityVector = new CANNON.Vec3(0, 0, 1);
    // sphereBody.angularVelocity.set(angularVelocityVector.x, angularVelocityVector.y, angularVelocityVector.z);
    ```

    **解释：**
    直接修改速度会覆盖物体当前的速度。这更像是“瞬移”到某个速度状态，而不是“施加”一个过程。

**如何触发“弹开”的操作？**

*   **用户交互 (鼠标点击、触摸):**
    *   监听 Three.js 的 `click` 或 `pointerdown` 事件。
    *   在事件回调中，使用 `Raycaster` 来判断鼠标/触摸点是否命中了某个 Three.js 网格。
    *   如果命中了，找到该网格对应的 Cannon.js `Body`。
    *   将 Three.js 的点击坐标转换到世界坐标系。
    *   根据点击位置和你想弹开的方向，调用 `applyImpulse` 或 `applyForce`。

*   **游戏逻辑/事件触发:**
    *   当游戏中的某个事件发生时（例如，一个触发器被激活，或者另一个物体撞击到它），你可以通过代码逻辑来调用 `applyImpulse` 或 `applyForce`。

**示例代码片段 (假设你有一个点击事件监听器):**

```javascript
// 假设你已经有了以下全局变量和初始化
// const world = new CANNON.World();
// const sphereBody = new CANNON.Body({...}); // 你的球体刚体
// const sphereMesh = new THREE.Mesh({...}); // 你的球体网格
// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();
// const camera = new THREE.PerspectiveCamera(...);
// const scene = new THREE.Scene();

function onMouseClick(event) {
    // 1. 将鼠标屏幕坐标转换为标准化设备坐标 (NDC)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 2. 使用 Raycaster 从相机投射光线
    raycaster.setFromCamera(mouse, camera);

    // 3. 检查光线是否与场景中的物体相交
    //    假设我们只想检测球体，可以过滤一下
    const intersects = raycaster.intersectObjects(scene.children, true); // 检查所有子对象

    for (let i = 0; i < intersects.length; i++) {
        const intersect = intersects[i];

        // 检查这个交点是否是我们的球体网格
        if (intersect.object === sphereMesh) {
            // 4. 获取球体的物理刚体
            const targetBody = sphereBody; // 假设你有一个映射关系或直接知道

            // 5. 确定冲量的方向和大小
            const impulseMagnitude = 20; // 根据需要调整大小
            const impulseDirection = new CANNON.Vec3(
                Math.random() * 2 - 1, // 随机方向 X
                1.5,                   // 略微向上 Y
                Math.random() * 2 - 1  // 随机方向 Z
            );
            impulseDirection.normalize(); // 确保方向是单位向量
            impulseDirection.scale(impulseMagnitude);

            // 6. 获取冲量作用点 (在 Three.js 的世界坐标系)
            //    intersect.point 是 Three.js 的 Vector3
            const worldPoint = new CANNON.Vec3(
                intersect.point.x,
                intersect.point.y,
                intersect.point.z
            );

            // 7. 施加冲量
            targetBody.applyImpulse(impulseDirection, worldPoint);

            // 如果你只想弹开一个物体，可以跳出循环
            break;
        }
    }
}

window.addEventListener('click', onMouseClick);
```

**总结来说，弹开一个物体就是：找到它的物理身体（`CANNON.Body`），然后给它施加一个方向和大小合适的冲量（`applyImpulse`）或力（`applyForce`）。**



---

### 🧑‍💻 User：所以操作的都是虚拟世界的物体，然后通过animate同步到现实世界？



---

### 🤖 Assistant



没错！你的理解非常准确，这正是 Three.js 和 Cannon.js 集成的核心思想：

1.  **操作虚拟世界的物体（Cannon.js `Body`）：**
    当你需要“弹开”一个物体时，你实际是在对这个物体的 **Cannon.js `Body`** 对象进行操作。你给它施加力（`applyForce`）或者冲量（`applyImpulse`）。这些操作是发生在 Cannon.js 物理引擎内部的，它会根据这些输入来计算物体在下一时刻的加速度、速度和位置。

2.  **虚拟世界的“行为”驱动“现实世界的表现”：**
    *   Cannon.js 是物理世界的“大脑”，它负责模拟所有的物理规律，包括重力、碰撞、摩擦、弹力以及你施加的外力。
    *   Three.js 的 `Mesh` 是这个物理行为的“身体”或“表现”。它本身没有物理能力，只是一个可视化的模型。

3.  **`animate` 函数作为“同步器”：**
    *   `animate` 函数在每一帧都会执行（通常是每秒 60 次或更多）。
    *   在每一帧的开始，它会先调用 `world.step()`，让 Cannon.js 完成一小段时间的物理计算。这会更新所有 Cannon.js `Body` 的状态（位置、旋转、速度等）。
    *   然后，它会遍历所有需要同步的 Three.js `Mesh` 和它们对应的 Cannon.js `Body`。
    *   将 Cannon.js `Body` 的最新计算出的状态（`position` 和 `quaternion`）**复制** 到 Three.js `Mesh` 上。
    *   最后，渲染 Three.js 场景，将更新后的网格显示在屏幕上。

**所以，简单来说就是：**

**“虚拟世界的物理计算（Cannon.js） -> 计算出物体应该在哪儿，是什么姿态 -> 同步到现实世界的表现（Three.js `Mesh`）上 -> 渲染出来给用户看。”**

这种模式非常常见于使用物理引擎进行 3D 渲染的场景中。这是一种“模型-视图”分离的思想，其中物理引擎是模型（数据和逻辑），而 Three.js 的渲染器是视图（表现）。

