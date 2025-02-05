import { Button } from '@/components/ui/button';
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className='text-red-500 text-7xl font-extrabold flex flex-col gap-24 items-center justify-center '>
        Hello! Welcome to StudyMitra....

        <Button onClick={()=>navigate("/auth")}  >Lets Sign Up</Button>
    </div>
  )
}

export default Home