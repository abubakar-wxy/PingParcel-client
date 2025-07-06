import React from "react";
import { FaEye, FaTrash, FaCreditCard, FaTruck } from "react-icons/fa";

const UserParcelsTable = ({ parcels, onView, onPay, onDelete }) => {
    return (
        <div className="max-w-6xl mx-auto my-20 p-6 shadow rounded bg-white">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaTruck />
                My Parcels
            </h1>

            {parcels.length === 0 ? (
                <p className="text-gray-500">
                    You haven’t sent any parcels yet.
                </p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="min-w-full bg-white text-sm text-left">
                        <thead>
                            <tr className="bg-gradient-to-r from-lime-100 to-emerald-100 text-emerald-700 font-semibold">
                                <th className="py-4 px-5">Type</th>
                                <th className="py-4 px-5">Title</th>
                                <th className="py-4 px-5">Tracking ID</th>
                                <th className="py-4 px-5">Created At</th>
                                <th className="py-4 px-5">Cost (৳)</th>
                                <th className="py-4 px-5">Payment</th>
                                <th className="py-4 px-5 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr
                                    key={parcel._id}
                                    className={`transition-all duration-200 ${
                                        index % 2 === 0
                                            ? "bg-white"
                                            : "bg-gray-50"
                                    } hover:bg-emerald-50`}
                                >
                                    <td className="py-3 px-5 capitalize">
                                        {parcel.parcelType}
                                    </td>
                                    <td className="py-3 px-5">
                                        {parcel.parcelName}
                                    </td>
                                    <td className="py-3 px-5 font-mono text-xs">
                                        {parcel.tracking_id}
                                    </td>
                                    <td className="py-3 px-5">
                                        {new Date(
                                            parcel.creation_date
                                        ).toLocaleString()}
                                    </td>
                                    <td className="py-3 px-5 font-semibold text-emerald-700">
                                        ৳{parcel.deliveryCost}
                                    </td>
                                    <td className="py-3 px-5">
                                        <span
                                            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                                                parcel.payment_status === "paid"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {parcel.payment_status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-5 text-right space-x-2">
                                        {parcel.payment_status !== "paid" && (
                                            <button
                                                onClick={() => onPay(parcel)}
                                                className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md transition duration-200 cursor-pointer"
                                            >
                                                Pay
                                            </button>
                                        )}
                                        <button
                                            onClick={() => onView(parcel)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md transition duration-200 cursor-pointer"
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() => onDelete(parcel)}
                                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md transition duration-200 cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserParcelsTable;
