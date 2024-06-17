import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button, Input, Logo} from './Index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit,formState: { errors }} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
               
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5 text-md'>
                        <Input
                        classlabel="block dark:text-gray-600"
                        className="w-96 px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        classlabel="block dark:text-gray-600"
                        className="w-96 px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                         
                            required: 'Email is required',
                             pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                             message: 'Invalid email address',
                                    },
                        })}
                        />
                        <Input
                        classlabel="block dark:text-gray-600"
                        className="w-96 px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            // required: true,
                            required: 'Password is required',
                            minLength: {
                                value: 8,
                                message: 'Password must be at least 8 characters',
                              },})}
                        />
                        {errors.email && <p className="text-md italic text-red-500">{errors.email.message}</p>}
                        {errors.password && (
            <p className="text-md italic text-red-500">{errors.password.message}</p>
          )} 
                        <Button type="submit" className="block w-full p-3 bg-emerald-500 text-center rounded-md text-white dark:text-gray-50 dark:bg-violet-600 hover:bg-emerald-600 hover:text-white hover:rounded-sm">
                            Create Account
                        </Button>
                        <div class="flex items-center justify-between pb-6">
                    <p class="mb-0 me-2">Have an account?</p>
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 "
                    >
                <Button type="submit" className="block w-24 p-3 bg-purple-600 text-center rounded text-white dark:text-gray-50 dark:bg-violet-600 hover:bg-violet-600 hover:text-white hover:rounded-md">
                            Login
                        </Button>
                    </Link>
                  </div>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup