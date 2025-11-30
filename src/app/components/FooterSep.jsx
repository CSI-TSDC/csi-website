'use client'

import { useState } from 'react'

export default function FooterSep() {
    const [message, setMessage] = useState('')

    const handleSendMail = () => {
        const subject = encodeURIComponent('Become a Collaborator or Sponsor')
        const body = encodeURIComponent(message || 'I would like to become a collaborator or sponsor.')
        const mailtoLink = `mailto:csi@tsdcmumbai.in?subject=${subject}&body=${body}`
        window.location.href = mailtoLink
    }

    return (
        <div className="relative px-16 py-6 min-h-[250px]">
            <div className="absolute top-0 left-0 w-full h-full">
                <img className="w-full h-full object-cover brightness-50" src="/assets/images/college_building.png" alt="" />
            </div>
            <div className="relative z-10 flex flex-wrap justify-around items-center min-h-[250px] text-white">
                <div className="flex flex-col space-y-2">
                    <h2 className="text-7xl font-medium">Get Involved</h2>
                    <p className="text-2xl">
                        <span className="block float-left">We've got a lot going on</span>
                        <span className="block float-left clear-both">Want to Become a Collaborator / Sponsor ?</span>
                    </p>
                </div>
                <div className="flex flex-col space-y-4 w-[300px]">
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                        className="h-24 px-4 py-3 text-base rounded-md border-2 border-white/30 bg-black/20 backdrop-blur-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-white transition-all resize-none"
                    />
                    <button
                        onClick={handleSendMail}
                        className="w-full px-6 py-2 text-base font-medium bg-white text-black rounded-md hover:bg-gray-200 transition-colors"
                    >
                        Send Email
                    </button>
                </div>
            </div>
        </div>
    )
}