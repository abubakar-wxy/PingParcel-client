import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, EffectCoverflow } from "swiper/modules";
import logoImage from "../../assets/customer-top.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        name: "Awlad Hossin",
        role: "Senior Product Designer",
        quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
        name: "Rasel Ahamed",
        role: "CTO",
        quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
        name: "Nasir Uddin",
        role: "CEO",
        quote: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    },
    {
        name: "Maya Rahman",
        role: "Physiotherapist",
        quote: "This product has been a game changer for my clients. It gently reminds them to stay aligned, reducing strain and long-term posture issues.",
    },
    {
        name: "Jordan Lee",
        role: "Fitness Coach",
        quote: "As a coach, I recommend this to my clients for daily posture correction. It's lightweight, effective, and builds great habits.",
    },
    {
        name: "Linda Park",
        role: "Ergonomics Specialist",
        quote: "The design is simple yet effective. It provides consistent support without discomfort and truly helps with back pain relief.",
    },
    {
        name: "Carlos Rivera",
        role: "Software Engineer",
        quote: "Sitting at a desk all day used to cause back pain. With this posture corrector, I've seen noticeable improvement in just a few weeks.",
    },
    {
        name: "Fatima Noor",
        role: "Health Blogger",
        quote: "I tried several posture aids before, but this one stands out. It’s comfortable, easy to use, and the results are real.",
    },
];

const Testimonials = () => {
    return (
        <section className="py-16 bg-base-200 text-center my-20 rounded-4xl">
            <div className="max-w-5xl mx-auto px-4">
                <img
                    src={logoImage}
                    alt="Illustration"
                    className="mx-auto mb-4"
                />
                <h2 className="text-3xl font-bold mb-2">
                    What our customers are saying
                </h2>
                <p className="text-gray-500 mb-8">
                    Enhance posture, mobility, and well-being effortlessly with
                    Posture Pro. Achieve proper alignment, reduce pain, and
                    strengthen your body with ease!
                </p>

                <Swiper
                    modules={[Navigation, Pagination, A11y, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView="auto"
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    pagination={{ clickable: true }}
                    navigation={{
                        prevEl: ".prev-btn",
                        nextEl: ".next-btn",
                    }}
                    className="relative"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide
                            key={index}
                            className="max-w-sm bg-white rounded-xl p-6 shadow-md mb-15"
                        >
                            <p className="text-4xl text-primary mb-4">“</p>
                            <p className="text-gray-700 mb-6">
                                {testimonial.quote}
                            </p>
                            <hr className="mb-4 border-dashed" />
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary"></div>
                                <div className="text-left">
                                    <h4 className="font-bold text-neutral">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
