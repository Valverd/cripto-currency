import Layout from "./components/layout"
import Detail from "./pages/detail"
import Home from "./pages/home"
import NotFound from "./pages/notFound"
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route path="/detail/" element={<Detail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App