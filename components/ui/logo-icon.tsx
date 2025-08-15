import Image from "@/components/ui/image";
import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { useIsDarkMode } from "@/lib/hooks/use-is-dark-mode";
import lightLogo from "@/assets/images/logo-icon.svg";
import darkLogo from "@/assets/images/logo-icon-white.svg";

const Logo = () => {
  const isMounted = useIsMounted();
  const { isDarkMode } = useIsDarkMode();

  return (
    <div className="flex cursor-pointer outline-none">
      <span className="relative flex overflow-hidden">
        {isMounted && isDarkMode && (
          <Image src={darkLogo} alt="Logo" priority width={30} />
        )}
        {isMounted && !isDarkMode && (
          <Image src={lightLogo} alt="Logo" priority width={30} />
        )}
      </span>
    </div>
  );
};

export default Logo;
