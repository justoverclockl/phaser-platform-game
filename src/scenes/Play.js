import Phaser from 'phaser'

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        const map = this.make.tilemap({key: 'map'})
        const tileSet1 = map.addTilesetImage('main_lev_build_1', 'tiles-1')
        const tileSet2 = map.addTilesetImage('main_lev_build_2', 'tiles-2')


        map.createLayer('platforms', tileSet1)
        map.createLayer('environments', tileSet1)
    }
}

export default Play;