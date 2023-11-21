import Phaser from 'phaser'
import Player from "../entities/Player";

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);

        this.player = this.createPlayer();

        this.playerSpeed = 200;
        this.physics.add.collider(this.player, layers.platformColliders);
        this.cursors = this.input.keyboard.createCursorKeys();
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
        const player = new Player(this, 180, 250)
        player.body.setGravityY(500);
        player.setCollideWorldBounds(true)

        return player;
    }

    update() {
        const { left, right } = this.cursors;

        if (left.isDown) {
            this.player.setVelocityX(-this.playerSpeed)
        } else if (right.isDown) {
            this.player.setVelocityX(this.playerSpeed)
        } else  {
            this.player.setVelocityX(0)
        }
    }
}

export default Play;