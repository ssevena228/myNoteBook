
import React, { useState } from "react";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    accountType: "user",
    age: "",
    gender: "",
    avatar: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsEdit(false);
    console.log(formData);
  };



  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex justify-center items-center p-6">
      
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-8 md:p-12">
        
        <form onSubmit={submitHandler} className="space-y-8">

          {/* Heading */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold text-slate-700">
              Profile Settings
            </h1>
            <p className="text-sm text-slate-500">
              Manage your account information
            </p>
          </div>

          {/* Avatar + Edit Button */}
          <div className="flex flex-col items-center space-y-3">
            <img
              src={formData.avatar || "https://i.pravatar.cc/150?img=3"}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
            />

            {/* {isEdit && (
              <input
                type="text"
                name="avatar"
                placeholder="Avatar Image URL"
                value={formData.avatar}
                onChange={changeHandler}
                className="w-64 h-9 px-3 text-sm rounded-md border border-slate-300 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            )} */}

            <button
              type="button"
              onClick={() => setIsEdit(!isEdit)}
              className="px-4 py-1.5 text-sm rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
            >
              {isEdit ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {[
              "name",
              "email",
              "phone",
              "password",
              "age",
              "address",
              "city",
              "state",
              "country",
              "pincode",
            ].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="mb-1 text-xs font-medium text-slate-600 capitalize">
                  {field}
                </label>

                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={changeHandler}
                  disabled={!isEdit}
                  className={`w-full h-9 px-3 text-sm rounded-md border border-slate-300 
                  bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 
                  focus:border-indigo-500 transition
                  ${!isEdit ? "bg-slate-100 text-slate-500 cursor-not-allowed" : ""}`}
                />
              </div>
            ))}

            {/* Gender */}
            <div className="flex flex-col">
              <label className="mb-1 text-xs font-medium text-slate-600">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={changeHandler}
                disabled={!isEdit}
                className={`w-full h-9 px-3 text-sm rounded-md border border-slate-300 
                bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 
                focus:border-indigo-500 transition
                ${!isEdit ? "bg-slate-100 text-slate-500 cursor-not-allowed" : ""}`}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Account Type */}
            <div className="flex flex-col">
              <label className="mb-1 text-xs font-medium text-slate-600">
                Account Type
              </label>
              <select
                name="accountType"
                value={formData.accountType}
                onChange={changeHandler}
                disabled={!isEdit}
                className={`w-full h-9 px-3 text-sm rounded-md border border-slate-300 
                bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 
                focus:border-indigo-500 transition
                ${!isEdit ? "bg-slate-100 text-slate-500 cursor-not-allowed" : ""}`}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

          </div>

          {/* Save Button */}
          {isEdit && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition shadow"
              >
                Save Changes
              </button>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};

export default Profile;
