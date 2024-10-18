import Svgs from '@/Assets/Svgs'
import React from 'react'

const TableRecordNotFound = ({svg, content}) => {
  return (
    <div className='flex flex-col justify-center items-center gap-7'>
        {svg ? svg : <Svgs.SupportRequestNotFound/>}
        <p className="text-black font-medium text-sm max-w-[520px] text-center">{content ? content : 'No Record Found'}</p>
    </div>
  )
}

export default TableRecordNotFound
