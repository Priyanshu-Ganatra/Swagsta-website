import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { limitWords } from "@/utils/limitWords"

const PaymentsHistory = () => {
  return (
    <div className="xl:px-10 pb-10">
      <h1 className="font-bold text-2xl text-center">Payments History</h1>

      {/* cards */}
      <div className="mt-4 flex gap-4 flex-wrap justify-center">
        {
          new Array(50).fill(null).map((_, i) => (
            <Card key={i} className="lg:w-[85%] w-[95%] p-4 pb-2 flex flex-col relative">
              <div className="flex ">
                <img src="https://images.unsplash.com/photo-1733103373160-003dc53ccdba?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8" alt="img" className="lg:w-[120px] lg:h-[120px] w-20 h-20" />
                <CardHeader className="px-2 py-0">
                  <p className="text-[10px] md:text-xs whitespace-nowrap text-muted-foreground">Payment Date: 01/01/25</p>
                  <CardTitle className="text-xl leading-none mt-0">Title</CardTitle>
                  <CardDescription className="text-xs md:block hidden">{
                    limitWords('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint architecto voluptatibus exercitationem, voluptas quas doloribus dolorum. Repudiandae eius atque ab accusantium facere officiis iure quos facilis cumque sapiente dolorem itaque eum, earum tenetur, beatae laudantium quaerat ducimus reiciendis repellendus quibusdam, voluptate fuga porro quasi? Iusto sapiente explicabo obcaecati placeat esse doloremque maxime nisi, vel accusantium. Ad quia distinctio quos magnam sunt modi quam odio! Dolor porro velit corporis, deleniti dolores eius reiciendis nisi illo vel sunt temporibus ut molestias, ratione atque recusandae excepturi voluptate. Sed consequatur suscipit corporis delectus debitis accusamus illum vel earum praesentium magni. Eveniet beatae numquam nihil?', 30)
                  }</CardDescription>
                  <CardDescription className="text-[10px] md:hidden block">{
                    limitWords('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint architecto voluptatibus exercitationem, voluptas quas doloribus dolorum. Repudiandae eius atque ab accusantium facere officiis iure quos facilis cumque sapiente dolorem itaque eum, earum tenetur, beatae laudantium quaerat ducimus reiciendis repellendus quibusdam, voluptate fuga porro quasi? Iusto sapiente explicabo obcaecati placeat esse doloremque maxime nisi, vel accusantium. Ad quia distinctio quos magnam sunt modi quam odio! Dolor porro velit corporis, deleniti dolores eius reiciendis nisi illo vel sunt temporibus ut molestias, ratione atque recusandae excepturi voluptate. Sed consequatur suscipit corporis delectus debitis accusamus illum vel earum praesentium magni. Eveniet beatae numquam nihil?', 10)
                  }</CardDescription>
                </CardHeader>
              </div>

              {/* top-right div in card */}
              <div className="absolute top-4 right-4 flex items-center">
                <p className="text-[10px] md:text-xs text-muted-foreground">Transaction id: 1234</p>
              </div>

              <div className=" p-0 pt-3 text-[10px] md:text-xs flex w-full gap-2 justify-around">
                <p className="text-center">Mode Of Trasaction: Online</p>
                <p className="text-center">Payment Status: Paid</p>
              </div>
            </Card>
          ))
        }
      </div>

    </div>
  )
}

export default PaymentsHistory