// components/Header.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = ['About', 'Experience', 'Skills', 'Portfolio', 'Testimonials', 'Contact'];

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

export default function Header() {
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
            // FIX 1: Header bar is now transparent when menu is open
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${!isOpen && hasScrolled ? 'bg-background/50 backdrop-blur-lg border-b border-border/50' : 'bg-transparent'}`}
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
                {/* FIX 2: Increased z-index to stay on top of the menu overlay */}
                <div className="md:hidden z-[60]">
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
                        // FIX 3: Correct z-index and added blurred background
                        className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-lg pt-24 z-50"
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