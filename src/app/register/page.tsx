"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerPersonal, registerCompany, checkUsernameEmail } from "@/lib/auth-register";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { GrOrganization } from "react-icons/gr";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { IoArrowBack } from "react-icons/io5";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const router = useRouter();
  const [registrationType, setRegistrationType] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    passwd: "",
    full_name: "",
  });
  const [formFilled, setFormFilled] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const handleRegistrationType = (type: string) => {
    setRegistrationType(type);
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const allFilled = Object.values(formData).every((val) => val.trim() !== "");
    setFormFilled(allFilled);

    if (name === "user_name" || name === "email") {
      try {
        const { usernameExists, emailExists } = await checkUsernameEmail(
          name === "user_name" ? value : formData.user_name,
          name === "email" ? value : formData.email
        );
        setUsernameExists(usernameExists);
        setEmailExists(emailExists);
      } catch (error) {
        console.error("Failed to check username and email", error);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
        title: "Register Successful",
        showConfirmButton: false,
        timer: 2500,
      });
      // Store email in localStorage
      localStorage.setItem("email", formData.email);
      localStorage.setItem("registrationData", JSON.stringify(formData));
      localStorage.setItem("registrationType", registrationType);
      router.push("/register/verifycode");
    } catch (error: any) {
      console.error("Registration failed", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Registration Unsuccessful",
        text: error.message || "Registration failed due to a server error.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBackClick = () => {
    setRegistrationType("");
  };

  return (
    <main className="flex lg:min-h-[840px] min-h-[640px] flex-col bg-register justify-center items-center">
      <div className="sm:w-[400px] md:w-2/5 flex flex-row dark:bg-slate-900 dark:bg-slate-900 bg-white border-0 rounded-lg shadow-lg sm:p-20 md:p-10 h-auto my-auto">
        {!registrationType && (
          <div className="w-full flex flex-col mt-3 gap-y-3 justify-around items-center md:my-16 sm:my-8 p-4">
            <Link
              href="/"
              className="bg-logo-blue w-32 h-12 bg-no-repeat bg-contain flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            ></Link>
            <div className="flex flex-col justify-center gap-y-3 items-center w-full">
              <h5 className="font-poppins">Silahkan Pilih Jenis Donor Terlebih Dahulu</h5>
              <button
                onClick={() => handleRegistrationType("personal")}
                className={`w-1/2 mb-5 transitions duration-200 ease-in flex flex-col items-center gap-y-3 border rounded-lg py-3 px-2 ${
                  registrationType === "personal"
                    ? "border-blue-700 text-blue-700"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                <MdOutlinePersonalInjury /> Register Personal
              </button>
              <button
                onClick={() => handleRegistrationType("company")}
                className={`w-1/2 transitions duration-200 ease-in flex flex-col items-center gap-y-3 border rounded-lg py-3 px-2 ${
                  registrationType === "company"
                    ? "border-blue-700 text-blue-700"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                <GrOrganization /> Register Company or Community
              </button>
            </div>
          </div>
        )}

        {registrationType && (
          <div className="w-full">
            <button onClick={handleBackClick} className="flex flex-row items-center mb-4 text-blue-500">
              <IoArrowBack /> Back
            </button>
            <form onSubmit={handleSubmit}>
              {registrationType === "personal" && (
                <div className="form-animate flex flex-col mb-4 gap-y-8 rounded-xl shadow-md p-6 mt-8 w-full bg-background">
                  <h3 className="text-2xl dark:text-white text-slate-700 font-semibold text-center pb-8">
                    Daftar Donatur Personal
                  </h3>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      placeholder="Nama Pengguna"
                      className={`h-11 px-4 rounded-lg border ${
                        usernameExists
                          ? "border-red-500"
                          : "border-zinc-200"
                      } focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out`}
                    />
                    {usernameExists && (
                      <p className="text-red-500">Username already exists</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Nama Lengkap"
                      className="h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                    />
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={`h-11 px-4 rounded-lg border ${
                        emailExists ? "border-red-500" : "border-zinc-200"
                      } focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out`}
                    />
                    {emailExists && (
                      <p className="text-red-500">Email already exists</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="passwd"
                        value={formData.passwd}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        title="Password must contain at least one lowercase letter, one uppercase letter, one number, and minimum 8 characters"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <PiEye /> : <PiEyeClosed />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {registrationType === "company" && (
                <div className="form-animate flex flex-col mb-4 gap-y-8 rounded-xl shadow-md p-6 mt-8 w-full bg-background">
                  <h3 className="text-2xl dark:text-white text-slate-700 font-semibold text-center pb-8">
                    Daftar Donatur Organisasi/Perusahaan
                  </h3>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      placeholder="Nama Pengguna"
                      className={`h-11 px-4 rounded-lg border ${
                        usernameExists
                          ? "border-red-500"
                          : "border-zinc-200"
                      } focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out`}
                    />
                    {usernameExists && (
                      <p className="text-red-500">Username already exists</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Nama Organisasi/Perusahaan"
                      className="h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                    />
                  </div>
                  <div className="flex flex-col">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={`h-11 px-4 rounded-lg border ${
                        emailExists ? "border-red-500" : "border-zinc-200"
                      } focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out`}
                    />
                    {emailExists && (
                      <p className="text-red-500">Email already exists</p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="passwd"
                        value={formData.passwd}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full h-11 px-4 rounded-lg border border-zinc-200 focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                        title="Password must contain at least one lowercase letter, one uppercase letter, one number, and minimum 8 characters"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <PiEye /> : <PiEyeClosed />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`h-11 px-4 w-full rounded-xl ${
                  formFilled
                    ? "bg-sky-600 text-white"
                    : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                }`}
                disabled={!formFilled}
              >
                Register
              </button>
              <div className="flex flex-row text-center my-4">
                <p className="text-stone-700 text-base">
                  Do you already have a Human Initiative account?
                </p>
                <Link href="/login" className="text-sky-500">
                  Login
                </Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
};

export default RegisterPage;
