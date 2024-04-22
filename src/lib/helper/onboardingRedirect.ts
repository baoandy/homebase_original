import { CardApplication, User } from "@prisma/client";
import { redirect } from "next/navigation";

interface ExtendedCardApplication extends CardApplication {
  user: User;
}

function onboardingRedirect(cardApplication: ExtendedCardApplication) {
  if (cardApplication.status === "SUBMITTED") {
    redirect(`/application/submit/${cardApplication.id}`);
    return;
  }
  if (!cardApplication.user.first_name) {
    redirect(`/application/personal-details/${cardApplication.id}`);
    return;
  }
  if (!cardApplication.currentAddressId) {
    redirect(`/application/current-address/${cardApplication.id}`);
    return;
  }
  if (!cardApplication.mortgageAddressId) {
    redirect(`/application/mortgage-address/${cardApplication.id}`);
    return;
  }
  if (!cardApplication.employmentStatus) {
    redirect(`/application/employment-status/${cardApplication.id}`);
    return;
  }
  if (!cardApplication.mortgageAmount) {
    redirect(`/application/mortgage-details/${cardApplication.id}`);
    return;
  }
}

export { onboardingRedirect };
