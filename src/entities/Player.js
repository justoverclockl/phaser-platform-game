import Phaser from "phaser";
import initAnimation from './playerAnims'

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.init()
        this.initEvents()
    }

    init() {
        this.gravity = 500;
        this.playerSpeed = 200;
        this.jumpCount = 0;
        this.consecutiveJumps = 1;
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.body.setGravityY(500);
        this.setCollideWorldBounds(true)

        initAnimation(this.scene.anims)
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this)
    }

    update() {
        const { left, right, space, up } = this.cursors;
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space)
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up)
        const onFloor = this.body.onFloor();

        if (left.isDown) {
            this.setVelocityX(-this.playerSpeed)
            this.setFlipX(true)
        } else if (right.isDown) {
            this.setVelocityX(this.playerSpeed)
            this.setFlipX(false)
        } else  {
            this.setVelocityX(0)
        }

        if ((isSpaceJustDown || isUpJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)) {
            this.setVelocityY(-this.playerSpeed * 1.5)
            this.jumpCount++
        }

        if (onFloor) {
            this.jumpCount = 0;
        }

        this.body.velocity.x !== 0
            ? this.play('run', true)
            : this.play('idle', true)
        // true means don't play again if it's already playing

    }
}

export default Player;