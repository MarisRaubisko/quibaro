'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Menu, X, Home, BookOpen, Bot, User, Images, CreditCard, FileText, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useModal } from '@/components/modal-views/context';
import routes from '@/config/routes';
import LogoIcon from '@/components/ui/logo-icon';
import MobileNavSheet from './MobileNavSheet';

interface TopNavProps {
  generations?: number;
}

const navigationItems = [
  {
    name: 'Home',
    href: routes.home,
    icon: Home,
    hideForLoggedIn: false,
    hideForGuests: false,
  },
  {
    name: 'Community Showcase',
    href: routes.communityShowcase,
    icon: BookOpen,
    hideForLoggedIn: false,
    hideForGuests: false,
  },
  {
    name: 'Image Generation',
    href: routes.imageGeneration,
    icon: Bot,
    hideForLoggedIn: false,
    hideForGuests: false,
  },
  {
    name: 'Portrait Editing',
    href: routes.imageEditing,
    icon: User,
    hideForLoggedIn: false,
    hideForGuests: false,
  },
  {
    name: 'Image Gallery',
    href: routes.imageGallery,
    icon: Images,
    hideForLoggedIn: false,
    hideForGuests: true,
  },
  {
    name: 'Payment History',
    href: routes.paymentHistory,
    icon: CreditCard,
    hideForLoggedIn: false,
    hideForGuests: true,
  },
];

const policyItems = [
  { name: 'Privacy Policy', href: routes.privacyPolicy },
  { name: 'Terms and Conditions', href: routes.termsAndConditions },
  { name: 'Delivery Policy', href: routes.deliveryPolicy },
  { name: 'Return Policy', href: routes.returnPolicy },
  { name: 'Cookies Policy', href: routes.cookiesPolicy },
];

export default function TopNav({ generations }: TopNavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPoliciesOpen, setIsPoliciesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { openModal } = useModal();

  const isActive = (href: string) => pathname === href;

  const handleTopUp = () => {
    openModal('TOPUP_VIEW');
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-dark/80 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => router.push(routes.home)}
                className="flex items-center space-x-2 transition-opacity hover:opacity-80"
                aria-label="Go to home page"
              >
                <LogoIcon />
                <span className="hidden text-xl font-bold text-gray-900 dark:text-white sm:block">
                  Quibaro
                </span>
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-8">
              {navigationItems.map((item) => {
                if (item.hideForGuests) {
                  return (
                    <SignedIn key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center space-x-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
                          isActive(item.href)
                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                            : 'text-gray-600 dark:text-gray-300'
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SignedIn>
                  );
                }
                if (item.hideForLoggedIn) {
                  return (
                    <SignedOut key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center space-x-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
                          isActive(item.href)
                            ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                            : 'text-gray-600 dark:text-gray-300'
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    </SignedOut>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
                      isActive(item.href)
                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Policies Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsPoliciesOpen(!isPoliciesOpen)}
                  className={cn(
                    'flex items-center space-x-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
                    isPoliciesOpen
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                      : 'text-gray-600 dark:text-gray-300'
                  )}
                  aria-expanded={isPoliciesOpen}
                  aria-haspopup="true"
                >
                  <FileText className="h-4 w-4" />
                  <span>Policies</span>
                </button>
                
                {isPoliciesOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl border bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                    {policyItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Authentication */}
              <SignedOut>
                <Link
                  href={routes.signIn}
                  className="flex items-center space-x-2 rounded-2xl px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <Lock className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              </SignedOut>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              <SignedIn>
                <Button
                  onClick={handleTopUp}
                  className="rounded-2xl shadow-md transition-all hover:shadow-lg"
                >
                  {`${generations} Generations`}
                </Button>
                <UserButton 
                  afterSignOutUrl="/"
                />
              </SignedIn>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden rounded-2xl p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                aria-label="Open mobile menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Sheet */}
      <MobileNavSheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        generations={generations}
      />
    </>
  );
}
