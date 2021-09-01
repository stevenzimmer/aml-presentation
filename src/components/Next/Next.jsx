import React from "react";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import { Typography } from "@material-ui/core";
import { Link } from "react-scroll";
export default function Next(props) {
    // console.log(props);
    return (
        <div
            className={`absolute -bottom-10 md:bottom-8 cursor-pointer next-section ${
                props.index % 2 === 0 ? `right-8` : `right-8 md:left-8`
            }`}
        >
            <div className="flex items-end relative">
                <div className="">
                    <Typography align="center" variant="h5">
                        <Link to={props.section} duration={300}>
                            {props.children}
                        </Link>
                    </Typography>
                </div>

                <div className="animate-bounce">
                    <Link to={props.section} duration={300}>
                        <ArrowDownward />
                    </Link>
                </div>
            </div>
        </div>
    );
}
