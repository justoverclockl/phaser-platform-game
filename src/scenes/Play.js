import Phaser from 'phaser'
import Player from "../entities/Player";

class Play extends Phaser.Scene {
    constructor(config) {
        super('PlayScene');

        this.config = config;
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones);
        const player = this.createPlayer(playerZones);


        this.createPlayerColliders(player, { colliders: {
            platformColliders: layers.platformColliders
        }});

        this.createEndOfLevel(playerZones.end)
        this.setupFollowupCameraOn(player)
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
        const playerZones = map.getObjectLayer('player_zones')

        // -1 is intended for collide only with layers that have more than 0 zindex
        platformColliders.setCollisionByExclusion(-1, true)

        return { envLayer, platforms, platformColliders, playerZones }
    }

    createPlayer({ start }) {
        return new Player(this, start.x, start.y);
    }

    createPlayerColliders(player, { colliders }) {
        player.addCollider(colliders.platformColliders)
    }

    setupFollowupCameraOn(player) {
        const { height, width, mapOffset, zoomFactor } = this.config;
        this.physics.world.setBounds(0,0, width + mapOffset, height + 250)
        this.cameras.main.setBounds(0,0, width + mapOffset, height).setZoom(zoomFactor)
        this.cameras.main.startFollow(player)
    }

    getPlayerZones(playerZonesLayer) {
        const playerZones = playerZonesLayer.objects;

        return {
            start: playerZones.find(zone => zone.name === 'startZone'),
            end: playerZones.find(zone => zone.name === 'endZone')
        }
    }

    createEndOfLevel(endZone) {
        this.physics.add.sprite(endZone.x, endZone.y, 'end')
            .setSize(5, this.config.height * 2)
            .setAlpha(0)
            .setOrigin(0.5, 1)
    }
}

export default Play;