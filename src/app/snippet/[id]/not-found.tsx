import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const SnippetNotFound = () => {
    return (
        <div className='flex flex-col items-center gap-4'>
          <h2 className='font-bold text-4xl text-red-500'>Not Found!</h2>
          <p className='font-bold text-2xl'>Snippet does not exits..Please try again!</p>
          <Link href="/" ><Button className='font-bold text-xl text-blue-500' variant={'link'}>Return Home</Button></Link>
        </div>
      )
}

export default SnippetNotFound
