import CodeInput from "@/modules/CodeEditor/CodeInput/CodeInput";
import { useState } from "react";

export default function Home() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const handleRunCode = () => {
    try {
      // Выполнение кода в изолированном контексте
      const result = new Function(code)();
      setOutput(String(result));
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };
  return (
    <>
      <CodeInput defaultCode={code} onChange={setCode} />
      <button onClick={handleRunCode}>Run</button>
      <p>{output}</p>
    </>
  );
}
