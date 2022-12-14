import React, { useEffect, useState } from 'react'
import { ConnectWallet } from "@thirdweb-dev/react"
import Link from 'next/link'
import RoamApesLogo from '../public/roamapes-logo-05.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Sidebar from './Sidebar'
import { Bars3Icon } from '@heroicons/react/24/outline'

function Navbar() {
    const [sidebar, setSidebar] = useState<any>()
    const [backgroundOpacity, setBackgroundOpacity] = useState<string>("hidden")
    const { asPath } = useRouter()

    useEffect(() => {
        setSidebar(() => {
            const element = document.querySelector('#nav-sidebar')
            return element
        })
    })

    function showhideSidebar() {
        if (sidebar) {
            if (sidebar.style.left != "0px") {
                sidebar.style.left = "0px"
                setBackgroundOpacity("")
                document.body.style.overflow = "hidden"
            } else {
                sidebar.style.left = "-100vw"
                setBackgroundOpacity("hidden")
                document.body.style.overflow = "visible"
            }
            
        }
    }

    return (
        <>
            <div className="w-full fixed h-[80px] shadow-lg shadow-gray-100/80 flex items-center bg-white z-50">
                <div className="relative grid grid-cols-9 items-center w-full max-w-7xl mx-auto px-10">

                    {/* left */}
                    <div className="col-span-3 flex justify-start">  
                        <div className="hidden lg:flex">
                            <Link href="/">  
                                <Image src={RoamApesLogo} className="cursor-pointer" height={60} width={80} objectFit="contain" />
                            </Link>
                        </div>
                        
                        <div className="flex lg:hidden rounded-full cursor-pointer" onClick={showhideSidebar}>
                            <Bars3Icon className="w-8 h-8" />
                        </div>
                        
                    </div>

                    {/* center */}
                    <div className="col-span-3 flex justify-center">
                        <div className="hidden lg:flex">
                            <Link href={'/'}>
                                <a className={`px-4 cursor-pointer transition-all hover:text-black ${asPath === "/" ? "black" : "text-gray-600/80"}`}>
                                    Home
                                </a>
                            </Link>


                            <Link href={'/nft/mint'}>
                                <a className={`px-4 cursor-pointer transition-all hover:text-black ${(asPath === "/nft/mint" || asPath.includes("/nft/showcase")) ? "black" : "text-gray-600/80"}`}>
                                    Mint
                                </a>
                            </Link>

                            <a href="https://testnets.opensea.io/account" target="_blank" className="px-4 text-gray-600/80 cursor-pointer hover:text-black">Manage</a>
                        </div>


                        <div className="col-span-3 flex justify-center lg:hidden">  
                            <Image src={RoamApesLogo} height={60} width={80} objectFit="contain" />
                        </div>
                    </div>

                    {/* right */}
                    <div className="col-span-3 flex justify-end">
                        <div className="hidden lg:flex">
                            <ConnectWallet />
                        </div>
                    </div>
                </div>
            </div>
            <Sidebar />
            <div className={`${backgroundOpacity} bg-black/20 fixed w-full h-full lg:hidden top-0 left-0 z-[35]`}></div>
        </>

    )
}

export default Navbar