"use client";
import React, { useState, useEffect } from "react";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Update import
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import Swal from "sweetalert2";

const LoginPage = () => {
  const router = useRouter();
  const callbackUrl = "/dashboard";
  const { data: session } = useSession();
  const [ showPwlogin, setShowPwLogin ] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formFilled, setFormFilled] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const { username, password } = formData;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        usernameOrEmail: username,
        password: password,
        callbackUrl,
      });
      if (!res?.error) {
        Swal.fire({
          position: "center",
          icon: "success",
          iconColor: "#75C8FB",
          title: "Successfull Login",
          showConfirmButton: false,
          timer: 2500,
        });
        router.push(callbackUrl);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Invalid Login",
          text: "Check Username/Email or Password",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Jika sudah login, redirect ke dashboard
    if (session) {
      router.push(callbackUrl);
    }
  }, [session, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  useEffect(() => {
    // Cek apakah form telah diisi
    if (formData.username.trim() && formData.password.trim()) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
  }, [formData]);

  const togglePasswordVisibility = () => {
    setShowPwLogin(!showPwlogin);
  };

  return (
    <main>
      <div className="border rounded-xl border-stone 300 shadow-md justify-center items-center flex min-h-screen flex-col items-center">
        <Link
          href="/"
          className="bg-logo-blue w-32 h-12 bg-no-repeat bg-contain flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        ></Link>
        <div className="relative my-6 mx-auto w-1/3">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex flex-col items-start justify-between p-5">
              <h3 className="w-full text-center text-3xl font-semibold">
                Login
              </h3>
            </div>
            <div className="p-6 flex-auto">
              <form
                id="login-form"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <input
                  id="username"
                  className="w-full border border-solid border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg  placeholder:text-[#919EAB] focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
                <div className="relative">
                  <input
                    id="password"
                    className="w-full border border-solid border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg  placeholder:text-[#919EAB] focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                    placeholder="Password"
                    type={showPwlogin ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={togglePasswordVisibility}
                  >
                    {showPwlogin ? <PiEye /> : <PiEyeClosed />}
                  </button>
                </div>
              </form>
              <div className="flex-col items-center justify-center space-y-4 mt-6">
                <Link href="/forgotpassword/sendemail" className="w-full text-hi-dark text-sm mb-2">
                  Forgot Password?
                </Link>
                <button
                  form="login-form"
                  className={`text-center w-full ${
                    formFilled
                      ? "bg-sky-600 text-white"
                      : "bg-zinc-200 text-zinc-500 cursor-not-allowed"
                  } border-0 py-3 px-4 focus:outline-none rounded text-base ${
                    formFilled ? "" : "pointer-events-none"
                  }`}
                  type="submit"
                  disabled={!formFilled}
                >
                  Login
                </button>
                <div className="flex flex-row text-center my-4">
                  <p className="text-stone-700 text-base">
                    Don&apos;t have an account yet?
                  </p>
                  <Link href="/register" className="text-sky-500">
                    Register
                  </Link>
                </div>
                <button
                  className="w-full border border-zinc-600 rounded px-4 py-3 flex flex-row items-center justify-center"
                  onClick={handleLoginGoogle}
                >
                  <span className="pr-2 text-xl">
                    <FcGoogle />
                  </span>
                  Sign in with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
