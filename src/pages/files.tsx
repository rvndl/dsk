const Files = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-2/3">
        <div className="w-full border rounded-lg border-slate-200">
          <div className="flex w-full p-4 font-semibold border-b border-slate-200">
            <p className="w-1/3">Name</p>
            <p className="w-1/3">Last modified</p>
            <p className="w-1/3">Size</p>
          </div>
          <div className="flex w-full p-4 border-b border-slate-200 hover:bg-slate-100">
            <p className="w-1/3">Folder 1</p>
            <p className="w-1/3">12.06.2022</p>
            <p className="w-1/3">-</p>
          </div>
          <div className="flex w-full p-4 border-b border-slate-200 hover:bg-slate-100">
            <p className="w-1/3">Folder 1</p>
            <p className="w-1/3">12.06.2022</p>
            <p className="w-1/3">-</p>
          </div>
          <div className="flex w-full p-4 border-b border-slate-200 hover:bg-slate-100">
            <p className="w-1/3">Folder 1</p>
            <p className="w-1/3">12.06.2022</p>
            <p className="w-1/3">-</p>
          </div>
          <div className="flex w-full p-4 hover:bg-slate-100">
            <p className="w-1/3">Folder 1</p>
            <p className="w-1/3">12.06.2022</p>
            <p className="w-1/3">-</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Files.auth = true;

export default Files;
