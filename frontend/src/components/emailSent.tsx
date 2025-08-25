import DarkModeLogo from 'public/logoDark.png'
import whiteModeLogo from 'public/logo White.png'
import Image from 'next/image'
import { Space_Grotesk } from 'next/font/google'
import { useTheme } from 'next-themes'

const font = Space_Grotesk({
    weight: "400",
    subsets: ["latin"]
  })
  

export default function EmailSent() {

    const { theme } = useTheme()

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className={`pt-10 pb-20 flex flex-col justify-center items-center w-md rounded-2xl border-2 shadow-2xl ${theme === "dark" ? " text-white" : ""}`}>
        {theme === 'dark' 
          ? <Image src={DarkModeLogo} alt='Tech Stop' height='100' width='100'></Image> 
          : <Image src={whiteModeLogo} alt='Tech Stop' height='100' width='100'></Image>}
        <h1 className={`${font.className} font-bold text-2xl pt-8`}>Is it really you?!</h1>
        <p className={`${font.className} pt-6 text-center max-w-[28rem]`}>
          Please kindly check your email box for the confirmation email.
        </p>
      </div>
    </div>
  )
}
