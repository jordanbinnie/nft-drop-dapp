import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Transition from '../components/Transition';
import AppContextProvider from '../AppContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ThirdwebProvider desiredChainId={ChainId.Goerli}>
        <AppContextProvider>
          <Transition>
              <Component {...pageProps} /> 
          </Transition>
        </AppContextProvider>    
      </ThirdwebProvider>
  ) 

}

export default MyApp
