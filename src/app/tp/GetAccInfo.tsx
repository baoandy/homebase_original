"use client";
import React, { useState } from "react";

type GetAccINfoProps = {
  buttonText: string;
};

export default function GetAccINfo({ buttonText }: GetAccINfoProps) {
  const [data, setData] = useState({} as JSON);
  const [divVisible, setDivVisible] = useState(false);

  const getAccountInfo = async () => {
    const res = await fetch("/api/tpproxy", {
      method: "GET",
      headers: {
        tp_url:
          "https://api.sandbox.treasuryprime.com/account/acct_11k1g2r2vgdz4s",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setData(data.data);
    setDivVisible(true);
  };

  return (
    <>
      <button className="btn btn-secondary" onClick={getAccountInfo}>
        {buttonText}
      </button>
      <div className=" h-fit flex flex-col gap-3 absolute top-20 left-20  bg-gray-400 p-6 rounded-md" hidden={divVisible} >
      <AccountInfo data={data} />
      </div>
    </>
  );
}



interface Props {
    data: JSON;
}

const AccountInfo: React.FC<Props> = ({ data }) => {
    const renderData = (obj: any): JSX.Element[] => { // Use `any` here or a more specific type if possible
        return Object.entries(obj).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                return (
                    <div  key={key} style={{ marginLeft: '20px' }}>
                        <strong>{key}:</strong>
                        <div >{renderData(value)}</div>
                    </div>
                );
            }
            return (
                <div key={key}>
                    <strong>{key}:</strong> {String(value)}
                </div>
            );
        });
    };

    return (
        <div >
            {renderData(data)}
        </div>
    );
};