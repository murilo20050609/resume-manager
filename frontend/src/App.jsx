import { Navigate, Route, Routes } from "react-router-dom"
import { Header } from "./components/header"
import Candidates from "./pages/Candidates"
import NewCandidate from "./pages/NewCandidates"
import { EditCandidate } from "./pages/EditCandidate"
function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/candidates" replace />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/new-candidate" element={<NewCandidate />} />
          <Route path="/edit-candidate/:id" element={<EditCandidate />} />
        </Routes>   
    </>
  )
}

export default App