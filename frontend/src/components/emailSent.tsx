import DarkModeLogo from 'public/logoDark.png'
import whiteModeLogo from 'public/logo White.png'
import Image from 'next/image'
import { Space_Grotesk } from 'next/font/google'
import { useTheme } from 'next-themes'

const font = Space_Grotesk({
    weight: "400",
    subsets: ["latin"]
  })
  

export default function emailSent() {

    const { theme } = useTheme()

  return (
    <div className='flex justify-center items-center min-h-screen'>
        <div className={`flex flex-col p-5 pt-5 justify-center items-center rounded-2xl shadow-2xl border-2 ${theme === "dark" ? " text-white" : ""}`}>
        {theme === 'dark' ? <Image src={DarkModeLogo} alt='Tech Stop' height='100' width='100'></Image> : <Image src={whiteModeLogo} alt='Tech Stop' height='100' width='100'></Image>}
        <h1 className={`${font.className} font-bold text-2xl pt-8`}>Is it really you?!</h1>
        <label className={`${font.className} pt-8 mr-64 -ml-3 pb-2 text-lg`} >Please kindly check your email box for the confirmation email. </label>

        </div>
    </div>
  )
}
