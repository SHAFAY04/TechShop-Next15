"use client"

import { ArrowDownNarrowWide } from "lucide-react";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import ButtonCustom  from "@/components/button";
import { useTheme } from "next-themes";

const spaceGrotesk = Space_Grotesk({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});

export default function Home() {

  const {theme}= useTheme()
  
  useEffect(() => {
    
    const handleScroll = () => {
      let currentScrollY = window.scrollY;
      const arrow = document.getElementById('arrowdown');

      
      const fadeDistanceArrow = 6;
      const opacity = fadeDistanceArrow/currentScrollY
      
      if (arrow) {
        arrow.style.opacity = `${opacity}`;
      }
      const logodiv = document.getElementById('logodiv');
      const logoFadePoint = 100; // Start fading after 100px scroll
      if (logodiv) {
        if (currentScrollY > logoFadePoint) {
          logodiv.classList.add('invisibleDamn');
          logodiv.classList.remove('visibleLesgooo');
        } else {
          logodiv.classList.remove('invisibleDamn');
          logodiv.classList.add('visibleLesgooo');
        }
      }

      const featured = document.getElementById('featured');
      const featuredFadePoint = 300; // Start fading after 100px scroll
      const featuredFadeAgainPoint = 1200; // Start fading after 100px scroll

      if (featured ) {
        console.log(currentScrollY)
        if (currentScrollY < featuredFadePoint) {
          featured.classList.add('invisibleDamn');
          featured.classList.remove('visibleLesgooo');

        } else if(currentScrollY > featuredFadePoint && currentScrollY < featuredFadeAgainPoint){
          featured.classList.remove('invisibleDamn');
          featured.classList.add('visibleLesgooo');
        }
        else{
          featured.classList.add('invisibleDamn');
          featured.classList.remove('visibleLesgooo');

        }
      }

      const whatWeGot = document.getElementById('whatwegot');
      const whatWeGotFadePoint = 1210; 
      if (whatWeGot) {
        if (currentScrollY < whatWeGotFadePoint) {
          whatWeGot.classList.add('invisibleDamn');
          whatWeGot.classList.remove('visibleLesgooo');
        } else {
          whatWeGot.classList.remove('invisibleDamn');
          whatWeGot.classList.add('visibleLesgooo');
        }
      }

      const perksItems = document.querySelectorAll('.item');
      const newCardsShowPoint = 74; // Adjust this value as needed
      const  cardsShowPoint = 1200; // Adjust this value as needed

      if (currentScrollY >= cardsShowPoint) {
        perksItems.forEach(item => {
          item.classList.add('show');
        });
      } else {
        perksItems.forEach(item => {
          item.classList.remove('show');
        });
      }
      const newItems = document.querySelectorAll('.newitem');
      
      if (currentScrollY >= newCardsShowPoint) {
        newItems.forEach(item => {
          item.classList.add('show');
        });
      } else {
        newItems.forEach(item => {
          item.classList.remove('show');
        });
      }

    };

    

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])
  
  return (
    <main>
      <div id="logodiv" className="min-h-[92vh] flex flex-col justify-center items-center">
      <div className="flex justify-center items-center gap-5">
      {/* Left Text */}
      <div className="head-1 text-7xl sm:text-8xl md:text-9xl lg:text-9xl shadow-2xl
      ">
        <h1 className={`${spaceGrotesk.className} font-bold`}>TECH</h1> 
      </div>

      <div className="head-2 text-7xl sm:text-8xl md:text-9xl lg:text-9xl">
        <h1 className={`${spaceGrotesk.className} font-bold`}>STOP</h1>
      </div>
    </div>
    <h1 className={`${spaceGrotesk.className} head-text mt-5  text-lg sm:text-xl md:text-3xl lg:text-3xl`}>Where Innovation Never Stops</h1>

      </div>
      <div id="arrowdown" className=" flex justify-center ">
      <ButtonCustom className="pop-effect" Icon={ArrowDownNarrowWide} IconColor="black" />

      </div>

      {/*NEW ARRIVALS*/}
      <div id="featured" className="min-h-screen mt-10 flex flex-col items-center space-y-8 overflow-x-hidden">
          <div className="flex flex-col  items-center space-y-7">
              <h1  className={`${spaceGrotesk.className} font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl   `}>New Arrivals</h1>
              <h1 className={`${spaceGrotesk.className} head-text   text-lg sm:text-xl md:text-3xl lg:text-3xl`}>New stuff at best prices guranteed!</h1>

          </div>
          {/*3 showcase items div*/}
          <div className="mt-10 flex flex-row items-center justify-center smallTranslate sm:animate-none  space-x-64 sm:space-x-64 md:space-x-72 lg:space-x-10">
            <div className="newitem bg-[var(--color-card)] w-80 min-h-[24rem] flex flex-col items-center">
              <div className="relative w-64 h-56">
                <img
          src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/lcd.png"
          alt="lcd screens"
          width={256}
          height={224}
          className="object-contain mx-auto"
        />
              </div>
              <h2 className={`${spaceGrotesk.className} mt-3 text-3xl font-bold text-center`}>Gaming Screens</h2>
              <p className="mt-2 text-center text-sm text-foreground/70 max-w-xs">The all new MSI MAG and ASUF TUF series gaming monitors</p>
              </div>
            <div className="newitem bg-[var(--color-card)] w-80 min-h-[24rem] flex flex-col items-center">
              <div className="relative w-64 h-56">
                <img
          src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/gpu.webp"
          alt="graphics cards"
          width={256}
          height={224}
          className="object-contain mx-auto"
        />
              </div>
              <h2 className={`${spaceGrotesk.className} mt-8 text-3xl font-bold text-center`}>Graphics Cards</h2>
              <p className="mt-2 text-center text-sm text-foreground/70 max-w-xs">The all new NVIDIA RTX 50 Series and AMD 90 SERIES now available</p>
              </div>
            <div className="newitem bg-[var(--color-card)] w-80 min-h-[24rem] flex flex-col items-center">
              <div className="relative w-64 h-56">
                <img
          src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/gaming.png"
          alt="gaming pheripherals"
          width={256}
          height={224}
          className="object-contain mx-auto"
        />
              </div>
              <h2 className={`${spaceGrotesk.className} mt-3 text-3xl font-bold text-center`}>Gaming Gear</h2>
              <p className="mt-2 text-center text-sm text-foreground/70 max-w-xs">Top notch gaming gear and pheripherals now available</p>
              </div>
          </div>
          {
            theme === 'dark' ? (
              <Button 
                 
                className={`${spaceGrotesk.className} border-1 border-black mt-7 w-xs h-12 text-md bg-white text-black hover:bg-gray-300`}
              >
                 <Link href="/home">Browse</Link>
              </Button>
            ) : (
              <Button 
                className={`${spaceGrotesk.className} mt-7 w-xs h-12 text-md bg-black text-white hover:bg-neutral-800`}
              >
                <Link href="/home">Browse</Link>
              </Button> )     
          }</div>


{/* WHAT WE OFFER*/}
      <div id="whatwegot" className="min-h-screen mt-10 flex flex-col items-center space-y-8 overflow-x-hidden">
          <div className="flex flex-col  items-center space-y-7">
              <h1  className={`${spaceGrotesk.className} font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl   `}>What We Offer</h1>
              <h1 className={`${spaceGrotesk.className} head-text  text-lg sm:text-xl md:text-3xl lg:text-3xl`}>Perks of being our customer!</h1>

          </div>
          {/*3 showcase items div*/}
          <div className="mt-10 flex flex-row items-center justify-center smallTranslate sm:animate-none  space-x-64 sm:space-x-64 md:space-x-72 lg:space-x-10">
            <div className="item bg-[var(--color-card)] w-80 min-h-[24rem] flex flex-col items-center">
              <div className="relative w-64 h-60">
                <img
          src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/bestprice.png"
          alt="best price"
          width={256}
          height={150}
          className="object-contain mx-auto"
        />
              </div>
              <h2 className={`${spaceGrotesk.className} mt-3 text-3xl font-bold text-center`}>High Quality</h2>
              <p className="mt-2 text-center text-sm text-foreground/70 max-w-xs">High quality premium tech with the best prices in town!</p>
              </div>
            <div className="item bg-[var(--color-card)] w-80 min-h-[24rem] flex flex-col items-center">
              <div className="relative w-64 h-56">
                <img
          src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/ai.png"
          alt="AI first"
          width={256}
          height={224}
          className="object-contain mx-auto"
        />
              </div>
              <h2 className={`${spaceGrotesk.className} mt-8 text-3xl font-bold text-center`}>24/7 AI Support</h2>
              <p className="mt-2 text-center text-sm text-foreground/70 max-w-xs">An AI first stop from choice to help our AI got you covered</p>
              </div>
            <div className="item bg-[var(--color-card)] w-80 min-h-[24rem] flex flex-col items-center">
              <div className="relative w-64 h-64">
                <img
          src="https://pub-d81cf4a8a26d4e8d8a83a8d23172d5e5.r2.dev/easy.png"
          alt="easy returns"
          width={256}
          height={224}
          className="object-contain mx-auto"
        />
              </div>
              <h2 className={`${spaceGrotesk.className} mt-3 text-3xl font-bold text-center`}>Easy Returns</h2>
              <p className="mt-2 text-center text-sm text-foreground/70 max-w-xs">Door to door easy return policy</p>
              </div>
          </div>
      </div>



    </main>
  );
}
