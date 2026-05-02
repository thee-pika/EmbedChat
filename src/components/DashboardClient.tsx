"use client";
import React, { useEffect, useState } from 'react'
import { motion } from "motion/react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const DashboardClient = ({ ownerId }: { ownerId: string }) => {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);


  const handleSettings = async () => {
    try {
      setLoading(true)
      const result = await axios.post("/api/settings", { ownerId, businessName, supportEmail, knowledge });
      console.log(result.data);
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 3000);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (ownerId) {
      handleGetSettings(ownerId);
    }
  }, [ownerId]);

  const handleGetSettings = async (ownerId: string) => {
    try {

      const result = await axios.post("/api/settings/get", { ownerId });
      console.log(result.data);
      setBusinessName(result.data.businessName);
      setKnowledge(result.data.knowledge);
      setSupportEmail(result.data.supportEmail);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className='min-h-screen bg-zinc-50 text-zinc-900'
    >
      <motion.div
        className='fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200'
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
          <Link href="/">
            <div className='text-lg font-semibold tracking-tight'
              onClick={() => router.push("/")}
            >Support <span className='text-zinc-400'>AI</span></div>
          </Link>
          <button
            className="
    px-5 py-2 rounded-xl 
    bg-black text-white 
    text-sm font-medium 
    shadow-sm
    transition-all duration-200
    hover:bg-zinc-800 hover:shadow-md
    active:scale-95
    border border-black/10
  "
            onClick={() => router.push("/embed")}
          >
            Embed chatbot
          </button>
        </div>
      </motion.div>

      <div className='flex justify-center px-4 py-14 mt-20'>
        <motion.div
          className='w-full max-w-3xl bg-white rounded-2xl shadow-xl p-10'
        >
          <div className='mb-10 '>
            <h1 className='text-2xl'>Chatbot Settings </h1>
            <p className='text-zinc-500 mt-1'> Manage your AI chatbot knowledge and business details </p>
          </div>
          <div className='mb-10 '>
            <h1 className='text-lg font-medium mb-4'>business details </h1>
            <div className='space-y-4'>
              <input
                type='text'
                placeholder='Business Name'
                className=" w-full px-4 py-3 rounded-xl border border-zinc-200  bg-zinc-50  text-sm text-zinc-900 outline-none transition-all duration-200 focus:bg-white  focus:border-black  focus:ring-2 focus:ring-black/5 placeholder:text-zinc-400"
                onChange={(e) => setBusinessName(e.target.value)}
                value={businessName}
              />

              <input
                type='text'
                placeholder='Support Email'
                className=" w-full px-4 py-3 rounded-xl  border border-zinc-200   bg-zinc-50  text-sm text-zinc-900 outline-none transition-all duration-200  focus:bg-white   focus:border-black  focus:ring-2 focus:ring-black/5  placeholder:text-zinc-400"
                onChange={(e) => setSupportEmail(e.target.value)}
                value={supportEmail}
              />
            </div>
          </div>
          <div className='mb-10 '>
            <h1 className='text-lg font-medium mb-4'>knowledge Base</h1>
            <p className='text-sm text-zinc-500 mb-4'>Add FAQs , policies , delivery info , refunds, etc.</p>
            <div className='space-y-4'>
              <textarea
                placeholder={
                  `some Knowledge of the businesss`
                }
                className=" w-full px-4 py-3 rounded-xl h-54 border border-zinc-200   bg-zinc-50  text-sm text-zinc-900 outline-none transition-all duration-200  focus:bg-white   focus:border-black  focus:ring-2 focus:ring-black/5  placeholder:text-zinc-400 "
                onChange={(e) => setKnowledge(e.target.value)}
                value={knowledge}
              />
            </div>
          </div>
          <div className='flex items-center gap-5'>
            <motion.button
              className=" px-6 py-3 rounded-xl  bg-black text-white text-sm font-semibold shadow-md transition-all duration-200  hover:bg-zinc-800 hover:shadow-lg active:scale-95 border border-black/10 disabled:opacity-50 disabled:cursor-not-allowed
  "
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSettings}
              disabled={loading}
            >
              {loading ? "saving ..." : "Save"}
            </motion.button>
            {saved && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className=" inline-flex items-center gap-2 px-4 py-2 rounded-lg  bg-green-50 text-green-700 border border-green-200 text-sm font-medium shadow-sm
    "
              >
                <span className="text-green-600">✔</span>
                Settings saved
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardClient;
