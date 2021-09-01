import React, { useState } from "react";
import Section from "./components/Section/Section";
import { Link } from "react-scroll";

function App() {
    const sections = [
        {
            id: "intro",
            icon: "emoji_people",
            label: "Hello! I am",
            title: "Steven",
            // description: "Served 10 years in the Air Force",
            image: "intro",
        },
        {
            id: "veteran",
            icon: "military_tech",
            label: "How it started",
            title: "Veteran",
            description: "Served 10 years in the Air Force",
            image: "air-force",
        },
        {
            id: "vagabond",
            icon: "hiking",
            // label: "How it's going",
            title: "Vagabond",
            description: "2020 Road Trip",
            coordinates: [
                {
                    location: "San Francisco, Ca",
                    latLng: [-122.41150793919651, 37.776285677070895],
                },
                {
                    location: "Palm Springs, Ca",
                    latLng: [-116.25852701033762, 33.71290437522375],
                },
                {
                    location: "Kelseyville, Ca",
                    latLng: [-122.75076891551365, 38.990215557776324],
                },
                {
                    location: "Lake Shasta, Ca",
                    latLng: [-122.63542520736262, 40.70878042641915],
                },
                {
                    location: "Santa Cruz, Ca",
                    latLng: [-122.02473798474992, 36.967734661975804],
                },
                {
                    location: "Santa Rosa, Ca",
                    latLng: [-122.67144612571816, 38.43996632556139],
                },
                {
                    location: "Salt Lake City, UT",
                    latLng: [-111.9149935398457, 40.71780412729855],
                },
                {
                    location: "Denver, Co",
                    latLng: [-104.97665437152118, 39.714094320890595],
                },
                {
                    location: "Oklahmoa City, OK",
                    latLng: [-97.56434850793772, 35.42019985125595],
                },

                {
                    location: "Austin, TX",
                    latLng: [-97.74928891118893, 30.27922776989725],
                },
                {
                    location: "El Paso, Tx",
                    latLng: [-106.47190350054211, 31.803470478546984],
                },

                {
                    location: "Phoenix, AZ",
                    latLng: [-112.06190828497081, 33.541023952942936],
                },
                {
                    location: "San Diego, Ca",
                    latLng: [-117.1117550500424, 32.72031731941044],
                },

                {
                    location: "Los Banos, Ca",
                    latLng: [-120.84305413618728, 37.06124627887091],
                },

                {
                    location: "Granite Bay, Ca",
                    latLng: [-121.21383146743828, 38.726865529575925],
                },
            ],
        },
        {
            id: "glutton",
            icon: "local_pizza",
            // label: "How it started",
            title: "Glutton",
            description: "it's a problem",
            image: "road-trip-6",
        },
        {
            id: "fitness",
            icon: "fitness_center",
            // label: "How it started",
            title: "Fitness",
            description: "Operation: Body Temple",
            image: "fitness",
        },

        {
            id: "puppy",
            icon: "pets",
            // label: "Puppy zaddy",
            title: "Benji",
            description: "A mostly good boy",
            image: "benji-4",
        },
        {
            id: "homeowner",
            icon: "house",
            // label: "in the burbs",
            title: "Settled",
            description: "in the burbs",
            image: "home-1",
        },

        {
            id: "final",
            icon: "check_circle",
            label: "Finally...",
            title: "Thank you",
            description: "It's been a pleasure!",
            image: "benji-3",
        },
    ];

    const [navClasses, setNavClasses] = useState("");
    const [activeMap, setActiveMap] = useState(false);

    return (
        <div className="app h-screen relative">
            <div className="sections w-full relative">
                {sections.map((section, i, all) => {
                    let nextSectionID =
                        all.length - 1 !== i ? all[i + 1].id : "";
                    return (
                        <Section
                            nextSectionID={nextSectionID}
                            key={section.id}
                            index={i}
                            data={section}
                            isLast={i + 1 === sections.length}
                            mapActive={activeMap}
                        />
                    );
                })}
            </div>
            <div
                className={`fixed w-12 md:w-20 h-full top-0 z-50 flex items-center transform -translate-x-full scrollspy-wrapper transition-transform duration-200 ${navClasses}`}
            >
                <div className="nav-stacked flex flex-col justify-center w-full active">
                    {sections.map((section, i) => {
                        return (
                            <Link
                                key={i}
                                activeClass="active"
                                to={section.id}
                                spy={true}
                                smooth={false}
                                duration={300}
                                isDynamic={true}
                                onSetActive={(e) => {
                                    if (e === "intro") {
                                        setNavClasses("");
                                    } else {
                                        setNavClasses("active");
                                    }

                                    if (e === "vagabond") {
                                        setActiveMap(true);
                                    } else {
                                        setActiveMap(false);
                                    }
                                }}
                                className={`nav-item w-6 h-6 md:w-12 md:h-12 border-b cursor-pointer shadow-lg mx-auto flex items-center justify-center ${
                                    i + 1 === sections.length
                                        ? "bg-green-50 hover:bg-green-100 border-transparent"
                                        : "bg-blue-50 hover:bg-blue-100 border-blue-200"
                                }`}
                            >
                                <span
                                    className={`material-icons text-sm md:text-3xl text-center block ${
                                        i + 1 === sections.length
                                            ? "text-green-300"
                                            : "text-blue-300"
                                    }`}
                                >
                                    {section.icon}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
