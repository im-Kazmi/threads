'use client'
import React ,{useState , useEffect }from 'react'
import axios from  'axios'
import { useSearchParams,useRouter } from 'next/navigation'

const page = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get('token') ||''
  const [isVerified,setIsVerified] = useState(false)
  const [error,setError] = useState('')

  const verifyEmail = async()=>{
    try {
      const res = await axios.post('/api/verifyemail',{token})
      if(res.ok){
        console.log('user verified success')
        setIsVerified(true)
    }
    } catch (error) {
      setError(error?.response.data)
    }
  }
  useEffect(()=>{
    token !== '' && verifyEmail()
  },[token])

  useEffect(()=>{
   router.push('/')
  },[isVerified])
  
  return (
    <div>
      {error && <div>
        {error}
        </div>}
    </div>
  )
}

export default page