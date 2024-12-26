import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const Profile = () => {
  const [showSecondLocation, setShowSecondLocation] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthday: null,
    mobile: '',
    whatsapp: false,
    whatsappNumber: '',
    password: '',
    confirmPassword: '',
    address1: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      country: ''
    },
    address2: {
      street1: '',
      street2: '',
      city: '',
      state: '',
      country: ''
    }
  })

  const handleInputChange = (e) => {
    const { id, value } = e.target
    if (id.includes('address')) {
      const [addressKey, field] = id.split('.')
      setFormData(prev => ({
        ...prev,
        [addressKey]: {
          ...prev[addressKey],
          [field]: value
        }
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
      // Clear WhatsApp number when checking
      whatsappNumber: !checked ? prev.whatsappNumber : ''
    }))
  }

  const toggleSecondLocation = () => {
    if (showSecondLocation) {
      setFormData(prev => ({
        ...prev,
        address2: {
          street1: '',
          street2: '',
          city: '',
          state: '',
          country: ''
        }
      }))
    }
    setShowSecondLocation(!showSecondLocation)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
    // Add form submission logic here
  }

  return (
    <div className="px-10 xl:w-[80vw] h-full">
      <h1 className="font-bold text-2xl text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6 bg-pink-500">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Your Name"
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
                type="tel"
                placeholder="Your Mobile Number"
                className="bg-gray-100"
                required
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </div>
            {!formData.whatsapp && (
              <div className="space-y-2">
                <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                <Input
                  id="whatsappNumber"
                  type="tel"
                  placeholder="Your WhatsApp Number"
                  className="bg-gray-100"
                  required
                  value={formData.whatsappNumber}
                  onChange={handleInputChange}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="bg-gray-100"
              required
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
              required
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label>Address 1</Label>
          <Input
            id="address1.street1"
            placeholder="Flat No, Floor, Building Name, Street Name"
            className="bg-gray-100"
            value={formData.address1.street1}
            onChange={handleInputChange}
          />
          <Input
            id="address1.street2"
            placeholder="Main Street, Area, Landmarks"
            className="bg-gray-100"
            value={formData.address1.street2}
            onChange={handleInputChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="address1.city">City</Label>
              <Input
                id="address1.city"
                placeholder="Location"
                className="bg-gray-100"
                value={formData.address1.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address1.state">State</Label>
              <Input
                id="address1.state"
                placeholder="Location"
                className="bg-gray-100"
                value={formData.address1.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address1.country">Country</Label>
              <Input
                id="address1.country"
                placeholder="Location"
                className="bg-gray-100"
                value={formData.address1.country}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {showSecondLocation && (
          <div className="space-y-4">
            <Label>Address 2</Label>
            <Input
              id="address2.street1"
              placeholder="Flat No, Floor, Building Name, Street Name"
              className="bg-gray-100"
              value={formData.address2.street1}
              onChange={handleInputChange}
            />
            <Input
              id="address2.street2"
              placeholder="Main Street, Area, Landmarks"
              className="bg-gray-100"
              value={formData.address2.street2}
              onChange={handleInputChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="address2.city">City</Label>
                <Input
                  id="address2.city"
                  placeholder="Location"
                  className="bg-gray-100"
                  value={formData.address2.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address2.state">State</Label>
                <Input
                  id="address2.state"
                  placeholder="Location"
                  className="bg-gray-100"
                  value={formData.address2.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address2.country">Country</Label>
                <Input
                  id="address2.country"
                  placeholder="Location"
                  className="bg-gray-100"
                  value={formData.address2.country}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        )}

        <Button
          type="button"
          variant="ghost"
          className="text-gray-500 hover:text-gray-700"
          onClick={toggleSecondLocation}
        >
          {showSecondLocation ? 'Remove Second Location -' : 'Add Second Location +'}
        </Button>

        <div className="flex justify-end pb-10">
          <Button type="submit" className="w-full md:w-auto">
            Save Profile
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Profile