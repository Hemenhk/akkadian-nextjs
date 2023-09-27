import { Metadata } from 'next';
import React from 'react'

type AdminProps = {
    children: React.ReactNode
}

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "The dashboard for the store admin",
  };

export default function AdminDashboardLayout({children}: AdminProps ) {
  return (
    <section>
        {children}
    </section>
  )
}
