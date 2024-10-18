const LoadingBar = () => {
    return (
        <>
            {/* <div className="flex items-center justify-center">
                <div className="w-[799px] h-[54px] p-1 rounded-full border-2 border-[#891559] overflow-hidden">
                    <div className="rounded-full h-full bg-[#891559] border-2 border-white animate-loading" style={{ width: 'calc(100% - 16px)' }}></div>
                </div>
            </div> */}
            <div className="flex items-center justify-center">
                <div className="border-2 border-[#891559] p-1 rounded-full">
                    <div className="w-[400px] h-8 rounded-full  overflow-hidden">
                        <div className="rounded-full h-full bg-[#891559] border-2 border-white animate-loading" style={{ width: 'calc(100% - 16px)' }}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoadingBar;
