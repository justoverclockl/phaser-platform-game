import Phaser from 'phaser'

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        const map = this.createMap()
        const layers = this.createLayers(map)

        const player = this.createPlayer();
        this.physics.add.collider(player, layers.platformColliders)
    }

    createMap() {
        const map = this.make.tilemap({key: 'map'})
        map.addTilesetImage('main_lev_build_1', 'tiles-1')

        return map;
    }

    createLayers(map) {
        const tileSet = map.getTileset('main_lev_build_1')

        const platformColliders = map.createLayer('platform_colliders', tileSet).setAlpha(0)
        const envLayer = map.createLayer('environments', tileSet)
        const platforms = map.createLayer('platforms', tileSet)


        // -1 is intended for collide only with layers that have more than 0 zindex
        platformColliders.setCollisionByExclusion(-1, true)

        return { envLayer, platforms, platformColliders }
    }

    createPlayer() {
        const player = this.physics.add.sprite(180, 250, 'player')
        player.body.setGravityY(500);
        player.setCollideWorldBounds(true)

        return player;
    }
}

export default Play;