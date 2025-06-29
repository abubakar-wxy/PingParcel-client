import React from "react";
import { Truck, PackageCheck, Headset } from "lucide-react";

const services = [
    {
        icon: <Truck size={80} className="text-teal-600" />,
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
        icon: <PackageCheck size={80} className="text-teal-600" />,
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
        icon: <Headset size={80} className="text-teal-600" />,
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
];

const ServiceFeatures = () => {
    return (
        <div className="border-y-2 border-dashed border-gray-400 my-20">
            <div className="bg-gray-50 py-12 px-4 md:px-8 lg:px-16 my-20 rounded-[2rem]">
                <div className="space-y-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                        >
                            <div className="min-w-[130px] flex justify-center">
                                {service.icon}
                            </div>
                            <div className="border-l-2 border-dashed border-gray-300 h-35 hidden md:block"></div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 max-w-2xl">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServiceFeatures;
