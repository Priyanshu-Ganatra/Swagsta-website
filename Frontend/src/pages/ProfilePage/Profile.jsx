import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarIcon, PlusCircle, Trash2 } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useUpdateUserData from '../../../hooks/useUpdateUserData'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUserAction } from '../../../features/auth/authSlice'

const Profile = () => {
  const { isUpdating, updateUserData } = useUpdateUserData()
  let { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [addressesToDelete, setAddressesToDelete] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthday: null,
    mobile: '',
    whatsapp: false,
    whatsappNumber: '',
    password: '',
    confirmPassword: '',
    addresses: [{
      _id: null,
      lineOne: '',
      lineTwo: '',
      city: '',
      state: '',
      country: ''
    }]
  })

  useEffect(() => {
    async function fetchData() {
      setFormData({
        name: user.fullName || '',
        email: user.email || '',
        birthday: user.dob ? new Date(user.dob) : null,
        mobile: user.mobile || '',
        whatsapp: user.isWhatsappNumberSameAsMobile || false,
        whatsappNumber: user.whatsapp || '',
        password: '',
        confirmPassword: '',
        addresses: user.addresses.length > 0 ? user.addresses.map(addr => ({
          _id: addr._id,
          lineOne: addr.lineOne || '',
          lineTwo: addr.lineTwo || '',
          city: addr.city || '',
          state: addr.state || '',
          country: addr.country || ''
        })) : [{
          _id: null,
          lineOne: '',
          lineTwo: '',
          city: '',
          state: '',
          country: ''
        }],
      });
    }
    fetchData();
  }, [user]);

  const handleInputChange = (e, index) => {
    const { id, value } = e.target
    if (id.startsWith('address')) {
      const field = id.split('.')[1]
      setFormData(prev => ({
        ...prev,
        addresses: prev.addresses.map((addr, i) =>
          i === index ? { ...addr, [field]: value } : addr
        )
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [id]: value
      }))
    }
  }

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      birthday: date
    }))
  }

  const handleWhatsappChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      whatsapp: checked,
      whatsappNumber: !checked ? prev.whatsappNumber : ''
    }))
  }

  const addAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: [...prev.addresses, { _id: null, lineOne: '', lineTwo: '', city: '', state: '', country: '' }]
    }))
  }

  const removeAddress = (index) => {
    if (formData.addresses[index]._id) {
      setAddressesToDelete(prev => [...prev, formData.addresses[index]._id])
    }
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    const res = await updateUserData({
      fullName: formData.name,
      email: formData.email,
      dob: formData.birthday,
      mobile: formData.mobile,
      whatsapp: formData.whatsapp ? formData.mobile : formData.whatsappNumber,
      isWhatsappNumberSameAsMobile: formData.whatsapp,
      password: formData.password,
      addresses: formData.addresses,
      addressesToDelete
    })
    
    const updatedUser = {
      ...user,
      fullName: res.updatedUser.fullName,
      email: res.updatedUser.email,
      dob: res.updatedUser.dob,
      mobile: res.updatedUser.mobile,
      whatsapp: res.updatedUser.whatsapp,
      isWhatsappNumberSameAsMobile: res.updatedUser.isWhatsappNumberSameAsMobile,
      addresses: res.updatedUser.addresses
    }

    dispatch(setAuthUserAction({ loading: false, user: updatedUser }))
  }

  return (
    <div className="lg:px-32 px-10 xl:w-[80vw] relative">
      <h1 className="font-bold text-2xl text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Full Name"
              className="bg-gray-100"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Your Email Address"
              className="bg-gray-100"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthday">Birthday</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full bg-gray-100 justify-start text-left font-normal",
                    !formData.birthday && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.birthday ? format(formData.birthday, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.birthday}
                  onSelect={handleDateChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="number"
                placeholder="Your Mobile Number"
                className="bg-gray-100 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
            {!formData.whatsapp && (
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  type="number"
                  placeholder="Your WhatsApp Number"
                  className="bg-gray-100 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="whatsapp"
              checked={formData.whatsapp}
              onCheckedChange={handleWhatsappChange}
            />
            <Label htmlFor="whatsapp">Same For WhatsApp</Label>
          </div>
        </div>

        {user.password && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Password"
                className="bg-gray-100"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="bg-gray-100"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}

        {formData.addresses.map((address, index) => (
          <div key={index} className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Address {index + 1}</Label>
              {index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAddress(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Input
              id={`address.lineOne`}
              placeholder="Flat No, Floor, Building Name, Street Name"
              className="bg-gray-100"
              value={address.lineOne}
              onChange={(e) => handleInputChange(e, index)}
            />
            <Input
              id={`address.lineTwo`}
              placeholder="Main Street, Area, Landmarks"
              className="bg-gray-100"
              value={address.lineTwo}
              onChange={(e) => handleInputChange(e, index)}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor={`address.city`}>City</Label>
                <Input
                  id={`address.city`}
                  placeholder="Location"
                  className="bg-gray-100"
                  value={address.city}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`address.state`}>State</Label>
                <Input
                  id={`address.state`}
                  placeholder="Location"
                  className="bg-gray-100"
                  value={address.state}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`address.country`}>Country</Label>
                <Input
                  id={`address.country`}
                  placeholder="Location"
                  className="bg-gray-100"
                  value={address.country}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={addAddress}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Another Address
        </Button>

        <div className="flex justify-end pb-10">
          <Button type="submit" disabled={isUpdating} className="w-full md:w-auto">
            {isUpdating ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Profile