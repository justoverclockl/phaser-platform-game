import Phaser from 'phaser'

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        const map = this.createMap()
        const layers = this.createLayers(map)
    }

    createMap() {
        const map = this.make.tilemap({key: 'map'})
        map.addTilesetImage('main_lev_build_1', 'tiles-1')

        return map;
    }

    createLayers(map) {
        const tileSet = map.getTileset('main_lev_build_1')
        const envLayer = map.createLayer('platforms', tileSet)
        const platforms = map.createLayer('environments', tileSet)

        return { envLayer, platforms }
    }
}

export default Play;