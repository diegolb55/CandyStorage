import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useSetUser } from "../context/UserContext";

import Candies from '@/components/Candies/Candies'
import CreateCandy from '@/components/Candies/CreateCandy'
import Navbar from '@/components/Navbar/Navbar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // const [isLoading, setIsLoading] = useState(true);

  const setUser = useSetUser();
  const [candies, setCandies] = useState([])

  useEffect(() => {
    (async () => {
      const getUser = await fetch("/api/user");
      const getUserJson = await getUser.json();
      setUser(getUserJson);

      const  getCandies = await fetch("/api/candies");
      const getCandiesJson = await getCandies.json();
      setCandies(getCandiesJson);

      // setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      <Navbar/>
      <h1 className='title'>Candy Inventory System</h1>

      <CreateCandy setCandies={setCandies}/>
      <Candies candies={candies} setCandies={setCandies} />
    </div>
  )
}

export const getServerSideProps = withPageAuthRequired();
