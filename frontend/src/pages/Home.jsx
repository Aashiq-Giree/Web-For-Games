import React from 'react'
import Main from '../components/Home/Main'
import RecentlyAdded from '../components/Home/RecentlyAdded'

function Home() {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8' >
        <Main />
        <RecentlyAdded />
    </div>
  )
}

export default Home
