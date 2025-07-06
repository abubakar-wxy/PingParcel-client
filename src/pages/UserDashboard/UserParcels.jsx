import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import UserParcelsTable from "./UserParcelsTable";
import { useNavigate } from "react-router";

const UserParcels = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const {
        data: parcels = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["my-parcels", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
    });

    const handleView = (parcel) => {
        Swal.fire({
            title: "Parcel Details",
            html: `
                <p><strong>Tracking ID:</strong> ${parcel.tracking_id}</p>
                <p><strong>Sender:</strong> ${parcel.senderName}</p>
                <p><strong>Receiver:</strong> ${parcel.receiverName}</p>
                <p><strong>Weight:</strong> ${parcel.parcelWeight}kg</p>
                <p><strong>Cost:</strong> ৳${parcel.deliveryCost}</p>
            `,
            icon: "info",
        });
    };

    const handlePay = (parcel) => {
        navigate(`/userDashboard/payment/${parcel._id}`);
    };

    const handleDelete = (parcel) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will delete the parcel permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${parcel._id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch(); // Use refetch from useQuery to update data
                        Swal.fire(
                            "Deleted!",
                            "Parcel has been removed.",
                            "success"
                        );
                    } else {
                        Swal.fire(
                            "Error",
                            "Parcel not found or already deleted.",
                            "error"
                        );
                    }
                });
            }
        });
    };

    if (isLoading) {
        return (
            <div className="text-center my-20">
                <span className="loading loading-bars loading-lg text-success"></span>
            </div>
        );
    }

    return (
        <div>
            <div className="p-6">
                <UserParcelsTable
                    parcels={parcels}
                    onView={handleView}
                    onPay={handlePay}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default UserParcels;
