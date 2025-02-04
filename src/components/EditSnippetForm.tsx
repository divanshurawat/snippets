"use client" // use client directive
import { Editor } from '@monaco-editor/react'
import React from 'react'
import type {Snippet} from '@prisma/client';
import { Button } from './ui/button';
import {saveSnippet} from "@/actions"

const EditSnippetForm = ({snippet}:{snippet:Snippet}) => {
    const [code, setCode]= React.useState(snippet.code);

    const changeEventHandler= (value:string="")=> setCode(value);

    const saveSnippetAction= saveSnippet.bind(null, snippet.id, code);
    return (
        <div className='flex flex-col gap-4'>
            <form action={saveSnippetAction} className='flex items-center justify-between'>
                <h1 className='font-bold text-4xl'>Edit your code:</h1>
                <Button className='my-6' type='submit'>Save</Button>
            </form>
            <Editor 
            height="60vh"
            theme='vs-dark'
            defaultLanguage="javascript"
            defaultValue={code}
            onChange={changeEventHandler}
            />
        </div>
    )
}

export default EditSnippetForm
