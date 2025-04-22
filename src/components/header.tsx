import Nav from "./nav"
import { Store } from "lucide-react"
import { Space_Grotesk,Inter } from "next/font/google"
import Link from "next/link"

const space = Space_Grotesk({
  weight:"400",
  subsets:["latin"]
  
})

export default function header() {
  return (
    <>
    
    <header className="header-slide h-32 flex items-center justify-between bg-white mx-32">
      <div className="flex space-x-4 items-center ">
        <Link className="hover:bg-gray-200 hover:rounded-xl p-1" href="/home">      <Store size={"30px"}/>
        </Link>
      <h1 className={`${space.className} text-2xl `}>Dave's Computer Shop</h1>
      </div>
      <Nav/>
    </header>
    <hr className="mx-24 text-gray"/>
    </>
  )
}
