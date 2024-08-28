import { FaMegaport, FaGlobe } from "react-icons/fa"
import { MdVideoLibrary } from "react-icons/md"
import { RiFileTextLine } from "react-icons/ri"

const services = [
  {
    icon: FaMegaport,
    title: "Digital Marketing",
    description: "Advertise, analyze, and optimize! We make better ideas, happen fast.",
  },
  {
    icon: FaGlobe,
    title: "Website development",
    description: "We create websites that reflect a powerful blend of creativity and technology.",
  },
  {
    icon: MdVideoLibrary,
    title: "Video Editing",
    description: "We create stunning visuals that tell your story.",
  },
  {
    icon: RiFileTextLine,
    title: "Content",
    description: "We create content that makes your brand seen, heard, and recognized.",
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">Our Services</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Empowering your brand with cutting-edge digital solutions
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <service.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-primary">{service.title}</h3>
              <p className="mt-2 text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}