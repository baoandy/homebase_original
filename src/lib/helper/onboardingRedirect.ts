import { CardApplication, User } from "@prisma/client";
import { redirect } from "next/navigation";

interface ExtendedCardApplication extends CardApplication {
  user: User;
}

function onboardingRedirect(cardApplication: ExtendedCardApplication) {
  if (cardApplication.status === "SUBMITTED") {
    redirect(`/application/submit/${cardApplication.id}`);
  }
  if (!cardApplication.user.first_name) {
    redirect(`/application/personal-details/${cardApplication.id}`);
  }
  if (!cardApplication.currentAddressId) {
    redirect(`/application/current-address/${cardApplication.id}`);
  }
  if (!cardApplication.mortgageAddressId) {
    redirect(`/application/mortgage-address/${cardApplication.id}`);
  }
  if (!cardApplication.employmentStatus) {
    redirect(`/application/employment-status/${cardApplication.id}`);
  }
  if (!cardApplication.mortgageAmount) {
    redirect(`/application/mortgage-details/${cardApplication.id}`);
  }
}

export { onboardingRedirect };
