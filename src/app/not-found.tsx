import Image from "next/image"
import { Space_Grotesk} from "next/font/google"
export const metadata = {
    title:"Page not found!"
}

const space = Space_Grotesk({
  weight:"400",
  subsets:["latin"]
  
})

export default function NotFound() {
  return (
    <>
        <div className="flex justify-center h-screen items-center mx-24 relative">
              <h2 className={`${space.className} text-6xl `}>WE LOST THIS PAGE!</h2>
    
      <div className=" h-20 w-1 m-5 border-t-0 border-b-0 border-l-4 border-black " ></div>
              <p className={`${space.className} text-5xl `}>Could not find requested resource</p>
            <Image className="absolute -z-10 blur-xs" width="600" height="500" alt="404 background here" src={`/robot.jpg`}></Image>

      </div>

    </>
  )
}