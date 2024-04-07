class Escena extends Phaser.Scene {
  constructor() {
    super('Escena');
  }

  preload() {
    this.load.image('fondo', '../imgJuego/Pantallas.jpg');
    this.load.image('ima1', '../imgJuego/Imagen1.png');
    this.load.image('ima2', '../imgJuego/Imagen2.png');
    this.load.image('ima3', '../imgJuego/Imagen3.png');
    this.load.image('ima4', '../imgJuego/Imagen4.png');
    this.load.image('ima5', '../imgJuego/Imagen5.png');
    this.load.image('ima6', '../imgJuego/Imagen6.png');
    this.load.image('ima7', '../imgJuego/Imagen7.png');
    this.load.image('ima8', '../imgJuego/Imagen0.png');
  }

  create() {
    this.add.sprite(512, 512, 'fondo');
    this.Cara0 = this.add.sprite(145, 742, 'ima1').setScale(0.14, 0.14);
    this.Cara1 = this.add.sprite(505, 812, 'ima2').setScale(0.14, 0.14);
    this.Cara2 = this.add.sprite(865, 742, 'ima3').setScale(0.14, 0.14);


    this.Cara0.setInteractive();
    this.Cara0.on('pointerdown', () => this.opcionPulsada(this.Cara0));
    this.Cara1.setInteractive();
    this.Cara1.on('pointerdown', () => this.opcionPulsada(this.Cara1));
    this.Cara2.setInteractive();
    this.Cara2.on('pointerdown', () => this.opcionPulsada(this.Cara2));

    this.CaraSelect = this.add.sprite(500, 480, 'ima').setScale(0.35, 0.35);
    this.cargarImagenes();


    this.marcador = 0;
    this.marcadorTXT = this.add.text(90, 200, this.marcador, {
      fontFamily: 'font1',
      fontSize: 50,
      color: '#00ff00',
      align: 'right'
    });
    this.marcadorTXT.setOrigin(1, 0);

    this.add.text(90, 200, ' pts', {
      fontFamily: 'font1',
      fontSize: 50,
      color: '#00ff00',
      align: 'right'
    });

    this.topeDeTiempo = 10;
    this.tiempo = this.topeDeTiempo;
    this.tiempoTXT = this.add.text(855, 200, this.tiempo, {
      fontFamily: 'font1',
      fontSize: 64,
      color: '#00ff00'
    });


    this.temporizador();
  }

  temporizador() {
    --this.tiempo;
    this.tiempoTXT.setText(this.tiempo);
    if (this.tiempo === 0) {
      this.scene.start('GameOver');
    }
    else {
      this.time.delayedCall(1000, this.temporizador, [], this);
    }
  }

  opcionPulsada(opcion) {
    if (opcion.texture.key == this.CaraSelect.texture.key) {
      ++this.marcador;
      this.marcadorTXT.setText(this.marcador);
      this.cargarImagenes();
    } else {
      this.scene.start('GameOver');
    }
  }

  cargarImagenes() {
    let numeros = [1, 2, 3, 4, 5, 6, 7, 8];
    this.randomizeArray(numeros);

    this.Cara0.setTexture(`ima${numeros[0]}`);
    this.Cara1.setTexture(`ima${numeros[1]}`);
    this.Cara2.setTexture(`ima${numeros[2]}`);

    const CaraSelect = this[`Cara${Math.floor(Math.random() * 3)}`];
    this.CaraSelect.setTexture(CaraSelect.texture.key);
  }

  randomizeArray(array) {
    return array.sort(() => Math.floor(Math.random() * 3) - 1);
  }
}

class EscenaGameOver extends Phaser.Scene {

  constructor() {
    super('GameOver');
  }
  preload() {
    this.load.image('fondo1', '../imgJuego/GameOver1.jpg');
    this.load.image('fondo2', '../imgJuego/GameOver2.jpg');
    this.load.image('fondo3', '../imgJuego/GameOver3.jpg');
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
    this.scene.start('Escena');
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 1024,
  scene: [Escena, EscenaGameOver],
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