interface SidebarProps {
  // Add any necessary props here
}

const Sidebar: React.FC<SidebarProps> = () => {
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