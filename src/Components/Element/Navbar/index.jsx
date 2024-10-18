import Logo from "../Logo"
import LoginBtn from "../LoginBtn"
import useNavbar from "./helper"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/Components/ui/dialog"
import Signup from "@/Pages/Auth/Signup"
import Login from "@/Pages/Auth/Login"
import LogoutPopup from "@/Components/Logout"


function Navbar({ AuthLayout }) {

    const { access_token, AUTH_MODE, authMode, openLogin, openSignup, isDialogOpen,
        handleDialogChange, logoutConfirmation, setLogoutConfirmation
    } = useNavbar();

    const renderAuthContent = () => {
        switch (authMode) {
            case AUTH_MODE.LOGIN:
                return <Login handleSignupClick={openSignup} />;
            case AUTH_MODE.SIGNUP:
                return <Signup handleLoginClick={openLogin}/>;
            default:
                return null;
        }
    };

    return (
        <>
            <nav className="flex sm:items-center justify-between py-3 px-10 gap-3 border-b">
                <div className="">
                Assignment
                </div>
                {!AuthLayout && (
                    <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-end relative !z-50 ">
                        {access_token ? (
                            <LoginBtn className={'px-10'} title={'Logout'} onClick={() => { setLogoutConfirmation(!logoutConfirmation) }} />
                        ) : (
                            <>
                                <Dialog open={isDialogOpen}>
                                    <DialogTrigger asChild>
                                        <LoginBtn onClick={openLogin} className={'px-10 '} title={'Sign In'} />
                                    </DialogTrigger>
                                    <DialogTrigger asChild>
                                        <LoginBtn onClick={openSignup} className={'px-10 bg-transparent text-[#03045D] border-[#03045D] hover:text-white border-solid border'} title={'Sign Up'} />
                                    </DialogTrigger>
                                    <DialogContent className={'px-0'} handleCloseButtonClick={handleDialogChange}>
                                        {renderAuthContent()}
                                    </DialogContent>
                                </Dialog>
                            </>
                        )}
                    </div>
                )}
            </nav>

            <LogoutPopup
                open={logoutConfirmation}
                close={setLogoutConfirmation}
            />
        </>
    );
}

export default Navbar;
