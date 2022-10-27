import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { sanityClient } from '../sanity'
import { Collection } from '../typings'
import Navbar from '../components/Navbar'
import Timeline from '../components/Timeline'
import ape1 from '../public/ape-1.png'
import ape2 from '../public/ape-2.png'
import ape5 from '../public/ape-5.png'
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { useContract } from '@thirdweb-dev/react'

interface Props {
  collections: Collection[]
}

const Home = ({ collections }: Props) => {
  const [availibleSupply, setAvailableSupply] = useState<number>(0)
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [loading, setLoading] = useState<boolean>(true)
  const nftDrop = useContract(collections[0].address, "nft-drop").contract

  const mintUrl = collections[0].slug.current

  useEffect(() => {
    document.body.style.overflow = "visible"

    if (!nftDrop) return

    const fetchNFTDropData = async () => {
        setLoading(true)

        const claimed = await nftDrop.getAllClaimed()
        const total = await nftDrop.totalSupply()

        setAvailableSupply(total.toNumber() - claimed.length)
        setTotalSupply(total)

        setLoading(false)
    }
    
    fetchNFTDropData()
  }, [nftDrop])

  return (
    <div className="flex flex-col px-10 pb-10 items-center max-w-7xl mx-auto">
      <Head>
        <title>Roam Apes</title>
        <link rel="icon" href="roamape-emblem.png" />
      </Head>

      <Navbar />
      {/* <Sidebar /> */}

      <main className="w-full mt-[80px] pt-10">
        <h1 className="text-5xl lg:text-7xl tracking-wide font-medium">Discover the <span className="font-bold">Rare</span> Community of </h1>
        <div className="flex flex-col lg:grid grid-cols-10">

          {/* left */}
          <div className="col-span-6 flex flex-col m-10 mx-auto lg:mr-10">

            {/* left--top */}
            <div className="flex space-x-5 items-center">
              <div className="overflow-hidden">
                <Image src={ape1} className="rounded-full" height={300} width={200} objectFit="cover"/>
              </div>

              <div className="overflow-hidden">
                <Image src={ape5} className="rounded-full" height={450} width={300} objectFit="cover"/>
              </div>

              <div className="overflow-hidden">
                <Image src={ape2} className="rounded-full" height={300} width={200} objectFit="cover"/>
              </div>
            </div>

            {/* left--bottom */}
            <div className="mt-10 hidden lg:flex flex-col">
              <h2 className="text-3xl font-medium mb-2">Road Map</h2>
              <Timeline />
            </div>
          </div>

          {/* right */}
          <div className="col-span-4 lg:mt-10 flex justify-end">
            <div className="">
              <h1 className="font-bold text-5xl lg:text-7xl bg-pink-100 p-3 w-fit">Roam Apes</h1>
              <div className="flex flex-col mt-4 lg:max-w-[375px] ml-auto">
                <div>
                  {/* <p className="font-medium text-lg">Meet a very special group of Apes that sleep, eat and breathe coding.</p> */}
                  <p className="font-medium text-lg">Meet a very special group of Apes that will Roam, Rule and Conquer the digital ape world.</p>

                  <div className="mt-5 items-center flex space-x-5 relative">
                    <Link href={`/nft/${mintUrl}`}>
                      <a className="bg-black text-white font-semibold px-5 py-3 rounded-lg flex items-center w-fit cursor-pointer hover:text-pink-100">
                        Mint
                        <ArrowRightCircleIcon className="h-6 w-6 ml-2" />
                      </a>
                    </Link>
                    <div className="flex-grow h-px bg-black/60"/>
                    <h3 className="bg-pink-100 font-semibold p-1 rounded">0.01 ETH</h3>
                  </div>

                  <div className="flex space-x-6 mt-10">
                    <div className="flex flex-col">
                      <h2 className={`text-3xl font-bold ${loading && "animate-pulse"}`}>{loading ? "..." : totalSupply?.toNumber()}</h2>
                      <p>Unique Apes</p>
                    </div>
                    <div className="flex flex-col">
                      <h2 className={`text-3xl font-bold ${loading && "animate-pulse"}`}>{loading ? "..." : availibleSupply}</h2>
                      <p>Available</p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-3xl font-medium">Traits</h2>
                    <div className="mt-1 flex flex-wrap">
                      <span className="bg-blue-100 text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded m-3">fur</span>
                      <span className="bg-blue-100 text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded m-3">shirt</span>
                      <span className="bg-blue-100 text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded m-3">hat</span>
                      <span className="bg-blue-100 text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded m-3">eyes</span>
                      <span className="bg-blue-100 text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded m-3">laser</span>
                      <span className="bg-blue-100 text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded m-3">sleepy</span>
                      <span className="bg-blue-100 text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded m-3">brown</span>
                      <span className="bg-blue-100 text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded m-3">gold</span>
                      <span className="bg-blue-100 text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded m-3">beanie</span>
                      <span className="bg-blue-100 text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded m-3">sailor</span>
                      <span className="bg-blue-100 text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded m-3">black</span>
                      <span className="bg-blue-100 text-blue-800 text-2xl font-semibold px-2.5 py-0.5 rounded m-3">caveman</span>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-3xl font-medium">Perks</h2>
                    <ul className="list-disc ml-5 mt-2">
                      <li className="text-base font-normal text-gray-500 my-2">
                        Access to the Roam Apes private super yacht in Monnaco.
                      </li>
                      <li className="text-base font-normal text-gray-500 my-2">
                        Whitelisted for all our future collection releases.
                      </li>
                      <li className="text-base font-normal text-gray-500 my-2">
                        Get to be apart of the most insane ape community on the planet.
                      </li>
                    </ul>
                  </div>

                  <div className="mt-10 flex flex-col lg:hidden">
                    <h2 className="text-3xl font-medium mb-2">Road Map</h2>
                    <Timeline />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == "collection"]{
    _id,
    title,
    address,
    description,
    nftCollectionName,
    mainImage {
      asset
    },
    previewImage {
      asset
    },
    slug {
      current
    },
    creator-> {
      _id,
      name,
      address,
      slug {
        current 
      },
    },
  }`

  const collections = await sanityClient.fetch(query)
  console.log(collections)

  return {
    props: {
      collections
    }
  }
}
