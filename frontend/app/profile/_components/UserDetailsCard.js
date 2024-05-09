"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import queries from "../../../queries";
import request from "graphql-request";
import { signOut } from "next-auth/react";

const UserDetailsCard = ({ data }) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      const response = request("http://localhost:4000/", queries.REMOVE_USER, {
        id: data._id,
      });
      if (response) {
        let udata = await signOut({
          redirect: false,
          callbackUrl: "/landing",
        });
        router.push(udata.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="mt-10 ml-5 mr-5 flex flex-col bg-gray-800 rounded-xl p-10 shadow-md">
      <div className="flex items-center mb-8">
        <Image
          src="/img_avatar.png"
          alt="Avatar"
          width={200}
          height={200}
          className="rounded-full w-40 h-40 mr-8 border border-white"
        />
        <div className="text-white text-xl font-bold">{`${data.fname} ${data.lname}`}</div>
        <Link
          href="/profile/edit"
          className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
        >
          Edit Profile
        </Link>
        <button onClick={openDeleteModal} className="ml-5">
          <MdDeleteOutline size={30} />
        </button>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="mb-4 text-black">Are you sure you want to delete?</p>
            <p className="mb-4 text-black font-bold">
              All data including Blogs and Comments will be deleted.{" "}
            </p>
            <div className="flex justify-center">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col space-y-4 text-gray-300">
        <div className="border-b border-dashed border-gray-400 pb-2">
          <h2 className="text-lg font-medium">Personal Details</h2>
        </div>
        <div className="flex flex-col space-y-1">
          <p>First Name: {data.fname}</p>
          <p>Last Name: {data.lname}</p>
          <p>Email Address: {data.email}</p>
        </div>
        <div className="border-b border-dashed border-gray-400 pb-2">
          <h2 className="text-lg font-medium">Bio</h2>
        </div>
        <p className="text-gray-200">{data.bio}</p>
        <hr className="border-gray-400 my-4" />
        <div className="flex justify-between text-gray-300">
          <p>Followers: {data.followers.length}</p>
          <p>Following: {data.following.length}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
