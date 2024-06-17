import React,{useId} from 'react'

const Input=React.forwardRef(function Input({
    label,type="text",
    className="",
    classlabel="",
    ...props
},ref){
    const id=useId()
    return (
        <div className=''>
            {label && <label className={` mt-4 ${classlabel}`} htmlFor={id}>{label}</label>}
            <input type={type} className={` mt-2 rounded-md bg-white text-black ${className}`} ref={ref} {...props} id={id}></input>
        </div>
    )
})
export default Input
