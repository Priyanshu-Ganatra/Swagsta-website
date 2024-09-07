/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, X } from "lucide-react"
import useUpdateContactUsData from '../../hooks/useUpdateContactUsData'
import useGetContactUsData from '../../hooks/useGetContactUsData'

export default function ContactUsForm() {
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumbers, setPhoneNumbers] = useState([])
    const [emails, setEmails] = useState([])
    const { isUpdating, updateContactUsData } = useUpdateContactUsData()
    const { isFetchingContactUsData, getContactUsData } = useGetContactUsData()

    const addPhoneNumber = () => {
        if (phoneNumber.trim()) {
            setPhoneNumbers([...phoneNumbers, phoneNumber.trim()])
            setPhoneNumber('')
        }
    }

    useEffect(() => {
        getContactUsData().then(data => {
            if (data) {
                setAddress(data.address)
                setPhoneNumbers(data.phoneNumbers)
                setEmails(data.emails)
            }
        })
    }, []);

    const addEmail = () => {
        if (email.trim()) {
            setEmails([...emails, email.trim()])
            setEmail('')
        }
    }

    const removePhoneNumber = (index) => {
        setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index))
    }

    const removeEmail = (index) => {
        setEmails(emails.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await updateContactUsData(address, phoneNumbers, emails)
    }

    return (
        <>
            {isFetchingContactUsData ? <span className='flex flex-col gap-4 items-center mt-20'>
                <span className="loading loading-ring loading-lg"></span>
                <p>Loading Contact Us Page Data...</p>
            </span>
                :
                <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6">
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter your address"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Numbers</Label>
                        <div className="flex space-x-2">
                            <Input
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter a phone number"
                                type="tel"
                            />
                            <Button type="button" onClick={addPhoneNumber} size="icon">
                                <PlusCircle className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="mt-2 space-y-2">
                            {phoneNumbers.map((phone, index) => (
                                <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded-md">
                                    <span>{phone}</span>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removePhoneNumber(index)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Emails</Label>
                        <div className="flex space-x-2">
                            <Input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter an email address"
                                type="email"
                            />
                            <Button type="button" onClick={addEmail} size="icon">
                                <PlusCircle className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="mt-2 space-y-2">
                            {emails.map((email, index) => (
                                <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded-md">
                                    <span>{email}</span>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeEmail(index)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" disabled={isUpdating} className="w-full">
                        {
                            isUpdating ? (
                                'Updating...'
                            ) : (
                                'Update'
                            )
                        }
                    </Button>
                </form>}
        </>
    )
}