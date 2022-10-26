import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '../../../components/Navbar'
import { AppContext } from '../../../AppContext'
import ApeX from '../../../public/ape-x.png'

function Showcase() {

  const { claimedNft } = useContext(AppContext)

  useEffect(() => {
    document.body.style.overflow = "visible"
  }, [])

  return (
    <div className="min-h-screen lg:h-screen flex flex-col px-10 pb-10 items-center max-w-7xl mx-auto relative">
            <Toaster position='bottom-center' />

            <Navbar />
            
            <div className="h-full w-full flex flex-col lg:flex-row items-center pt-[120px] tall:pt-0 lg:mt-0 lg:pt-0 m-auto">
              {/* left */}
              <div className="flex-1 flex flex-col items-center lg:items-stretch justify-center">
                <h1 className="font-bold text-5xl lg:text-7xl lg:mt-5 w-fit text-center leading-tight">Welcome to the</h1>
                <h1 className="font-bold text-5xl lg:text-7xl mt-5 bg-pink-100 w-fit p-3">Roam Apes</h1>
                <h1 className="font-bold text-5xl lg:text-7xl mt-5 w-fit">Community</h1>
                <a href="https://testnets.opensea.io/account" target="_blank"><button className="hidden lg:block h-16 bg-blue-500 w-full text-white rounded-full mt-10 font-bold hover:shadow-[0px_0px_0px_1px_rgba(59,130,246)]">View on Open Sea</button></a>
              </div>

              {/* right */}
              <div className="flex-1 flex justify-center mt-10 pt-5">
                <div className="w-fit flex flex-col relative z-[-2]">

                   {/* fake card */}
                  <div className="bg-white border-2 border-black absolute z-[-1] -rotate-12 p-5 w-[240px] lg:w-fit">

                    <div className="flex justify-between mb-3">
                      <h2 className="font-bold bg-pink-100 px-1">Roam Ape</h2>
                      <h2 className="font-bold">{claimedNft.metadata.name}</h2>
                    </div>

                    <div className="overflow-hidden lg:hidden">
                      <Image src={ApeX} height={200} width={200} objectFit="cover"/>
                    </div>

                    <div className="overflow-hidden hidden lg:flex">
                      <Image src={ApeX} height={300} width={300} objectFit="cover"/>
                    </div>

                    <div className="w-full">  
                      <div className="flex flex-wrap max-w-fit">
                        {claimedNft.metadata.attributes.map(((trait: { trait_type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => {
                          return (
                            <>
                              <span className="bg-blue-100 text-blue-800 font-semibold px-2 py-0.4 lg:px-2.5 lg:py-0.5 rounded m-1 text-[0.65rem] lg:text-sm">{trait.trait_type}:</span>
                              <span className="bg-pink-100 text-black font-semibold px-2 py-0.4 lg:px-2.5 lg:py-0.5 rounded m-1 text-[0.65rem] lg:text-sm">{trait.value}</span>
                            </>
                          )
                        }))}
                      </div>

                      <button className="text-sm lg:text-base w-full bg-black text-white p-1.5 lg:p-3 mt-3 rounded-lg hover:text-pink-100 font-semibold cursor-pointer z-5">Share</button>
                    </div>
                  </div> 

                  {/* real card */}
                  <div className="flex flex-col border-2 border-black p-5 ml-3 mb-5 bg-white w-[240px] lg:w-fit">
                    <div className="flex justify-between mb-3">
                      <h2 className="font-bold bg-pink-100 px-1">Roam Ape</h2>
                      <h2 className="font-bold">{claimedNft.metadata.name}</h2>
                    </div>

                    <div className="overflow-hidden lg:hidden">
                      <Image src={claimedNft.metadata.image} height={200} width={200} objectFit="cover"/>
                    </div>

                    <div className="overflow-hidden hidden lg:flex">
                      <Image src={claimedNft.metadata.image} height={300} width={300} objectFit="cover"/>
                    </div>

                    <div className="w-full">  
                      <div className="flex flex-wrap max-w-fit">
                        {claimedNft.metadata.attributes.map(((trait: { trait_type: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; value: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => {
                          return (
                            <>
                              <span className="bg-blue-100 text-blue-800 font-semibold px-2 py-0.4 lg:px-2.5 lg:py-0.5 rounded m-1 text-[0.65rem] lg:text-sm">{trait.trait_type}:</span>
                              <span className="bg-pink-100 text-black font-semibold px-2 py-0.4 lg:px-2.5 lg:py-0.5 rounded m-1 text-[0.65rem] lg:text-sm">{trait.value}</span>
                            </>
                          )
                        }))}
                      </div>

                      <button className="text-sm lg:text-base w-full bg-black text-white p-1.5 lg:p-3 mt-3 rounded-lg hover:text-pink-100 font-semibold cursor-pointer z-5">Share</button>
                    </div>
                  </div>
                  <a href="https://testnets.opensea.io/account" target="_blank"><button className="lg:hidden h-16 bg-blue-500 w-full text-white rounded-full mt-10 font-bold hover:shadow-[0px_0px_0px_1px_rgba(59,130,246)]">View on Open Sea</button></a>
                </div>
              </div>
            </div>
        </div>
  )
}

export default Showcase