import Link from "next/link";
import { Anton} from "next/font/google"; 

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  return (
    <div className="bg-img min-h-screen flex flex-col md:flex-row justify-center items-center gap-10 md:gap-28 lg:gap-96">
      {/* Left Text */}
      <div className="head-1 flex md:flex-col gap-14 md:gap-10 lg:gap-20 text-green-700 customfont">
        <h1 className={`${anton.className} scale-x-200 scale-y-160 md:scale-x-180 md:scale-y-170 lg:scale-x-250 lg:scale-y-200`}>T</h1> 
        <h1 className={`${anton.className} scale-x-200 scale-y-160 md:scale-x-180 md:scale-y-170 lg:scale-x-250 lg:scale-y-200`}>E</h1>
        <h1 className={`${anton.className} scale-x-200 scale-y-160 md:scale-x-180 md:scale-y-170 lg:scale-x-250 lg:scale-y-200`}>C</h1>
        <h1 className={`${anton.className} scale-x-200 scale-y-160 md:scale-x-180 md:scale-y-170 lg:scale-x-250 lg:scale-y-200`}>H</h1>
      </div>

      {/* Center Box */}
      <main className="flex justify-center items-center">
        <div className="rounded-2xl p-10 min-w-sm max-w-sm text-center bg-black text-2xl text-white">
          <h1 className="italic text-3xl">Shafay's Tech Stop</h1>

          <div className="mt-8">
            <address>
              60827 Boulevard Aline Apt. 861 <br />
              St-Mathieu-des-Bois, X6A2T5
            </address>
          </div>

          <div className="mt-8">
            <Link href="tel:5555555555" className="hover:underline">
              555-555-5555
            </Link>
            <p>OPEN 9am to 10pm</p>
          </div>
        </div>
      </main>

      {/* Right Text */}
      <div className="head-2 flex md:flex-col gap-16 md:gap-10 lg:gap-20 text-green-700 customfont">
        <h1 className={`${anton.className} scale-x-200 scale-y-160 md:scale-x-180 md:scale-y-170 lg:scale-x-250 lg:scale-y-200`}>S</h1>
        <h1 className={`${anton.className} scale-x-200 scale-y-160 md:scale-x-180 md:scale-y-170 lg:scale-x-250 lg:scale-y-200`}>T</h1>
        <h1 className={`${anton.className} scale-x-200 scale-y-160 md:scale-x-180 md:scale-y-170 lg:scale-x-250 lg:scale-y-200`}>O</h1>
        <h1 className={`${anton.className} scale-x-200 scale-y-160 md:scale-x-180 md:scale-y-170 lg:scale-x-250 lg:scale-y-200`}>P</h1>
      </div>
    </div>
  );
}
