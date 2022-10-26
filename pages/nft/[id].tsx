import React, { useEffect, useState, useContext } from 'react'
import { useAddress, useContract } from "@thirdweb-dev/react";
import { GetServerSideProps } from 'next';
import { sanityClient } from '../../sanity';
import { Collection } from '../../typings';
import { BigNumber } from 'ethers';
import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router'
import { AppContext } from '../../AppContext'
import Link from 'next/link';



interface Props {
    collection: Collection
}

function NFTDropPage({collection}: Props) {
    const [claimedSupply, setClaimedSupply] = useState<number>(0)
    const [totalSupply, setTotalSupply] = useState<BigNumber>()
    const [priceInEth, setPriceInEth] = useState<string>()
    const [loading, setLoading] = useState<boolean>(true)
    const nftDrop = useContract(collection.address, "nft-drop").contract
    const router = useRouter()
    const { setClaimedNft } = useContext(AppContext)

    
    
    // Auth
    const address = useAddress()

    useEffect(() => {
        document.body.style.overflow = "hidden"

        if(!nftDrop) return

        const fetchPrice = async () => {
            const claimConditions = await nftDrop.claimConditions.getAll()
            setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
        }

        fetchPrice()
    }, [nftDrop])

    useEffect(() => {
        if (!nftDrop) return

        const fetchNFTDropData = async () => {
            setLoading(true)

            const claimed = await nftDrop.getAllClaimed()
            const total = await nftDrop.totalSupply()

            setClaimedSupply(claimed.length)
            setTotalSupply(total)

            setLoading(false)
        }
        
        fetchNFTDropData()
    }, [nftDrop])

    const mintNft = () => {
        if (!nftDrop || !address) return

        const quantity = 1 // how many unique NFTs you want to claim

        setLoading(true)
        const notification = toast.loading('Minting...', {
            style: {
                background: 'white',
                color: 'green',
                fontWeight: 'bolder',
                fontSize: '17px',
                padding: '20px',
            }
        })

        nftDrop.claimTo(address, quantity).then(async (tx) => {
            const receipt = tx[0].receipt // the transaction receipt
            const claimedTokenId = tx[0].id // the id of the NFT claimed
            const newClaimedNFT = await tx[0].data() // (optional) get the claimed NFT metadata

            toast('HOORAY.. You Successfully Minted!', {
                duration: 8000,
                style: {
                    background: 'green',
                    color: 'white',
                    fontWeight: 'bolder',
                    fontSize: '17px',
                    padding: '20px',
                }
            })

            setClaimedNft(newClaimedNFT)

            router.push(`/nft/showcase/${address}`)

        }).catch(err => {
            console.log(err)
            toast('Whoops... Something went wrong!', {
                duration: 8000,
                style: {
                    background: 'red',
                    color: 'white',
                    fontWeight: 'bolder',
                    fontSize: '17px',
                    padding: '20px',
                }
            })
        }).finally(() => {
            setLoading(false)
            toast.dismiss(notification)
        })
    }
            
    return (
        <div className="h-screen max-h-screen flex flex-col px-10 items-center max-w-7xl mx-auto relative">
            <Toaster position='bottom-center' />

            <Navbar />
            
            <div className="h-full flex flex-col justify-center"> 
                <h1 className="font-bold text-5xl leading-tight lg:text-7xl text-center">Mint your <span className="bg-pink-100 px-3">Roam</span><span className="bg-pink-100 pr-3">Ape</span></h1>
                
                {loading ? (
                    <h2 className="text-3xl text-center font-medium mt-10 animation-pulse">Loading Supply Count...</h2>
                ): (

                    <h2 className="text-3xl text-center font-medium mt-10">{claimedSupply} / {totalSupply?.toString()} Apes Claimed</h2>
                )}

                {/* Mint Button */}
                <button 
                    onClick={mintNft}
                    disabled={loading || claimedSupply === totalSupply?.toNumber() || !address} 
                    className="h-16 bg-blue-500 w-full text-white rounded-full mt-10 font-bold hover:shadow-[0px_0px_0px_1px_rgba(59,130,246)] disabled:hover:shadow-[0px_0px_0px_0px_rgba(59,130,246)] disabled:bg-gray-200 "
                >
                    {loading ? (
                        <>Loading</>
                    ): claimedSupply === totalSupply?.toNumber() ? (
                        <>SOLD OUT</>
                    ): !address ? (
                        <>Sign in to Mint</>
                    ): (
                        <span className="font-bold">Mint Ape ({priceInEth} ETH)</span>
                    )}
                </button>
                <Link href="/nft/showcase/simulate"><p className="mx-auto w-fit mt-5 cursor-pointer">or <span className="underline">simulate mint</span></p></Link>        
            </div>
      
        </div>
    )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const query = `*[_type == "collection" && slug.current == $id][0]{
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

      const collection = await sanityClient.fetch(query, {
        id: params?.id
      })

      if (!collection) {
        return {
            notFound: true
        }
      }

      return {
        props: {
            collection
        }
      }
}