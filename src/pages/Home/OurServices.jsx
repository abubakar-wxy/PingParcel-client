import React from "react";
import {
    FaShippingFast,
    FaMapMarkedAlt,
    FaWarehouse,
    FaMoneyBillWave,
    FaBuilding,
    FaUndoAlt,
} from "react-icons/fa";

const services = [
    {
        title: "Express & Standard Delivery",
        description:
            "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: <FaShippingFast className="text-4xl text-teal-700 mx-auto" />,
    },
    {
        title: "Nationwide Delivery",
        description:
            "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: <FaMapMarkedAlt className="text-4xl text-[#003e3d] mx-auto" />,
        highlight: true,
    },
    {
        title: "Fulfillment Solution",
        description:
            "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        icon: <FaWarehouse className="text-4xl text-teal-700 mx-auto" />,
    },
    {
        title: "Cash on Home Delivery",
        description:
            "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: <FaMoneyBillWave className="text-4xl text-teal-700 mx-auto" />,
    },
    {
        title: "Corporate Service / Contract In Logistics",
        description:
            "Customized corporate services which includes warehouse and inventory management support.",
        icon: <FaBuilding className="text-4xl text-teal-700 mx-auto" />,
    },
    {
        title: "Parcel Return",
        description:
            "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        icon: <FaUndoAlt className="text-4xl text-teal-700 mx-auto" />,
    },
];

const OurServices = () => {
    return (
        <section className="bg-[#003e3d] py-16 text-white rounded-[2rem] my-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-2">Our Services</h2>
                <p className="mb-10 max-w-2xl mx-auto text-gray-200">
                    Enjoy fast, reliable parcel delivery with real-time tracking
                    and zero hassle. From personal packages to business
                    shipments — we deliver on time, every time.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className={`rounded-xl p-6 shadow-md transition-all duration-300 ${
                                service.highlight
                                    ? "bg-lime-300 text-[#003e3d] font-semibold"
                                    : "bg-white text-gray-800"
                            }`}
                        >
                            <div className="mb-4">{service.icon}</div>
                            <h3 className="text-lg font-bold mb-2 text-center">
                                {service.title}
                            </h3>
                            <p className="text-sm text-center">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;
