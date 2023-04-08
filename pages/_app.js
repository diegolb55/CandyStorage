import '@/styles/globals.css'
import { UserProvider } from "@auth0/nextjs-auth0";

import { UserProvider as AtlasUserProvider } from "../context/UserContext";
import Head from "next/head"

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title>Candies - MongoDB Atlas Data API Demo</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
      </Head>
      {/* <UserProvider> */}
        <AtlasUserProvider>
          <Component {...pageProps} />
        </AtlasUserProvider>
      {/* </UserProvider> */}
    </>
  )
}
