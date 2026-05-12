/**
 * BCSA x QUANTUM - Main Logic 2025
 * Includes: Dither Shader, Scroll Reveal, Lightbox, Counter
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── ARCHITECTURAL WEBGL FUSION (HERO) ────────────────────── */
  const config = {
    colors: {
      bg: 0xF8FAFC,
      left: 0x0052FF, // Base Blue
      right: 0x0A0B0D // Corporate Black
    },
    particles: {
      count: 10000,
      size: 0.015
    }
  };

  function createScene(containerId, colorHex, geometryType) {
    const container = document.getElementById(containerId);
    if (!container) return null;
    
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    // scene.fog = new THREE.FogExp2(config.colors.bg, 0.15);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    let geometry;
    if (geometryType === 'structured') {
      geometry = new THREE.TorusKnotGeometry(1.2, 0.4, 200, 32, 2, 3);
    } else {
      geometry = new THREE.BufferGeometry();
      // Performance Hardening: Reduce particles on small screens
      const particleCount = window.innerWidth < 768 ? Math.floor(config.particles.count * 0.4) : config.particles.count;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        const u = Math.random();
        const v = Math.random();
        const theta = 2 * Math.PI * u;
        const phi = Math.acos(2 * v - 1);
        const r = 1.8 * Math.cbrt(Math.random());
        const offset = i % 2 === 0 ? 0.6 : -0.6;
        positions[i] = r * Math.sin(phi) * Math.cos(theta) + offset;
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = r * Math.cos(phi);
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }

    let pointGeometry;
    if (geometryType === 'structured') {
      const posAttribute = geometry.getAttribute('position');
      pointGeometry = new THREE.BufferGeometry();
      pointGeometry.setAttribute('position', posAttribute);
    } else {
      pointGeometry = geometry;
    }

    const material = new THREE.PointsMaterial({
      color: colorHex,
      size: config.particles.size,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true
    });

    const points = new THREE.Points(pointGeometry, material);
    points.rotation.x = Math.random() * Math.PI;
    points.rotation.y = Math.random() * Math.PI;
    scene.add(points);

    return { scene, camera, renderer, points, container };
  }

  const sceneLeft = createScene('canvas-left', config.colors.left, 'structured');
  const sceneRight = createScene('canvas-right', config.colors.right, 'dynamic');
  const sceneEcosystem = createEcosystemMap('webgl-ecosystem-map', 0x0052FF, 4000);
  
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    
    if (sceneLeft) {
      sceneLeft.points.rotation.y = elapsedTime * 0.05;
      sceneLeft.points.rotation.x = elapsedTime * 0.025;
      sceneLeft.renderer.render(sceneLeft.scene, sceneLeft.camera);
    }
    
    if (sceneRight) {
      sceneRight.points.rotation.y = elapsedTime * -0.06;
      sceneRight.points.rotation.z = Math.sin(elapsedTime * 0.1) * 0.2;
      sceneRight.renderer.render(sceneRight.scene, sceneRight.camera);
    }
  }

  animate();

  window.addEventListener('resize', () => {
    [sceneLeft, sceneRight].forEach(s => {
      if (s) {
        const width = s.container.clientWidth;
        const height = s.container.clientHeight;
        s.renderer.setSize(width, height);
        s.camera.aspect = width / height;
        s.camera.updateProjectionMatrix();
      }
    });
  });

  /* ── DIGITAL INFRASTRUCTURE NETWORK ─────────────────────── */
  // BCSA Ecosystem Map
  function createEcosystemMap(containerId, color, count) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    // Performance Hardening: Reduce particles on small screens
    const particleCount = window.innerWidth < 768 ? Math.floor(count * 0.4) : count;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < particleCount; i++) {
      vertices.push((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({ color: color, size: 0.1 });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 5;

    function animateMap() {
      requestAnimationFrame(animateMap);
      points.rotation.x += 0.001;
      points.rotation.y += 0.002;
      renderer.render(scene, camera);
    }
    animateMap();

    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    return { scene, camera, renderer, points, container };
  }

  const netContainer = document.getElementById('webgl-canvas-network');
  if (netContainer) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, netContainer.clientWidth / netContainer.clientHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(netContainer.clientWidth, netContainer.clientHeight);
    netContainer.appendChild(renderer.domElement);

    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(1.2, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x0052FF });
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0052FF, transparent: true, opacity: 0.2 });

    for (let i = 0; i < 8; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.set((Math.random() - 0.5) * 120, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 40);
      scene.add(node);
      nodes.push(node);
    }

    const linePoints = [];
    nodes.forEach(n1 => {
      nodes.forEach(n2 => {
        if (n1 !== n2 && Math.random() > 0.7) {
          const geometry = new THREE.BufferGeometry().setFromPoints([n1.position, n2.position]);
          const line = new THREE.Line(geometry, lineMaterial);
          scene.add(line);
        }
      });
    });

    function animNet() {
      requestAnimationFrame(animNet);
      scene.rotation.y += 0.002;
      renderer.render(scene, camera);
    }
    animNet();
  }

  /* ── SCROLL REVEAL ───────────────────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // If it contains a counter, trigger it
        entry.target.querySelectorAll('.counter, .stat-num').forEach(countUp);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── COUNTER LOGIC ───────────────────────────────────── */
  function countUp(el) {
    if (el.dataset.running) return;
    el.dataset.running = "true";
    el.innerText = '0';

    const updateCounter = () => {
      const target = +el.getAttribute('data-target');
      const c = +el.innerText;
      const increment = target / 100;

      if (c < target) {
        el.innerText = `${Math.ceil(c + increment)}`;
        setTimeout(updateCounter, 20);
      } else {
        el.innerText = target;
      }
    };

    updateCounter();
  }

  /* ── LIGHTBOX ────────────────────────────────────────── */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCounter = document.getElementById('lb-counter');
  let galleryImages = [];
  let currentIndex = 0;

  window.openLightbox = function (item) {
    const clickedImg = item.querySelector('img');
    const allGalleryItems = document.querySelectorAll('.gallery-item img');
    galleryImages = Array.from(allGalleryItems).map(img => img.src);
    currentIndex = galleryImages.indexOf(clickedImg.src);

    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function () {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  window.lbNext = function () {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightbox();
  };

  window.lbPrev = function () {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
  };

  function updateLightbox() {
    lbImg.src = galleryImages[currentIndex];
    lbCounter.innerText = `${currentIndex + 1} / ${galleryImages.length}`;
  }

  // Close on escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (lightbox.classList.contains('open')) {
      if (e.key === 'ArrowRight') lbNext();
      if (e.key === 'ArrowLeft') lbPrev();
    }
  });

  /* ── COUNCIL TABS ───────────────────────────────────── */
  window.switchTab = function (id) {
    document.querySelectorAll('.q-tab, .q-tabs .btn-pill').forEach((tab) => {
      tab.classList.remove('active');
    });
    const clickedTab = event.currentTarget;
    if (clickedTab) clickedTab.classList.add('active');

    document.querySelectorAll('.q-panel').forEach((panel) => {
      panel.classList.remove('active');
    });
    const panel = document.getElementById(id);
    if (panel) panel.classList.add('active');
  };

});
