import authOptions from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const AdminDashboard = async () => {
  const session = await getServerSession(authOptions);

  console.log("session", session);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>

        {/* Overview Section */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600">
              Total Products
            </h3>
            <p className="text-2xl font-bold text-gray-800">125</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-800">240</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600">Total Users</h3>
            <p className="text-2xl font-bold text-gray-800">89</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-600">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-800">$12,345</p>
          </div>
        </section>

        {/* Recent Orders Section */}
        <section className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-gray-600 font-medium">
                  Order ID
                </th>
                <th className="py-2 px-4 text-left text-gray-600 font-medium">
                  Customer
                </th>
                <th className="py-2 px-4 text-left text-gray-600 font-medium">
                  Total
                </th>
                <th className="py-2 px-4 text-left text-gray-600 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4">#0001</td>
                <td className="py-2 px-4">John Doe</td>
                <td className="py-2 px-4">$150.00</td>
                <td className="py-2 px-4 text-green-600">Completed</td>
              </tr>
              <tr>
                <td className="py-2 px-4">#0002</td>
                <td className="py-2 px-4">Jane Smith</td>
                <td className="py-2 px-4">$200.00</td>
                <td className="py-2 px-4 text-yellow-600">Pending</td>
              </tr>
              <tr>
                <td className="py-2 px-4">#0003</td>
                <td className="py-2 px-4">Emily Johnson</td>
                <td className="py-2 px-4">$85.00</td>
                <td className="py-2 px-4 text-red-600">Cancelled</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
