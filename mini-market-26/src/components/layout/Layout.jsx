import { Outlet } from 'react-router-dom'
import TopBar from '@/components/home/TopBar'
import Header from './Header'
import Footer from './Footer'
import Mascot from '@/components/mascot/Mascot'
import CartDrawer from '@/components/cart/CartDrawer'

export default function Layout() {
  return (
    <div className="shell">
      <TopBar />
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Mascot />
    </div>
  )
}
