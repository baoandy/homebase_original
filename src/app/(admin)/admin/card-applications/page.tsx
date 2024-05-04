"use server";
import { prisma } from "@/lib/db/prisma";
import Link from "next/link";

export default async function CardApplications() {
  const cardApplications = await prisma.cardApplication.findMany({
    include: {
      user: true,
    },
  });
  return (
    <div className="flex-1 overflow-auto p-5">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Card Applications</h1>
        <button className="text-blue-500">View All</button>
      </div>
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Created At
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              First Name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              email
            </th>
            <th scope="col" className="px-6 py-3">
              More...
            </th>
          </tr>
        </thead>
        <tbody>
          {cardApplications.map((application, index) => (
            <tr key={index} className="border-b bg-white">
              <td className="px-6 py-4">
                {application.createdAt.toLocaleDateString()}
              </td>
              <td className="px-6 py-4">{application.status}</td>
              <td className="px-6 py-4">{application.user.first_name}</td>
              <td className="px-6 py-4">{application.user.last_name}</td>
              <td className="px-6 py-4">{application.user.email}</td>
              <td className="px-6 py-4">
                <Link
                  href={`/admin/card-applications/${application.id}`}
                  className="text-blue-500"
                >
                  See More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
