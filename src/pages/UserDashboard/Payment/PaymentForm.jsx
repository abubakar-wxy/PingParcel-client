import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import "./CardStyles.css";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useTrackingLogger from "../../../hooks/useTrackingLogger";

const PaymentForm = () => {
    const stripe = useStripe();
    const navigate = useNavigate();
    const elements = useElements();
    const [errorMsg, setErrorMsg] = useState("");
    const [processing, setProcessing] = useState(false);
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { logTracking } = useTrackingLogger();

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ["parcels", parcelId],
        enabled: !!parcelId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        },
    });

    const amount = parcelInfo.deliveryCost;
    const amountInCents = amount * 100;

    if (isPending) {
        return <Loading />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrorMsg("");

        if (!stripe || !elements) {
            setProcessing(false);
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            setProcessing(false);
            return;
        }

        // step-1: Validate the card
        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setErrorMsg(error.message);
            setProcessing(false);
            return;
        }

        // Step-2: Create payment intent
        const res = await axiosSecure.post(`/create-payment-intent`, {
            amountInCents,
            parcelId,
        });

        const clientSecret = res.data.clientSecret;

        // Step-3: Confirm payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user.displayName,
                    email: user.email,
                },
            },
        });

        if (result.error) {
            setErrorMsg(result.error.message);
            Swal.fire({
                icon: "error",
                title: "Payment Failed",
                text: result.error.message,
                confirmButtonColor: "#d33",
            });
        } else {
            if (result.paymentIntent.status === "succeeded") {
                const transactionId = result.paymentIntent.id;

                // Step-4: Insert into payments collection and mark parcel as paid
                const paymentData = {
                    parcelId,
                    email: user.email,
                    amount,
                    transactionId,
                    paymentMethod: result.paymentIntent.payment_method_types,
                };

                const paymentRes = await axiosSecure.post(
                    "/payments",
                    paymentData
                );

                if (paymentRes.data.insertedId) {
                    // Show success
                    Swal.fire({
                        icon: "success",
                        title: "Payment Successful",
                        html: `Your parcel has been marked as <b>paid</b>.<br><strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                        confirmButtonColor: "#10B981",
                    });

                    // Tracking log
                    await logTracking({
                        tracking_id: parcelInfo.tracking_id,
                        status: "payment_done",
                        details: `Paid by ${user.displayName}`,
                        updated_by: user.email,
                    });

                    // Redirect
                    navigate("/userDashboard/myParcels");
                }
            }
        }

        setProcessing(false);
    };

    return (
        <div className="max-w-lg mx-auto my-10 p-6 bg-white border border-gray-200 shadow rounded-xl pay_form_container">
            <h2 className="text-2xl font-bold text-center mb-4 text-neutral">
                💳 Pay for Your Parcel
            </h2>

            <div className="bg-gray-50 p-4 mb-6 rounded-lg border border-gray-200 shadow text-sm text-gray-700">
                <p>
                    <strong>Parcel:</strong> {parcelInfo.parcelName || "N/A"}
                </p>
                <p>
                    <strong>Tracking ID:</strong> {parcelInfo.tracking_id}
                </p>
                <p>
                    <strong>Amount:</strong> ৳{parcelInfo.deliveryCost}
                </p>
                <p>
                    <strong>Status:</strong>{" "}
                    <span
                        className={`font-semibold ${
                            parcelInfo.payment_status === "paid"
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {parcelInfo.payment_status}
                    </span>
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-4 border border-gray-200 shadow rounded-md bg-white">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#1f2937",
                                    "::placeholder": { color: "#9ca3af" },
                                },
                                invalid: { color: "#dc2626" },
                            },
                        }}
                    />
                </div>

                {errorMsg && (
                    <p className="text-red-500 text-sm font-medium">
                        {errorMsg}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={!stripe || processing}
                    className={`w-full py-2 px-4 rounded-md font-semibold transition duration-200 cursor-pointer ${
                        processing || !stripe
                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                            : "bg-emerald-500 hover:bg-emerald-600 text-white"
                    }`}
                >
                    {processing
                        ? "Processing..."
                        : `Pay ৳${parcelInfo.deliveryCost}`}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;
