import React, { useRef } from "react";
import ITyped from "react-ityped";
import { Typography, Grid, Paper, makeStyles } from "@material-ui/core";
import Map from "../Map/Map";

import "./Section.css";

import Next from "../Next/Next";

export default function Section(props) {
    const useStyles = makeStyles((theme) => ({
        paper: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            [theme.breakpoints.up("sm")]: {
                height: "100vh",
            },
        },
        h1: {
            fontWeight: 500,
            [theme.breakpoints.down("sm")]: {
                fontSize: "30px",
            },
        },
        h2: {
            [theme.breakpoints.down("sm")]: {
                fontSize: "24px",
            },
        },
    }));

    const classes = useStyles();
    const strings = [
        "Developer",
        "Designer",
        "Engineer",
        "Programmer",
        "Marketer",
        "Dev Zim",
    ];

    let sectionRef = useRef(null);

    return (
        <Grid
            ref={(el) => (sectionRef = el)}
            key={props.index}
            id={props.data.id}
            container
            component="section"
            className=" section"
            direction={props.index % 2 === 0 ? `row-reverse` : `row`}
        >
            <Grid item xs={12} sm={12} md={7} className="relative">
                {props.data.image && (
                    <img
                        className="w-full object-cover md:absolute h-full inset-0"
                        src={`assets/images/${props.data.image}.jpg`}
                        alt={props.data.title}
                    />
                )}

                {props.data.coordinates && (
                    <Map
                        active={props.mapActive}
                        coordinates={props.data.coordinates}
                    />
                )}
            </Grid>
            <Grid item xs={12} sm={12} md={5} component={Paper} square>
                <div className={classes.paper}>
                    {/* <div className="flex items-end bg-green-50 w-12 h-12 rounded-full absolute top-1/2 left-1/2 animate-pulse"></div>
                    <div className="flex items-end bg-blue-50 w-40 h-40 rounded-full absolute bottom-3/4 right-1/4 animate-pulse"></div>
                    <div className="flex items-end bg-green-50 w-56 h-56 rounded-full absolute bottom-1/4 left-1/3 animate-pulse"></div>
                    <div className="flex items-end bg-indigo-100 w-8 h-8 rounded-full absolute top-1/4 right-3/4 animate-pulse"></div>
                    <div className="flex items-end bg-indigo-50 w-48 h-48 rounded-full absolute bottom-3/4 left-1/2 animate-pulse"></div> */}

                    {/* <div className="flex items-end bg-purple-50 w-12 h-12 rounded-full absolute top-48 left-36 animate-pulse"></div> */}
                    {/* <div className="flex items-end bg-pink-50 w-32 h-32 rounded-full absolute bottom-16 left-12 animate-pulsed"></div> */}
                    {/* <div className="flex items-end bg-green-100 w-20 h-20 rounded-full absolute bottom-32 right-32 animate-pulse"></div> */}

                    {!props.isLast && (
                        <Next
                            index={props.index}
                            section={props.nextSectionID} //  props.index + 1}`
                        >
                            {props.index === 0 ? "Learn more" : "Next"}
                        </Next>
                    )}
                    <div className="flex items-center justify-center w-full md:h-full py-12 md:py-0 ">
                        <div className="w-11/12 lg:w-8/12">
                            <div
                                className={` w-12 h-12 md:w-20 md:h-20 rounded-full shadow mb-6 mx-auto flex items-center justify-center ${
                                    props.isLast ? "bg-green-50" : "bg-blue-50"
                                }`}
                            >
                                <span
                                    className={`material-icons text-3xl md:text-6xl text-center block ${
                                        props.isLast
                                            ? "text-green-300"
                                            : "text-blue-300"
                                    }`}
                                >
                                    {props.data.icon}
                                </span>
                            </div>

                            {props.data.label && (
                                <Typography
                                    align="center"
                                    variant="h2"
                                    gutterBottom
                                    className={classes.h2}
                                >
                                    {props.data.label}
                                </Typography>
                            )}

                            <Typography
                                align="center"
                                color="Primary"
                                variant="h1"
                                gutterBottom
                                className={classes.h1}
                            >
                                {props.data.title}
                            </Typography>
                            {props.data.description && (
                                <Typography
                                    align="center"
                                    variant="h2"
                                    className={classes.h2}
                                >
                                    {props.data.description}
                                </Typography>
                            )}

                            {props.index === 0 && (
                                <Typography
                                    align="center"
                                    variant="h2"
                                    className={classes.h2}
                                >
                                    Web{" "}
                                    <ITyped
                                        className="inline"
                                        loop={false}
                                        strings={strings}
                                        backDelay={1500}
                                    />
                                </Typography>
                            )}
                        </div>
                    </div>
                </div>
            </Grid>
        </Grid>
    );
}
