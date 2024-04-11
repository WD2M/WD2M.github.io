var marcador = 0;
class Escena extends Phaser.Scene {
  constructor() {
    super('Escena');
  }

  preload() {
    this.load.image('fondo', '../imgJuego/FondoAlien.jpg');
    this.load.image('ima0', '../imgJuego/Misil1.png');
    this.load.image('ima1', '../imgJuego/Misil2.png');

  }

  create() {
    this.add.sprite(512, 512, 'fondo');

    this.LanzarMisil();

    this.physics.world.on('worldbounds', () => {
      this.scene.start('Puntaje');
    });

    this.marcadorTXT = this.add.text(90, 50, marcador, {
      fontFamily: 'font1',
      fontSize: 50,
      color: '#00ff00',
      align: 'right'
    });
    this.marcadorTXT.setOrigin(1, 0);

    this.add.text(90, 50, ' pts', {
      fontFamily: 'font1',
      fontSize: 50,
      color: '#00ff00',
      align: 'right'
    });

    this.topeDeTiempo = 10.0;
    this.tiempo = this.topeDeTiempo;
    this.tiempoTXT = this.add.text(855, 50, this.tiempo, {
      fontFamily: 'font1',
      fontSize: 64,
      color: '#00ff00'
    });


    this.temporizador();
  }
  LanzarMisil() {
    const aleatorio = `ima${Math.floor(Math.random() * 2)}`;
    const Posaleatorio = Math.floor(Math.random() * config.width - 100) + 50;
    const misil = this.physics.add.image(Posaleatorio, 100, aleatorio).setScale(0.5, 0.5);
    misil.setVelocity(0, 100);
    misil.setInteractive();
    misil.on("pointerdown", () => this.misilPulsado(misil));

    misil.setCollideWorldBounds(true);
    misil.body.onWorldBounds = true;

    this.time.delayedCall(1000, this.LanzarMisil, [], this);
  }

  misilPulsado(m) {
    ++marcador;
    this.marcadorTXT.setText(marcador);
    m.setCollideWorldBounds(false);
    m.destroy();
  }

  temporizador() {
    --this.tiempo;
    this.tiempoTXT.setText(this.tiempo);
    if (this.tiempo === 0) {
      this.scene.start('Puntaje');
    }
    else {
      this.time.delayedCall(1000, this.temporizador, [], this);
    }
  }
}

class EscenaPuntaje extends Phaser.Scene {

  constructor() {
    super('Puntaje');
  }
  preload() {
    this.load.image('fondoPuntaje', '../imgJuego/PuntajeAlien.jpg');
  }
  create() {
    this.Puntaje = this.add.sprite(512, 512, 'fondoPuntaje');
    this.Puntaje.setInteractive();
    this.Puntaje.on('pointerdown', () => this.volverJugar());


    this.marcadorTXT = this.add.text(750, 180, `Tú puntaje es: ${marcador} pts`, {
      fontFamily: 'font1',
      fontSize: 50,
      color: '#00ff00',
      align: 'right'
    });
    this.marcadorTXT.setOrigin(1, 0);
  }
  volverJugar() {
    this.scene.start('GameOver');
  }
}

class EscenaGameOver extends Phaser.Scene {

  constructor() {
    super('GameOver');
  }
  preload() {
    this.load.image('fondo1', '../imgJuego/GameOver1Alien.jpg');
    this.load.image('fondo2', '../imgJuego/GameOver2Alien.jpg');
    this.load.image('fondo3', '../imgJuego/GameOver3Alien.jpg');
  }
  create() {
    this.CaraOver = this.add.sprite(512, 512, 'fondo1');
    let numeros = [1, 2, 3];
    this.randomizeArray(numeros);

    this.CaraOver.setTexture(`fondo${numeros[0]}`);
    this.CaraOver.setInteractive();
    this.CaraOver.on('pointerdown', () => this.volverJugar());
  }
  randomizeArray(array) {
    return array.sort(() => Math.floor(Math.random() * 3) - 1);
  }
  volverJugar() {
    marcador = 0;
    this.scene.start('Escena');
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 1024,
  scene: [Escena, EscenaGameOver, EscenaPuntaje],
  scale: {
    mode: Phaser.Scale.FIT
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 300,
      },
    },
  },
};

new Phaser.Game(config);