import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import { ConnectWallet } from "@thirdweb-dev/react"

function Sidebar() {
    const { asPath } = useRouter()

    return (
        
        <div id="nav-sidebar" className="fixed top-[80px] left-[-100vw] lg:hidden z-40 h-screen p-4 overflow-y-auto bg-white w-full sm:w-[400px] transition-all shadow-lg">
            <div className="relative flex flex-col">
    
                <Link href={'/'}>
                    <a className={`px-4 cursor-pointer transition-all p-5 m-2 hover:bg-gray-100 hover:text-black rounded-lg ${asPath === "/" ? "text-black bg-gray-100" : "text-gray-600/80"}`}>
                        Home
                    </a>
                </Link>

                <Link href={'/nft/mint'}>
                    <a className={`px-4 cursor-pointer transition-all p-5 m-2 hover:bg-gray-100 hover:text-black rounded-lg ${(asPath === "/nft/mint" || asPath === "/nft/showcase/simulate") ? "text-black bg-gray-100" : "text-gray-600/80"}`}>
                        Mint
                    </a>
                </Link>

                <a className="px-4 text-gray-600/80 cursor-pointer p-5 m-2 hover:bg-gray-100 hover:text-black rounded-lg">Create</a>
                <a className="px-4 text-gray-600/80 cursor-pointer p-5 m-2 hover:bg-gray-100 hover:text-black rounded-lg" >About</a>

                <div className="flex justify-center mt-2">
                    <ConnectWallet className="focus:outline-none" />
                </div>

            </div>
        </div>
        
    )
}

export default Sidebar