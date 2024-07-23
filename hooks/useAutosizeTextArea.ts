'use-client';
import { useEffect } from 'react';

export const useAutosizeTextArea = (
    textAreaRef: HTMLTextAreaElement | null,
    value: string
) => {
    useEffect(() => {
        if (textAreaRef) {
            textAreaRef.style.height = '0px';
            textAreaRef.style.height = `${textAreaRef.scrollHeight}px`;
        }
    }, [textAreaRef, value]);
};
