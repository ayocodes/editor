"use client";

import MonacoEditor from "@monaco-editor/react";
import theme from "../../public/monaco-theme.json";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {
  const [code, setCode] = useState<{ title?: string; code?: string }[]>([]);

  const [selectedCode, setSelectedCode] = useState<number>(0);

  const add_tab = () => {
    const title = window.prompt("Enter the title of the file:");
    if (title) {
      setCode([...code, { title: title, code: "" }]);
      const length = code.length;
      setSelectedCode(length);
    }
  };

  const Sidebar = () => {
    return (
      <div className="min-w-[20%] bg-gray-900 border border-gray-950">
        <div className="py-4 px-2">
          <h2 className="text-white text-lg font-bold mb-2">Compile</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Compile Action
          </button>
        </div>
        <div className="py-4 px-2">
          <h2 className="text-white text-lg font-bold mb-2">Deploy</h2>
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
            Deploy Action
          </button>
        </div>
      </div>
    );
  };

  // Title component
  const Title = () => {
    useEffect(() => {
      if (selectedCode >= code.length) {
        setSelectedCode(code.length - 1); // Adjust selectedCode if out of bounds
      }
    }, [code]);

    const close_tab = (index: number) => {
      const updatedCode = [...code];
      updatedCode.splice(index, 1);
      setCode(updatedCode);
    };

    return (
      <div className="bg-gray-900 text-white py-4 flex  w-full">
        <div className=" flex overflow-x-scroll w-[calc(80vw-50px)]">
          {code.map((item, i) => (
            <div
              className={` p-4 border-[0.5px] border-[#22293971] flex gap-2 cursor-pointer ${
                selectedCode == i && " border-slate-700"
              } `}
              onClick={() => setSelectedCode(i)}
            >
              <p className="text-[10px] text-[#9EACAA]">
                {item.title}
                {i}
              </p>
              <button
                className="w-4 hover:bg-gray-700 p-[3px]"
                onClick={() => close_tab(i)}
              >
                <img src="/close.svg" alt="" />
              </button>
            </div>
          ))}
        </div>
        <button onClick={add_tab} className="">
          <img src="/add.svg" alt="" />
        </button>
      </div>
    );
  };

  // Code area component
  const CodeArea = () => {
    const [value, setValue] = useState("");

    const handleEditorChange = (value: any, e: any) => {
      setValue(value);
    };


    // const handleCodeChange = useCallback(
    //   (value: string | undefined, e: any) => {
    //     const codeValue = value ?? "";
    
    //     setCode((prevCode) => {
    //       const updatedCode = [...prevCode];
    
    //       updatedCode[selectedCode] = {
    //         ...updatedCode[selectedCode],
    //         code: codeValue,
    //       };
    //       return updatedCode;
    //     });
    //   },
    //   [selectedCode, setCode]
    // );

    const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
      monaco.editor.defineTheme("my-dark", JSON.parse(JSON.stringify(theme)));
      monaco.editor.setTheme("my-dark");
    }, []);

    return (
      <div id="editor" className="flex-1 bg-gray-800">
        {code.length === 0 ? (
          <div className="flex justify-center items-center h-full text-white flex-col gap-4">
            <button onClick={add_tab} className="">
              <img src="/add.svg" alt="" />
            </button>
            <p>Create a new file</p>
          </div>
        ) : (
          <MonacoEditor
            height="100%"
            defaultLanguage="rust"
            value={value}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            // onChange={onChange}
            onChange={handleEditorChange}
            options={{
              minimap: {
                enabled: true,
              },
              matchBrackets: "always",
              selectOnLineNumbers: true,
              automaticLayout: true,
              fontFamily: "monospace",
              fontSize: 14,
              wordWrap: "off",
              folding: false,
            }}
          />
        )}
      </div>
    );
  };
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className=" w-full flex flex-col ">
        <Title />
        <CodeArea />
      </div>
    </div>
  );
}
