[AutomaticUniforms.js - CesiumGS/cesium - GitHub1s](https://github1s.com/CesiumGS/cesium/blob/HEAD/packages/engine/Source/Renderer/AutomaticUniforms.js#L201)

```js
import Cartesian3 from "../Core/Cartesian3.js";
import Matrix4 from "../Core/Matrix4.js";
import WebGLConstants from "../Core/WebGLConstants.js";

const viewerPositionWCScratch = new Cartesian3();

function AutomaticUniform(options) {
  this._size = options.size;
  this._datatype = options.datatype;
  this.getValue = options.getValue;
}

const datatypeToGlsl = {};
datatypeToGlsl[WebGLConstants.FLOAT] = "float";
datatypeToGlsl[WebGLConstants.FLOAT_VEC2] = "vec2";
datatypeToGlsl[WebGLConstants.FLOAT_VEC3] = "vec3";
datatypeToGlsl[WebGLConstants.FLOAT_VEC4] = "vec4";
datatypeToGlsl[WebGLConstants.INT] = "int";
datatypeToGlsl[WebGLConstants.INT_VEC2] = "ivec2";
datatypeToGlsl[WebGLConstants.INT_VEC3] = "ivec3";
datatypeToGlsl[WebGLConstants.INT_VEC4] = "ivec4";
datatypeToGlsl[WebGLConstants.BOOL] = "bool";
datatypeToGlsl[WebGLConstants.BOOL_VEC2] = "bvec2";
datatypeToGlsl[WebGLConstants.BOOL_VEC3] = "bvec3";
datatypeToGlsl[WebGLConstants.BOOL_VEC4] = "bvec4";
datatypeToGlsl[WebGLConstants.FLOAT_MAT2] = "mat2";
datatypeToGlsl[WebGLConstants.FLOAT_MAT3] = "mat3";
datatypeToGlsl[WebGLConstants.FLOAT_MAT4] = "mat4";
datatypeToGlsl[WebGLConstants.SAMPLER_2D] = "sampler2D";
datatypeToGlsl[WebGLConstants.SAMPLER_CUBE] = "samplerCube";

AutomaticUniform.prototype.getDeclaration = function (name) {
  let declaration = `uniform ${datatypeToGlsl[this._datatype]} ${name}`;

  const size = this._size;
  if (size === 1) {
    declaration += ";";
  } else {
    declaration += `[${size.toString()}];`;
  }

  return declaration;
};

/**
 * @私人的
 */
const AutomaticUniforms = {
  /**
   * 在 <code>vec4 中包含视口的 <code>x</code>、<code>y</code>、<code>width</code> 和 <code>height</code> 属性的自动 GLSL uniform</code> 的 <code>x</code>、<code>y</code>、<code>z</code> 和 <code>w</code> 组件。
   *
   * @example
   * //GLSL声明
   * uniform vec4 czm_viewport;
   *
   * //根据视口的宽度和高度, 通过除法将窗口坐标分量缩放到[0, 1]
   * vec2 v = gl_FragCoord.xy /czm_viewport.zw;
   *
   * @see 上下文#getViewport
   */
  czm_viewport: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC4,
    getValue: function (uniformState) {
      return uniformState.viewportCartesian4;
    },
  }),

  /**
   * 表示 4x4 正交投影矩阵的自动 GLSL uniform，可将窗口坐标转换为裁剪坐标。剪辑坐标是顶点着色器的 <code>gl_Position</code> 输出的坐标系。
   * <br /><br />
   * 当顶点着色器像 {@link BillboardCollection} 那样输入或操作窗口坐标时，此转换很有用。
   * <br /><br />
   * 不要将 {@link czm_viewportTransformation} 与 <code>czm_viewportOrthographic</code> 混淆。
   * 前者从归一化设备坐标转换为窗口坐标;后者从窗口坐标转换为剪辑坐标，通常用于分配给<code>gl_Position</code>。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_viewportOrthographic;
   *
   * //例子
   * gl_Position = czm_viewportOrthographic *vec4(windowPosition, 0.0, 1.0);
   *
   * @see UniformState#viewportOrthographic
   * @see czm_viewport
   * @see czm_viewportTransformation
   * @see 广告牌集合
   */
  czm_viewportOrthographic: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.viewportOrthographic;
    },
  }),

  /**
   * 表示 4x4 变换矩阵的自动 GLSL uniform，可将规范化的设备坐标转换为窗口坐标。使用上下文的完整视口，深度范围假定为 <code>near = 0</code> 和 <code>far = 1</code>。
   * <br /><br />
   * 当需要在顶点着色器中操作窗口坐标时，此转换很有用，如 {@link BillboardCollection} 所做的那样。很多情况下不会直接使用这个矩阵;相反，{@link czm_modelToWindowCoordinates} 将用于直接从模型坐标转换为窗口坐标。
   * <br /><br />
   * 不要将 <code>czm_viewportTransformation</code> 与 {@link czm_viewportOrthographic} 混淆。
   * 前者从归一化设备坐标转换为窗口坐标;后者从窗口坐标转换为剪辑坐标，通常用于分配给<code>gl_Position</code>。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_viewportTransformation;
   *
   * //使用 czm_viewportTransformation 作为
   * //从模型坐标到窗口坐标。
   * vec4 q = czm_modelViewProjection *positionMC; //模型裁剪坐标
   * q.xyz /= q.w; //裁剪到规范化设备坐标 (ndc)
   * q.xyz = (czm_viewportTransformation *vec4(q.xyz, 1.0)).xyz; //ndc 到窗口坐标
   *
   * @see uniform状态#viewportTransformation
   * @see czm_viewport
   * @see czm_viewportOrthographic
   * @see czm_modelToWindowCoordinates
   * @see 广告牌集合
   */
  czm_viewportTransformation: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.viewportTransformation;
    },
  }),

  /**
   * 一个自动的 GLSL uniform 表示 globe pass 之后的场景深度，然后在 3D Tiles pass 之后更新。
   * 深度被打包到 RGBA 纹理中。
   *
   * @example
   * //GLSL声明
   * 均匀采样器 2D czm_globeDepthTexture;
   *
   * //获取当前片段的深度
   * vec2 坐标 = gl_FragCoord.xy /czm_viewport.zw;
   * 浮动深度= czm_unpackDepth（纹理（czm_globeDepthTexture，坐标））;
   */
  czm_globeDepthTexture: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.SAMPLER_2D,
    getValue: function (uniformState) {
      return uniformState.globeDepthTexture;
    },
  }),

  /**
   * 表示将模型坐标转换为世界坐标的 4x4 模型转换矩阵的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_model;
   *
   * //例子
   * vec4 worldPosition = czm_model *modelPosition;
   *
   * @see UniformState#模型
   * @see czm_inverseModel
   * @see czm_modelView
   * @see czm_modelViewProjection
   */
  czm_model: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.model;
    },
  }),

  /**
   * 表示将世界坐标转换为模型坐标的 4x4 模型转换矩阵的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_inverseModel;
   *
   * //例子
   * vec4 modelPosition = czm_inverseModel *worldPosition;
   *
   * @see UniformState#inverseModel
   * @see czm_model
   * @see czm_inverseModelView
   */
  czm_inverseModel: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.inverseModel;
    },
  }),

  /**
   * 表示 4x4 视图转换矩阵的自动 GLSL uniform，可将世界坐标转换为眼睛坐标。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_view;
   *
   * //例子
   * vec4 eyePosition = czm_view *worldPosition;
   *
   * @see uniform状态#view
   * @see czm_viewRotation
   * @see czm_modelView
   * @see czm_viewProjection
   * @see czm_modelViewProjection
   * @see czm_inverseView
   */
  czm_view: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.view;
    },
  }),

  /**
   * 表示将 3D 世界坐标转换为眼睛坐标的 4x4 视图转换矩阵的自动 GLSL uniform。在 3D 模式下，这与
   * {@link czm_view}，但在 2D 和 Columbus View 中它表示视图矩阵
   * 就好像相机在 3D 模式下处于等效位置一样。这对照明很有用
   * 2D 和 Columbus 视图与 3D 点亮的方式相同。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_view3D;
   *
   * //例子
   * vec4 eyePosition3D = czm_view3D *worldPosition3D;
   *
   * @see UniformState#view3D
   * @see czm_view
   */
  czm_view3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.view3D;
    },
  }),

  /**
   * 表示 3x3 视图旋转矩阵的自动 GLSL uniform，可将世界坐标中的向量转换为眼睛坐标。
   *
   * @example
   * //GLSL声明
   * uniform mat3 czm_viewRotation;
   *
   * //例子
   * vec3 eyeVector = czm_viewRotation *worldVector;
   *
   * @see uniform状态#viewRotation
   * @see czm_view
   * @see czm_inverseView
   * @see czm_inverseViewRotation
   */
  czm_viewRotation: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT3,
    getValue: function (uniformState) {
      return uniformState.viewRotation;
    },
  }),

  /**
   * 表示 3x3 视图旋转矩阵的自动 GLSL uniform，可将 3D 世界坐标中的向量转换为眼睛坐标。在 3D 模式下，这与
   * {@link czm_viewRotation}，但在 2D 和 Columbus View 中它表示视图矩阵
   * 就好像相机在 3D 模式下处于等效位置一样。这对照明很有用
   * 2D 和 Columbus 视图与 3D 点亮的方式相同。
   *
   * @example
   * //GLSL声明
   * uniform mat3 czm_viewRotation3D;
   *
   * //例子
   * vec3 eyeVector = czm_viewRotation3D *worldVector;
   *
   * @see UniformState#viewRotation3D
   * @see czm_viewRotation
   */
  czm_viewRotation3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT3,
    getValue: function (uniformState) {
      return uniformState.viewRotation3D;
    },
  }),

  /**
   * 表示从眼睛坐标转换为世界坐标的 4x4 转换矩阵的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_inverseView;
   *
   * //例子
   * vec4 worldPosition = czm_inverseView *eyePosition;
   *
   * @see UniformState#inverseView
   * @see czm_view
   * @see czm_inverseNormal
   */
  czm_inverseView: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.inverseView;
    },
  }),

  /**
   * 表示从 3D 眼睛坐标转换为世界坐标的 4x4 转换矩阵的自动 GLSL uniform。在 3D 模式下，这与
   * {@link czm_inverseView}，但在 2D 和 Columbus View 中它表示逆视图矩阵
   * 就好像相机在 3D 模式下处于等效位置一样。这对照明很有用
   * 2D 和 Columbus 视图与 3D 点亮的方式相同。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_inverseView3D;
   *
   * //例子
   * vec4 worldPosition = czm_inverseView3D *eyePosition;
   *
   * @see uniform状态#inverseView3D
   * @see czm_inverseView
   */
  czm_inverseView3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.inverseView3D;
    },
  }),

  /**
   * 表示 3x3 旋转矩阵的自动 GLSL uniform，可将向量从眼睛坐标转换为世界坐标。
   *
   * @example
   * //GLSL声明
   * uniform mat3 czm_inverseViewRotation;
   *
   * //例子
   * vec4 worldVector = czm_inverseViewRotation *eyeVector;
   *
   * @see UniformState#inverseView
   * @see czm_view
   * @see czm_viewRotation
   * @see czm_inverseViewRotation
   */
  czm_inverseViewRotation: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT3,
    getValue: function (uniformState) {
      return uniformState.inverseViewRotation;
    },
  }),

  /**
   * 表示 3x3 旋转矩阵的自动 GLSL uniform，可将向量从 3D 眼睛坐标转换为世界坐标。在 3D 模式下，这与
   * {@link czm_inverseViewRotation}，但在 2D 和 Columbus View 中它表示逆视图矩阵
   * 就好像相机在 3D 模式下处于等效位置一样。这对照明很有用
   * 2D 和 Columbus 视图与 3D 点亮的方式相同。
   *
   * @example
   * //GLSL声明
   * uniform mat3 czm_inverseViewRotation3D;
   *
   * //例子
   * vec4 worldVector = czm_inverseViewRotation3D *eyeVector;
   *
   * @see uniform状态#inverseView3D
   * @see czm_inverseViewRotation
   */
  czm_inverseViewRotation3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT3,
    getValue: function (uniformState) {
      return uniformState.inverseViewRotation3D;
    },
  }),

  /**
   * 表示 4x4 投影变换矩阵的自动 GLSL uniform，可将眼睛坐标转换为裁剪坐标。剪辑坐标是顶点着色器的 <code>gl_Position</code> 输出的坐标系。
   *
   * @example
   * //GLSL声明
   * 均匀的 mat4 czm_projection;
   *
   * //例子
   * gl_Position = czm_projection *eyePosition;
   *
   * @see uniform状态#projection
   * @see czm_viewProjection
   * @see czm_modelViewProjection
   * @see czm_infiniteProjection
   */
  czm_projection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.projection;
    },
  }),

  /**
   * 表示 4x4 逆投影变换矩阵的自动 GLSL uniform，该矩阵从剪辑坐标转换为眼睛坐标。剪辑坐标是顶点着色器的 <code>gl_Position</code> 输出的坐标系。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_inverseProjection;
   *
   * //例子
   * vec4 eyePosition = czm_inverseProjection *clipPosition;
   *
   * @see UniformState#inverseProjection
   * @see czm_projection
   */
  czm_inverseProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.inverseProjection;
    },
  }),

  /**
   * 一个自动 GLSL uniform 代表一个 4x4 投影变换矩阵，远平面在无穷远，将眼睛坐标转换为剪辑坐标。剪辑坐标是顶点着色器的 <code>gl_Position</code> 输出的坐标系。无限远平面用于阴影体积和具有代理几何体的 GPU 光线投射等算法，以确保三角形不被远平面裁剪。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_infiniteProjection;
   *
   * //例子
   * gl_Position = czm_infiniteProjection *eyePosition;
   *
   * @see UniformState#infiniteProjection
   * @see czm_projection
   * @see czm_modelViewInfiniteProjection
   */
  czm_infiniteProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.infiniteProjection;
    },
  }),

  /**
   * 表示将模型坐标转换为眼睛坐标的 4x4 模型视图转换矩阵的自动 GLSL uniform。
   * <br /><br />
   * 应使用 <code>czm_modelView</code> 将位置转换为眼睛坐标，并应使用 {@link czm_normal} 转换法线。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_modelView;
   *
   * //例子
   * vec4 eyePosition = czm_modelView *modelPosition;
   *
   * //上面等价于，但比以下更有效：
   * vec4 eyePosition = czm_view *czm_model *modelPosition;
   *
   * @see UniformState#modelView
   * @see czm_model
   * @see czm_view
   * @see czm_modelViewProjection
   * @see czm_normal
   */
  czm_modelView: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.modelView;
    },
  }),

  /**
   * 表示 4x4 模型视图转换矩阵的自动 GLSL uniform，可将 3D 模型坐标转换为眼睛坐标。在 3D 模式下，这与
   * {@link czm_modelView}，但在 2D 和 Columbus View 中它表示模型视图矩阵
   * 就好像相机在 3D 模式下处于等效位置一样。这对照明很有用
   * 2D 和 Columbus 视图与 3D 点亮的方式相同。
   * <br /><br />
   * 应使用 <code>czm_modelView3D</code> 将位置转换为眼睛坐标，并应使用 {@link czm_normal3D} 转换法线。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_modelView3D;
   *
   * //例子
   * vec4 eyePosition = czm_modelView3D *modelPosition;
   *
   * //上面等价于，但比以下更有效：
   * vec4 eyePosition = czm_view3D *czm_model *modelPosition;
   *
   * @see UniformState#modelView3D
   * @see czm_modelView
   */
  czm_modelView3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.modelView3D;
    },
  }),

  /**
   * 表示 4x4 模型视图转换矩阵的自动 GLSL uniform，该矩阵将相对于眼睛的模型坐标转换为眼睛坐标。这与 {@link czm_translateRelativeToEye} 结合使用。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_modelViewRelativeToEye;
   *
   * //例子
   * attribute vec3 positionHigh;
   * attribute vec3 positionLow;
   *
   * void main()
   * {
   *   vec4 p = czm_translateRelativeToEye(positionHigh, positionLow);
   *   gl_Position = czm_projection *(czm_modelViewRelativeToEye *p);
   * }
   *
   * @see czm_modelViewProjectionRelativeToEye
   * @see czm_translateRelativeToEye
   * @see EncodedCartesian3
   */
  czm_modelViewRelativeToEye: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.modelViewRelativeToEye;
    },
  }),

  /**
   * 表示从眼睛坐标转换为模型坐标的 4x4 转换矩阵的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_inverseModelView;
   *
   * //例子
   * vec4 modelPosition = czm_inverseModelView *eyePosition;
   *
   * @see UniformState#inverseModelView
   * @see czm_modelView
   */
  czm_inverseModelView: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.inverseModelView;
    },
  }),

  /**
   * 表示从眼睛坐标转换为 3D 模型坐标的 4x4 转换矩阵的自动 GLSL uniform。在 3D 模式下，这与
   * {@link czm_inverseModelView}，但在 2D 和 Columbus View 中它表示逆模型视图矩阵
   * 就好像相机在 3D 模式下处于等效位置一样。这对照明很有用
   * 2D 和 Columbus 视图与 3D 点亮的方式相同。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_inverseModelView3D;
   *
   * //例子
   * vec4 modelPosition = czm_inverseModelView3D *eyePosition;
   *
   * @see UniformState#inverseModelView
   * @see czm_inverseModelView
   * @see czm_modelView3D
   */
  czm_inverseModelView3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.inverseModelView3D;
    },
  }),

  /**
   * 表示 4x4 视图投影转换矩阵的自动 GLSL uniform，可将世界坐标转换为裁剪坐标。剪辑坐标是顶点着色器的 <code>gl_Position</code> 输出的坐标系。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_viewProjection;
   *
   * //例子
   * vec4 gl_Position = czm_viewProjection *czm_model *modelPosition;
   *
   * //上面等价于，但比以下更有效：
   * gl_Position = czm_projection *czm_view *czm_model *modelPosition;
   *
   * @see UniformState#viewProjection
   * @see czm_view
   * @see czm_projection
   * @see czm_modelViewProjection
   * @see czm_inverseViewProjection
   */
  czm_viewProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.viewProjection;
    },
  }),

  /**
   * 表示 4x4 视图投影变换矩阵的自动 GLSL uniform，可将剪辑坐标转换为世界坐标。剪辑坐标是顶点着色器的 <code>gl_Position</code> 输出的坐标系。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_inverseViewProjection;
   *
   * //例子
   * vec4 worldPosition = czm_inverseViewProjection *clipPosition;
   *
   * @see UniformState#inverseViewProjection
   * @see czm_viewProjection
   */
  czm_inverseViewProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.inverseViewProjection;
    },
  }),

  /**
   * 表示 4x4 模型-视图-投影变换矩阵的自动 GLSL uniform，可将模型坐标变换为裁剪坐标。剪辑坐标是顶点着色器的 <code>gl_Position</code> 输出的坐标系。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_modelViewProjection;
   *
   * //例子
   * vec4 gl_Position = czm_modelViewProjection *模型位置;
   *
   * //上面等价于，但比以下更有效：
   * gl_Position = czm_projection *czm_view *czm_model *modelPosition;
   *
   * @see UniformState#modelViewProjection
   * @see czm_model
   * @see czm_view
   * @see czm_projection
   * @see czm_modelView
   * @see czm_viewProjection
   * @see czm_modelViewInfiniteProjection
   * @see czm_inverseModelViewProjection
   */
  czm_modelViewProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.modelViewProjection;
    },
  }),

  /**
   * 一个自动 GLSL uniform 表示一个 4x4 逆模型视图投影变换矩阵，该矩阵将剪辑坐标转换为模型坐标。剪辑坐标是顶点着色器的 <code>gl_Position</code> 输出的坐标系。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_inverseModelViewProjection;
   *
   * //例子
   * vec4 modelPosition = czm_inverseModelViewProjection *clipPosition;
   *
   * @see UniformState#modelViewProjection
   * @see czm_modelViewProjection
   */
  czm_inverseModelViewProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.inverseModelViewProjection;
    },
  }),

  /**
   * 表示 4x4 模型-视图-投影变换矩阵的自动 GLSL uniform，该矩阵将相对于眼睛的模型坐标转换为裁剪坐标。剪辑坐标是顶点着色器的 <code>gl_Position</code> 输出的坐标系。这与 {@link czm_translateRelativeToEye} 结合使用。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_modelViewProjectionRelativeToEye;
   *
   * //例子
   * attribute vec3 positionHigh;
   * attribute vec3 positionLow;
   *
   * void main()
   * {
   *   vec4 p = czm_translateRelativeToEye(positionHigh, positionLow);
   *   gl_Position = czm_modelViewProjectionRelativeToEye *p;
   * }
   *
   * @see czm_modelViewRelativeToEye
   * @see czm_translateRelativeToEye
   * @see EncodedCartesian3
   */
  czm_modelViewProjectionRelativeToEye: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.modelViewProjectionRelativeToEye;
    },
  }),

  /**
   * 表示 4x4 模型-视图-投影变换矩阵的自动 GLSL uniform，可将模型坐标变换为裁剪坐标。剪辑坐标是顶点着色器的 <code>gl_Position</code> 输出的坐标系。投影矩阵将远平面置于无穷远。这在阴影体积和使用代理几何体的 GPU 光线投射等算法中很有用，可确保三角形不会被远平面裁剪。
   *
   * @example
   * //GLSL声明
   * uniform mat4 czm_modelViewInfiniteProjection;
   *
   * //例子
   * vec4 gl_Position = czm_modelViewInfiniteProjection * modelPosition;
   *
   * //上面等价于，但比以下更有效：
   * gl_Position = czm_infiniteProjection *czm_view *czm_model * modelPosition;
   *
   * @see UniformState#modelViewInfiniteProjection
   * @see czm_model
   * @see czm_view
   * @see czm_infiniteProjection
   * @see czm_modelViewProjection
   */
  czm_modelViewInfiniteProjection: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT4,
    getValue: function (uniformState) {
      return uniformState.modelViewInfiniteProjection;
    },
  }),

  /**
   * 一个自动 GLSL uniform，指示当前相机是否在 3D 中是正交的。
   *
   * @see UniformState#orthographicIn3D
   */
  czm_orthographicIn3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.orthographicIn3D ? 1 : 0;
    },
  }),

  /**
   * 表示 3x3 法线变换矩阵的自动 GLSL uniform，该矩阵将模型坐标中的法线向量转换为眼睛坐标。
   * <br /><br />
   * 应使用 {@link czm_modelView} 将位置转换为眼睛坐标，并应使用 <code>czm_normal</code> 转换法线。
   *
   * @example
   * //GLSL声明
   * uniform mat3 czm_normal;
   *
   * //例子
   * vec3 eyeNormal = czm_normal *正常;
   *
   * @see uniform状态#normal
   * @see czm_inverseNormal
   * @see czm_modelView
   */
  czm_normal: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT3,
    getValue: function (uniformState) {
      return uniformState.normal;
    },
  }),

  /**
   * 表示 3x3 法线变换矩阵的自动 GLSL uniform，可将 3D 模型坐标中的法线向量转换为眼睛坐标。
   * 在 3D 模式下，这与
   * {@link czm_normal}，但在 2D 和 Columbus View 中它代表法线变换
   * 矩阵，就好像相机在 3D 模式下处于等效位置一样。这对照明很有用
   * 2D 和 Columbus 视图与 3D 点亮的方式相同。
   * <br /><br />
   * 位置应使用 {@link czm_modelView3D} 转换为眼睛坐标，法线应使用 <code>czm_normal3D</code> 转换。
   *
   * @example
   * //GLSL声明
   * uniform mat3 czm_normal3D;
   *
   * //例子
   * vec3 eyeNormal = czm_normal3D *正常;
   *
   * @see UniformState#normal3D
   * @see czm_normal
   */
  czm_normal3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT3,
    getValue: function (uniformState) {
      return uniformState.normal3D;
    },
  }),

  /**
   * 表示 3x3 法线变换矩阵的自动 GLSL uniform，该矩阵将眼睛坐标中的法线向量转换为模型坐标。这与 {@link czm_normal} 提供的转换相反。
   *
   * @example
   * //GLSL声明
   * uniform mat3 czm_inverseNormal;
   *
   * //例子
   * vec3 normalMC = czm_inverseNormal *normalEC;
   *
   * @see uniform状态#inverseNormal
   * @see czm_normal
   * @see czm_modelView
   * @see czm_inverseView
   */
  czm_inverseNormal: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT3,
    getValue: function (uniformState) {
      return uniformState.inverseNormal;
    },
  }),

  /**
   * 表示 3x3 法线变换矩阵的自动 GLSL uniform，可将眼睛坐标中的法线向量转换为 3D 模型坐标。这与 {@link czm_normal} 提供的转换相反。
   * 在 3D 模式下，这与
   * {@link czm_inverseNormal}，但在 2D 和 Columbus View 中，它表示反向法线变换
   * 矩阵，就好像相机在 3D 模式下处于等效位置一样。这对照明很有用
   * 2D 和 Columbus 视图与 3D 点亮的方式相同。
   *
   * @example
   * //GLSL声明
   * uniform mat3 czm_inverseNormal3D;
   *
   * //例子
   * vec3 normalMC = czm_inverseNormal3D *normalEC;
   *
   * @see UniformState#inverseNormal3D
   * @see czm_inverseNormal
   */
  czm_inverseNormal3D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT3,
    getValue: function (uniformState) {
      return uniformState.inverseNormal3D;
    },
  }),

  /**
   * 自动 GLSL uniform包含眼睛（相机）在椭圆体上方或下方的高度（以米为单位）。
   *
   * @see UniformState#eyeHeight
   */
  czm_eyeHeight: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.eyeHeight;
    },
  }),

  /**
   * 一个自动 GLSL uniform包含高度 (<code>x</code>) 和高度平方 (<code>y</code>) 在二维世界平面上方的眼睛（相机）以米为单位。此uniform仅在 {@link SceneMode} 为 <code>SCENE2D</code> 时有效。
   *
   * @see UniformState#eyeHeight2D
   */
  czm_eyeHeight2D: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC2,
    getValue: function (uniformState) {
      return uniformState.eyeHeight2D;
    },
  }),

  /**
   * 自动 GLSL uniform 包含由相机定义的平截头体的近距离 (<code>x</code>) 和远距离 (<code>y</code>)。这是最大可能的视锥体，而不是用于多视锥体渲染的单个视锥体。
   *
   * @example
   * //GLSL声明
   * uniform vec2 czm_entireFrustum;
   *
   * //例子
   * float frustumLength = czm_entireFrustum.y -czm_entireFrustum.x;
   *
   * @see UniformState#entireFrustum
   * @see czm_currentFrustum
   */
  czm_entireFrustum: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC2,
    getValue: function (uniformState) {
      return uniformState.entireFrustum;
    },
  }),

  /**
   * 自动 GLSL uniform 包含由相机定义的平截头体的近距离 (<code>x</code>) 和远距离 (<code>y</code>)。这是用于多视锥体渲染的单个视锥体。
   *
   * @example
   * //GLSL声明
   * uniform vec2 czm_currentFrustum;
   *
   * //例子
   * float frustumLength = czm_currentFrustum.y -czm_currentFrustum.x;
   *
   * @see UniformState#currentFrustum
   * @see czm_entireFrustum
   */
  czm_currentFrustum: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC2,
    getValue: function (uniformState) {
      return uniformState.currentFrustum;
    },
  }),

  /**
   * 到平截头体平面的距离。顶部、底部、左侧和右侧的距离分别是 x、y、z 和 w 分量。
   */
  czm_frustumPlanes: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC4,
    getValue: function (uniformState) {
      return uniformState.frustumPlanes;
    },
  }),

  /**
   * 获取远平面与近平面的距离加上 1.0。
   */
  czm_farDepthFromNearPlusOne: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.farDepthFromNearPlusOne;
    },
  }),

  /**
   * 获取 {@link AutomaticUniforms#czm_farDepthFromNearPlusOne} 的 log2。
   */
  czm_log2FarDepthFromNearPlusOne: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.log2FarDepthFromNearPlusOne;
    },
  }),

  /**
   * 得到 1.0 除以 {@link AutomaticUniforms#czm_log2FarDepthFromNearPlusOne}。
   */
  czm_oneOverLog2FarDepthFromNearPlusOne: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.oneOverLog2FarDepthFromNearPlusOne;
    },
  }),

  /**
   * 表示世界坐标中太阳位置的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * uniform vec3 czm_sunPositionWC;
   *
   * @see UniformState#sunPositionWC
   * @see czm_sunPositionColumbusView
   * @see czm_sunDirectionWC
   */
  czm_sunPositionWC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.sunPositionWC;
    },
  }),

  /**
   * 表示哥伦布视图世界坐标中太阳位置的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * uniform vec3 czm_sunPositionColumbusView;
   *
   * @see UniformState#sunPositionColumbusView
   * @see czm_sunPositionWC
   */
  czm_sunPositionColumbusView: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.sunPositionColumbusView;
    },
  }),

  /**
   * 一个自动 GLSL uniform，表示眼睛坐标中太阳的归一化方向。
   *
   * @example
   * //GLSL声明
   * uniform vec3 czm_sunDirectionEC;
   *
   * //例子
   * float diffuse = max(dot(czm_sunDirectionEC, normalEC), 0.0);
   *
   * @see uniform状态#sunDirectionEC
   * @see czm_moonDirectionEC
   * @see czm_sunDirectionWC
   */
  czm_sunDirectionEC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.sunDirectionEC;
    },
  }),

  /**
   * 一个自动 GLSL uniform，代表世界坐标中太阳的归一化方向。
   *
   * @example
   * //GLSL声明
   * uniform vec3 czm_sunDirectionWC;
   *
   * //例子
   * float diffuse = max(dot(czm_sunDirectionWC, normalWC), 0.0);
   *
   * @see UniformState#sunDirectionWC
   * @see czm_sunPositionWC
   * @see czm_sunDirectionEC
   */
  czm_sunDirectionWC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.sunDirectionWC;
    },
  }),

  /**
   * 一个自动的 GLSL uniform，代表眼睛坐标中月球的归一化方向。
   *
   * @example
   * //GLSL声明
   * uniform vec3 czm_moonDirectionEC;
   *
   * //例子
   * float diffuse = max(dot(czm_moonDirectionEC, normalEC), 0.0);
   *
   * @see uniform状态#moonDirectionEC
   * @see czm_sunDirectionEC
   */
  czm_moonDirectionEC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.moonDirectionEC;
    },
  }),

  /**
   * 一个自动的 GLSL uniform，表示眼睛坐标中场景光源的归一化方向。
   * 这通常用于定向照明计算。
   *
   * @example
   * //GLSL声明
   * uniform vec3 czm_lightDirectionEC;
   *
   * //例子
   * float diffuse = max(dot(czm_lightDirectionEC, normalEC), 0.0);
   *
   * @see UniformState#lightDirectionEC
   * @see czm_lightDirectionWC
   */
  czm_lightDirectionEC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.lightDirectionEC;
    },
  }),

  /**
   * 一个自动 GLSL uniform，表示世界坐标中场景光源的标准化方向。
   * 这通常用于定向照明计算。
   *
   * @example
   * //GLSL声明
   * uniform vec3 czm_lightDirectionWC;
   *
   * //例子
   * float diffuse = max(dot(czm_lightDirectionWC, normalWC), 0.0);
   *
   * @see UniformState#lightDirectionWC
   * @see czm_lightDirectionEC
   */
  czm_lightDirectionWC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.lightDirectionWC;
    },
  }),

  /**
   * 代表场景光源发出的光的颜色的自动 GLSL uniform。这相当于光色乘以光强度，最大亮度限制为 1.0，适用于非 HDR 照明。
   *
   * @example
   * //GLSL声明
   * uniform vec3 czm_lightColor;
   *
   * //例子
   * vec3 diffuseColor = czm_lightColor *max(dot(czm_lightDirectionWC, normalWC), 0.0);
   *
   * @see uniform状态#lightColor
   * @see czm_lightColorHdr
   */
  czm_lightColor: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.lightColor;
    },
  }),

  /**
   * 一种自动 GLSL uniform，表示场景光源发出的光的高动态范围颜色。这相当于灯光颜色乘以适合 HDR 照明的灯光强度。
   *
   * @example
   * //GLSL声明
   * uniform vec3 czm_lightColorHdr;
   *
   * //例子
   * vec3 diffuseColor = czm_lightColorHdr *max(dot(czm_lightDirectionWC, normalWC), 0.0);
   *
   * @see UniformState#lightColorHdr
   * @see czm_lightColor
   */
  czm_lightColorHdr: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.lightColorHdr;
    },
  }),

  /**
   * 表示模型坐标中相机位置高位的自动 GLSL uniform。这用于 GPU RTE 以消除渲染时的抖动伪影，如 {@link http://help.agi.com/AGIComponents/html/BlogPrecisionsPrecisions.htm|Precisions, Precisions} 中所述。
   *
   * @example
   * //GLSL声明
   * uniform vec3 czm_encodedCameraPositionMCHigh;
   *
   * @see czm_encodedCameraPositionMCLow
   * @see czm_modelViewRelativeToEye
   * @see czm_modelViewProjectionRelativeToEye
   */
  czm_encodedCameraPositionMCHigh: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.encodedCameraPositionMCHigh;
    },
  }),

  /**
   * 表示模型坐标中相机位置低位的自动 GLSL uniform。这用于 GPU RTE 以消除渲染时的抖动伪影，如 {@linkhttp://help.agi.com/AGIComponents/html/BlogPrecisionsPrecisions.htm|Precisions, Precisions} 中所述。
   *
   * @example
   * //GLSL声明
   * uniform vec3 czm_encodedCameraPositionMCLow;
   *
   * @see czm_encodedCameraPositionMCHigh
   * @see czm_modelViewRelativeToEye
   * @see czm_modelViewProjectionRelativeToEye
   */
  czm_encodedCameraPositionMCLow: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.encodedCameraPositionMCLow;
    },
  }),

  /**
   * 表示观察者（相机）在世界坐标中的位置的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * uniform vec3 czm_viewerPositionWC;
   */
  czm_viewerPositionWC: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return Matrix4.getTranslation(
        uniformState.inverseView,
        viewerPositionWCScratch
      );
    },
  }),

  /**
   * 表示帧号的自动 GLSL uniform。此uniform每帧自动递增。
   *
   * @example
   * //GLSL声明
   * uniform浮动 czm_frameNumber;
   */
  czm_frameNumber: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.frameState.frameNumber;
    },
  }),

  /**
   * 一个自动 GLSL uniform 表示当前变形之间的过渡时间
   * 2D/Columbus View 和 3D，0.0 是 2D 或 Columbus View，1.0 是 3D。
   *
   * @example
   * //GLSL声明
   * uniform浮动 czm_morphTime;
   *
   * //例子
   * vec4 p = czm_columbusViewMorph(position2D, position3D, czm_morphTime);
   */
  czm_morphTime: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.frameState.morphTime;
    },
  }),

  /**
   * 表示当前 {@link SceneMode} 的自动 GLSL uniform，表示为浮点数。
   *
   * @example
   * //GLSL声明
   * uniform浮动 czm_sceneMode;
   *
   * //例子
   * 如果（czm_sceneMode == czm_sceneMode2D）
   * {
   *     eyeHeightSq = czm_eyeHeight2D.y;
   * }
   *
   * @see czm_sceneMode2D
   * @see czm_sceneModeColumbusView
   * @see czm_sceneMode3D
   * @see czm_sceneModeMorphing
   */
  czm_sceneMode: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.frameState.mode;
    },
  }),

  /**
   * 表示当前渲染通道的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * uniform浮动 czm_pass;
   *
   * //例子
   * 如果 ((czm_pass == czm_passTranslucent) && isOpaque())
   * {
   *     gl_Position *= 0.0; //在半透明过程中剔除不透明几何体
   * }
   */
  czm_pass: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.pass;
    },
  }),

  /**
   * 表示当前场景背景颜色的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * uniform vec4 czm_backgroundColor;
   *
   * //示例：如果给定颜色的 RGB 与背景颜色匹配，则将其反转。
   * vec4 adjustColorForContrast(vec4 颜色)
   * {
   *     如果（czm_backgroundColor.rgb == color.rgb）
   *     {
   *         color.rgb = vec3(1.0) -color.rgb;
   *     }
   *
   *     返回颜色;
   * }
   */
  czm_backgroundColor: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC4,
    getValue: function (uniformState) {
      return uniformState.backgroundColor;
    },
  }),

  /**
   * 包含用于基于图像的照明计算的 BRDF 查找纹理的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * 均匀采样器 2D czm_brdfLut;
   *
   * //示例：对于给定的粗糙度和 NdotV 值，在红色和绿色通道中找到材质的 BRDF 信息
   * 浮动粗糙度= 0.5;
   * 浮动 NdotV = 点（正常，视图）;
   * vec2 brdfLut = texture(czm_brdfLut, vec2(NdotV, 1.0 -粗糙度)).rg;
   */
  czm_brdfLut: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.SAMPLER_2D,
    getValue: function (uniformState) {
      return uniformState.brdfLut;
    },
  }),

  /**
   * 包含场景中使用的环境贴图的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * uniform采样器立方体 czm_environmentMap;
   *
   * //示例：在模型上创建环境贴图的完美反射
   * 浮动反射=反射（视图，正常）;
   * vec4 reflectedColor = texture(czm_environmentMap, reflected);
   */
  czm_environmentMap: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.SAMPLER_CUBE,
    getValue: function (uniformState) {
      return uniformState.environmentMap;
    },
  }),

  /**
   * 包含场景中使用的高光环境地图集的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * 均匀采样器 2D czm_specularEnvironmentMaps;
   */
  czm_specularEnvironmentMaps: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.SAMPLER_2D,
    getValue: function (uniformState) {
      return uniformState.specularEnvironmentMaps;
    },
  }),

  /**
   * 包含场景中使用的镜面反射环境贴图集大小的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * uniform vec2 czm_specularEnvironmentMapSize;
   */
  czm_specularEnvironmentMapSize: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC2,
    getValue: function (uniformState) {
      return uniformState.specularEnvironmentMapsDimensions;
    },
  }),

  /**
   * 自动 GLSL uniform，包含场景中使用的镜面反射环境地图集的最大细节级别。
   *
   * @example
   * //GLSL声明
   * uniform浮动 czm_specularEnvironmentMapsMaximumLOD;
   */
  czm_specularEnvironmentMapsMaximumLOD: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.specularEnvironmentMapsMaximumLOD;
    },
  }),

  /**
   * 包含场景中使用的球谐系数的自动 GLSL uniform。
   *
   * @example
   * //GLSL声明
   * uniform vec3[9] czm_sphericalHarmonicCoefficients;
   */
  czm_sphericalHarmonicCoefficients: new AutomaticUniform({
    size: 9,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.sphericalHarmonicCoefficients;
    },
  }),

  /**
   * 表示 3x3 旋转矩阵的自动 GLSL uniform，该矩阵在当前场景时间从真赤道平分点 (TEME) 轴转换为伪固定轴。
   *
   * @example
   * //GLSL声明
   * uniform mat3 czm_temeToPseudoFixed;
   *
   * //例子
   * vec3 pseudoFixed = czm_temeToPseudoFixed *teme;
   *
   * @see UniformState#temeToPseudoFixedMatrix
   * @see Transforms.computeTemeToPseudoFixedMatrix
   */
  czm_temeToPseudoFixed: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_MAT3,
    getValue: function (uniformState) {
      return uniformState.temeToPseudoFixedMatrix;
    },
  }),

  /**
   * 表示画布坐标空间与画布像素空间比率的自动 GLSL uniform。
   *
   * @example
   * uniform浮动 czm_pixelRatio;
   */
  czm_pixelRatio: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.pixelRatio;
    },
  }),

  /**
   * 一种自动 GLSL uniform标量，用于根据到相机的距离将颜色与雾颜色混合。
   *
   * @see czm_fog
   */
  czm_fogDensity: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.fogDensity;
    },
  }),

  /**
   * 一个自动 GLSL uniform，表示使用分离器渲染时要使用的分离器位置。
   * 这将是相对于画布的像素坐标。
   *
   * @example
   * //GLSL声明
   * uniform浮动 czm_splitPosition;
   */
  czm_splitPosition: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.splitPosition;
    },
  }),

  /**
   * 表示每米几何公差的自动 GLSL uniform标量
   */
  czm_geometricToleranceOverMeter: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.geometricToleranceOverMeter;
    },
  }),

  /**
   * 一个自动 GLSL uniform，表示与相机的距离，在该距离处禁用广告牌、标签和点的深度测试，例如，防止剪裁地形。当设置为零时，应始终应用深度测试。当小于零时，永远不应该应用深度测试。
   */
  czm_minimumDisableDepthTestDistance: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.minimumDisableDepthTestDistance;
    },
  }),

  /**
   * 自动 GLSL uniform，将成为未分类 3D Tiles 的高亮颜色。
   */
  czm_invertClassificationColor: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC4,
    getValue: function (uniformState) {
      return uniformState.invertClassificationColor;
    },
  }),

  /**
   * 用于伽马校正的自动 GLSL uniform。
   */
  czm_gamma: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT,
    getValue: function (uniformState) {
      return uniformState.gamma;
    },
  }),

  /**
   * 存储椭球半径的自动 GLSL uniform。
   */
  czm_ellipsoidRadii: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.ellipsoid.radii;
    },
  }),

  /**
   * 存储椭圆体倒数半径的自动 GLSL uniform。
   */
  czm_ellipsoidInverseRadii: new AutomaticUniform({
    size: 1,
    datatype: WebGLConstants.FLOAT_VEC3,
    getValue: function (uniformState) {
      return uniformState.ellipsoid.oneOverRadii;
    },
  }),
};
export default AutomaticUniforms;
```
