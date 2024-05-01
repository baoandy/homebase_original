import { Fragment } from "react";
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/20/solid";
import Transaction from "@/components/CreditCard/Transactions/Transaction";
import TransactionTable from "@/components/CreditCard/Transactions/TransactionTable";

export default function Example() {
  const statementDay = 22;
  const transactions = [
    ...Array.from({ length: 104 }, (_, i) => ({
      transactionType: "credit",
      date: new Date(new Date().setDate(new Date().getDate() - i)),
      postedDate: new Date(new Date().setDate(new Date().getDate() - i)),
      transaction: "Transaction Detail",
      merchant: "Merchant",
      merchantCategory: "Merchant Category",
      amount: 100,
      balance: 1000 - i * 100,
    })),
  ];
  return (
    <TransactionTable transactions={transactions} statementDay={statementDay} />
  );
}
