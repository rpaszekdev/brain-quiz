import * as THREE from "three";

/**
 * Orientation gizmo — a small separate scene + camera that renders
 * in an overlay canvas. Mirrors the main camera's rotation to show
 * anatomical directions.
 *
 * FreeSurfer surface coordinates:
 *   X: Left ↔ Right        (Red)
 *   Y: Posterior ↔ Anterior (Blue)
 *   Z: Inferior ↔ Superior  (Green)
 */

interface AxisDef {
  dir: THREE.Vector3;
  color: number;
  posLabel: string;
  posDef: string;
  negLabel: string;
  negDef: string;
}

const AXES: AxisDef[] = [
  {
    dir: new THREE.Vector3(1, 0, 0),
    color: 0xe74c3c,
    posLabel: "Right",
    posDef: "right side",
    negLabel: "Left",
    negDef: "left side",
  },
  {
    dir: new THREE.Vector3(0, 1, 0),
    color: 0x3498db,
    posLabel: "Anterior",
    posDef: "toward face",
    negLabel: "Posterior",
    negDef: "toward back",
  },
  {
    dir: new THREE.Vector3(0, 0, 1),
    color: 0x2ecc71,
    posLabel: "Superior",
    posDef: "toward top",
    negLabel: "Inferior",
    negDef: "toward bottom",
  },
];

export class OrientationGizmo {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;

  constructor(canvas: HTMLCanvasElement) {
    const size = canvas.width;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(size, size);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    this.camera.position.set(0, 0, 6);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.8));

    this.buildAxes();
  }

  private buildAxes() {
    const len = 1.5;

    for (const { dir, color, posLabel, posDef, negLabel, negDef } of AXES) {
      // Line
      const points = [
        dir.clone().multiplyScalar(-len * 0.4),
        dir.clone().multiplyScalar(len),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({ color, linewidth: 2 });
      this.scene.add(new THREE.Line(geo, mat));

      // Arrow cone at positive end
      const coneGeo = new THREE.ConeGeometry(0.08, 0.25, 8);
      const coneMat = new THREE.MeshBasicMaterial({ color });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.copy(dir.clone().multiplyScalar(len));
      cone.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().normalize(),
      );
      this.scene.add(cone);

      // Positive label (full word + definition)
      const posSprite = this.makeLabel(posLabel, posDef, color, 1.0);
      posSprite.position.copy(dir.clone().multiplyScalar(len + 0.5));
      this.scene.add(posSprite);

      // Negative label (dimmer)
      const negSprite = this.makeLabel(negLabel, negDef, color, 0.35);
      negSprite.position.copy(dir.clone().multiplyScalar(-len * 0.4 - 0.5));
      this.scene.add(negSprite);
    }

    // Origin dot
    const dotGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x888888 });
    this.scene.add(new THREE.Mesh(dotGeo, dotMat));
  }

  private makeLabel(
    term: string,
    definition: string,
    color: number,
    alpha: number,
  ): THREE.Sprite {
    const canvas = document.createElement("canvas");
    const w = 256;
    const h = 80;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;

    ctx.clearRect(0, 0, w, h);

    // Background pill
    const hex = `#${color.toString(16).padStart(6, "0")}`;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = hex;
    ctx.beginPath();
    ctx.roundRect(8, 4, w - 16, h - 8, 10);
    ctx.fill();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Term (bold, large)
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#fff";
    ctx.font = "bold 30px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(term, w / 2, h / 2 - 10);

    // Definition (small, lighter)
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.font = "18px system-ui, sans-serif";
    ctx.fillText(definition, w / 2, h / 2 + 16);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthTest: false,
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(0.9, 0.28, 1);
    return sprite;
  }

  /**
   * Call each frame — copies the main camera's rotation
   * but keeps the gizmo camera at a fixed distance.
   */
  update(mainCamera: THREE.Camera) {
    const direction = new THREE.Vector3();
    mainCamera.getWorldDirection(direction);

    this.camera.position.copy(direction.multiplyScalar(-6));
    this.camera.lookAt(0, 0, 0);
    this.camera.up.copy(mainCamera.up);

    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.renderer.dispose();
  }
}
