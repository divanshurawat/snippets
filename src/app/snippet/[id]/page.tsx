import React from 'react'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import * as actions from '@/actions';

import SnippetNotFound from './not-found';

const SnippetDetailPage = async ({params}:{params:Promise<{id:string}>}) => {

    const id= (await params).id;

    const snippet= await prisma.snippet.findUnique({
        where:{id: Number(id)}
    })

    if(!snippet){
        return SnippetNotFound();
    }

    const deleteSnippetActions= actions.deleteSnippet.bind(null, snippet.id);


    return (
        <div className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'> 
                <h1 className='font-bold text-xl'>{snippet.title}</h1>
                <div className='flex items-center gap-2'>
                    <Link href={`/snippet/${snippet.id}/edit`}><Button >Edit</Button></Link>
                    <form action={deleteSnippetActions}>
                        <Button  variant={'destructive'} type='submit'>Delete</Button>
                    </form>
                    
                </div>
            </div>

            <pre className='bg-gray-200 p-4 rounded-md mt-4'>{snippet.code}</pre>
            

        </div>
    )
}

export default SnippetDetailPage

export const generateStaticParams= async()=>{
    const snippets= await prisma.snippet.findMany();

    return snippets.map((snippet)=>{
        return {id:snippet.id.toString()}
    })
}
