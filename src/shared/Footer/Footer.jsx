import React from "react";
import PingParcelLogo from "../PingParcelLogo/PingParcelLogo";
import { Link } from "react-router";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="pb-5">
            <footer className="bg-neutral text-neutral-content px-4 py-10 md:px-10 rounded-4xl">
                {/* Brand Name */}
                <div className="text-center mb-6">
                    <Link
                        to="/"
                        className="text-3xl font-extrabold justify-center items-center gap-2 inline-block"
                    >
                        <PingParcelLogo/>
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm md:text-base font-medium text-gray-300">
                    <Link to="/" className="hover:text-white transition">
                        Home
                    </Link>
                    <Link
                        to="/coverage"
                        className="hover:text-white transition"
                    >
                        Coverage
                    </Link>
                    <Link to="/pricing" className="hover:text-white transition">
                        Pricing
                    </Link>
                    <Link to="/faq" className="hover:text-white transition">
                        FAQs
                    </Link>
                    <Link to="/contact" className="hover:text-white transition">
                        Contact
                    </Link>
                </div>

                <hr className="my-6 border-t border-dashed border-gray-700" />

                {/* Footer Content Grid */}
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center md:text-left">
                        {/* Contact Info */}
                        <div>
                            <h3 className="font-bold mb-2">Contact Us</h3>
                            <p>
                                Email:{" "}
                                <a
                                    href="mailto:support@pingparcel.com"
                                    className="hover:underline"
                                >
                                    support@pingparcel.com
                                </a>
                            </p>
                            <p>
                                Phone:{" "}
                                <a
                                    href="tel:+8801879114768"
                                    className="hover:underline"
                                >
                                    +880 1879-114768
                                </a>
                            </p>
                            <p>Address: Mugda, Dhaka, Bangladesh</p>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h3 className="font-bold mb-3">Follow Us</h3>
                            <div className="text-2xl flex justify-center md:justify-start gap-5">
                                <a
                                    href="https://www.facebook.com/freelancerabubakar/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaFacebook className="text-[#018AFE]" />
                                </a>
                                <a
                                    href="https://x.com/abubakar_wxy"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaXTwitter className="text-white" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/abubakar24/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaLinkedin className="text-[#1680B9]" />
                                </a>
                                <a
                                    href="https://www.youtube.com/@AbuBakar-TLBD"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FaYoutube className="text-[#FF0000]" />
                                </a>
                            </div>
                        </div>

                        {/* About Section */}
                        <div>
                            <h3 className="font-bold mb-2">About PingParcel</h3>
                            <p>
                                PingParcel is your reliable delivery partner
                                across all 64 districts. We ensure fast, secure,
                                and affordable parcel services for your business
                                and personal needs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 text-sm text-center text-gray-400">
                    © {new Date().getFullYear()} PingParcel. All rights
                    reserved.
                </div>
            </footer>
        </div>
    );
};

export default Footer;
