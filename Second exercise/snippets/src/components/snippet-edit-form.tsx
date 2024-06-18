'use client';
import type { Snippet } from '@prisma/client'
import { db } from '@/db';
import SnippetEditForm from '@/components/snippet-edit-form'
import Editor from '@monaco-editor/react'
import { useState } from 'react'

interface SnippetEditPageProps {
    snippet: Snippet
}

export default function SnippetEditPage({ snippet }: SnippetEditPageProps) {
    const [code, setCode] = useState(snippet.code)

    const handleEditorChange = (value: string = "") => {
        setCode(value);
    }

    return (
        <div>
            <Editor
             height='40vh'
             theme='vs-dark'
             language='javascript'
             defaultValue={snippet.code}
             options={{ minimap: {enabled: false} }} /* to disable minimap */
             onChange={handleEditorChange}
            />
        </div>
    );
}