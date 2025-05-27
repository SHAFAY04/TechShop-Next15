import Image from "next/image"

export const metadata = {
    title:"Page not found!"
}
 
export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Image ref="/">Return Home</Image>
    </div>
  )
}