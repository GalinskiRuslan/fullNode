import dynamic from "next/dynamic";
import { FC, useState } from "react";

// Загрузка Monaco Editor только на клиентской стороне
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

interface CodeInputProps {
  defaultCode: string;
  onChange: (code: string) => void;
}

const CodeInput: FC<CodeInputProps> = ({ defaultCode, onChange }) => {
  return (
    <>
      <div style={{ height: "90vh" }}>
        <MonacoEditor
          height="100%"
          language="javascript"
          theme="vs-dark"
          value={defaultCode}
          onChange={(newValue) => onChange(newValue || "")}
        />
      </div>
    </>
  );
};

export default CodeInput;
