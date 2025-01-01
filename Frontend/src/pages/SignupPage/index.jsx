import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useDispatch } from 'react-redux'
import googleLogo from '../../assets/google.svg'
import { setSignupData, setOtp } from '../../../features/auth/signupSlice'
import useSendEmailOtp from '../../../hooks/useSendEmailOtp'
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function SignupPage() {
    const [email, setEmail] = useState('')
    const [fullname, setFullname] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const { loading, sendEmailOtp } = useSendEmailOtp()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setSignupData({ fullName: fullname, email, password, confirmPassword: confPassword }))
        sendEmailOtp(email, navigate, dispatch, setOtp)
        // signup({ fullName: fullname, email, password, confirmPassword: confPassword })
    }

    const handleGoogleLogin = () => {
        // Redirect to your backend Google login route
        window.location.href = `${BASE_URL}/auth/google`;
    }

    return (
        <div className="flex items-center justify-center mt-1 bg-background px-10 mb-10">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Sign up</CardTitle>
                    <CardDescription className="text-center">Create an account to get started</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Full name</Label>
                            <Input
                                id="email"
                                type="text"
                                placeholder="Enter your full name"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your e-mail address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Confirm Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Confirm your password"
                                value={confPassword}
                                onChange={(e) => setConfPassword(e.target.value)}

                            />
                        </div>
                        <Button
                            type="submit"
                            className={`w-full gap-2 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={loading}
                        >
                            {loading ? (
                                'Signing up...'
                            ) : (
                                'Sign up'
                            )}
                        </Button>
                        <div className='relative bg-black'>
                            <hr />
                            <span className='absolute left-1/2 transform -top-[10px] -translate-x-1/2 bg-background px-2 text-sm text-muted-foreground'>OR</span>
                        </div>
                        <Button
                            type="button"
                            className={`w-full`}
                            onClick={handleGoogleLogin} // Trigger Google login
                        >
                            <img src={googleLogo} height={30} width={30} alt="google" />
                            Continue with Google
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:underline">
                            Log in here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}