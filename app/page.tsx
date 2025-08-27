// app/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
// --- ICONS CORRECTED HERE: Removed unused icons ---
import { FaLinkedin, FaGithub, FaBriefcase, FaGraduationCap, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import useEmblaCarousel from 'embla-carousel-react';

// --- DATA FOR YOUR ONLINE CV ---

const navItems = ['About', 'Experience', 'Skills', 'Portfolio', 'Testimonials', 'Contact'];

const timelineEvents = [
    { type: 'work', date: '2020 - Present', title: 'Founder & Lead Full-Stack Developer', institution: 'HiigsiTech.com', description: 'Architected and led the end-to-end development of 130+ projects and 4 major SaaS applications. Directed all UI/UX, branding, and IT consulting, driving significant growth and efficiency for clients.' },
    { type: 'education', date: '2023 - Present', title: 'Bachelor of Software Engineering', institution: 'Gollis University, Hargeisa', description: 'Currently pursuing an advanced degree focused on software development lifecycle, database management, and enterprise systems.' },
    { type: 'education', date: '2018 - 2020', title: 'Diploma in Computer Science', institution: 'Tisqaad Institute, Hargeisa', description: 'Gained a strong foundation in computer fundamentals, networking, and programming logic.' },
];

const skills = {
    "Frontend": ["Next.js", "React", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3/SASS", "Framer Motion", "Tailwind CSS"],
    "Backend": ["Node.js", "Python (Django)", "Java (Spring Boot)", "PostgreSQL", "MySQL", "Firebase", "REST APIs"],
    "Design & UI/UX": ["Figma", "UI/UX Principles", "Motion Design", "Branding Strategy", "Adobe Creative Suite"],
    "IT & DevOps": ["Networking", "Troubleshooting", "System Admin", "Docker", "AWS Basics", "CI/CD"]
};

const projects = [
    { title: "Hantikaab POS", desc: "Advanced POS & Business Management App.", img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { title: "Ardaykaab AI", desc: "AI-powered Student Helper & Productivity Assistant.", img: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { title: "Guriup Real Estate", desc: "Modern Hotel Booking & Real Estate Platform.", img: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { title: "Unitouch University System", desc: "Comprehensive management system for universities.", img: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { title: "HiigsiTech Agency", desc: "Branding and web presence for my digital agency.", img: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { title: "Sahan Threads E-commerce", desc: "Bespoke e-commerce platform for a fashion label.", img: "https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { title: "Somali Logistics Tracker", desc: "Real-time supply chain management solution.", img: "https://images.pexels.com/photos/1095814/pexels-photo-1095814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { title: "Digital Health Platform", desc: "Telemedicine app connecting patients and doctors.", img: "https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { title: "Fintech Mobile Wallet", desc: "Secure mobile payment and transfer application.", img: "https://images.pexels.com/photos/8353802/pexels-photo-8353802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { title: "AgriTech Data Hub", desc: "Data analytics platform for optimizing crop yields.", img: "https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { title: "E-Learning Portal", desc: "Interactive online learning platform for students.", img: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { title: "Renewable Energy Monitor", desc: "IoT application for monitoring solar panel efficiency.", img: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];

const testimonials = [
    { name: "Yusuf Cali", company: "CEO, Sahan Threads", quote: "Mubarik's vision transformed our brand. His work is world-class.", avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Fatima Nuur", company: "Founder, Hantikaab", quote: "The POS system he built is the core of our business. Reliable and brilliant.", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Cabdi Xasan", company: "Marketing Director", quote: "Our traffic grew 300% thanks to his SEO strategies. The results are undeniable.", avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Ayaan Guuleed", company: "Startup Advisor", quote: "As a consultant, Mubarik provides clear, actionable advice that delivers results.", avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Idil Cumar", company: "Guriup Real Estate", quote: "He turned our complex idea into a simple, elegant platform. A true professional.", avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Maxamed Ibraahim", company: "Logistics Manager", quote: "The tracking system he developed revolutionized our supply chain. Highly recommended.", avatar: "https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Sahra Jaamac", company: "Fintech Innovator", quote: "His expertise in security and backend development was crucial for our mobile wallet's success.", avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Daahir Rooble", company: "University Administrator", quote: "The Unitouch system is a masterpiece of software engineering. It simplified everything.", avatar: "https://images.pexels.com/photos/842571/pexels-photo-842571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Xaliimo Axmed", company: "E-Learning Coordinator", quote: "He created an engaging and intuitive platform that our students love to use.", avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];


// --- CUSTOM CURSOR HOOK ---
const useMousePosition = () => {
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    useEffect(() => {
        const moveMouse = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
        window.addEventListener("mousemove", moveMouse);
        return () => window.removeEventListener("mousemove", moveMouse);
    }, [x, y]);
    return { x, y };
};

// --- MAIN PAGE COMPONENT ---
export default function Home() {
    const { x, y } = useMousePosition();
    const springConfig = { damping: 50, stiffness: 400 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <main className="bg-background text-primary font-mono">
            <motion.div 
                className="fixed top-0 left-0 w-8 h-8 bg-accent/60 rounded-full pointer-events-none z-[9999] hidden md:block"
                style={{ translateX: springX, translateY: springY, x: "-50%", y: "-50%" }}
            />
            
            <AnimatePresence>
                {isLoading && <IntroAnimation onAnimationComplete={() => setIsLoading(false)} />}
            </AnimatePresence>
            
            {!isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Header />
                    <HeroSection />
                    <AboutSection />
                    <TimelineSection />
                    <SkillsSection />
                    <PortfolioSection />
                    <TestimonialsSection />
                    <ContactSection />
                    <Footer />
                </motion.div>
            )}
        </main>
    );
}

// --- INTRO ANIMATION COMPONENT ---
const IntroAnimation = ({ onAnimationComplete }: { onAnimationComplete: () => void }) => {
    const name = "Mubarik Osman";
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };
    const letterVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-background z-[10000]"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={onAnimationComplete}
        >
            <motion.h1
                className="text-4xl md:text-6xl font-bold text-accent tracking-widest"
                variants={containerVariants}
            >
                {name.split("").map((letter, index) => (
                    <motion.span key={index} variants={letterVariants} className="inline-block">
                        {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                ))}
            </motion.h1>
        </motion.div>
    );
};

// --- RESPONSIVE HEADER WITH ANIMATED NAV ---

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinkVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${hasScrolled ? 'bg-background/50 backdrop-blur-lg border-b border-border/50' : 'bg-transparent'}`}
            initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
        >
            <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center h-16">
                <div className="text-xl font-bold text-accent tracking-widest">MUBARIK OSMAN</div>
                
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <NavLink key={item} text={item} />
                    ))}
                </nav>

                {/* Mobile Nav Toggle */}
                <div className="md:hidden z-50">
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none w-10 h-10 flex items-center justify-center bg-gray-800/50 rounded-md border border-border/50">
                        <motion.div
                            className="w-6 h-6 flex flex-col justify-around items-center"
                            animate={isOpen ? "open" : "closed"}
                        >
                            <motion.span
                                className="block h-0.5 w-full bg-primary rounded-full"
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: 45, y: 7 },
                                }}
                                transition={{ duration: 0.3 }}
                            ></motion.span>
                            <motion.span
                                className="block h-0.5 w-full bg-primary rounded-full"
                                variants={{
                                    closed: { opacity: 1 },
                                    open: { opacity: 0 },
                                }}
                                transition={{ duration: 0.1 }}
                            ></motion.span>
                            <motion.span
                                className="block h-0.5 w-full bg-primary rounded-full"
                                variants={{
                                    closed: { rotate: 0, y: 0 },
                                    open: { rotate: -45, y: -7 },
                                }}
                                transition={{ duration: 0.3 }}
                            ></motion.span>
                        </motion.div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden fixed inset-0 bg-background pt-24 z-40"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", ease: "easeInOut" }}
                    >
                        <motion.nav 
                            className="flex flex-col items-center justify-center h-full space-y-8"
                            initial="hidden"
                            animate="visible"
                            transition={{ staggerChildren: 0.1 }}
                        >
                            {navItems.map((item) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsOpen(false)}
                                    className="text-3xl text-primary hover:text-accent transition-colors"
                                    variants={navLinkVariants}
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

const NavLink = ({ text }: { text: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <motion.a
            href={`#${text.toLowerCase()}`}
            className="relative text-sm text-primary transition-colors duration-300"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            {text}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-accent"
                        layoutId={`underline-${text}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                    />
                )}
            </AnimatePresence>
        </motion.a>
    );
};


const HeroSection = () => (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full filter blur-3xl animate-pulse-slow animation-delay-4000"></div>

        <div className="container mx-auto px-4 sm:px-6 z-10 flex flex-col md:flex-row items-center gap-12">
            <motion.div
                className="w-48 h-48 md:w-64 md:h-64 relative flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.8 }}
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent to-teal-500 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105"></div>
                <Image
                    src="/profile-avatar.jpg"
                    alt="Mubarik Osman - Professional Avatar"
                    width={256} height={256}
                    className="relative rounded-full object-cover w-full h-full border-4 border-background"
                />
            </motion.div>
            
            <motion.div
                className="text-center md:text-left"
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 1 }}
            >
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">Mubarik Osman</h1>
                <h2 className="text-xl md:text-2xl text-accent mt-2 bg-clip-text text-transparent bg-gradient-to-r from-accent to-teal-400">
                    Full-Stack Developer | UI/UX Designer | Digital Marketing Specialist
                </h2>
                <p className="text-secondary mt-4 max-w-xl">
                    A versatile and results-oriented professional with extensive experience in software engineering, IT strategy, and creative design. Proven ability to lead projects from concept to deployment, delivering solutions that enhance user engagement and drive business growth.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                    <a href="http://garaadbiixi.com/p/mycv.html" target="_blank" rel="noopener noreferrer" className="bg-accent text-background font-bold py-2 px-6 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 w-full sm:w-auto text-center">
                        View Full CV
                    </a>
                    <div className="flex space-x-4">
                        <a href="#" className="text-secondary hover:text-accent text-2xl transition-colors"><FaLinkedin /></a>
                        <a href="#" className="text-secondary hover:text-accent text-2xl transition-colors"><FaGithub /></a>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
);

const AboutSection = () => (
  <motion.section
    id="about" className="py-16 md:py-24"
    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}
  >
    <div className="container mx-auto px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
        <p className="text-secondary text-base md:text-lg">
            I am a passionate creator who thrives at the intersection of technology and design. My journey began with a curiosity for how things work, which evolved into a career dedicated to building innovative digital products. As the founder of HiigsiTech.com, I have had the privilege of transforming complex ideas into streamlined, functional, and visually compelling solutions for over 130 clients. I believe in a hands-on approach, diving deep into every project to ensure it not only meets but exceeds expectations. My goal is to leverage my diverse skill set to solve complex problems, drive business growth, and create exceptional user experiences.
        </p>
      </div>
    </div>
  </motion.section>
);

const TimelineSection = () => (
    <motion.section
        id="experience" className="py-16 md:py-24 bg-gray-800/10"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}
    >
        <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Career & Education Timeline</h2>
            <div className="relative border-l-2 border-border/50 max-w-3xl mx-auto">
                {timelineEvents.map((event, index) => (
                    <motion.div
                        key={index}
                        className="mb-12 pl-10"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                    >
                        <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-accent border-4 border-background"></div>
                        <p className="text-sm text-accent mb-1">{event.date}</p>
                        <h3 className="text-2xl font-bold flex items-center gap-3">
                            {event.type === 'work' ? <FaBriefcase /> : <FaGraduationCap />}
                            {event.title}
                        </h3>
                        <p className="text-secondary mb-3">{event.institution}</p>
                        <p className="text-secondary">{event.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </motion.section>
);

const SkillsSection = () => (
    <motion.section
        id="skills" className="py-16 md:py-24"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}
    >
        <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Core Competencies</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <div className="bg-gray-900/50 p-8 rounded-lg border border-border">
                    <h3 className="text-2xl font-bold text-accent mb-4">Development & Engineering</h3>
                    <p className="text-secondary mb-4">Building robust, scalable, and high-performance applications from front to back.</p>
                    <div className="flex flex-wrap gap-2">
                        {skills.Frontend.map(skill => <span key={skill} className="bg-gray-800/50 text-secondary text-xs rounded px-3 py-1">{skill}</span>)}
                        {skills.Backend.map(skill => <span key={skill} className="bg-gray-800/50 text-secondary text-xs rounded px-3 py-1">{skill}</span>)}
                    </div>
                </div>
                <div className="bg-gray-900/50 p-8 rounded-lg border border-border">
                    <h3 className="text-2xl font-bold text-accent mb-4">Design & Strategy</h3>
                    <p className="text-secondary mb-4">Crafting intuitive experiences, strong brands, and effective IT solutions.</p>
                    <div className="flex flex-wrap gap-2">
                         {skills["Design & UI/UX"].map(skill => <span key={skill} className="bg-gray-800/50 text-secondary text-xs rounded px-3 py-1">{skill}</span>)}
                         {skills["IT & DevOps"].map(skill => <span key={skill} className="bg-gray-800/50 text-secondary text-xs rounded px-3 py-1">{skill}</span>)}
                    </div>
                </div>
            </div>
        </div>
    </motion.section>
);

const PortfolioSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const autoplay = setInterval(() => emblaApi.scrollNext(), 4000);
        return () => clearInterval(autoplay);
    }, [emblaApi]);

    return (
        <motion.section
            id="portfolio" className="py-16 md:py-24 bg-gray-800/10"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Projects</h2>
                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {projects.map((project, index) => (
                                <div key={index} className="flex-grow-0 flex-shrink-0 basis-full md:basis-1/2 lg:basis-1/3 pl-4">
                                    <div className="group relative overflow-hidden rounded-lg border border-border h-96 block">
                                        <Image src={project.img} alt={project.title} fill className="object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/70 flex flex-col justify-end p-6 transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-[2px]">
                                            <h3 className="text-xl font-bold text-primary">{project.title}</h3>
                                            <p className="text-accent text-sm mb-4">{project.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-8">
                        <button onClick={scrollPrev} className="bg-background/70 p-3 rounded-full border border-border hover:bg-accent hover:text-background transition-all"><FaChevronLeft /></button>
                        <button onClick={scrollNext} className="bg-background/70 p-3 rounded-full border border-border hover:bg-accent hover:text-background transition-all"><FaChevronRight /></button>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

const TestimonialsSection = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        const autoplay = setInterval(() => emblaApi.scrollNext(), 5000);
        return () => clearInterval(autoplay);
    }, [emblaApi]);

    return (
        <motion.section
            id="testimonials" className="py-16 md:py-24"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4 sm:px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Professional Recommendations</h2>
                <div className="relative">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="flex-grow-0 flex-shrink-0 basis-full md:basis-1/2 lg:basis-1/3 pl-4">
                                    <div className="bg-gray-900/50 p-8 rounded-lg border border-border h-full flex flex-col">
                                        <FaQuoteLeft className="text-accent text-3xl mb-4" />
                                        <p className="text-secondary mb-6 italic flex-grow">"{testimonial.quote}"</p>
                                        <div className="flex items-center mt-auto">
                                            <Image src={testimonial.avatar} alt={testimonial.name} width={50} height={50} className="rounded-full object-cover w-12 h-12"/>
                                            <div className="ml-4">
                                                <p className="font-bold">{testimonial.name}</p>
                                                <p className="text-sm text-secondary">{testimonial.company}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center gap-4 mt-8">
                        <button onClick={scrollPrev} className="bg-background/70 p-3 rounded-full border border-border hover:bg-accent hover:text-background transition-all"><FaChevronLeft /></button>
                        <button onClick={scrollNext} className="bg-background/70 p-3 rounded-full border border-border hover:bg-accent hover:text-background transition-all"><FaChevronRight /></button>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

const ContactSection = () => {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.currentTarget);
        formData.append("access_key", "facc05c6-643d-4d5b-8fd1-024722976804");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully!");
            (event.target as HTMLFormElement).reset();
             setTimeout(() => setResult(""), 5000);
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <motion.section
            id="contact" className="py-20 md:py-28 bg-gray-800/10"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold">Open to New Opportunities</h2>
                    <p className="text-accent text-lg mt-2 mb-8">Have a role that seems like a good fit? I'd love to hear from you.</p>
                </div>
                <form onSubmit={onSubmit} className="max-w-xl mx-auto mt-8 space-y-4">
                    <input type="text" name="name" placeholder="Full Name" required className="w-full bg-gray-800/50 border border-border rounded p-3 text-primary focus:ring-1 focus:ring-accent focus:outline-none backdrop-blur-sm" />
                    <input type="email" name="email" placeholder="Your Email Address" required className="w-full bg-gray-800/50 border border-border rounded p-3 text-primary focus:ring-1 focus:ring-accent focus:outline-none backdrop-blur-sm" />
                    <textarea name="message" placeholder="Your Message" rows={4} required className="w-full bg-gray-800/50 border border-border rounded p-3 text-primary focus:ring-1 focus:ring-accent focus:outline-none backdrop-blur-sm"></textarea>
                    <button type="submit" className="w-full bg-gradient-to-r from-accent to-teal-500 text-background font-bold py-3 px-5 rounded hover:scale-105 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
                        Send Message
                    </button>
                </form>
                <span className="block text-center mt-4 text-accent h-6">{result}</span>
            </div>
        </motion.section>
    );
};

const Footer = () => (
    <footer className="border-t border-border mt-16">
      <div className="container mx-auto px-4 sm:px-6 py-6 text-center text-secondary text-sm">
          <p>&copy; {new Date().getFullYear()} Mubarik Osman. All rights reserved.</p>
          <p>Hargeisa, Somalia</p>
      </div>
  </footer>
);
