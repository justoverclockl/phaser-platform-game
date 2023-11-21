import Phaser from 'phaser'
import Play from "./scenes/Play";
import Preload from "./scenes/Preload";

const WIDTH = 1280;
const HEIGHT = 600;
const MAP_WIDTH = 1600;

const SHARED_CONFIG = {
  mapOffset: MAP_WIDTH > WIDTH ? MAP_WIDTH - WIDTH : 0,
  width: document.body.offsetWidth,
  height: HEIGHT,
  zoomFactor: 1.3
}

const Scenes = [Preload, Play];
const createScene = Scene => new Scene(SHARED_CONFIG)
const initScenes = () => Scenes.map(createScene)


const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: initScenes()
}



new Phaser.Game(config)