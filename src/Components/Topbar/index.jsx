
import Svgs from '@/Assets/Svgs'
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Link } from 'react-router-dom'
import useTopbar from './helper'
import LogoutPopup from '../Logout'

const Topbar = () => {
    const { profileData, logoutConfirmation, setLogoutConfirmation, 
    } = useTopbar()
    return (
        <>
            <div className="bg-black_v2 flex items-center gap-10 h-20 justify-between px-10 py-2">
                <Link to="/dashboard" className="flex items-center text-white">
                 Assignment
                </Link>
                <div className="flex items-center gap-6 w-full justify-end">

                    <div className="DashboardTopBar flex items-center justify-center gap-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger className='w-fit rounded-xl overflow-hidden ring-offset-0 '>
                                <div className="flex items-center gap-3 p-2 bg-primary-gradient text-black_v2">
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='flex items-center gap-2 pr-2'>
                                        <span className=" text-nowrap">{`${profileData?.name}`}</span>
                                        <Svgs.ArrowDown fill={'black'} />
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className={"cursor-pointer"} onClick={() => {
                                    setLogoutConfirmation(!logoutConfirmation)
                                }}>
                                    <div className='flex gap-2 items-center text-red-600'>
                                        <Svgs.LogOutIcon width={'15'} height={'15'} />
                                        Logout
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            <LogoutPopup
                open={logoutConfirmation}
                close={setLogoutConfirmation}
            />
        </>
    )
}

export default Topbar