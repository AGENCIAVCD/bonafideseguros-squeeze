import { LazyMotion, domAnimation } from 'framer-motion'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SuccessPage } from './pages/SuccessPage'

function App() {
  return (
    <LazyMotion features={domAnimation}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sucesso" element={<SuccessPage />} />
      </Routes>
    </LazyMotion>
  )
}

export default App
