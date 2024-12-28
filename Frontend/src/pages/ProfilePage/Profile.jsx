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

const Profile = () => {
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
      street1: '',
      street2: '',
      city: '',
      state: '',
      country: ''
    }]
  })

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
      // Clear WhatsApp number when checking
      whatsappNumber: !checked ? prev.whatsappNumber : ''
    }))
  }

  const addAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: [...prev.addresses, { street1: '', street2: '', city: '', state: '', country: '' }]
    }))
  }

  const removeAddress = (index) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
    // Add form submission logic here
  }

  return (
    <div className="lg:px-32 px-10 xl:w-[80vw]">
      <h1 className="font-bold text-2xl text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
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
                type="number"
                placeholder="Your Mobile Number"
                className="bg-gray-100 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
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
                  type="number"
                  placeholder="Your WhatsApp Number"
                  className="bg-gray-100 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
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
              id={`address.street1`}
              placeholder="Flat No, Floor, Building Name, Street Name"
              className="bg-gray-100"
              value={address.street1}
              onChange={(e) => handleInputChange(e, index)}
            />
            <Input
              id={`address.street2`}
              placeholder="Main Street, Area, Landmarks"
              className="bg-gray-100"
              value={address.street2}
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
          <Button type="submit" className="w-full md:w-auto">
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Profile