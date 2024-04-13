import { Suspense } from "react";
import WaitListButton from "./WaitListButton";

interface WaitListButtonProps {
  className?: string;
  apiSecretKey: string;
}

export default function DisplayWaitListButton({
  className,
  apiSecretKey,
}: WaitListButtonProps) {
  return (
    <>
      <Suspense>
        <WaitListButton className={className} apiSecretKey={apiSecretKey} />
      </Suspense>
    </>
  );
}
