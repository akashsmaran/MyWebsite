//import MTLLoader from "three-mtl-loader";
//COLORS
var Colors = {
  red: 0xf25346,
  white: 0xd8d0d1,
  pink: 0xf5986e,
  brown: 0x59332e,
  brownDark: 0x23190f,
  blue: 0x68c3c0
};

// THREEJS RELATED VARIABLES

var scene,
  camera,
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane,
  renderer,
  container;

//SCREEN VARIABLES

var HEIGHT, WIDTH;

//INIT THREE JS, SCREEN AND MOUSE EVENTS

function createScene() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();
  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = 100;

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.shadowMap.enabled = true;
  container = document.getElementById("world");
  container.appendChild(renderer.domElement);

  window.addEventListener("resize", handleWindowResize, false);
}

// HANDLE SCREEN EVENTS

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

// LIGHTS

var ambientLight, hemisphereLight, shadowLight;

function createLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

  ambientLight = new THREE.AmbientLight(0xdc8874, 0.5);

  shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
  shadowLight.position.set(150, 350, 350);
  shadowLight.castShadow = true;
  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;
  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
  scene.add(ambientLight);
}

Sky = function() {
  this.mesh = new THREE.Object3D();
  this.nClouds = 20;
  this.clouds = [];
  var stepAngle = (Math.PI * 2) / this.nClouds;
  for (var i = 0; i < this.nClouds; i++) {
    var c = new Cloud();
    this.clouds.push(c);
    var a = stepAngle * i;
    var h = 750 + Math.random() * 200;
    c.mesh.position.y = Math.sin(a) * h;
    c.mesh.position.x = Math.cos(a) * h;
    c.mesh.position.z = -500 - Math.random() * 400;
    c.mesh.rotation.z = a + Math.PI / 2;
    var s = 1 + Math.random() * 2;
    c.mesh.scale.set(s, s, s);
    this.mesh.add(c.mesh);
  }
};

Sea = function() {
  var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
  geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
  geom.mergeVertices();
  var l = geom.vertices.length;

  this.waves = [];

  for (var i = 0; i < l; i++) {
    var v = geom.vertices[i];
    this.waves.push({
      y: v.y,
      x: v.x,
      z: v.z,
      ang: Math.random() * Math.PI * 2,
      amp: 5 + Math.random() * 15,
      speed: 0.016 + Math.random() * 0.032
    });
  }
  var mat = new THREE.MeshPhongMaterial({
    color: Colors.blue,
    transparent: false,
    opacity: 0.8,
    shading: THREE.FlatShading
  });

  this.mesh = new THREE.Mesh(geom, mat);
  this.mesh.receiveShadow = true;
};

Sea.prototype.moveWaves = function() {
  var verts = this.mesh.geometry.vertices;
  var l = verts.length;
  for (var i = 0; i < l; i++) {
    var v = verts[i];
    var vprops = this.waves[i];
    v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
    v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
    vprops.ang += vprops.speed;
  }
  this.mesh.geometry.verticesNeedUpdate = true;
  sea.mesh.rotation.z += 0.005;
};

Cloud = function() {
  this.mesh = new THREE.Object3D();
  this.mesh.name = "cloud";
  var geom = new THREE.CubeGeometry(20, 20, 20);
  var mat = new THREE.MeshPhongMaterial({
    color: Colors.white
  });

  var nBlocs = 3 + Math.floor(Math.random() * 3);
  for (var i = 0; i < nBlocs; i++) {
    var m = new THREE.Mesh(geom.clone(), mat);
    m.position.x = i * 15;
    m.position.y = Math.random() * 10;
    m.position.z = Math.random() * 10;
    m.rotation.z = Math.random() * Math.PI * 2;
    m.rotation.y = Math.random() * Math.PI * 2;
    var s = 0.1 + Math.random() * 0.9;
    m.scale.set(s, s, s);
    m.castShadow = true;
    m.receiveShadow = true;
    this.mesh.add(m);
  }
};

// 3D Models
var sea;
var airplane;

function createSea() {
  sea = new Sea();
  sea.mesh.position.y = -600;
  scene.add(sea.mesh);
}

