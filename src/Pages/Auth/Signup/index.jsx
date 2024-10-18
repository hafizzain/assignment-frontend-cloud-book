import { Input } from '@/Components/ui/input'
import LoginBtn from '@/Components/Element/LoginBtn'
import useSignupHelper from './helper'
import { Dropdown } from '@/Components/ui/ComboBox'

function Signup({ handleLoginClick }) {
    const { formData, handleChange, errors, loading, defaultRoles, handleSubmit } = useSignupHelper()
    return (
        <>

            <div className="space-y-6 pt-10">
                <h3 className="text-center text-3xl font-bold">Sign Up</h3>
                <div className='flex flex-col space-y-3'>
                    <Input
                        name={"name"}
                        onChange={handleChange}
                        value={formData?.name}
                        error={errors?.name}
                        placeholder={"Enter your name"}
                        label={"Full Name"}
                        required={true}
                    />
                    <Input
                        name={"email"}
                        onChange={handleChange}
                        value={formData?.email}
                        error={errors?.email}
                        placeholder={"Enter your email"}
                        label={"Email"}
                        required={true}
                    />

                    <Dropdown
                        name={"role"}
                        onChange={handleChange}
                        options={defaultRoles}
                        value={formData?.role}
                        error={errors?.role}
                        placeholder={"Select role"}
                        title={"Role"}
                        required={true}
                    />

                    <Input
                        name={"password"}
                        type="password"
                        onChange={handleChange}
                        value={formData?.password}
                        error={errors?.password}
                        placeholder={"Enter your password"}
                        label={"Enter password"}
                        required={true}
                    />

                    <Input
                        name={"password_confirmation"}
                        type="password"
                        onChange={handleChange}
                        value={formData?.password_confirmation}
                        error={errors?.password_confirmation}
                        placeholder={"Enter your confirm password"}
                        label={"Confirm Password"}
                        required={true}
                        parentStyle={`${errors?.password_confirmation && "!my-6"}`}
                    />

                    <LoginBtn
                        loading={loading}
                        title={"Sign Up"}
                        onClick={handleSubmit}
                    />
                </div>

                <div className='flex gap-2 items-center text-sm justify-end'>
                    Already have an account <span className='font-semibold text-[#03045d]' onClick={() => { handleLoginClick() }}>Sign In</span>
                </div>
            </div>
        </>
    )
}

export default Signup