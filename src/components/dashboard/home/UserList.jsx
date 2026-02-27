import React from "react";

const UserList = ({ users }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border">
      <h3 className="font-bold text-xl mb-6">Team Collaboration</h3>

      <div>
        {users?.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between rounded-xl hover:bg-gray-50 transition"
          >
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="w-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
                <p className="text-xs text-gray-400">Joined: {user.joinDate}</p>
              </div>
            </div>

            {/* Status Badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                user.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;