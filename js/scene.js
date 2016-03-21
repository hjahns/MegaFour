
// Get the canvas element from our HTML above
var canvas = document.getElementById("renderCanvas");

// Load the BABYLON 3D engine
var engine = new BABYLON.Engine(canvas, true);

// This begins the creation of a function that we will 'call' just after it's built
var createScene = function () {

    // Now create a basic Babylon Scene object
    var scene = new BABYLON.Scene(engine);

    // Change the scene background color to black.
    scene.clearColor = new BABYLON.Color3(0.9, 0.9, 0.9);

    // This creates and positions a free camera
    //var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10, -15), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 30, new BABYLON.Vector3.Zero(), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, false);

    // This creates a light, aiming 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

    // Dim the light a small amount
    light.intensity = .5;

    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    //var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

    var dimensions = 4;
    var expander = 3;

    for (var x = 1; x <= 4; x++)
    {
        for (var y = 1; y <= 4; y++)
        {
            for (var z = 1; z <= 4; z++)
            {
                var box = BABYLON.Mesh.CreateBox("box-" + x + y + z, 1.0, scene, false, BABYLON.Mesh.DEFAULTSIDE);
                box.position.x = x * expander - (dimensions*2);
                box.position.y = y * expander - (dimensions*2);
                box.position.z = z * expander - (dimensions*2);
                var material = new BABYLON.StandardMaterial("material-" + x + y + z, scene);
                material.alpha = 0.5;
                material.diffuseColor = new BABYLON.Color3(170/255, 170/255, 170/255);
                box.material = material;
            }
        }
    }
    // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    //var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
    light0.diffuse = new BABYLON.Color3(1, 1, 1);
    light0.specular = new BABYLON.Color3(1, 1, 1);
    light0.groundColor = new BABYLON.Color3(0, 0, 0);

    // Leave this function
    return scene;

};  // End of createScene function
// Now, call the createScene function that you just finished creating
var scene = createScene();
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {

    // simulate hover effect for cubes and start by resetting each loop
    for (var i = 0; i < scene.meshes.length; i++)
    {
        var mesh = scene.meshes[i];
        var indexesString = mesh.name.split('-').pop();
        var x = indexesString[0];
        var y = indexesString[1];
        var z = indexesString[2];

        if (!megaFour.valueIsSet(x, y, z)){

            scene.meshes[i].material.alpha = 0.5;
        }
    }
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    if (pickResult.hit) {
        pickResult.pickedMesh.material.alpha = 1;
    }
    scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});

//When click event is raised
window.addEventListener("click", function () {
    // We try to pick an object
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    if (pickResult.hit) {
        var name = pickResult.pickedMesh.name;
        var indexesString = name.split('-').pop();
        var x = indexesString[0];
        var y = indexesString[1];
        var z = indexesString[2];
        megaFour.action(x, y, z, pickResult);
    }
});