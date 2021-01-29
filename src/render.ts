import Phaser from "phaser";

let initialized = false;

// const canvasSetup = (canvasContainer: HTMLElement) => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//     const renderer = new THREE.WebGLRenderer({
//         antialias: true
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     canvasContainer.appendChild(renderer.domElement);

//     const geometry = new THREE.BoxGeometry(1, 2, 0);
//     const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//     const cube = new THREE.Mesh( geometry, material );
//     scene.add(cube);

//     camera.position.z = 5;

//     const draw = () => {
//         cube.rotation.x += 0.01;
//         renderer.render(scene, camera);
//     };
//     renderer.setAnimationLoop(draw);


//     return () => {};
// }


export const phaserSetup = (canvasContainer: HTMLDivElement) => {
    const gameConfig = {
        platformsY: [
            200,
            800
        ]
    };
    
    const gameObjects = {
        platforms: [] as Platform[],
        balls: [] as Ball[]
    };

    // todo-high
    let scene: Phaser.Scene;

    const game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: canvasContainer,
        scale: {
            width: 1100,
            height: 1000
        },
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 200,
                }
            }
        },
        scene: {
            preload(this: Phaser.Scene) {
                scene = this;
                
                this.load.setBaseURL("http://labs.phaser.io");

                this.load.image("sky", "assets/skies/space3.png");
                this.load.image("logo", "assets/sprites/phaser3-logo.png");
                this.load.image("red", "assets/particles/red.png");
            },
            create(this: Phaser.Scene) {
                const { platformsY } = gameConfig;

                gameObjects.platforms = platformsY.map((platformY, index) => {
                    return new Platform({
                        x1: 0,
                        y1: platformY,
                        isUpSide: index === 0 ? true : false,
                        width: 1000
                    })
                });
                
                const ballColors = [0xff0000, 0x0000ff];
                gameObjects.balls = ballColors.map((color, index) => {
                    return new Ball({
                        x: 150,
                        y: gameObjects.platforms[index].BY + Ball.RADIUS * (index % 2 === 0 ? 1 : -1),
                        color
                    });
                });

                // const platforms = this.physics.add.staticGroup();

                // platforms.create()
                
                // this.add.image(400, 300, "sky");

                // const logo = this.physics.add.image(400, 100, "logo");

                // logo.setVelocity(100, 200);
                // logo.setBounce(1, 1);
                // logo.setCollideWorldBounds(true);

                // emitter.startFollow(logo);
            },
            update(this: Phaser.Scene) {
                const cursor = this.input.keyboard.createCursorKeys();
                if (cursor.up.isDown) {
                    gameObjects.balls[0].triggerJump();
                }

                if (cursor.down.isDown) {
                    gameObjects.balls[1].triggerJump();
                }

                gameObjects.balls.forEach((ball) => {
                    ball.update();
                });
            }
        },
    });

    class Platform {
        static HEIGHT = 20;
        
        BY: number;
        gameObject: Phaser.GameObjects.Rectangle;

        constructor(
            { width, x1, y1, isUpSide }: { x1: number; width: number; y1: number; isUpSide: boolean }
        ) {
            this.BY = y1 + (Platform.HEIGHT * (1 - 2 * +!isUpSide))/2;
            this.gameObject = scene.add.rectangle(
                width / 2 + x1,
                y1,
                width, 
                Platform.HEIGHT, 
                0x00ff00
            );
        }
    }

    class Ball {
        static SPEED = 10;
        static RADIUS = 30;

        public speed = 0;
        public lastMove = false;
        public gameObject: Phaser.GameObjects.Arc;
 
        constructor({x, y, color}: { x: number; y: number; color: number; }) {
            this.gameObject = scene.add.circle(x, y, Ball.RADIUS, color);
        }
        
        update() {
            const { y } = this.gameObject;
            const [topPlatform, downPlatform] = gameObjects.platforms;
            if (
                this.speed !== 0 && y + this.speed + Ball.RADIUS <= downPlatform.BY && 
                y + this.speed - Ball.RADIUS >= topPlatform.BY
            ) {
                this.gameObject.y += this.speed;
            } else {
                this.gameObject.y = (downPlatform.BY - topPlatform.BY) / 2 > downPlatform.BY - y ?
                    downPlatform.BY - Ball.RADIUS : topPlatform.BY + Ball.RADIUS;
                this.speed=0;
            }
        }
        
        triggerJump() {
            if (this.speed !== 0) return;
            this.speed = Ball.SPEED * (1 - 2 * +this.lastMove);
            this.lastMove = !this.lastMove;
        }
    }
}