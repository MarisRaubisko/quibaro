import { UserButton } from '@clerk/nextjs';

export default function UserCard() {
  return (
    <div
      className={`flex items-center rounded-lg bg-gray-100 dark:bg-light-dark mt-1`}
    >
      <UserButton showName />
    </div>
  );
}
