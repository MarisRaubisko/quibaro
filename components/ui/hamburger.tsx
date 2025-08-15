import { Button, ButtonProps } from '@/components/ui/button';
interface HamburgerProps extends ButtonProps {
  isOpen?: boolean;
}

export default function Hamburger({ isOpen, ...props }: HamburgerProps) {
  return (
    <Button aria-label="Hamburger" className="rounded-full p-2" {...props}>
      <svg
        className="sm:w-auo h-auto w-6"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 7.5C5 6.11929 6.11929 5 7.5 5H22.5C23.8807 5 25 6.11929 25 7.5C25 8.88071 23.8807 10 22.5 10H7.5C6.11929 10 5 8.88071 5 7.5Z"
          fill="currentColor"
        />
        <path
          d="M5 15C5 13.6193 6.11929 12.5 7.5 12.5H22.5C23.8807 12.5 25 13.6193 25 15C25 16.3807 23.8807 17.5 22.5 17.5H7.5C6.11929 17.5 5 16.3807 5 15Z"
          fill="currentColor"
        />
        <path
          d="M5 22.5C5 21.1193 6.11929 20 7.5 20H22.5C23.8807 20 25 21.1193 25 22.5C25 23.8807 23.8807 25 22.5 25H7.5C6.11929 25 5 23.8807 5 22.5Z"
          fill="currentColor"
        />
      </svg>
    </Button>
  );
}
