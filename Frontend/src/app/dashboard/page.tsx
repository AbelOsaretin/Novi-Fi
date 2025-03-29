'use client';
import Dashboard from '@/components/dashboard/Dashboard';
import React from 'react'

function page() {

  return (
    <div className="flex flex-col min-h-screen bg-[url('/assets/app-background.png')] bg-cover bg-center bg-no-repeat font-(family-name:--font-ibm-plex)">
        <Dashboard />
    </div>
    
  )
}

export default page