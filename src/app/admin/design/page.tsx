import DesignNav from '@/components/nav/admin-nav/DesignNav'
import React from 'react'

export default function DesignPage() {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="uppercase text-xl tracking-wider pl-5 py-5 border-b">
        design page
      </h1>
      <div className="pl-3 pt-5">
        <DesignNav />
      </div>
    </div>
  )
}
