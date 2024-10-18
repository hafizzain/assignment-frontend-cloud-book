import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import Svgs from '@/Assets/Svgs';
import LoginBtn from "../LoginBtn";

const Pagination = (props) => {
    const {
        customLimitArray,
        data,
        setLimit,
        limit,
        setOffSet
    } = props;
    const limitArray = customLimitArray ? customLimitArray : [10, 25, 50, 100]

    const onNext = () => {
        if (data?.next) {
            // Parse the URL
            const urlObj = new URL(data?.next);

            // Extract the offset value using URLSearchParams
            const offset = new URLSearchParams(urlObj.search).get('offset');
            setOffSet(offset)
        }
    };

    const onPrevious = () => {
        if (data?.previous) {
            // Parse the URL
            const urlObj = new URL(data?.previous);

            // Extract the offset value using URLSearchParams
            const offset = new URLSearchParams(urlObj.search).get('offset');
            setOffSet(offset)
        }
    };

    return (
        <div className="flex items-center justify-end w-full text-sm">
            <div className="flex items-center gap-2">
                <p className="">Page size</p>
                <DropdownMenu className={'w-fit'}>
                    <DropdownMenuTrigger className='w-fit h-6 border border-solid rounded-sm focus-visible:outline-0 border-[#AAAAAA]'>
                        <div className="flex items-center gap-5 px-1 ">
                            <p className="">{limit}</p>
                            <Svgs.ArrowDown fill={'black'} />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={'!max-w-10 !min-w-[4rem]'}>
                        {limitArray?.map((itm, ind) => {
                            return (
                                <DropdownMenuItem key={ind} className={'!justify-center cursor-pointer'} onClick={() => { setLimit(itm) }}>{itm}</DropdownMenuItem>
                            )
                        }
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
                <LoginBtn title={'Previous'}
                    onClick={onPrevious}
                    className={`px-3 border bg-transparent border-solid rounded-sm h-6 hover:bg-slate-50 ${!data?.previous ? 'cursor-not-allowed border-[#AAAAAA] text-[#AAAAAA]' : "border-[#ababab] text-black"}`}
                />
                <LoginBtn title={'Next'}
                    onClick={onNext}
                    className={`px-3 border bg-transparent border-solid rounded-sm h-6 hover:bg-slate-50 ${!data?.next ? 'cursor-not-allowed border-[#AAAAAA] text-[#AAAAAA]' : "border-[#ababab] text-black"}`}
                />
            </div>
        </div>
    )
}

export default Pagination