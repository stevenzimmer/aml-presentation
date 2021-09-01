import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";

mapboxgl.accessToken =
    "pk.eyJ1Ijoic3RldmVuemltbWVyIiwiYSI6ImNrcTVobjRqeTFka20ycHF1cm9ud3h0d2YifQ.9UMD2rpWTV3zhL63tig5og";

export default function Map(props) {
    let coords = [];
    let mapContainer = useRef(null);
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer,
            style: "mapbox://styles/stevenzimmer/ckq5zfknj2veo17nr2hccwfzq",
            zoom: 4,
            center: [-109.03439339328686, 36.99549429252819],
            antialias: true,
        });

        props.coordinates.forEach((item) => {
            coords.push(item.latLng);
        });

        props.coordinates.map((coord) => {
            return new mapboxgl.Marker()
                .setLngLat(coord.latLng)
                .setPopup(
                    new mapboxgl.Popup({ offset: 30 }).setHTML(
                        `<h3 class="text-xl">${coord.location}</h3>
                            `
                    )
                )
                .addTo(map);
        });

        const route = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: coords,
                    },
                },
            ],
        };

        const point = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: {},
                    geometry: {
                        type: "Point",
                        coordinates: coords[0],
                    },
                },
            ],
        };

        const lineDistance = turf.length(route.features[0]);

        // console.log(lineDistance);

        const arc = [];

        // Number of steps to use in the arc and animation, more steps means
        // a smoother arc and animation, but too many steps will result in a
        // low frame rate
        const steps = 6000;

        // Draw an arc between the `origin` & `destination` of the two points
        for (let i = 0; i < lineDistance; i += lineDistance / steps) {
            const segment = turf.along(route.features[0], i);
            arc.push(segment.geometry.coordinates);
        }

        // Update the route with calculated arc coordinates
        route.features[0].geometry.coordinates = arc;

        // Used to increment the value of the point measurement against the route.
        let counter = 0;

        map.on("load", (e) => {
            // console.log(e);
            // Add a source and layer displaying a point which will be animated in a circle.
            map.addSource("route", {
                type: "geojson",
                data: route,
            });

            map.addSource("point", {
                type: "geojson",
                data: point,
            });

            map.addLayer({
                id: "route",
                source: "route",
                type: "line",
                paint: {
                    "line-width": 2,
                    "line-color": "#007cbf",
                },
            });

            map.addLayer({
                id: "point",
                source: "point",
                type: "symbol",
                layout: {
                    // This icon is a part of the Mapbox Streets style.
                    // To view all images available in a Mapbox style, open
                    // the style in Mapbox Studio and click the "Images" tab.
                    // To add a new image to the style at runtime see
                    // https://docs.mapbox.com/mapbox-gl-js/example/add-image/
                    "icon-image": "car-15",
                    "icon-rotate": ["get", "bearing"],
                    "icon-rotation-alignment": "map",
                    "icon-allow-overlap": true,
                    "icon-ignore-placement": true,
                },
            });

            function animate() {
                const start =
                    route.features[0].geometry.coordinates[
                        counter >= steps ? counter - 1 : counter
                    ];
                const end =
                    route.features[0].geometry.coordinates[
                        counter >= steps ? counter : counter + 1
                    ];
                if (!start || !end) return;

                // Update point geometry to a new position based on counter denoting
                // the index to access the arc
                point.features[0].geometry.coordinates =
                    route.features[0].geometry.coordinates[counter];

                // Calculate the bearing to ensure the icon is rotated to match the route arc
                // The bearing is calculated between the current point and the next point, except
                // at the end of the arc, which uses the previous point and the current point
                point.features[0].properties.bearing = turf.bearing(
                    turf.point(start),
                    turf.point(end)
                );

                // Update the source with this new data
                map.getSource("point").setData(point);

                // Request the next frame of animation as long as the end has not been reached
                if (counter < steps) {
                    requestAnimationFrame(animate);
                }

                counter = counter + 1;
            }
            if (props.active) {
                animate(counter);
            }
        });
    }, [props.active]);

    return (
        <>
            <div
                className="h-96 md:h-full"
                ref={(el) => (mapContainer = el)}
            ></div>
        </>
    );
}
// export default Map;
