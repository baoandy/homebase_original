"use client";
import React, { useState } from "react";

export default function PersonData({ PersonInfo }: any) {
  const [message, setMessage] = useState("");
  const PersonApplication = async () => {
    const res = await fetch("/api/tp/apply/person_application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: PersonInfo.id,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  const AccountApplication = async () => {
    const res = await fetch("/api/tp/apply/account_application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: PersonInfo.id,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  const RetrievePersonApplication = async () => {
    const path = `/api/tp/apply/person_application/${PersonInfo.application_id}`;
    const res = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };

  const ListPersonApplications = async () => {
    const path = `/api/tp/apply/person_application`;
    const res = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };

  const RetrieveAccountApplication = async () => {
    const path = `/api/tp/apply/account_application/${PersonInfo.account[0].id}`;
    const res = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };

  const ListAccountApplications = async () => {
    const path = `/api/tp/apply/account_application`;
    const res = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };

  const CreateCard = async () => {
    const res = await fetch("/api/tp/card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: PersonInfo.id,
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  const ListAllCard = async () => {
    const path = `/api/tp/card`;
    const res = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="flex w-full flex-col gap-3 ">
      <div className="flex w-full flex-row gap-3">
        <div className="flex w-1/2 flex-col items-center">
          <p>{PersonInfo.date_of_birth}</p>
          <p>{PersonInfo.first_name}</p>
          <p>{PersonInfo.last_name}</p>
        </div>
        <div className="flex w-1/2 flex-col items-center">
          {" "}
          <p>{PersonInfo.phone_number}</p>
          <p>{PersonInfo.ssn}</p>
          <p>{PersonInfo?.email}</p>
          <p>{PersonInfo?.application_id}</p>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between gap-3">
        <button
          onClick={PersonApplication} // POST
          className="btn btn-success w-fit bg-blue-400 hover:bg-blue-900 hover:text-white"
        >
          Create a Person Application [POST]
        </button>
        <button
          onClick={RetrievePersonApplication}
          className="btn btn-success w-fit bg-blue-400 hover:bg-blue-900 hover:text-white"
        >
          Retrieve Person Application [GET]
        </button>
        <button
          onClick={ListPersonApplications}
          className="btn btn-success w-fit bg-blue-400 hover:bg-blue-900 hover:text-white"
        >
          Retrieve List of Person Applications [GET]
        </button>
      </div>
      <div className="flex w-full flex-row justify-between gap-3">
        <button
          onClick={AccountApplication}
          className="hover:text-whitew-1/3 btn btn-success bg-purple-300 hover:bg-purple-800"
        >
          Account Application [POST]
        </button>
        <button
          onClick={RetrieveAccountApplication}
          className="hover:text-whitew-fit btn btn-success bg-purple-400 hover:bg-purple-800"
        >
          Retrieve Account Application [GET]
        </button>
        <button
          onClick={ListAccountApplications}
          className="hover:text-whitew-fit btn btn-success bg-purple-400 hover:bg-purple-800"
        >
          Retrieve List of Account Applications [GET]
        </button>
      </div>
      <div className="flex w-full flex-row justify-between gap-3">
        <button
          onClick={CreateCard}
          className="hover:text-whitew-1/3 btn btn-success bg-green-300 hover:bg-green-800"
        >
          Create Card [POST]
        </button>
        <button
          //   onClick={RetrieveAccountApplication}
          disabled
          className="hover:text-whitew-fit btn btn-success bg-green-400 hover:bg-green-800"
        >
          Retrieve a Card [GET]
        </button>
        <button
          onClick={ListAllCard}
          className="hover:text-whitew-fit btn btn-success bg-green-400 hover:bg-green-800"
        >
          List All Cards [GET]
        </button>
        <button
          //   onClick={ListAccountApplications}
          disabled
          className="hover:text-whitew-fit btn btn-success bg-green-400 hover:bg-green-800"
        >
          Update Card [PATCH]
        </button>
      </div>
    </div>
  );
}
