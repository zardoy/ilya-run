import React, { useEffect, useRef } from "react";

import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    canvas: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "black"
    },
    fpsCounter: {
        position: "fixed",
        top: 0,
        left: 0,
        color: "yellow",
        zIndex: 5
    }
})

interface ComponentProps {
}

let Game: React.FC<ComponentProps> = () => {
    const classes = useStyles();
    
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fpsRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const gameController = new GameController(canvasRef.current!);
        const { canvasEl, ctx } = gameController;
        const resizeListener = () => {
            canvasEl.width = window.innerWidth;
            canvasEl.height = window.innerHeight;
        }
        resizeListener();
        
        let framesRendered = 0;
        const draw = () => {
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
            // DRAW BACKGROUND
            gameController.render();
            framesRendered++;
            requestAnimationFrame(draw);
        };
        draw();

        const fpsInterval = setInterval(() => {
            fpsRef.current!.innerText = framesRendered.toString();
            framesRendered = 0;
        }, 1000)
        
        window.addEventListener("resize", resizeListener)
        window.addEventListener("keydown",(event)=>{
            switch(event.code.toLowerCase()) {
                case "space":
                    
            }
        })
        return () => {
            clearInterval(fpsInterval);
            window.removeEventListener("resize", resizeListener)
        }
    }, [])
    
    return <>
        <Typography ref={fpsRef} variant="button" className={classes.fpsCounter}>0<small>fps</small></Typography>
        <canvas ref={canvasRef} className={classes.canvas} />
    </>;
}

class GameController {
    public ballPosition: "start" | "bottom" = "start";
    
    public config = {
        platforms: {
            yPerc: [0.2, 0.8],
            height: 20
        },
        ballRadius: 50
    };
    
    constructor(
        public canvasEl: HTMLCanvasElement, 
        public ctx = canvasEl.getContext("2d")!
    ) {}

    render() {
        // процентные значения
        // DRAW PLATFORMS
        const { yPerc, height } = this.config.platforms;
        yPerc.forEach(yPerc => {
            this.drawPlatform(yPerc);
        });

        const onTop = true;
        this.drawBall(
            50,
            onTop ? 
                yPerc[0] * this.canvasEl.height + height + this.config.ballRadius : 
                yPerc[1] * this.canvasEl.height - this.config.ballRadius
            );
    }

    drawPlatform(yPerc: number) {
        const { ctx, canvasEl } = this;
        const yPx = yPerc * canvasEl.height;
        ctx.fillStyle = "brown";
        ctx.fillRect(0, yPx, canvasEl.width, 20);
    }

    drawBall(x: number, y: number) {
        const { ctx } = this;

        ctx.fillStyle = "lime";
        
        ctx.arc(x, y, this.config.ballRadius, 0, Math.PI * 2);
        
        ctx.fill();
    }
}

export default Game;
