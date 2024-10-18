import { Input } from '@/Components/ui/input'
import LoginBtn from '@/Components/Element/LoginBtn'
import useLoginHelper from './helper'

function Login({ handleSignupClick }) {
    const { handleChange, formData, errors, loading, handleSubmit } = useLoginHelper()

    return (
        <div className="space-y-6 py-10">
            <div className="text-center sm:text-3xl font-semibold">Sign In</div>
            <div className='space-y-4'>
                <Input
                    error={errors?.email}
                    onChange={handleChange}
                    value={formData?.email}
                    placeholder='Email'
                    type='email'
                    name="email"
                    className={errors?.email && 'my-6'}
                    onEnterSubmit={handleSubmit}
                />
                <Input
                    error={errors?.password}
                    title={""}
                    placeholder={"Password"}
                    onChange={handleChange}
                    value={formData?.password}
                    name={"password"}
                    className={errors?.password && 'my-6'}
                    type={"password"}
                    onEnterSubmit={handleSubmit}
                />
                <LoginBtn
                    title={'Sign In'}
                    className={'w-full'}
                    onClick={handleSubmit}
                    loading={loading}
                    disabled={loading}
                />
                <div className="pt-12 space-y-6">
                    <div className='flex items-center gap-[11px]'>
                        <div className='flex-1 w-full border-[0.9px] border-[#E3E3E3] '></div>
                        <p className='text-[12px] text-[#828798] font-[400] '>Don’t have an account?</p>
                        <div className='flex-1 w-full border-[0.9px] border-[#E3E3E3] '></div>
                    </div>
                    <div className="">
                        <LoginBtn onClick={handleSignupClick}
                            title={'Sign Up'}
                            className={'w-full bg-transparent text-[#03045D] border-[#03045D] hover:text-white border-solid border'}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login