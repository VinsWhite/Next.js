'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'
import { db } from '@/db'

export async function editSnippet(id: number, code:string) {
    /* console.log(id, code)  */// to make sure it works
    await db.snippet.update({
        where: { id },
        data: { code }
    })

    revalidatePath(`/snippets/${id}`)
    redirect(`/snippets/${id}`)
}

export async function deleteSnippet(id: number) {
    await db.snippet.delete({
        where: { id }
    })

    revalidatePath('/');
    redirect('/');
}

export async function createSnippet(formState: {message: string}, formData: FormData) {
    
    /* return {
        message: 'Title must be longer'
    } */

    // this needs to be a server action - now that i refactor code, it's no longer needed
    /* 'use server';  */// specifically created for next.js

    // check the user's inputs and make sure they're valid
    try {
        const title = formData.get('title');
        const code = formData.get('code');

        if(typeof title !== 'string' || title.length < 3) {
            return {
                message: 'Title must be longer'
            }
        }

        if(typeof code !== 'string' || code.length < 10) {
            return {
                message: 'Code must be longer'
            }
        }

        // create a new record in the database
        /* const snippet = await db.snippet.create({
            data: {
                title,
                code
            },
        }); */
        /* console.log(snippet) */
        /* throw new Error('Failed to save to database'); */
    } catch (err: unknown) {
        if(err instanceof Error) {
            return {
                message: err.message
            }
        } else {
            return {
                message: 'Something went wrong...'
            }
        }
    }

    revalidatePath('/')
    // redirect the user back to the root route
    redirect('/');

    // we need to put the redirect out of try-catch, because it cause an error
    // it is an intentional error, but in this case the try-catch will catch it 
}