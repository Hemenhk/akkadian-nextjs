
import AdminNav from "@/components/nav/admin-nav/AdminNav";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {

  const session = await getServerSession()

  if(!session){
    redirect("/")
  }
  return (
    <div className="flex flex-col justify-center">
      <h1 className="uppercase text-xl tracking-wider pl-5 py-5 border-b">
        admin page
      </h1>
      <div className="pl-3 pt-5">
        <AdminNav />
      </div>
    </div>
  );
}
