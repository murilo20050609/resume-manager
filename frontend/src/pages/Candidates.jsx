import { useNavigate } from "react-router-dom"
import CandidateDetailsModal from "../components/CandidateDetailsModal"
import CandidatesTable from "../components/CandidatesTable"
import CandidatesToolbar from "../components/CandidatesToolbar"
import Pagination from "../components/Pagination"
import { useCandidates } from "../hooks/useCandidates"

function Candidates() {
    const navigate = useNavigate()
    const {
        candidatesOnPage,
        candidateSelected,
        page,
        search,
        totalPages,
        handleDelete,
        selectCandidate,
        setPage,
        setSearch,
        clearSelectedCandidate
    } = useCandidates()

    return (
        <main className="w-full min-h-screen bg-gray-900 flex p-4 flex-col">
            <h1 className="text-2xl font-bold text-white">Candidatos</h1>

            <CandidatesToolbar
                search={search}
                onSearchChange={setSearch}
                onCreateCandidate={() => navigate("/new-candidate")}
            />

            <CandidatesTable
                candidates={candidatesOnPage}
                onSelectCandidate={selectCandidate}
            />

            <Pagination
                page={page}
                totalPage={totalPages}
                onPreviousPage={() => setPage(page - 1)}
                onNextPage={() => setPage(page + 1)}
            />

            {candidateSelected && (
                <CandidateDetailsModal
                    candidate={candidateSelected}
                    onClose={clearSelectedCandidate}
                    onEdit={() => navigate(`/edit-candidate/${candidateSelected.Id}`)}
                    onDelete={() => handleDelete(candidateSelected.Id)}
                />
            )}
        </main>
    )
}

export default Candidates
