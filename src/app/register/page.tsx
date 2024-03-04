"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerPersonal, registerCompany } from "@/lib/auth-register";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { GrOrganization } from "react-icons/gr";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const router = useRouter();
  const [registrationType, setRegistrationType] = useState<string>("");
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    passwd: "",
    full_name: "",
  });
  const [formFilled, setFormFilled] = useState(false);

  const handleRegistrationType = (type: string) => {
    // Menentukan tipe parameter type
    setRegistrationType(type);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Periksa apakah semua input telah diisi
    const allFilled = Object.values(formData).every(val => val.trim() !== '');
    setFormFilled(allFilled);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    // Menentukan tipe parameter e
    e.preventDefault();
    try {
      if (registrationType === "personal") {
        await registerPersonal(formData);
      } else if (registrationType === "company") {
        await registerCompany(formData);
      }
      Swal.fire({
        position: "center",
        icon: "success",
        iconColor: "#75C8FB",
        title: "Register Successfull",
        showConfirmButton: false,
        timer: 2500,
      });
      router.push("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Type of you part</h1>
      <div className="flex flex-row mt-3 gap-x-3">
        <button
          onClick={() => handleRegistrationType("personal")}
          className={`transitions duration-200 ease-in flex flex-col items-center gap-y-3 border rounded-lg py-3 px-2 ${registrationType === 'personal' ? 'bg-sky-600 text-white' : 'border-gray-400 text-gray-400'}`}
        >
          <MdOutlinePersonalInjury /> Register Personal
        </button>
        <button
          onClick={() => handleRegistrationType("company")}
          className={`transitions duration-200 ease-in flex flex-col items-center gap-y-3 border rounded-lg py-3 px-2 ${registrationType === 'company' ? 'bg-sky-600 text-white' : 'border-gray-400 text-gray-400'}`}
        >
          <GrOrganization /> Register Company
        </button>
      </div>

      {registrationType && (
        <form onSubmit={handleSubmit} className="border rounded-xl border-stone 300 shadow-md p-6 mt-8 w-1/3">
          <h3 className="text-2xl font-bold text-center pb-8">Register Now</h3>
          {registrationType === "personal" && (
            <div className="flex flex-col mb-4 gap-y-3">
              <div className="flex flex-col">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="Username"
                  className="h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="passwd"
                  value={formData.passwd}
                  onChange={handleChange}
                  placeholder="Password"
                  className="h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                  title="Password must contain at least one lowercase letter, one uppercase letter, one number, and minimum 8 characters"
                />
              </div>
            </div>
          )}

          {registrationType === "company" && (
            <div className="flex flex-col mb-4 gap-y-3">
              <div className="flex flex-col">
                <label htmlFor="">Username</label>
                <input
                  type="text"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder="Username"
                  className="h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Company Name</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="passwd"
                  value={formData.passwd}
                  onChange={handleChange}
                  placeholder="Password"
                  className="h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                  title="Password must contain at least one lowercase letter, one uppercase letter, one number, and minimum 8 characters"
                />
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className={`h-11 px-4 w-full rounded-xl ${formFilled ? 'bg-sky-600 text-white' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}
            disabled={!formFilled}
          >
            Register
          </button>
          <div className="flex flex-row text-center my-4">
            <p className="text-stone-700 text-base">Do you already have a Human Initiative account?</p>
            <Link href="/login" className="text-sky-500">Login</Link>
          </div>

        </form>
      )}
    </main>
  );
};

export default RegisterPage;
