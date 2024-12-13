import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"

const Orders = () => {
  return (
    <div className="px-10 pb-10 w-[80vw]">
      <h1 className="font-bold text-2xl text-center">Orders</h1>

      {/* cards */}
      <div className="mt-4 flex gap-4 flex-wrap justify-center">
        {
          new Array(50).fill(null).map((_, i) => (
            <Card key={i} className="w-[80%] p-4 flex relative">
              <img src="https://images.unsplash.com/photo-1733103373160-003dc53ccdba?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8" alt="img" className="w-[120px] h-[120px] " />
              <CardHeader className="p-6 pt-0">
                <p className="text-[12px] whitespace-nowrap text-muted-foreground">Order Date: 01/01/25</p>
                <CardTitle>Title</CardTitle>
                <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga itaque velit perferendis sequi quasi corporis excepturi aliquid dolor sapiente eum!</CardDescription>
              </CardHeader>
              <CardContent className="flex h-fit self-end p-0 w-[70%] absolute lg:left-[20%] left-[50%] justify-between">
                <p className="">Delivery Status: Enroute</p>
                <p className="">Payment Status: Completed</p>
                <p className="">Amount: ₹500</p>
              </CardContent>

              {/* top-right div in card */}
              <div className="absolute top-4 right-4 flex items-center">
                <p className="text-[12px] text-muted-foreground">Product id: 1234</p>
                <DropdownMenu>
                  <DropdownMenuTrigger><EllipsisVertical className="scale-[65%]" /></DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-16">
                    <DropdownMenuItem>Re-order</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          ))
        }
      </div>

    </div>
  )
}

export default Orders