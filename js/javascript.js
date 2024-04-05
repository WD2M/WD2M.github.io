class Escena extends Phaser.Scene {

  preload() {
    this.load.image('spaceship', '../imgJuego/HeroeVista.jpg');
  }

  create() {
    this.add.sprite(512, 512, 'spaceship');

    const opcionNave = this.add.zone(300, 150, 340, 200);
    opcionNave.setOrigin(0);
    opcionNave.setInteractive();
    opcionNave.once('pointerdown', () => this.opcionPulsada('nave'));
    this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opcionNave);

    const opcionTierra = this.add.zone(640, 225, 370, 370);
    opcionTierra.setOrigin(0);
    opcionTierra.setInteractive();
    opcionTierra.once('pointerdown', () => this.opcionPulsada('Tierra'));
    this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opcionTierra);

  }

  opcionPulsada(opcion) {
    if (opcion == 'nave') {
      this.scene.start('NaveScene')
    }
    else {
      this.scene.start('HomeScene')
    }
  }
}

class NaveScene extends Phaser.Scene {

  constructor() {
    super('NaveScene');
  }
  preload() {
    this.load.image('naveship', '../imgJuego/Portales.jpg');
  }

  create() {
    this.add.sprite(512, 512, 'naveship');

    const opcionBoss = this.add.zone(100, 300, 340, 400);
    opcionBoss.setOrigin(0);
    opcionBoss.setInteractive();
    opcionBoss.once('pointerdown', () => this.opcionPulsada('Boss'));
    this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opcionBoss);

    const opcionHome = this.add.zone(590, 300, 340, 400);
    opcionHome.setOrigin(0);
    opcionHome.setInteractive();
    opcionHome.once('pointerdown', () => this.opcionPulsada('Home'));
    this.add.graphics().lineStyle(2, 0xff0000).strokeRectShape(opcionHome);
  }

  opcionPulsada(opcion) {
    if (opcion == 'Boss') {
      this.scene.start('BossScene')
    }
    else {
      this.scene.start('HomeScene')
    }
  }
}

class HomeScene extends Phaser.Scene {

  constructor() {
    super('HomeScene');
  }
  preload() {
    this.load.image('Homeship', '../imgJuego/HeroeTierra.jpg');
  }

  create() {
    this.add.sprite(512, 512, 'Homeship');
  }
}
class BossScene extends Phaser.Scene {

  constructor() {
    super('BossScene');
  }
  preload() {
    this.load.image('Bossship', '../imgJuego/HeroeDerrotado.jpg');
  }

  create() {
    this.add.sprite(512, 512, 'Bossship');
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 1024,
  scene: [Escena, HomeScene, NaveScene, BossScene],
  scale: {
    mode: Phaser.Scale.FIT
  },
  /*physics: {
  default: 'arcade',
  arcade: {
    debug: true,
    gravity: {
      y: 300,
    },
  },
},*/
};

new Phaser.Game(config);