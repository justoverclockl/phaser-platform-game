import Phaser from 'phaser'

class Play extends Phaser.Scene {
    constructor() {
        super('PlayScene');
    }

    create() {
        this.add.image(0,0, 'sky')
            .setOrigin(0)
    }
}

export default Play;