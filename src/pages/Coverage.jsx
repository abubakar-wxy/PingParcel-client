import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FiSearch } from "react-icons/fi";
import { useLoaderData } from "react-router";
import L from "leaflet";

// Helper component to fly to a location
const MapFlyTo = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.flyTo(position, 10, { duration: 2 });
        }
    }, [position, map]);
    return null;
};

const Coverage = () => {
    const centerOfBangladesh = [23.685, 90.3563];
    const serviceCenter = useLoaderData();

    const [searchTerm, setSearchTerm] = useState("");
    const [flyToPosition, setFlyToPosition] = useState(null);
    const [activeDistrict, setActiveDistrict] = useState(null);
    const markerRefs = useRef({});

    const handleSearch = () => {
        const match = serviceCenter.find((item) =>
            item.district.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (match) {
            const position = [match.latitude, match.longitude];
            setFlyToPosition(position);
            setActiveDistrict(match.district);

            // Wait for the flyTo to complete, then open the popup
            setTimeout(() => {
                const markerRef = markerRefs.current[match.district];
                if (markerRef) {
                    markerRef.openPopup();
                }
            }, 1000);
        } else {
            alert("District not found.");
        }
    };

    return (
        <div className="px-5 py-10 rounded-3xl max-w-6xl mx-auto my-20">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-neutral">
                We are available in 64 districts
            </h2>

            {/* Search box */}
            <div className="flex justify-center mb-10">
                <div className="flex w-full max-w-md rounded-full bg-base-200 overflow-hidden border border-gray-300 shadow-sm">
                    <div className="px-4 flex items-center text-gray-500">
                        <FiSearch />
                    </div>
                    <input
                        type="text"
                        placeholder="Search district name"
                        className="flex-grow px-2 py-2 outline-none bg-base-200 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-lime-300 px-6 text-sm font-medium hover:bg-lime-400 transition cursor-pointer"
                    >
                        Search
                    </button>
                </div>
            </div>

            <hr className="my-10 border-gray-200" />

            {/* Subtitle */}
            <h3 className="text-xl font-semibold text-neutral mb-6">
                We deliver almost all over Bangladesh
            </h3>

            {/* Map */}
            <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-md">
                <MapContainer
                    center={centerOfBangladesh}
                    zoom={8}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {flyToPosition && <MapFlyTo position={flyToPosition} />}

                    {serviceCenter.map((center, index) => (
                        <Marker
                            key={index}
                            position={[center.latitude, center.longitude]}
                            ref={(ref) => {
                                if (ref) {
                                    markerRefs.current[center.district] = ref;
                                }
                            }}
                        >
                            <Popup>
                                <strong>{center.district}</strong>
                                <br />
                                {center.covered_area.join(", ")}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;
