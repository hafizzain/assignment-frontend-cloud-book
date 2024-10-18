import { Link } from 'react-router-dom'


function Logo() {
  

    return (
      <>
        <Link to={'/'} className="flex items-center gap-[12px] cursor-pointer max-w-max ">
            <img className='h-[44px] md:h-[52px]' src = '/Assets/Images/Logo.png' alt="" />
            {/* <div>
                <h2 className="text-[#1E4470] text-[18px] md:text-[21px] font-[600] Familjen Grotesk select-none whitespace-nowrap " >Hashed System</h2>
                <p className='text-[#0D99FF] text-[9px] md:text-[10px] font-[500] select-none leading-3 whitespace-nowrap '>Empowering Digital Transformation</p>
            </div> */}
        </Link>
      </>
    )
  }
  
  export default Logo