import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './Header'
import Drawer from './Drawer'

function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setIsDrawerOpen(prev => !prev)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <div>
      <Header onMenuToggle={toggleDrawer} isDrawerOpen={isDrawerOpen} />
      <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} />
      <main className="page-layout">
        <Outlet />
      </main>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </div>
  )
}

export default Layout
