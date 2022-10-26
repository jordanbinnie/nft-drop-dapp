interface Image {
    asset: {
        url: string
    }
}

export interface Creator {
    _id: string
    name: string
    address: string
    slug: {
        current: string
    }
    image: Image
    bio: string
}

export interface Collection {
    _id: string
    title: string
    description: string
    nftCollectionName: string
    address: string
    slug: {
        current: string
    }
    creator: Creator
    mainImage: Image
    previewImage: Image
}

interface Attributes {
    trait_type?: string,
    value?: string
  
  }

  
  export interface NFT {
    metadata: NFTMetadata;
    owner: string;
    type: "ERC1155" | "ERC721" | "metaplex";
    supply: number;
    quantityOwned?: number;
}