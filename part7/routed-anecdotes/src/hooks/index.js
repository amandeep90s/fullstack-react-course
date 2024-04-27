import { useState, useEffect } from "react";

export const useField = (type, label, reset) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (reset) setValue("");
  }, [reset]);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { type, value, onChange, name: label, id: label };
};
