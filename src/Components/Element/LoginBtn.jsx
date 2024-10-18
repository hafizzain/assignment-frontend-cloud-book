import { Button } from '@/Components/ui/button'
import { Loader2 } from 'lucide-react'

const LoginBtn = ({ variant, onClick, startIcon, stroke, iconSize, title, loading, disabled, className, fill, children }) => {
    const StartIcon = startIcon;
    return (
        <Button variant={variant ? variant : ""} className={`min-w-20 ${className ? className : ''} ${disabled ? '!cursor-not-allowed' : ''} ${loading ? '!cursor-not-allowed' : ''}`} onClick={onClick && onClick} disabled={disabled}>
            <>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!loading &&
                    <div className='flex items-center gap-1'>
                        {StartIcon && (
                            <div className="">
                                <StartIcon stroke={stroke ? stroke : 'currentColor'} fill={fill ? fill : ''} size={iconSize ? iconSize : 18} className="text-muted-foreground" />
                            </div>
                        )}
                        {title}
                        {children}
                    </div>
                }
            </>
        </Button>
    )
}

export default LoginBtn
