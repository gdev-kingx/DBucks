'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Tracker', href: '/tracker' },
    { name: 'Rewards', href: '/rewards' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <div className="w-full p-4 shadow-md bg-gradient-to-r from-purple-400 to-cyan-400 text-white fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-black hover:text-gray-500 hover:opacity-75">DBucks</Link>

        {/* Desktop Menu - Centered */}
        <div className="hidden md:flex space-x-6 flex-grow justify-center">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`flex items-center gap-2 font-medium transition duration-300
                ${pathname === item.href ? 'text-white' : 'text-black hover:text-white'}
              `}
            >
              {item.name}
              {pathname === item.href && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
              )}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {!isSignedIn && (
            <SignInButton>
              <Button variant="default" className="text-white hover:text-black hover:bg-white hover:border-none">Sign In</Button>
            </SignInButton>
          )}
          {isSignedIn && <UserButton afterSignOutUrl="/" />}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="px-0 text-black hover:text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-gradient-to-b from-violet-950 to-black border-none">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 text-lg font-medium p-2 rounded-lg transition-all
                      ${pathname === item.href ? 'bg-white/10 text-white' : 'text-gray-300 hover:text-white hover:bg-white/5'}
                    `}
                  >
                    {item.name}
                  </Link>
                ))}
                {!isSignedIn && (
                  <SignInButton>
                    <Button variant="outline" className="w-full text-white border-white/20">
                      Sign In
                    </Button>
                  </SignInButton>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
