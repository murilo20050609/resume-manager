import { useEffect, useState } from "react"
import { deleteCandidate, getCandidates } from "../api/candidates"

const CANDIDATES_PER_PAGE = 10

export function useCandidates() {
    const [candidates, setCandidates] = useState([])
    const [candidateSelected, setCandidateSelected] = useState(null)
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(1)

    useEffect(() => {
        getCandidates()
            .then((response) => response.json())
            .then(setCandidates)
    }, [])

    const searchTerm = search.toLowerCase()
    const filteredCandidates = candidates.filter((candidate) => (
        candidate.FullName.toLowerCase().includes(searchTerm) ||
        candidate.Email.toLowerCase().includes(searchTerm) ||
        (candidate.DesiredPosition || "").toLowerCase().includes(searchTerm)
    ))

    const firstCandidateIndex = (page - 1) * CANDIDATES_PER_PAGE
    const candidatesOnPage = filteredCandidates.slice(
        firstCandidateIndex,
        firstCandidateIndex + CANDIDATES_PER_PAGE
    )
    const totalPages = Math.ceil(filteredCandidates.length / CANDIDATES_PER_PAGE)

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Tem certeza que deseja excluir este candidato?"
        )

        if (!confirmed) {
            return
        }

        const response = await deleteCandidate(id)

        if (!response.ok) {
            alert("Não foi possível excluir o candidato.")
            return
        }

        setCandidates((currentCandidates) =>
            currentCandidates.filter((candidate) => candidate.Id !== id)
        )
        setCandidateSelected(null)
    }

    return {
        candidatesOnPage,
        candidateSelected,
        page,
        search,
        totalPages,
        handleDelete,
        selectCandidate: setCandidateSelected,
        setPage,
        setSearch,
        clearSelectedCandidate: () => setCandidateSelected(null)
    }
}
