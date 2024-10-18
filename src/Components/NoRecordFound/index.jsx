import Svgs from "@/Assets/Svgs"

const NoRecordFound = () => {
    return (
        <div className='flex flex-col gap-3 justify-center items-center w-full my-5'>
            <Svgs.NotFound />
            <h1 className=' font-semibold text-lg'>No record found</h1>
        </div>
    )
}

export default NoRecordFound