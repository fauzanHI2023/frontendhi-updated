"use client";
import ButtonLogout from "@/components/ButtonLogout";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React, { Fragment, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { menuItems } from "@/data/data";
import SubMenu from "@/components/SubMenu";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { MdKeyboardArrowDown, MdMenu, MdClose } from "react-icons/md";
import { PiEye, PiEyeClosed } from "react-icons/pi";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();
  const callbackUrl = "/dashboard";
  const { data: session } = useSession();
  const user: any = session?.user;
  const pathname = usePathname();
  const [ showPwlogin, setShowPwLogin ] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [formFilled, setFormFilled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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
        setShowModal(false);
        Swal.fire({
          position: "center",
          icon: "success",
          iconColor: "#75C8FB",
          title: "Successfull Login",
          showConfirmButton: false,
          timer: 2500,
        });
        router.push(callbackUrl);
        close
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

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const togglePasswordVisibility = () => {
    setShowPwLogin(!showPwlogin);
  };

  const isHome = pathname === "/";

  const isPageLogin = pathname === "/login";

  const isPageRegister = pathname === "/register";

  return (
    <>
      {" "}
      <header
        className={`${isHome ? "sm:bg-transparent bg-slate-900" : "border-b border-zinc-300 bg-white"} ${
          isPageLogin ? "hidden" : "flex"
        } ${
          isPageRegister ? "hidden" : "flex"
        } absolute flex-center top-0 z-30 py-1 w-full body-font`}
      >
        <nav className="container w-full justify-between mx-auto flex flex-wrap py-4 px-4 sm:py-4 sm:px-5 sm:flex-row flex-row items-center">
          <Link
            href="/"
            className={`${
              isHome ? "bg-logo-white" : "bg-logo-blue"
            } w-32 h-12 bg-no-repeat bg-contain flex title-font font-medium items-center text-gray-900 mb-0`}
          ></Link>
          <button
              className="text-xl text-white focus:outline-none md:hidden"
              onClick={() => setShowMenu(!showMenu)}
            >
              {showMenu ? <MdClose /> : <MdMenu />}
            </button>
            <ul
              className={`sm:flex hidden flex-col sm:flex-row sm:space-x-6 mt-4 md:mt-0 sm:relative fixed sm:top-0 top-16 right-0 sm:w-auto w-full`}
            >
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className="relative group text-base font-normal"
                >
                  <Link
                    href={item.url}
                    className={`flex flex-row items-center ${
                      isHome ? "text-white" : ""
                    }`}
                  >
                    {item.label} <MdKeyboardArrowDown className="ml-1" />
                  </Link>
                  {item.subMenu && <SubMenu items={item.subMenu} />}
                </li>
              ))}
            </ul>
            <ul
              className={`${
                showMenu ? "md:flex" : "hidden"
              } flex-col mt-4 fixed top-16 right-0 w-full bg-slate-900 py-5 px-4`}
            >
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className="relative group text-white text-base font-normal pb-2"
                >
                  <Link href={item.url}>
                    {item.label}
                  </Link>
                  {item.subMenu && <SubMenu items={item.subMenu} />}
                </li>
              ))}
            </ul>
          <Suspense fallback="loading">
            <div className="flex flex-wrap items-center text-base justify-center gap-6">
              {session ? (
                <Fragment>
                  <Link
                    href="/dashboard"
                    className={`${isHome ? "text-white" : ""} flex`}
                  >
                    Hi, {user?.full_name}
                  </Link>
                  <ButtonLogout />
                </Fragment>
              ) : (
                <div className="flex flex-row">
                  <button
                    onClick={() => setShowModal(true)}
                    className="h-full inline-flex items-center bg-white border-0 py-2 px-4 focus:outline-none rounded text-base text-stone-700 mt-0 sm:mt-0 mr-2"
                  >
                    Login
                  </button>
                  <Link
                    href="/register"
                    className="h-full inline-flex items-center bg-sky-600 border-0 py-2 px-4 focus:outline-none rounded text-base text-white mt-0 sm:mt-0"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </Suspense>
        </nav>
      </header>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-96">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex flex-col items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                  <h3 className="w-full text-center text-3xl font-semibold">
                    Login
                  </h3>
                </div>
                <div className="relative p-6 flex-auto">
                  <form
                    id="login-form"
                    className="space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
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
                      <p className="text-stone-400 text-base">
                        Don&apos;t have an account yet?
                      </p>
                      <Link
                        href="/register"
                        className="text-sky-500"
                        onClick={() => setShowModal(false)}
                      >
                        Register
                      </Link>
                    </div>
                    <button
                      className="w-full border border-black px-4 py-3 flex flex-row items-center justify-center"
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
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Navbar;
