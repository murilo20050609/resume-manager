import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Pagination from "../components/Pagination"
function Candidates() {
    const [candidateSelected, setCandidateSelected] = useState(null)
    const navigate = useNavigate()
    const [candidates, setCandidates] = useState([])
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const candidatePage = 10
    useEffect(() => {
        fetch('http://localhost:3000/candidates')
            .then(response => response.json())
            .then(data => {
                setCandidates(data)
            })
    }, [])
    const candidatesFilter = candidates.filter((candidate) => {
        const term = search.toLowerCase()

        return (
            candidate.FullName.toLowerCase().includes(term) ||
            candidate.Email.toLowerCase().includes(term) ||
            (candidate.DesiredPosition || "").toLowerCase().includes(term)
        )
    })
    const initialIndex = (page - 1) * candidatePage
    const finalIndex = initialIndex + candidatePage

    const candidatesOnPage = candidatesFilter.slice(
        initialIndex,
        finalIndex
    )
    const totalPages = Math.ceil(
        candidatesFilter.length / candidatePage
    )
    return (
        <div className="w-full min-h-screen bg-gray-900 flex p-4 flex-col">

            <div className="items-top justify-start">
                <h1 className="text-2xl font-bold text-white">
                    Candidatos
                </h1>
            </div>

            <div className="flex flex-row gap-4 items-center justify-start mt-4">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Busca por nome, email ou área"
                    className="w-full p-2 bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={() => navigate('/new-candidate')}
                    className="w-40 bg-blue-950 p-2.5 rounded-md hover:bg-blue-800 transition-colors"
                >
                    <h1 className="font-bold text-white">
                        Novo cadastro
                    </h1>
                </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-lg border border-gray-700">
                <table className="w-full text-left text-white">

                    <thead className="bg-gray-800">
                        <tr>
                            <th className="p-4">Nome</th>
                            <th className="p-4">E-mail</th>
                            <th className="p-4">Área</th>
                            <th className="p-4">Origem</th>
                            <th className="p-4">Data de Criação</th>
                        </tr>
                    </thead>

                    <tbody>
                        {candidatesOnPage.map((candidate) => {
                            return (
                                <tr
                                    key={candidate.Id}
                                    onClick={() => setCandidateSelected(candidate)}
                                    className="border-t border-gray-700 bg-gray-900 hover:bg-gray-800 cursor-pointer"
                                >
                                    <td className="p-4">{candidate.FullName}</td>
                                    <td className="p-4">{candidate.Email}</td>
                                    <td className="p-4">{candidate.DesiredPosition}</td>
                                    <td className="p-4">{candidate.Origin}</td>
                                    <td className="p-4">{new Date(candidate.CreatedAt).toLocaleDateString()}</td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>

            </div>
            <Pagination
                page={page}
                totalPage={totalPages}
                onPreviousPage={() => setPage(page - 1)}
                onNextPage={() => setPage(page + 1)}
            />

            {candidateSelected && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

                    <div className="bg-gray-800 w-full max-w-lg rounded-lg p-6 text-white">

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">
                                Detalhes do candidato
                            </h2>

                            <button
                                onClick={() => setCandidateSelected(null)}
                                className="text-gray-400 hover:text-white text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">

                            <div>
                                <p className="text-sm text-gray-400">Nome</p>
                                <p className="font-bold">
                                    {candidateSelected.FullName}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">E-mail</p>
                                <p>{candidateSelected.Email}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Telefone</p>
                                <p>{candidateSelected.Phone}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Área desejada</p>
                                <p>{candidateSelected.DesiredPosition}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Origem</p>
                                <p>{candidateSelected.Origin}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Resumo profissional</p>
                                <p>{candidateSelected.ProfessionalSummary}</p>
                            </div>

                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}

export default Candidates