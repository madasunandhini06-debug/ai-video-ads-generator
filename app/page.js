"use client"
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fadeInLeftRef = useRef(null);
  const fadeInRightRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Simple fade-in animations on load
    const fadeInLeftElement = fadeInLeftRef.current;
    const fadeInRightElement = fadeInRightRef.current;

    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === fadeInLeftElement) {
            entry.target.classList.add('opacity-100', 'translate-x-0');
          } else if (entry.target === fadeInRightElement) {
            entry.target.classList.add('opacity-100', 'translate-x-0');
          }
        }
      });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    if (fadeInLeftElement) {
      fadeInObserver.observe(fadeInLeftElement);
    }
    if (fadeInRightElement) {
      fadeInObserver.observe(fadeInRightElement);
    }

    // Clean up observer on component unmount
    return () => {
      if (fadeInLeftElement) {
        fadeInObserver.unobserve(fadeInLeftElement);
      }
      if (fadeInRightElement) {
        fadeInObserver.unobserve(fadeInRightElement);
      }
    };
  }, []); // Empty dependency array ensures this runs only once after initial render

  return (
    <div>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#7c3aed] animated-gradient-bg text-white font-inter">
        {/* Header */}
        <header className="bg-black/30 backdrop-blur-md shadow-lg z-50">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <a href="#" className="flex items-center space-x-2 text-2xl font-extrabold">
                  <i className="fa-solid fa-wand-magic-sparkles text-purple-400"></i>
                  <span className="gradient-text">AdVGenius AI</span>
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-gray-300 hover:text-white transition duration-150 ease-in-out px-3 py-2 rounded-md text-sm font-medium">Features</a>
                <a href="#" className="text-gray-300 hover:text-white transition duration-150 ease-in-out px-3 py-2 rounded-md text-sm font-medium">Pricing</a>
                <a href="#" className="text-gray-300 hover:text-white transition duration-150 ease-in-out px-3 py-2 rounded-md text-sm font-medium">Examples</a>
                <button
                  type="button"
                  className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                >
                  Get Started Free <i className="fa-solid fa-arrow-right ml-1"></i>
                </button>
              </div>
              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center">
                <button
                  id="mobile-menu-button"
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded={isMobileMenuOpen}
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Open main menu</span>
                  <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} fa-lg`}></i>
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu (hidden by default) */}
          <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Pricing</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Examples</a>
              <button
                type="button"
                className="w-full mt-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md hover:shadow-lg transition duration-300 ease-in-out"
              >
                Get Started Free <i className="fa-solid fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center flex-grow overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-6xl">

            {/* Left Column (Text Content) */}
            <div ref={fadeInLeftRef} className="text-center md:text-left opacity-0 transform -translate-x-5 transition-all duration-800 ease-out">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                Create Viral <span className="gradient-text">Video Ads</span> <br className="hidden sm:inline" /> in Seconds with AI
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-xl mx-auto md:mx-0">
                Effortlessly generate engaging, high-conversion video advertisements tailored for any platform. No experience needed – just your idea.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href={'/workspace'}>
                  <button
                    type="button"
                    className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-semibold rounded-lg text-base px-6 py-3.5 text-center shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
                  >

                    Generate Your First Ad <i className="fas fa-rocket ml-2"></i>
                  </button>
                </Link>
                <button
                  type="button"
                  className="text-gray-200 hover:text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 focus:ring-4 focus:outline-none focus:ring-gray-700 font-semibold rounded-lg text-base px-6 py-3.5 text-center shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105"
                >
                  Watch Demo <i className="fas fa-play-circle ml-2"></i>
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center md:justify-start space-x-4 text-gray-400">
                <div className="flex -space-x-4 rtl:space-x-reverse">
                  <div className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 avatar-placeholder"></div>
                  <div className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 avatar-placeholder" style={{ filter: 'hue-rotate(45deg)' }}></div>
                  <div className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800 avatar-placeholder" style={{ filter: 'hue-rotate(90deg)' }}></div>
                  <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+99</a>
                </div>
                <span className="text-sm">Trusted by 10,000+ Marketers</span>
              </div>
            </div>

            {/* Right Column (Visual Element) */}
            <div ref={fadeInRightRef} className="flex justify-center items-center opacity-0 transform translate-x-5 transition-all duration-800 ease-out">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-square rounded-xl shadow-2xl visual-placeholder overflow-hidden p-4 border border-white/10">
                {/* Optional: Add some pseudo-UI elements or animation here */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 rounded-xl">
                  <i className="fas fa-film fa-3x text-purple-300 mb-4 animate-pulse"></i>
                  <p className="font-semibold text-lg">Your AI-Generated Video Ad Preview</p>
                  <p className="text-sm text-gray-300 mt-2">Click 'Generate' to see the magic happen!</p>
                  <div className="w-full h-2 bg-gray-700 rounded-full mt-6 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
                {/* <Image src={'/home.png'} alt="home" width={900} height={900}
                className="w-[700px] "
              /> */}
              </div>
            </div>
          </div>
        </main>

        {/* Font Awesome and other scripts would typically be handled in your index.html or a dedicated script loading component */}
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script> */}
      </div >
    </div >
  );
}
