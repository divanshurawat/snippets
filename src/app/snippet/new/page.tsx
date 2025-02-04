"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React, { useActionState } from 'react'
import * as actions from '@/actions';

const CreateSnippetPage = () => {

    const [formStateData, action]= useActionState(actions.createSnippet, {message:""});

    

    return (
        <form action= {action}>
            <div>
                <Label>Title</Label>
                <Input type="text" name="title" id="title"></Input>
            </div>
            <div>
                <Label>Code</Label>
                <Textarea name="code" id="code"></Textarea>
            </div>
            {formStateData.message && <div className='p-2 bg-red-300 border-2 border-red-600'>{formStateData.message}</div>}
            <Button className='my-6' type='submit'>New</Button>
        </form>
    )
}

export default CreateSnippetPage
