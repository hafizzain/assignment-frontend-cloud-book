import VerificationPopup from '../Popups/VerificationPopup'
import useLogoutHelper from './helper'

const LogoutPopup = ({ open, close }) => {
    const { logoutUser, logoutLoader } = useLogoutHelper()
    return (
        <VerificationPopup
            open={open}
            close={close}
            title={<div className='flex flex-col space-y-4 mx-auto items-center justify-center pb-4 text-center'>
                <h2 className=''>Are you sure you want to Logout?</h2>
            </div>}
            loading={logoutLoader}
            onConfirm={logoutUser}
        />
    )
}

export default LogoutPopup