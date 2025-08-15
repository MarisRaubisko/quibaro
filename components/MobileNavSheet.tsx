'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { X, Home, BookOpen, Bot, User, Images, CreditCard, FileText, Lock, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useModal } from '@/components/modal-views/context';
import routes from '@/config/routes';
import LogoIcon from '@/components/ui/logo-icon';

interface MobileNavSheetProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function MobileNavSheet({ isOpen, onClose, generations }: MobileNavSheetProps) {
  const pathname = usePathname();
  const { openModal } = useModal();

  // Close sheet when route changes
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [pathname, isOpen, onClose]);

  const handleTopUp = () => {
    openModal('TOPUP_VIEW');
    onClose();
  };

  const isActive = (href: string) => pathname === href;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle className="flex items-center space-x-2">
            <LogoIcon />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Quibaro
            </span>
          </SheetTitle>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-2xl p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="Close mobile menu"
          >
            <X className="h-5 w-5" />
          </button>
        </SheetHeader>

        <div className="flex flex-col space-y-2 p-6">
          {/* Navigation Items */}
          {navigationItems.map((item) => {
            if (item.hideForGuests) {
              return (
                <SignedIn key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
                      isActive(item.href)
                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300'
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="h-5 w-5" />
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
                      'flex items-center space-x-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
                      isActive(item.href)
                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                        : 'text-gray-600 dark:text-gray-300'
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="h-5 w-5" />
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
                  'flex items-center space-x-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white',
                  isActive(item.href)
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300'
                )}
                onClick={onClose}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Policies Section */}
          <div className="border-t pt-4">
            <h3 className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Policies
            </h3>
            {policyItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Authentication */}
          <SignedOut>
            <div className="border-t pt-4">
              <Link
                href={routes.signIn}
                className="flex items-center space-x-3 rounded-2xl px-4 py-3 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={onClose}
              >
                <Lock className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            </div>
          </SignedOut>

          {/* User Actions */}
          <SignedIn>
            <div className="border-t pt-4 space-y-3">
              <Button
                onClick={handleTopUp}
                className="w-full rounded-2xl shadow-md transition-all hover:shadow-lg"
              >
                {`${generations} Generations`}
              </Button>
              <div className="flex items-center justify-center">
                <UserButton 
                  afterSignOutUrl="/"
                />
              </div>
            </div>
          </SignedIn>
        </div>
      </SheetContent>
    </Sheet>
  );
}
