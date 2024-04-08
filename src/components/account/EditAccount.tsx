"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";

type Props = {
  setisEdit: (e: boolean) => void;
};

const EditAccount: React.FC<Props> = ({ setisEdit }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newBirthPlace, setNewBirthPlace] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");
  const [newReligi, setNewReligi] = useState("");
  const [newBloodType, setNewBloodType] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newIdentity, setNewIdentity] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status, update }: any = useSession();

  useEffect(() => {
    console.log("Data session:", session);
    if (session?.user) {
      setNewName(session.user.full_name || "");
      setNewEmail(session.user.email || "");

      // Check if phpDonorData exists and update address and birth_place accordingly
      if (session.user.phpDonorData && session.user.phpDonorData.length > 0) {
        setNewAddress(session.user.phpDonorData[0].address || "");
        setNewBirthPlace(session.user.phpDonorData[0].birth_place || "");
        setNewBirthDate(session.user.phpDonorData[0].birth_date || "");
        setNewReligi(session.user.phpDonorData[0].religion || "");
        setNewBloodType(session.user.phpDonorData[0].blood_type || "");
        setNewGender(session.user.phpDonorData[0].sex || "");
        setNewIdentity(session.user.phpDonorData[0].identity_no || "");
        setNewWebsite(session.user.phpDonorData[0].website || "");
      }
    }
  }, [session]);

  const handleSubmit = async () => {
    setError(""); // Clear previous errors

    if (!/^\S+@\S+\.\S+$/.test(newEmail)) {
      setError("Invalid email format");
      return;
    }

    try {
      // Update backend
      const response = await fetch(
        `https://adminx.human-initiative.org/account-api/update/${session?.user.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: newName,
            email: newEmail,
            address: newAddress,
            birth_place: newBirthPlace,
            birth_date: newBirthDate,
            religion: newReligi,
            blood_type: newBloodType,
            sex: newGender,
            identity_no: newIdentity,
            website: newWebsite,
          }),
        }
      );

      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (!response.ok) {
        setError("Failed to update user data");
        return;
      }

      // Update session
      await update({
        full_name: newName,
        email: newEmail,
        address: newAddress,
        birth_place: newBirthPlace,
        birth_date: newBirthDate,
        religion: newReligi,
        blood_type: newBloodType,
        sex: newGender,
        identity_no: newIdentity,
        website: newWebsite,
      });

      // Fetch updated data after update
      const updatedDataResponse = await fetch(
        `https://adminx.human-initiative.org/account-api/get/${session?.user.id}`
      );
      const updatedData = await updatedDataResponse.json();
      console.log("Updated data:", updatedData);

      // Update local state with the updated data
      setNewName(updatedData.full_name || "");
      setNewEmail(updatedData.email || "");
      setNewAddress(updatedData.address || "");
      setNewBirthPlace(updatedData.birth_place || "");
      setNewBirthDate(updatedData.birth_date || "");
      setNewReligi(updatedData.religion || "");
      setNewBloodType(updatedData.blood_type || "");
      setNewGender(updatedData.sex || "");
      setNewIdentity(updatedData.identity_no || "");
      setNewWebsite(updatedData.website || "");

      // Update session with the updated data
      const updateResult = await update({
        full_name: updatedData.full_name,
        email: updatedData.email,
        address: updatedData.address,
        birth_place: updatedData.birth_place,
        birth_date: updatedData.birth_date,
        religion: updatedData.religion,
        blood_type: updatedData.blood_type,
        sex: updatedData.sex,
        identity_no: updatedData.identity_no,
        website: updatedData.website,
      });
      console.log("Update result:", updateResult);
      console.log("Successfully updated user data");
      setisEdit(false);
    } catch (error) {
      setError("An error occurred while updating data");
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  if (!session) {
    signIn();
    return <div>Redirecting to login...</div>;
  }

  return (
    <Fragment>
      <div className="box mb-4 p-6 bg-white rounded-xl">
        <div className="flex flex-row justify-between mb-4">
          <div
            className="flex flex-row justify-center items-center cursor-pointer"
            onClick={() => {
              setisEdit(false);
            }}
          >
            <MdArrowBack className="text-sky-500 text-xl" />
            <h4 className="text-sky-500 text-base">Back To Account</h4>
          </div>
          <div className="flex flex-row justify-center items-center">
            <h2 className="text-lg font-semibold">Edit Account id - </h2>
            <h2>&nbsp;{session?.user.guid}</h2>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
            Tempat Lahir
          </label>
          <input
            type="text"
            value={newBirthPlace}
            onChange={(e) => setNewBirthPlace(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
            Tanggal Lahir
          </label>
          <input
            type="date"
            value={newBirthDate}
            onChange={(e) => setNewBirthDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
            Agama
          </label>
          <select
            id="religi"
            value={newReligi}
            onChange={(e) => setNewReligi(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Pilih Agama</option>
            <option value="islam">Islam</option>
            <option value="kristen">Kristen</option>
            <option value="katolik">Katolik</option>
            <option value="hindu">Hindu</option>
            <option value="budha">Budha</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
            Golongan Darah
          </label>
          <input
            type="text"
            value={newBloodType}
            onChange={(e) => setNewBloodType(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-gray-700 font-bold mb-2"
          >
            Jenis Kelamin
          </label>
          <select
            id="gender"
            value={newGender}
            onChange={(e) => setNewGender(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="1">Pria</option>
            <option value="2">Wanita</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
            No KTP
          </label>
          <input
            type="text"
            value={newIdentity}
            onChange={(e) => setNewIdentity(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 font-bold mb-2">
            Media Sosial Website
          </label>
          <input
            type="text"
            value={newWebsite}
            onChange={(e) => setNewWebsite(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-sky-600"
        >
          Save
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </Fragment>
  );
};

export default EditAccount;
