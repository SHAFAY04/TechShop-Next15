import DarkModeLogo from 'public/logoDark.png'
import whiteModeLogo from 'public/logo White.png'
import Image from 'next/image'
import { Space_Grotesk } from 'next/font/google'
import { useTheme } from 'next-themes'

const font = Space_Grotesk({
    weight: "400",
    subsets: ["latin"]
  })
  

export default function managerEmailSent() {

    const { theme } = useTheme()

  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className={`pt-10 pb-20 flex flex-col justify-center items-center w-md rounded-2xl border-2 shadow-2xl ${theme === "dark" ? " text-white" : ""}`}>
        {theme === 'dark' 
          ? <img src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/logoDark.png" height='100' width='100' alt="Tech Stop" />
          : <img src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/logo White.png" height='100' width='100' alt="Tech Stop" />}
        <h1 className={`${font.className} font-bold text-2xl pt-8`}>Adding a new Employee?</h1>
        <p className={`${font.className} pt-6 mx-10 text-center max-w-[28rem]`}>
          Please kindly check your email box for the confirmation email.
        </p>
      </div>
    </div>
  )
}
