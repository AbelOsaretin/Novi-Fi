import React, {  } from 'react'

const MainLayout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <main className="min-h-screen bg-white bg-[url('/assets/app-background.png')] bg-cover bg-center bg-no-repeat flex flex-col justify-between items-center p-6 font-(family-name:--font-ibm-plex)">
        {children}
    </main>
  )
}

export default MainLayout