'use client';
import { updateEntry } from '@/utils/api';
import React, { useState } from 'react';
// @ts-ignore
import { useAutosave } from "react-autosave";

export default function Editor({ entry }: { entry: any }) {
    const [value, setValue] = useState(entry.content);
    const [isLoading, setIsLoading] = useState(false);
    useAutosave({
        data: value,
        onSave: async (_value: any) => {
            setIsLoading(true);
            const updated = await updateEntry(entry.id, _value);
            setIsLoading(false);
        }
    });

    return (
        <div className="h-full w-full">
        {isLoading && <div>Loading...</div>}
            <textarea className="h-full w-full p-8 text-xl" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    )
}
