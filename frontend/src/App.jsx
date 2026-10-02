import { Route, Routes } from "react-router-dom"
import { Header } from "./components/header"
import Candidates from "./pages/Candidates"
import NewCandidate from "./pages/NewCandidates"
function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/new-candidate" element={<NewCandidate />} />
        </Routes>
    </>
  )
}

export default App