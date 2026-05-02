"use client";
import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from "motion/react";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const HomeClient = ({ email }: { email: string }) => {
    const navigate = useRouter();
    const [actionloading, setActionLoading] = useState<"login" | "dashboard" | null>(null);

    const handleLogin = () => {
        setActionLoading("login")
        window.location.href = "/api/auth/login";
    }

    console.log("email", email);
    const firstLetter = email ? email[0].toUpperCase() : "";
    const [open, setOpen] = useState(false);

    const popupref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (popupref.current && !popupref.current.contains(e.target as Node))
                setOpen(false);
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const features = [
        {
            title: "Plug & Play",
            desc: "Add the chatbot to your website with a single script tag. No setup needed."
        },
        {
            title: "Customizable",
            desc: "Match the chatbot to your brand with colors, name, and behavior controls."
        },
        {
            title: "Real-time Responses",
            desc: "Instant replies powered by AI to assist your users 24/7."
        }
    ];

    const handleLogOut = async () => {
        try {
            await axios.get("/api/auth/logout");
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden'>
            <motion.div
                className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <Link href="/">
                        <div className='text-lg font-semibold tracking-tight'>Embed<span className='text-zinc-400'>Chat</span></div>
                    </Link>
                    {email ?
                        <div
                            className='relative'
                            ref={popupref}
                        >
                            <button
                                className='w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition'
                                onClick={() => setOpen(!open)}
                            >
                                {firstLetter}
                            </button>
                            <AnimatePresence>
                                {
                                    open && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -6 }}
                                            className='absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden'
                                        >
                                            <button className='w-full text-left px-4 py-3 text-sm hover:bg-zinc-100'
                                                onClick={() => {
                                                    navigate.push("/dashboard")
                                                    setActionLoading("dashboard")
                                                }}
                                                disabled={actionloading === "dashboard"}
                                            >{actionloading === "dashboard" ? "loading..." : "Dashboard"}</button>
                                            <button
                                                className='w-full text-left block px-4 py-3 text-sm text-red-600 hover:bg-zinc-100'
                                                onClick={handleLogOut}
                                            >LogOut</button>
                                        </motion.div>
                                    )
                                }
                            </AnimatePresence>
                        </div> :
                        <button
                            onClick={handleLogin}
                            disabled={actionloading === "login"}
                            className='px-5 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2'
                        >
                            {actionloading === "login" ? "loading..." : "Login"}
                        </button>
                    }
                </div>
            </motion.div>
            <section className='pt-36 pb-28 px-6 '>
                <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1
                            className='text-4xl md:text-5xl font-semibold leading-tight'
                        >
                            AI Customer Support <br />
                            Built for Modern Websites
                        </h1>
                        <p
                            className='mt-6 text-lg text-zinc max-w-xl'
                        >
                            Add a powerful AI chatbot to your website in minutes.
                            Let your Customers get insant using your own business knowledge.
                        </p>
                        <div className='mt-10 flex gap-4'>
                            {
                                email ?
                                    <button
                                        className='px-6 py-3 rounded-xl bg-black text-white font-medium text-sm 
        shadow-md hover:shadow-lg hover:-translate-y-0.5 
        active:scale-95 transition-all duration-200'
                                        onClick={() => {
                                            navigate.push("/dashboard")
                                            setActionLoading("dashboard")
                                        }}
                                    >
                                        {actionloading === "dashboard" ? "loading..." : "Go To DashBoard"}
                                    </button>
                                    :
                                    <button
                                        className='px-6 py-3 rounded-xl bg-black text-white font-medium text-sm 
        shadow-md hover:shadow-lg hover:-translate-y-0.5 
        active:scale-95 transition-all duration-200'
                                        onClick={handleLogin}
                                    >
                                        Get Started
                                    </button>
                            }
                            <Link href="#features"
                                className='px-6 py-3 rounded-xl border border-zinc-300 text-zinc-800 font-medium text-sm 
        bg-white hover:bg-zinc-100 hover:border-zinc-400 
        active:scale-95 transition-all duration-200'
                            >
                                Learn More
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className='relative'
                    >
                        <div className='rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6'>
                            <div className='text-sm text-zinc-500 mb-3'>
                                Live Chat Preview
                            </div>
                            <div className='space-y-3'>
                                <div className='flex justify-end'>
                                    <div className='max-w-xs px-4 py-2 rounded-2xl bg-black text-white text-sm shadow'>
                                        Do you offer cash on delivery?
                                    </div>
                                </div>
                                <div className='flex justify-start'>
                                    <div className='max-w-xs px-4 py-2 rounded-2xl bg-zinc-100 text-zinc-800 text-sm shadow-sm border border-zinc-200'>
                                        Yes, cash on delivery is available.
                                    </div>
                                </div>
                            </div>
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                                className='absolute -bottom-6 -right-6 w-14 h-14 rounded-full 
    bg-black text-white flex items-center justify-center 
    shadow-lg cursor-pointer'
                            >
                                💬
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section
                className='bg-zinc-50 py-28 px-6 border-t border-zinc-200'
                id='features'
            >
                <div
                    className='max-w-6xl mx-auto'
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                        className='text-3xl font-semibold text-center'
                    >
                        Why business choose EmbedChat
                    </motion.h2>
                    <div className='mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        {
                            features.map((f, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    whileHover={{ y: -6 }}
                                    className='group rounded-2xl bg-white border border-zinc-200 
                p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer'
                                >

                                    <h3 className='text-lg font-semibold text-zinc-900 group-hover:text-black'>
                                        {f.title}
                                    </h3>


                                    <div className='w-8 h-0.5 bg-zinc-300 my-3 group-hover:bg-black transition-all'></div>


                                    <p className='text-sm text-zinc-600 leading-relaxed'>
                                        {f.desc}
                                    </p>
                                </motion.div>
                            ))
                        }
                    </div>
                </div>
            </section>
            <footer className='py-10 text-center text-sm text-zinc-500'>
                &copy; {new Date().getFullYear()} EmbedChat. All rights reserved.
            </footer>
        </div>
    )
}

export default HomeClient;
