import Nav from "./nav"
import { Store } from "lucide-react"
import { Space_Grotesk,Inter } from "next/font/google"
import Link from "next/link"

const space = Space_Grotesk({
  weight:"400",
  subsets:["latin"]
  
})

export default function Header() {
  return (
    <>
    
    <header className=" header-slide h-32 w-full md:pb-10 lg:pb-10 flex items-center justify-between ">
      <div className="flex md:space-x-4 items-center ">
        <Link className="hover:bg-gray-200 hover:rounded-xl p-1" href="/home">      <Store size={"30px"}/>
        </Link>
      <h1 className={`${space.className} text-2xl `}>TechStop</h1>
      </div>
      <Nav/>
    </header>
    </>
  )
}
