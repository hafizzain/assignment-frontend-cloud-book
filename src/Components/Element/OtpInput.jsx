import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/Components/ui/input-otp"
import Svgs from "@/Assets/Svgs";

export function OTPInput({ onChange, value, error, name, otpLength, onEnterSubmit, disabled }) {
  const OTP_LENGTH = otpLength ? otpLength : 4;

  const HandleKeyPress = (e) => {
    if (e.key.toLowerCase() == "enter" && !disabled) {
      onEnterSubmit && onEnterSubmit();
    }
  };

  return (
    <div className="relative">
      <InputOTP
        maxLength={OTP_LENGTH}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        value={value}
        onChange={(value) => {
          const event = { target: { name: name, value: value } }
          onChange && onChange(event)
        }}>
        <InputOTPGroup>
          {Array.from({ length: OTP_LENGTH }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className={`${(error && index >= value?.length) && "border border-red-600"}`}
              onKeyDown={HandleKeyPress}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {error && typeof error == "string" ? (
        <p className={`text-[#eb3b3b] flex items-center gap-1 text-xs absolute top-[106%] w-full justify-end normal-case pt-1`}>
          <Svgs.I fill="#eb3b3b" />
          {error}
        </p>
      ) : typeof error == "boolean" && error == true ? (
        <p className={`text-[#eb3b3b] flex items-center gap-1 text-xs absolute top-[106%] w-full justify-end normal-case pt-1`}>
          <Svgs.I fill="#eb3b3b" />
          This field is required
        </p>
      ) : (
        ""
      )}
    </div>
  )
}
