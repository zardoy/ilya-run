import React, { useEffect, useRef } from 'react'

import { phaserSetup } from './render'

// position: "fixed",
//         top: 0,
//         left: 0,
//         color: "yellow",
//         zIndex: 5

interface ComponentProps {}

let Game: React.FC<ComponentProps> = () => {
    const canvasContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        return phaserSetup(canvasContainerRef.current!)
    }, [])

    // useEffect(() => {
    //     const canvasEl = canvasRef.current!;
    //     const gameController = new GameController(canvasEl.getContext("2d")!, 1);
    //     const resizeListener = () => {
    //         canvasEl.width = window.innerWidth;
    //         canvasEl.height = window.innerHeight;
    //     };
    //     resizeListener();

    //     let framesRendered = 0;
    //     const draw = () => {
    //         gameController.render();
    //         framesRendered++;
    //         requestAnimationFrame(draw);
    //     };
    //     draw();

    //     const fpsInterval = setInterval(() => {
    //         fpsRef.current!.innerText = framesRendered.toString();
    //         framesRendered = 0;
    //     }, 1000);
    //     const updateInterval = setInterval(() => {
    //         gameController.updateTick();
    //     }, 8);

    //     const keydownListener = (event: KeyboardEvent) => {
    //         switch (event.code.toLowerCase()) {
    //         case "space":
    //             gameController.switchBallDirection(0);
    //         }
    //     };

    //     window.addEventListener("resize", resizeListener);
    //     window.addEventListener("keydown", keydownListener);
    //     return () => {
    //         clearInterval(fpsInterval);
    //         clearInterval(updateInterval);
    //         window.removeEventListener("resize", resizeListener);
    //         window.removeEventListener("keydown", keydownListener);
    //     };
    // }, []);

    return (
        <>
            {/* <Typography ref={fpsRef} variant="button" className={classes.fpsCounter}>0<small>fps</small></Typography> */}
            <div
                ref={canvasContainerRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    background: 'black',
                }}
            />
        </>
    )
}

export default Game
