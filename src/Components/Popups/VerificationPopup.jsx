import LoginBtn from "../Element/LoginBtn"
import Popup from "../Element/Popup"

const VerificationPopup = ({ title, open, loading, close, onConfirm, hideCloseButton }) => {
    return (
        <>
            <Popup
                open={open}
                onClose={close}
                hideCloseButton={hideCloseButton}
                closeOnOverlayClick={false}
            >
                <div className="flex flex-col gap-5">
                    <h1 className='text-xl font-semibold'>{title}</h1>
                    <div className="flex justify-between gap-4 items-center">
                        <LoginBtn onClick={() => {
                            close && close(false)
                        }} className={'px-10 bg-transparent text-[#03045D] border-[#03045D] hover:text-white border-solid border w-full'} title={'No'} />
                        <LoginBtn
                            loading={loading}
                            disabled={loading}
                            onClick={() => {
                                onConfirm && onConfirm()
                            }}
                            className={'px-10 w-full'}
                            title={'Yes'} />
                    </div>
                </div>

            </Popup>
        </>
    )
}

export default VerificationPopup