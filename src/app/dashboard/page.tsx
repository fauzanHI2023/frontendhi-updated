// dashboardpage.tsx
"use client";
import EditAccount from "@/components/account/EditAccount";
import DashboardLayout from "@/components/ui/dashboard/DashboardLayout";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
 
type Props = {};
 
interface Field {
  label: string;
  value: string | number | null | any[];
}
 
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};
 
const Page = (props: Props) => {
  const session: any = useSession();
  const [isEdit, setisEdit] = useState(false);
  const user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    register_date?: string | null | undefined;
    phpDonorData?: any[];
  } = session?.data?.user || {};
 
  const donorData = user.phpDonorData || [];
 
  const objectArray = Object.entries(user);
  const filteredFields = ["user_name", "full_name", "email", "register_date"];
 
  const fields: { [key: string]: string } = {
    user_name: "User Name",
    full_name: "Nama Lengkap",
    email: "Email",
    register_date: "Register Date",
  };
 
  const fieldArray: Field[] = objectArray
    .filter(([key, _]) => filteredFields.includes(key))
    .map(([key, value]) => ({ label: fields[key], value }));
 
  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-16 py-12">
        {isEdit ? (
          <EditAccount
            setisEdit={(e) => {
              setisEdit(e);
            }}
          />
        ) : (
          <Fragment>
            <div className="box mb-4 p-6 flex flex-col gap-y-5 rounded-xl bg-white">
              <div className="flex flex-row justify-between">
                <h5 className="text-xl font-bold">Informasi Dasar</h5>
                <div
                  className="cursor-pointer text-sky-500"
                  onClick={() => {
                    setisEdit(true);
                  }}
                >
                  Edit Account
                </div>
              </div>
              <div className="flex flex-col gap-y-4">
                {fieldArray.map((field, idx) => (
                  <div key={idx} className="flex flex-row">
                    <span className="mr-2 w-40 font-base text-zinc-800">
                      {field.label}
                    </span>
                    {field.label === "Register Date" &&
                    typeof field.value === "string" ? (
                      formatDate(field.value)
                    ) : (
                      <span className="text-zinc-700">{field.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {donorData && (
              <div className="box p-6 flex flex-col gap-y-5 rounded-xl bg-white">
                <h5 className="text-xl font-bold">Data Pribadi</h5>
                <div className="flex flex-col gap-y-4">
                  {donorData.map((data: any, index: number) => (
                    <div key={index} className="flex flex-col gap-y-4">
                      <div className="flex flex-row">
                        <span className="mr-2 w-40 font-base text-zinc-800">
                          Alamat
                        </span>
                        <span>{data?.address}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="mr-2 w-40 font-base text-zinc-800">
                          Tempat Lahir
                        </span>
                        <span>{data?.birth_place}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="mr-2 w-40 font-base text-zinc-800">
                          Tanggal Lahir
                        </span>
                        <span>{data?.birth_date}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="mr-2 w-40 font-base text-zinc-800">
                          Agama
                        </span>
                        <span>{data?.religion}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="mr-2 w-40 font-base text-zinc-800">
                          Kewarganegaraan
                        </span>
                        <span>{data?.country_id === 100 ? "Indonesia" : data?.country_id}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="mr-2 w-40 font-base text-zinc-800">
                          Golongan Darah
                        </span>
                        <span>{data?.blood_type}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="mr-2 w-40 font-base text-zinc-800">
                          Jenis Kelamin
                        </span>
                        <span>{data?.sex === 1 ? "Pria" : "Wanita"}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="mr-2 w-40 font-base text-zinc-800">
                          No. KTP
                        </span>
                        <span>{data?.identity_no}</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="mr-2 w-40 font-base text-zinc-800">
                          Media Sosial
                        </span>
                        <span>{data?.website}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Fragment>
        )}
      </main>
    </DashboardLayout>
  );
};
 
export default Page;