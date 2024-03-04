"use client"
import React, { useState, useEffect } from "react";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Update import
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const LoginPage = () => {
  const router = useRouter();
  const callbackUrl = "/dashboard";
  const { data: session } = useSession();
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

  return (
    <main>
      <div className="border rounded-xl border-stone 300 shadow-md justify-center items-center flex min-h-screen flex-col items-center">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="w-full text-center text-3xl font-semibold">
                Login
              </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
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
                <input
                  id="password"
                  className="w-full border border-solid border-[#919EAB52] px-2 pb-2 pt-4 rounded-lg  placeholder:text-[#919EAB] focus:border-sky-600 focus:outline-none transition duration-300 ease-in-out"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </form>
              <div className="flex-col items-center justify-center space-y-4 mt-6">
                <a href="#" className="w-full text-hi-dark text-sm mb-2">
                  Forgot Password?
                </a>
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
