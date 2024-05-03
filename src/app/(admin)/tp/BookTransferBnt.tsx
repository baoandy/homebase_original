"use client";

type BookTransferBntProps = {
  buttonText: string;
};

export default function BookTransferBnt({ buttonText }: BookTransferBntProps) {
  const makeBookTransfer = async () => {
    const res = await fetch('/api/tpproxy', {
        method: 'POST',
        headers: {
            tp_url: "https://api.sandbox.treasuryprime.com/book",
            'Content-Type': 'application/json',          
        },
        body: JSON.stringify({
          amount: "99.00",
          from_account_id: "acct_11k1g2r2vgdz4s",
          to_account_id: "acct_11k1g2r2vgdz45",
        }),
      });

    console.log(await res.json());
  };

  return (
    <button className="btn btn-primary" onClick={makeBookTransfer}>
      {buttonText}
    </button>
  );
}
