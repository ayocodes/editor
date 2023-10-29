interface TitleProps {
  code: { title?: string; code?: string }[];
  selectedCode: number;
  setSelectedCode: React.Dispatch<React.SetStateAction<number>>;
}

const Title: React.FC<TitleProps> = ({
  code,
  selectedCode,
  setSelectedCode,
}) => {
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