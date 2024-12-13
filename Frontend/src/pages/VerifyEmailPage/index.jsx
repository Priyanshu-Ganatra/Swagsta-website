import { useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import useSignup from '../../../hooks/useSignup'
import { useSelector } from 'react-redux'

export default function VerifyEmailPage() {
  const [value, setValue] = useState("")
  const { loading, signup } = useSignup()
  const { fullName, email, password, confirmPassword } = useSelector(state => state.signup.signupData)

  const handleSubmit = (e) => {
    e.preventDefault()
    signup({ fullName, email, password, confirmPassword, otp: value })
  }

  return (
    <div className="flex items-center justify-center mt-1 bg-background px-10 mb-10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Verify email</CardTitle>
          <CardDescription className="text-center">Enter the OTP sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className='flex justify-center'>
              <InputOTP
                maxLength={6}
                value={value}
                onChange={(value) => setValue(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

            </div>
            <Button
              type="submit"
              className={`w-full gap-2 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={loading}
            >
              {loading ? (
                'Submitting...'
              ) : (
                'Submit'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}