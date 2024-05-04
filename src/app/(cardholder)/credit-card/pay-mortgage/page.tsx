"use server";
import CardAccount from "./CardAccount";

export default async function PayMortgage() {
  const routingNumber = "123456789";
  const accountNumber = "987654321";

  const faqs = [
    {
      question: "How do I use HomeBase to pay my mortgage?",
      answer:
        "Set up a payment account at your mortgage servicing portal with the routing and account numbers shown above.",
    },
    {
      question:
        "My bank verifies my payment account with a microdeposit. How do I complete this part of signing up with HomeBase?",
      answer:
        "Reach out to the HomeBase team at support@yourhomebase.co and we will provide you with the microdeposit information. Note that microdeposits may take up to 3 business days to appear in your bank account.",
    },
    {
      question: "How many mortgage payments can I make per month?",
      answer:
        "HomeBase will initiate payments for 1 mortgage payment per month.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Pay Your Mortgage</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Account Details</h2>

          <CardAccount
            routingNumber={routingNumber}
            accountNumber={accountNumber}
          />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
