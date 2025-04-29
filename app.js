// Crear la escena de Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Crear el renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Agregar una luz ambiental
const light = new THREE.AmbientLight(0x404040); // luz suave
scene.add(light);

// Agregar una luz direccional para iluminación más fuerte
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Cargar el archivo .obj usando el OBJLoader
const loader = new THREE.OBJLoader();
loader.load('models/SHC Free Modular Shed with interior EXPORT.obj', function (object) {
    scene.add(object); // Agregar el objeto 3D a la escena
    object.position.set(0, 0, 0); // Puedes ajustar la posición según lo necesites
}, undefined, function (error) {
    console.error('Se produjo un error al cargar el modelo:', error);
});

// Ajustar la cámara para que vea correctamente el objeto
camera.position.z = 5;

// Función de animación
function animate() {
    requestAnimationFrame(animate);

    // Rotar el objeto para que se vea en movimiento
    scene.traverse(function (object) {
        if (object instanceof THREE.Mesh) {
            object.rotation.x += 0.01;
            object.rotation.y += 0.01;
        }
    });

    renderer.render(scene, camera);
}

// Llamar a la función de animación
animate();

// Ajustar el tamaño del renderizador si se redimensiona la ventana
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
