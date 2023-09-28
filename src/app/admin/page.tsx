import AdminNav from '@/components/nav/admin-nav/AdminNav'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
    const session = await getServerSession()

    if(!session){
        redirect("/")
    }

  return (
    <div className='flex justify-center'>
      <AdminNav />
    </div>
  )
}
