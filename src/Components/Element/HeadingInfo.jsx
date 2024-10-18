import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip"
import Svgs from '@/Assets/Svgs'
const HeadingInfo = ({heading, info}) => {
  return (
    <div className="flex items-center gap-2 font-semibold">
    <h4 className="text-[#03045D]">{heading}</h4>
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger><Svgs.InfoRound /></TooltipTrigger>
            <TooltipContent>
                <p>{info}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
</div>
  )
}

export default HeadingInfo