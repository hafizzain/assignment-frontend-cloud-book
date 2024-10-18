const DataField = ({ label, labelStyle, boxStyle, data }) => {
    return (
        <div className='flex-col gap-1'>
            {label &&
                <label className={`text-[#807D8D] text-[14px] font-[300] ${labelStyle ? labelStyle : ''}`}>{label}</label>
            }
            <div className={`bg-white rounded-md p-2 border w-full min-h-10 flex items-center ${boxStyle ? boxStyle : ''}`}>
                {data ? data : '-----'}
            </div>
        </div>
    )
}

export default DataField
