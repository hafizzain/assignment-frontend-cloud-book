import Svgs from '@/Assets/Svgs'

const UserSelected = ({ user, userImage, handleClose }) => {

  return (
    <div className='border border-[#D2D2D2] rounded-3xl p-0.5 flex items-center gap-2 '>
      <div className='flex items-center gap-1'>
        {userImage ?
          <img className='rounded-full size-5' src={userImage} alt="" />
          :
          <Svgs.UserIcon2 className={'size-6'} />
        }
        <p className='text-[#797979] text-xs '>{user}</p>
      </div>
      <span
        className='px-1 flex items-center justify-center cursor-pointer'
        onClick={handleClose && handleClose}
      >
        <Svgs.closeIcon />
      </span>
    </div>
  )
}

export default UserSelected
