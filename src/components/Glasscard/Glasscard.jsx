import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

const Container = styled(animated.div)``;

const GlassCard = () => {
    const [props, set] = useSpring(() => ({
        xys: [0, 0, 1],
        config: {
            mass: 10,
            tension: 200,
            friction: 50,
        },
    }));

    const calc = (x, y) => [
        -(y - window.innerHeight / 2) / 20,
        (x - window.innerWidth / 2) / 20,
        1,
    ];
    const trans = (x, y, s) =>
        `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
    return (
        <Container
            onMouseMove={({ clientX: x, clientY: y }) =>
                set({ xys: calc(x, y) })
            }
            onMouseLeave={() => set({ xys: [0, 0, 1] })}
            style={{
                transform: props.xys.interpolate(trans),
            }}
            className="inline-block p-6 bg-indigo-50 rounded-lg relative z-10 backdrop-filter backdrop-blur-md border-transparent border-2 bg-clip-border cursor-pointer w-full h-full"
        >
            <div className="text-center">
                <h1 className="">Steven Zimmer</h1>
                <h3>Blah blah blah</h3>
            </div>
        </Container>
    );
};

export default GlassCard;
