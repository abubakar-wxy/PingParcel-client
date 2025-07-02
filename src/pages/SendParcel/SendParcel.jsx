import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

// Simulated user data (replace with actual auth)
const mockUser = {
    displayName: "",
};

const SendParcel = () => {
    const serviceCenters = useLoaderData();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const parcelType = watch("parcelType", "document");
    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");

    // Get unique regions
    const uniqueRegions = [...new Set(serviceCenters.map((sc) => sc.region))];

    // Get warehouse districts based on region
    const getWarehousesByRegion = (region) => {
        return serviceCenters
            .filter((sc) => sc.region === region)
            .map((sc) => sc.district);
    };

    const calculateDeliveryCost = (data) => {
        const sameRegion =
            data.senderRegion &&
            data.receiverRegion &&
            data.senderRegion === data.receiverRegion;

        if (data.parcelType === "document") {
            return sameRegion ? 60 : 80;
        }

        const weight = parseFloat(data.parcelWeight || 0);

        if (weight <= 3) {
            return sameRegion ? 110 : 150;
        } else {
            const extra = (weight - 3) * 40;
            return sameRegion ? 110 + extra : 150 + extra + 40;
        }
    };

    const saveParcelToDatabase = async (parcelData) => {
        try {
            const res = await fetch("https://your-api-url.com/parcels", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parcelData),
            });

            if (res.ok) {
                Swal.fire({
                    title: "Success!",
                    text: "Parcel successfully booked!",
                    icon: "success",
                    confirmButtonColor: "#16a34a",
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to book parcel.",
                    icon: "error",
                    confirmButtonColor: "#ef4444",
                });
            }
        } catch (err) {
            Swal.fire({
                title: "Something went wrong!",
                text: err.message || "Please try again later.",
                icon: "error",
                confirmButtonColor: "#ef4444",
            });
        }
    };

    const onSubmit = (data) => {
        const cost = calculateDeliveryCost(data);

        Swal.fire({
            title: `Delivery Cost: ৳${cost}`,
            text: "Do you want to confirm and book this parcel?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Confirm & Book",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#16a34a",
            cancelButtonColor: "#ef4444",
        }).then((result) => {
            if (result.isConfirmed) {
                const parcelData = {
                    ...data,
                    deliveryCost: cost,
                    creation_date: new Date().toISOString(),
                };

                console.log("Confirmed parcel data: ", parcelData);

                saveParcelToDatabase(parcelData);
                // Swal.fire(
                //     "Booked!",
                //     "Your parcel has been confirmed.",
                //     "success"
                // );
            }
        });
    };

    return (
        
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-md my-20">
            <h2 className="text-3xl font-bold text-neutral mb-8">Add Parcel</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Parcel Type */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">
                        Enter your parcel details
                    </h3>
                    <div className="flex gap-6 items-center">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="document"
                                {...register("parcelType")}
                                defaultChecked
                            />
                            Document
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                value="non-document"
                                {...register("parcelType")}
                            />
                            Not-Document
                        </label>
                    </div>
                </div>

                {/* Parcel Name & Weight */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium">
                            Parcel Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Parcel Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
                            {...register("parcelName", { required: true })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">
                            Parcel Weight (KG)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            placeholder="Parcel Weight (KG)"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring"
                            {...register("parcelWeight", {
                                required: parcelType === "non-document",
                            })}
                        />
                    </div>
                </div>

                {/* Sender & Receiver Details */}
                <div className="grid md:grid-cols-2 gap-10">
                    {/* Sender */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Sender Details
                        </h3>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Sender Name{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Sender Name"
                                defaultValue={mockUser.displayName}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring mb-4"
                                {...register("senderName", { required: true })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Sender Phone No{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="Sender Phone No"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring mb-4"
                                {...register("senderContact", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Sender Region{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="select select-bordered w-full mb-4"
                                {...register("senderRegion", {
                                    required: true,
                                })}
                            >
                                <option value="">Select Region</option>
                                {uniqueRegions.map((region) => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Sender Pickup Wire house{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="select select-bordered w-full mb-4"
                                {...register("senderServiceCenter", {
                                    required: true,
                                })}
                            >
                                <option value="">Select Wire house</option>
                                {getWarehousesByRegion(senderRegion).map(
                                    (district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Sender Address{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Sender Address"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring mb-4"
                                {...register("senderAddress", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Pickup Instruction
                            </label>
                            <textarea
                                placeholder="Pickup Instruction"
                                className="textarea textarea-bordered w-full"
                                {...register("pickupInstruction")}
                            />
                        </div>
                    </div>

                    {/* Receiver */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Receiver Details
                        </h3>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Receiver Name{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Receiver Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring mb-4"
                                {...register("receiverName", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Receiver Phone No{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="Receiver Phone No"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring mb-4"
                                {...register("receiverContact", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Receiver Region{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="select select-bordered w-full mb-4"
                                {...register("receiverRegion", {
                                    required: true,
                                })}
                            >
                                <option value="">Select Region</option>
                                {uniqueRegions.map((region) => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Receiver Delivery Wire house{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="select select-bordered w-full mb-4"
                                {...register("receiverServiceCenter", {
                                    required: true,
                                })}
                            >
                                <option value="">Select Wire house</option>
                                {getWarehousesByRegion(receiverRegion).map(
                                    (district) => (
                                        <option key={district} value={district}>
                                            {district}
                                        </option>
                                    )
                                )}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Receiver Address{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Receiver Address"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring mb-4"
                                {...register("receiverAddress", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">
                                Delivery Instruction
                            </label>
                            <textarea
                                placeholder="Delivery Instruction"
                                className="textarea textarea-bordered w-full"
                                {...register("deliveryInstruction")}
                            />
                        </div>
                    </div>
                </div>

                {/* Pickup Time Note */}
                <p className="text-sm text-gray-500 italic">
                    * PickUp Time 4pm–7pm Approx.
                </p>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="cursor-pointer bg-[#CAEB66] text-[#003e3d] font-semibold px-5 py-2 rounded-full hover:bg-lime-300 transition"
                    >
                        Proceed to Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendParcel;
