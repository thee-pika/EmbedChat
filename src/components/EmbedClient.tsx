"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { motion } from "motion/react";

const EmbedClient = ({ ownerId }: { ownerId: string }) => {
    const router = useRouter();
    const embedCode =
        `<script 
      src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js"
      data-owner-id="${ownerId}">
</script>`;
    const [copied, setCopied] = useState(false);

    const copyCode = () => {
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000)
    }

    return (
        <div className='min-h-screen bg-zinc-50 text-zinc-900'>
            <div className='sticky top-0 z-40 bg-white border-b border-zinc-200'>
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div className='text-lg font-semibold cursor-pointer'
                        onClick={() => router.push("/")}
                    >Embed<span className='text-zinc-400'>Chat</span></div>
                    <button
                        className='px-4 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100 transition'
                        onClick={() => router.push("/dashboard")}
                    >Back to Dashboard</button>
                </div>
            </div>

            <div className='flex justify-center px-4 py-14'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-10"
                >
                    <h1 className="text-2xl font-semibold mb-2">
                        Embed Chatbot
                    </h1>
                    <p>Copy and paste this code before <code>&lt;/body&gt;</code></p>
                    <div className="relative bg-zinc-900 text-zinc-100 rounded-xl p-5 text-sm font-mono mb-10 border border-zinc-800 shadow-sm">

                        <pre className="overflow-x-auto pr-16 leading-relaxed">
                            {embedCode}
                        </pre>

                        <button
                            className="absolute top-3 right-3 px-3 py-1.5 text-xs rounded-md bg-zinc-800 hover:bg-zinc-700 transition text-zinc-200 border border-zinc-700"
                            onClick={copyCode}
                        >
                            {copied ? "Copied ✔" : "Copy"}
                        </button>
                    </div>
                    <ol className='space-y-3 text-sm text-zinc-600 list-decimal list-inside'>
                        <li>Copy the embed script</li>
                        <li>Paste it before the closing body tag</li>
                        <li>Reload your website</li>
                    </ol>
                    <div className="mt-10">
                        <h2 className="text-lg font-semibold">Live Preview</h2>
                        <p className="text-sm text-zinc-500 mb-4">
                            This is how the chatbot will appear on your website
                        </p>

                        {/* Browser Mock */}
                        <div className="border border-zinc-200 rounded-xl overflow-hidden shadow-sm bg-white">

                            {/* Top bar */}
                            <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-200 bg-zinc-50">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                <span className="ml-3 text-xs text-zinc-500">
                                    your-website.com
                                </span>
                            </div>


                            <div className="relative h-75 bg-zinc-100 flex items-center justify-center text-zinc-400 text-sm">
                                Your website goes here

                                <div className="absolute bottom-24 right-4 w-64 h-32 bg-white rounded-xl shadow-xl border border-zinc-200 flex flex-col overflow-hidden">

                                    <div className="bg-black text-white px-3 py-2 flex justify-between items-center text-xs">
                                        <span>Customer Support</span>
                                        <span className="cursor-pointer">✕</span>
                                    </div>

                                    <div className="flex-1 p-2 bg-zinc-50 flex flex-col gap-2 text-xs">
                                        <div className="self-start bg-zinc-200 px-2 py-1 rounded-lg max-w-[75%]">
                                            Hi how can i help you 👋
                                        </div>
                                        <div className="self-end bg-black text-white px-2 py-1 rounded-lg max-w-[75%]">
                                            what is the return policy?
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                    className='absolute bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center
                             shadow-2xl cursor-pointer'
                                >
                                    💬
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default EmbedClient;
