import React from "react";
import image01 from "../../assets/location-merchant.png";

const MerchantCTA = () => {
    return (
        <section
            data-aos="zoom-in-up"
            data-aos-duration="2000"
            className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat my-20 bg-[#003e3d] rounded-3xl px-6 md:px-12 py-12 md:py-16 text-white overflow-hidden relative"
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Text Content */}
                <div className="max-w-xl z-10">
                    <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
                        Merchant and Customer Satisfaction <br /> is Our First
                        Priority
                    </h2>
                    <p className="text-gray-200 mb-6">
                        We offer the lowest delivery charge with the highest
                        value along with 100% safety of your product. Pathao
                        courier delivers your parcels in every corner of
                        Bangladesh right on time.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <button className="cursor-pointer bg-[#CAEB66] text-[#003e3d] font-semibold px-5 py-2 rounded-full hover:bg-lime-300 transition">
                            Become a Merchant
                        </button>
                        <button className="cursor-pointer border border-[#CAEB66] text-[#CAEB66] font-semibold px-5 py-2 rounded-full hover:bg-[#CAEB66] hover:text-[#003e3d] transition">
                            Earn with Profast Courier
                        </button>
                    </div>
                </div>

                {/* Image or Illustration */}
                <div className="max-w-md">
                    <img
                        src={image01}
                        alt="Parcel Boxes"
                        className="w-full h-auto"
                    />
                </div>
            </div>

            {/* Optional Background Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#003e3d] via-transparent to-[#003e3d] opacity-20 pointer-events-none" />
        </section>
    );
};

export default MerchantCTA;
