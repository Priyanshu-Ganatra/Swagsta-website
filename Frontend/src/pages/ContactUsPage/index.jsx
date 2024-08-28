/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa"

export default function ContactUs() {
    return (
        <div className="container mx-auto px-14 py-8 md:py-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-4">
                Contact Us
            </h1>
            <p className="text-muted-foreground mb-8 max-w-[700px]">
                We'd love to hear from you. Please fill out this form or use our contact information below.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Send us a message</CardTitle>
                        <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                                <Input id="name" placeholder="Your name" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                <Input id="email" type="email" placeholder="Your email address to which we'll reply" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                                <Textarea id="message" placeholder="Your message" className="min-h-[100px]" />
                            </div>
                            <Button type="submit" className="w-full">Send Message</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>You can also reach us using the following contact details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start space-x-4">
                            <FaMapMarkerAlt className="w-5 h-5 mt-1 text-muted-foreground" />
                            <div>
                                <h3 className="font-semibold">Address</h3>
                                <p className="text-sm text-muted-foreground">123 Business Street, Suite 100, City, State 12345</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaPhone className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <h3 className="font-semibold">Phone</h3>
                                <p className="text-sm text-muted-foreground">(123) 456-7890</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaEnvelope className="w-5 h-5 text-muted-foreground" />
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="text-sm text-muted-foreground">contact@example.com</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}