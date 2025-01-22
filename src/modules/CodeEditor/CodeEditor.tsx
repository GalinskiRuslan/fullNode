import dynamic from "next/dynamic";
import { useState } from "react";

// Загрузка Monaco Editor только на клиентской стороне
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const CodeEditor = () => {
  const [code, setCode] = useState("// Напишите ваш код здесь");

  return (
    <>
      <div style={{ height: "90vh" }}>
        <MonacoEditor
          height="100%"
          language="javascript"
          theme="vs-dark"
          value={code}
          onChange={(newValue) => setCode(newValue || "")}
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: code }}></div>
    </>
  );
};

export default CodeEditor;
