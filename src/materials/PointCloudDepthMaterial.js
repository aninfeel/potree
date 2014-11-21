
Potree.PointCloudDepthMaterial = function(parameters){
	parameters = parameters || {};
	
	var attributes = {};
	var uniforms = {
		color:   { type: "c", value: new THREE.Color( 0xffffff ) },
		size:   { type: "f", value: 10 },
		minSize:   { type: "f", value: 2 }
	};
	
	var pointSize = parameters.size || 1.0;
	var minSize = parameters.minSize || 2.0;
	
	this.setValues({
		uniforms: uniforms,
		attributes: attributes,
		vertexShader: Potree.PointCloudDepthMaterial.vs_points.join("\n"),
		fragmentShader: Potree.PointCloudDepthMaterial.fs_points_rgb.join("\n"),
		vertexColors: THREE.VertexColors,
		size: pointSize,
		minSize: minSize,
		alphaTest: 0.9,
	});
};

Potree.PointCloudDepthMaterial.prototype = new THREE.ShaderMaterial();

Object.defineProperty(Potree.PointCloudDepthMaterial.prototype, "size", {
	get: function(){
		return this.uniforms.size.value;
	},
	set: function(value){
		this.uniforms.size.value = value;
	}
});

Object.defineProperty(Potree.PointCloudDepthMaterial.prototype, "minSize", {
	get: function(){
		return this.uniforms.minSize.value;
	},
	set: function(value){
		this.uniforms.minSize.value = value;
	}
});

Potree.PointCloudDepthMaterial.vs_points = [
 "uniform float size;                                          ",
 "uniform float minSize;                                          ",
 "varying vec3 vColor;                                         ",
 "                                                             ",
 "void main() {                                                ",
 "	vColor = color;                                            ",
 "	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 ); ",
 "                                                             ",
 "	gl_PointSize = size * ( 300.0 / length( mvPosition.xyz ) );      ",
 "	gl_PointSize = max(minSize, gl_PointSize);      ",
 "	gl_Position = projectionMatrix * mvPosition;               ",
 "}                                                            "];

Potree.PointCloudDepthMaterial.fs_points_rgb = [
 "varying vec3 vColor;                                         ",
 "                                                             ",
 "void main() {                                                ",
 "	                                                           ",
 "	//float a = pow(2.0*(gl_PointCoord.x - 0.5), 2.0);           ",
 "	//float b = pow(2.0*(gl_PointCoord.y - 0.5), 2.0);           ",
 "	//float c = 1.0 - (a + b);                                   ",
 "  //                                                           ",
 "	//if(c < 0.0){                                               ",
 "	//	discard;                                               ",
 "	//}                                                          ",
 "	                                                         ",
 "	                                                         ",
 "	float depth = gl_FragCoord.z * gl_FragCoord.w;                                                         ",
 "	depth = depth - 0.12;                                                         ",
 "	vec3 col = vec3(1.0, 1.0, 1.0) * depth * 10.0;                                                           ",
 "	gl_FragColor = vec4(col, 1.0);                          ",
 "}                                                            "];













