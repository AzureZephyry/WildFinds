import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import ItemDetails from './pages/ItemDetails'
import ReportLost from './pages/ReportLost'
import ReportFound from './pages/ReportFound'
import ClaimItem from './pages/ClaimItem'
import ConfirmMatch from './pages/ConfirmMatch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="item/:id" element={<ItemDetails />} />
        <Route path="report/lost" element={<ReportLost />} />
        <Route path="report/found" element={<ReportFound />} />
        <Route path="claim/:id" element={<ClaimItem />} />
        <Route path="match/:id" element={<ConfirmMatch />} />
      </Route>
    </Routes>
  )
}

export default App
