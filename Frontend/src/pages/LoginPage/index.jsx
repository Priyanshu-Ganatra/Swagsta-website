/* eslint-disable react/no-unescaped-entities */
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import useLogin from '../../../hooks/useLogin'
import { useDispatch } from 'react-redux'
import { setAuthUserAction } from '../../../features/auth/authSlice'
import googleLogo from '../../assets/google.svg'
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { loading, login } = useLogin()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        login({ email, password })
    }

    useEffect(() => {
        // Check if URL contains token and user data
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const user = urlParams.get('user');

        if (token && user) {
            // Parse user data
            const userData = JSON.parse(decodeURIComponent(user));
            userData['_id'] = userData['id']; // Rename 'id' to '_id'
            delete userData['id']; // Delete 'id' key

            // Save user data and token to local storage
            localStorage.setItem('user', JSON.stringify(userData));

            // Set user data in Redux store
            dispatch(setAuthUserAction(userData));

            // Show toast and navigate after a short delay
            setTimeout(() => {
                navigate('/portfolio');
                toast.success('Login successful');
            }, 100); // Adjust this delay if needed
        }
    }, [navigate, dispatch]);

    const handleGoogleLogin = () => {
        // Redirect to your backend Google login route
        window.location.href = `${BASE_URL}/auth/google`;
    }

    return (
        <div className="flex items-center justify-center my-10 bg-background px-10">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                    <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your e-mail address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
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
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className={`w-full gap-2 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={loading}
                        >
                            {loading ? (
                                'Logging in...'
                            ) : (
                                'Login'
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
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary hover:underline">
                            Sign up here
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
