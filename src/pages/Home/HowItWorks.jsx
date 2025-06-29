import { FaTruckPickup } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaWarehouse } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";

const features = [
    {
        icon: <FaTruckPickup className="text-3xl text-teal-700" />,
        title: "Booking Pick & Drop",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        icon: <MdOutlineAttachMoney className="text-3xl text-teal-700" />,
        title: "Cash On Delivery",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        icon: <FaWarehouse className="text-3xl text-teal-700" />,
        title: "Delivery Hub",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        icon: <FaBuilding className="text-3xl text-teal-700" />,
        title: "Booking SME & Corporate",
        desc: "From personal packages to business shipments — we deliver on time, every time.",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-12 bg-gray-100 my-20 rounded-4xl">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                    How it Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-all text-center"
                        >
                            <div className="mb-4 flex justify-center">
                                {item.icon}
                            </div>
                            <h3 className="font-semibold text-gray-700 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
