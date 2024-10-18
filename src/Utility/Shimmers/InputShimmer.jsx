
import Shimmer from './Shimmer'

const InputShimmer = () => {
    return (
        <Shimmer>
            <div className='flex w-full flex-col gap-3' >
                <div className="bg-gray-200 w-3/5 flex items-center justify-center h-4 rounded-lg" />
                <div className="bg-gray-200 w-full flex items-center justify-center h-10 px-3 py-2 rounded-lg" />
            </div>
        </Shimmer>
    )
}

export default InputShimmer