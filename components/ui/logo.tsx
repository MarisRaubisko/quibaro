'use client';

import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import lightLogo from '@/assets/images/logo.svg';
import darkLogo from '@/assets/images/logo-white.svg';
import routes from '@/config/routes';
import cn from 'classnames';

interface LogoPropTypes {
  className?: string;
}

export default function Logo({ className }: LogoPropTypes) {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();
  return (
    isMounted && (
      <AnchorLink
        href={{
          pathname:
            routes.home,
        }}
        className={cn('flex outline-none pl-1', className)}
      >
        <span className="relative flex overflow-hidden">
          {isDarkMode && (
            <Image src={darkLogo} alt="Vision Engine AI" height={35} priority />
          )}
          {!isDarkMode && (
            <Image src={lightLogo} alt="Vision Engine AI" height={35} priority />
          )}
        </span>
      </AnchorLink>
    )
  );
}
