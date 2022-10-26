import React, { createContext, useState } from 'react'
export const AppContext = createContext<any>({} as any)
import ApeXRX from './public/ape-xrx.png'

interface Props {
    children: React.ReactNode
}

function AppContextProvider({ children }: Props) {
    const [claimedNft, setClaimedNft] = useState({
        owner: "0xb29FDEd7b68d357B5EBa17990BF0Ba46c2FF6e0E",
        metadata: {
            name: "#2",
            description: "Roam Ape",
            image: ApeXRX,
            attributes: [
                {
                    trait_type: "Shirt",
                    value: "none"
                },
                {
                    trait_type: "Fur",
                    value: "trippy"
                },
                {
                    trait_type: "Hat",
                    value: "none"
                },
                {
                    trait_type: "Eyes",
                    value: "cyborg"
                }
            ],
            id: "2",
            uri: "ipfs://QmPTcgumTsaPX7kwvF4Q35J2HWdAkZcaHeyVR2nPuvJQKU/2"
        },
        type: "ERC721",
        supply: 1
    })

    return (
        <AppContext.Provider value={{ claimedNft, setClaimedNft }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider