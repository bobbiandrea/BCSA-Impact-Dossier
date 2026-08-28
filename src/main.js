/**
 * Bobbi Andrea — portfolio interaction layer.
 *
 * Everything here is an enhancement. No content depends on this file running:
 * the `js` class that hides revealed sections is added by an inline snippet in
 * each page head and removed again below if this script cannot do its job.
 */
(function () {
  'use strict';

  var root = document.documentElement;

  // Tell the inline head snippet that enhancement arrived, so its fail-open
  // timer stands down. Set before any other work so a later throw cannot
  // leave content hidden.
  root.setAttribute('data-enhanced', 'true');

  var reduceMotion = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  /* ── SAFETY NET ───────────────────────────────────────
     If anything below throws, drop the `js` class so every
     reveal-hidden section becomes visible again. */
  function failOpen(err) {
    root.classList.remove('js');
    if (window.console && console.warn) {
      console.warn('Enhancement failed; content shown unstyled by animation.', err);
    }
  }

  /* ── SCROLL REVEAL ────────────────────────────────── */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) || reduceMotion) {
      for (var i = 0; i < items.length; i++) items[i].classList.add('visible');
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    for (var j = 0; j < items.length; j++) observer.observe(items[j]);
  }

  /* ── WORK INDEX FILTERS ───────────────────────────────
     Progressive enhancement over markup that already lists
     every row. With JS off, all rows stay visible. */
  function initFilters() {
    var bar = document.querySelector('[data-filter-bar]');
    if (!bar) return;

    var buttons = bar.querySelectorAll('[data-filter]');
    var rows = document.querySelectorAll('[data-discipline]');
    if (!buttons.length || !rows.length) return;

    function apply(value) {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var match = value === 'all' || row.getAttribute('data-discipline') === value;
        if (match) {
          row.removeAttribute('hidden');
        } else {
          row.setAttribute('hidden', '');
        }
      }
      for (var j = 0; j < buttons.length; j++) {
        var isActive = buttons[j].getAttribute('data-filter') === value;
        buttons[j].setAttribute('aria-pressed', isActive ? 'true' : 'false');
      }
      var count = document.querySelector('[data-filter-count]');
      if (count) {
        var shown = 0;
        for (var k = 0; k < rows.length; k++) {
          if (!rows[k].hasAttribute('hidden')) shown++;
        }
        count.textContent = shown + ' of ' + rows.length + ' shown';
      }
    }

    for (var b = 0; b < buttons.length; b++) {
      buttons[b].addEventListener('click', function (event) {
        apply(event.currentTarget.getAttribute('data-filter'));
      });
    }

    apply('all');
  }

  /* ── HERO WEBGL ───────────────────────────────────────
     Purely atmospheric. Skipped entirely when Three.js is
     unavailable, when WebGL is unsupported, or when reduced
     motion is requested. Paused while off-screen. */
  function initHeroScenes() {
    var containers = document.querySelectorAll('[data-hero-canvas]');
    if (!containers.length) return;

    if (typeof THREE === 'undefined') return;

    if (!hasWebGL()) {
      for (var f = 0; f < containers.length; f++) {
        containers[f].innerHTML =
          '<p class="webgl-fallback">Atmospheric visual unavailable: WebGL not supported.</p>';
      }
      return;
    }

    var scenes = [];
    for (var i = 0; i < containers.length; i++) {
      var scene = buildScene(containers[i]);
      if (scene) scenes.push(scene);
    }
    if (!scenes.length) return;

    if (reduceMotion) {
      scenes.forEach(function (s) { s.renderer.render(s.scene, s.camera); });
      return;
    }

    var running = true;
    var clock = new THREE.Clock();

    function frame() {
      if (!running) return;
      window.requestAnimationFrame(frame);
      var t = clock.getElapsedTime();
      scenes.forEach(function (s) {
        s.points.rotation.y = t * s.speed;
        s.points.rotation.x = t * s.speed * 0.4;
        s.renderer.render(s.scene, s.camera);
      });
    }
    frame();

    // Pause when the hero leaves the viewport.
    var hero = document.querySelector('[data-hero]');
    if (hero && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        var visible = entries[0].isIntersecting;
        if (visible && !running) {
          running = true;
          frame();
        } else if (!visible) {
          running = false;
        }
      }, { threshold: 0 }).observe(hero);
    }

    window.addEventListener('resize', function () {
      scenes.forEach(function (s) {
        var w = s.container.clientWidth;
        var h = s.container.clientHeight;
        if (!w || !h) return;
        s.renderer.setSize(w, h);
        s.camera.aspect = w / h;
        s.camera.updateProjectionMatrix();
      });
    });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        running = false;
      } else if (!running) {
        running = true;
        frame();
      }
    });
  }

  function hasWebGL() {
    try {
      var canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch (e) {
      return false;
    }
  }

  function buildScene(container) {
    var width = container.clientWidth;
    var height = container.clientHeight;
    if (!width || !height) return null;

    var colour = container.getAttribute('data-colour') || '#0A0B0D';
    var form = container.getAttribute('data-form') || 'field';

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.5;

    var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    var geometry;
    if (form === 'structured') {
      var source = new THREE.TorusKnotGeometry(1.25, 0.4, 180, 28, 2, 3);
      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', source.getAttribute('position'));
    } else {
      geometry = new THREE.BufferGeometry();
      var count = window.innerWidth < 768 ? 3200 : 8000;
      var positions = new Float32Array(count * 3);
      for (var i = 0; i < count * 3; i += 3) {
        var theta = 2 * Math.PI * Math.random();
        var phi = Math.acos(2 * Math.random() - 1);
        var r = 1.9 * Math.cbrt(Math.random());
        positions[i] = r * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = r * Math.cos(phi);
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }

    var material = new THREE.PointsMaterial({
      color: new THREE.Color(colour),
      size: 0.015,
      transparent: true,
      opacity: 0.32,
      sizeAttenuation: true
    });

    var points = new THREE.Points(geometry, material);
    points.rotation.x = Math.random() * Math.PI;
    points.rotation.y = Math.random() * Math.PI;
    scene.add(points);

    return {
      container: container,
      scene: scene,
      camera: camera,
      renderer: renderer,
      points: points,
      speed: form === 'structured' ? 0.05 : -0.04
    };
  }

  /* ── BOOT ─────────────────────────────────────────── */
  function boot() {
    try {
      initReveal();
      initFilters();
      initHeroScenes();
    } catch (err) {
      failOpen(err);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // If the stylesheet hid content but this script never got far enough to
  // reveal it, fail open once the page has finished loading.
  window.addEventListener('load', function () {
    var hidden = document.querySelectorAll('.reveal:not(.visible)');
    if (hidden.length && !document.querySelector('.reveal.visible')) {
      root.classList.remove('js');
    }
  });
})();
