import Phaser from 'phaser'

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        const map = this.createMap()
        const layers = this.createLayers(map)

        const player = this.createPlayer();
        this.physics.add.collider(player, layers.platforms)
    }

    createMap() {
        const map = this.make.tilemap({key: 'map'})
        map.addTilesetImage('main_lev_build_1', 'tiles-1')

        return map;
    }

    createLayers(map) {
        const tileSet = map.getTileset('main_lev_build_1')

        const envLayer = map.createLayer('environments', tileSet)
        const platforms = map.createLayer('platforms', tileSet)

        // -1 is intended for collide only with layers that have more than 0 zindex
        platforms.setCollisionByExclusion(-1, true)

        return { envLayer, platforms }
    }

    createPlayer() {
        const player = this.physics.add.sprite(180, 300, 'player')
        player.body.setGravityY(500);
        player.setCollideWorldBounds(true)

        return player;
    }
}

export default Play;