import { useEffect } from "react";
import { rem } from '@mantine/core';

const useAutosizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = rem(80);
      const scrollHeight = textAreaRef.scrollHeight;

      textAreaRef.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);
};

export default useAutosizeTextArea;
