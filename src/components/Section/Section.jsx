import React from "react";
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
            marginBottom: "20px",
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

    return (
        <Grid
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
                        src={`assets/images/${props.data.image}.JPG`}
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
                                    className={classes.h2}
                                >
                                    {props.data.label}
                                </Typography>
                            )}

                            <Typography
                                align="center"
                                color="primary"
                                variant="h1"
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