function createSky() {
  sky = new Sky();
  sky.mesh.position.y = -600;
  scene.add(sky.mesh);
}

function loop() {
  //updateCameraFov();
  sea.moveWaves();
  sky.mesh.rotation.z += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

function init(event) {
  //document.addEventListener("mousemove", handleMouseMove, false);
  createScene();
  createLights();
  createSea();
  createSky();
  loop();
}

// HANDLE MOUSE EVENTS
window.addEventListener("load", init, false);

function x() {
  setTimeout(function() {
    init(this), 2000;
  });
  var Colors = {
    red: 0xf25346,
    white: 0xd8d0d1,
    pink: 0xf5986e,
    brown: 0x59332e,
    brownDark: 0x23190f,
    blue: 0x68c3c0
  };

  // THREEJS RELATED VARIABLES

  var scene,
    camera,
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
    renderer,
    container;

  //SCREEN VARIABLES

  var HEIGHT, WIDTH;
  let humanModel = null;
  let OBJLoader = new THREE.OBJLoader();
  //INIT THREE JS, SCREEN AND MOUSE EVENTS

  function createScene() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    if (WIDTH > 768) {
      WIDTH = WIDTH / 2;
    } else {
      HEIGHT = HEIGHT / 2;
    }
    scene = new THREE.Scene();
    aspectRatio = WIDTH / HEIGHT;
    fieldOfView = 60;
    nearPlane = 1;
    farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    camera.position.x = 0;
    camera.position.z = 10; //50
    camera.position.y = 53; //120

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    container = document.querySelector(".hidden_page-model");
    container.appendChild(renderer.domElement);
    /*
    var loader = new THREE.OBJLoader();

    loader.load(
      // resource URL
      //"Cadnav.com_B0426014.obj",
      //"Rock_9.OBJ",
      "trophyobjectfile.obj",
      // called when resource is loaded
      function(object) {
        object.position.set(0, 50, 0);
        object.rotation.x = Math.PI / 60;
        scene.add(object);
        humanModel = object;
      }
    );
    */

    var humanModelPromise = loadObj(
      "models/trophyobjectfile.obj",
      "models/trophyobjectfile.mtl"
    );

    humanModelPromise.then(object => {
      object.position.set(0, 50, 0);
      object.rotation.x = Math.PI / 60;
      humanModel = object; //adding the humanModel to the global variable
      //a = true;
      //humanModel.add(clothModel);
      scene.add(humanModel);
      // return object;
    });

    window.addEventListener("resize", handleWindowResize, false);
  }

  function loadObj(modelPath, materialPath) {
    var progress = console.log;

    return new Promise(function(resolve, reject) {
      var mtlLoader = new THREE.MTLLoader();
      console.log(materialPath);
      mtlLoader.load(
        materialPath,
        function(materials) {
          materials.preload();

          OBJLoader.setMaterials(materials);
          OBJLoader.load(modelPath, resolve, progress, reject);
        },
        progress,
        reject
      );
    });
  }

  // HANDLE SCREEN EVENTS

  function handleWindowResize() {
    HEIGHT = window.innerHeight;
    WIDTH = window.innerWidth;
    if (WIDTH > 768) {
      WIDTH = WIDTH / 2;
    } else {
      HEIGHT = HEIGHT / 2;
    }
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  }

  var ambientLight, hemisphereLight, shadowLight;

  function createLights() {
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);

    ambientLight = new THREE.AmbientLight(0xdc8874, 0.5);

    shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);
    shadowLight.position.set(150, 350, 350);
    shadowLight.castShadow = true;
    shadowLight.shadow.camera.left = -400;
    shadowLight.shadow.camera.right = 400;
    shadowLight.shadow.camera.top = 400;
    shadowLight.shadow.camera.bottom = -400;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    scene.add(hemisphereLight);
    scene.add(shadowLight);
    scene.add(ambientLight);
  }

  var rotWorldMatrix;
  // Rotate an object around an arbitrary axis in world space
  function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

    // old code for Three.JS pre r54:
    //  rotWorldMatrix.multiply(object.matrix);
    // new code for Three.JS r55+:
    rotWorldMatrix.multiply(object.matrix); // pre-multiply

    object.matrix = rotWorldMatrix;

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // old code for Three.js pre r59:
    // object.rotation.setEulerFromRotationMatrix(object.matrix);
    // code for r59+:
    object.rotation.setFromRotationMatrix(object.matrix);
  }

  /*
  Sky = function() {
    this.mesh = new THREE.Object3D();
    this.nClouds = 20;
    this.clouds = [];
    var stepAngle = (Math.PI * 2) / this.nClouds;
    for (var i = 0; i < this.nClouds; i++) {
      var c = new Cloud();
      this.clouds.push(c);
      var a = stepAngle * i;
      var h = 750 + Math.random() * 200;
      c.mesh.position.y = Math.sin(a) * h;
      c.mesh.position.x = Math.cos(a) * h;
      c.mesh.position.z = -500 - Math.random() * 400;
      c.mesh.rotation.z = a + Math.PI / 2;
      var s = 1 + Math.random() * 2;
      c.mesh.scale.set(s, s, s);
      this.mesh.add(c.mesh);
    }
  };

  Sea = function() {
    var geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
    geom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
    geom.mergeVertices();
    var l = geom.vertices.length;

    this.waves = [];

    for (var i = 0; i < l; i++) {
      var v = geom.vertices[i];
      this.waves.push({
        y: v.y,
        x: v.x,
        z: v.z,
        ang: Math.random() * Math.PI * 2,
        amp: 5 + Math.random() * 15,
        speed: 0.016 + Math.random() * 0.032
      });
    }
    var mat = new THREE.MeshPhongMaterial({
      color: Colors.blue,
      transparent: false,
      opacity: 0.8,
      shading: THREE.FlatShading
    });

    this.mesh = new THREE.Mesh(geom, mat);
    this.mesh.receiveShadow = true;
  };

  Sea.prototype.moveWaves = function() {
    var verts = this.mesh.geometry.vertices;
    var l = verts.length;
    for (var i = 0; i < l; i++) {
      var v = verts[i];
      var vprops = this.waves[i];
      v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp;
      v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp;
      vprops.ang += vprops.speed;
    }
    this.mesh.geometry.verticesNeedUpdate = true;
    sea.mesh.rotation.z += 0.005;
  };

  Cloud = function() {
    this.mesh = new THREE.Object3D();
    this.mesh.name = "cloud";
    var geom = new THREE.CubeGeometry(20, 20, 20);
    var mat = new THREE.MeshPhongMaterial({
      color: Colors.white
    });

    var nBlocs = 3 + Math.floor(Math.random() * 3);
    for (var i = 0; i < nBlocs; i++) {
      var m = new THREE.Mesh(geom.clone(), mat);
      m.position.x = i * 15;
      m.position.y = Math.random() * 10;
      m.position.z = Math.random() * 10;
      m.rotation.z = Math.random() * Math.PI * 2;
      m.rotation.y = Math.random() * Math.PI * 2;
      var s = 0.1 + Math.random() * 0.9;
      m.scale.set(s, s, s);
      m.castShadow = true;
      m.receiveShadow = true;
      this.mesh.add(m);
    }
  };

  // 3D Models
  var sea;
  var airplane;

  function createSea() {
    sea = new Sea();
    sea.mesh.position.y = -600;
    scene.add(sea.mesh);
  }

  function createSky() {
    sky = new Sky();
    sky.mesh.position.y = -600;
    scene.add(sky.mesh);
  }
  */
  function loop() {
    //updateCameraFov();
    //sea.moveWaves();
    //sky.mesh.rotation.z += 0.01;
    var xAxis = new THREE.Vector3(0, 1, 0);
    if (humanModel != null) {
      rotateAroundWorldAxis(humanModel, xAxis, Math.PI / 180);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }

  function init(event) {
    //document.addEventListener("mousemove", handleMouseMove, false);
    createScene();
    createLights();
    //createSea();
    //createSky();
    loop();
  }

  // HANDLE MOUSE EVENTS
  window.addEventListener("load", init, false);
}
