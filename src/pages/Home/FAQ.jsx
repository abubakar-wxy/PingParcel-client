import React from "react";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
const faqData = [
    {
        question: "How does this posture corrector work?",
        answer: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
        question: "Is it suitable for all ages and body types?",
        answer: "Yes, it is designed to be adjustable and comfortable for various body types and age groups.",
    },
    {
        question: "Does it really help with back pain and posture improvement?",
        answer: "Users have reported noticeable improvement in posture and reduction in back pain over time with regular use.",
    },
    {
        question: "Does it have smart features like vibration alerts?",
        answer: "Some models include smart features such as posture alerts via vibrations.",
    },
    {
        question: "How will I be notified when the product is back in stock?",
        answer: "You can subscribe to notifications via email or SMS when the product is restocked.",
    },
];

const FAQ = () => {
    return (
        <div className="lg:max-w-10/12 mx-auto p-6 my-20">
            <h2 className="text-3xl font-bold text-center mb-2">
                Frequently Asked Question (FAQ)
            </h2>
            <p className="text-center text-gray-500 mb-8 lg:max-w-8/12 mx-auto">
                Enhance posture, mobility, and well-being effortlessly with
                Posture Pro. Achieve proper alignment, reduce pain, and
                strengthen your body with ease!
            </p>

            {faqData.map((faq, index) => (
                <div
                    key={index}
                    className="collapse collapse-arrow border border-base-300 bg-base-100 mb-3"
                >
                    <input type="checkbox" />
                    <div className="collapse-title text-lg font-semibold">
                        {faq.question}
                    </div>
                    <div className="collapse-content">
                        <p>{faq.answer}</p>
                    </div>
                </div>
            ))}

            <div className="text-center mt-6 flex items-center justify-center">
                <button className="btn bg-[#CAEB66]">See More FAQ's</button>
                <BsArrowUpRightCircleFill size={40} />
            </div>
        </div>
    );
};

export default FAQ;
