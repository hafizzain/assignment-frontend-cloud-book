import * as React from "react"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import Svgs from "@/Assets/Svgs";

const Input = React.forwardRef(({
  label,
  required,
  value,
  error,
  onChange,
  className,
  stroke,
  startIcon,
  parentStyle,
  disabled,
  iconSize,
  labelStyle,
  endIcon,
  type,
  specialCharacterNotAllowed,
  onlyNumericAllowed,
  onEnterSubmit,
  endIconClick,
  ...props }, ref) => {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const StartIcon = startIcon;
  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;
  const EndIcon = type === 'password' ? (isPasswordVisible ? EyeOffIcon : EyeIcon) : endIcon;

  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleClickEndIcon = () => {
    if (type === 'password') {
      handleTogglePasswordVisibility()
    } else {
      endIconClick && endIconClick()
    }
  }

  const HandleKeyPress = (e) => {
    // regular expression pattern for special characters
    const specialCharsPattern = /[0123456789=!@#$%^&*()_+{}+×÷%≤≥≈≠∞€£¥""¢''/`"'\[\]:|;<>,.?~\\-]/g;
    // Check your condition here to disallow special characters
    if (specialCharacterNotAllowed && specialCharsPattern.test(e.key)) {
      e.preventDefault(); // Prevent typing of special characters
    }

    // regular expression pattern for only numeric characters
    const onlyNumericCharsAllowed = /[a-zA-Z=!@#$%^&*()_+{}+×÷%≤≥≈≠∞€£¥""¢''/`"'\[\]:|;<>,.?~\\-]/g;
    // Check your condition here to disallow special characters
    if (onlyNumericAllowed && onlyNumericCharsAllowed.test(e.key) && e.key != "Backspace") {
      // If input doesn't match, prevent the default behavior (e.g., typing the invalid character)
      e.preventDefault();
    }

    if (type === 'number' && e.key === '-') {
      e.preventDefault(); // Prevent typing of '-' symbol
    }

    if (e.key.toLowerCase() == "enter" && !disabled) {
      onEnterSubmit && onEnterSubmit();
    }
  };


  return (
    (
      <div className={`w-full relative ${parentStyle ? parentStyle : ''}`}>
        {label &&
          <label className={`text-[#807D8D] text-[14px] font-[300] ${labelStyle ? labelStyle : ''}`}>{label}
            {required && <span className='text-[#0D99FF] text-[16px] '> *</span>}
          </label>
        }
        <div className="relative h-full">

          {StartIcon && (
            <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2">
              <StartIcon stroke={stroke ? stroke : 'currentColor'} size={iconSize ? iconSize : 18} className="text-muted-foreground" />
            </div>
          )}
          <input
            onKeyDown={HandleKeyPress}
            type={inputType}
            onChange={onChange}
            value={value}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full focus-visible:ring-offset-0 focus-visible:ring-0 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              startIcon ? "pl-8" : "",
              endIcon ? "pr-8" : "",
              error ? "border-red-600" : "",
              className
            )}
            ref={ref}
            {...props} />
          {EndIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={handleClickEndIcon}>
              <EndIcon stroke={stroke ? stroke : 'currentColor'} className="text-muted-foreground" size={iconSize ? iconSize : 18} />
            </div>
          )}
        </div>
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
  );
})
Input.displayName = "Input"

export { Input }
