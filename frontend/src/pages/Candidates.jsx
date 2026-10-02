import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Candidates() {
    const [candidatoSelecionado, setCandidatoSelecionado] = useState(null)
    const navigate = useNavigate()
    const [candidatos, setCandidatos] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/candidates')
            .then(response => response.json())
            .then(data => {
                setCandidatos(data)
            })
    }, [])
    return (
        <div className="w-full min-h-screen bg-gray-900 flex p-4 flex-col">

            <div className="items-top justify-start">
                <h1 className="text-2xl font-bold text-white">
                    Candidatos
                </h1>
            </div>

            <div className="flex flex-row gap-4 items-center justify-start mt-4">
                <input
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
                        </tr>
                    </thead>

                    <tbody>
                        {candidatos.map((candidato) => {
                            return (
                                <tr
                                    key={candidato.Id}
                                    onClick={() => setCandidatoSelecionado(candidato)}
                                    className="border-t border-gray-700 bg-gray-900 hover:bg-gray-800 cursor-pointer"
                                >
                                    <td className="p-4">{candidato.FullName}</td>
                                    <td className="p-4">{candidato.Email}</td>
                                    <td className="p-4">{candidato.DesiredPosition}</td>
                                    <td className="p-4">{candidato.Origem}</td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>

            {candidatoSelecionado && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

                    <div className="bg-gray-800 w-full max-w-lg rounded-lg p-6 text-white">

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">
                                Detalhes do candidato
                            </h2>

                            <button
                                onClick={() => setCandidatoSelecionado(null)}
                                className="text-gray-400 hover:text-white text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-4">

                            <div>
                                <p className="text-sm text-gray-400">Nome</p>
                                <p className="font-bold">
                                    {candidatoSelecionado.FullName}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">E-mail</p>
                                <p>{candidatoSelecionado.Email}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Telefone</p>
                                <p>{candidatoSelecionado.Phone}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Área desejada</p>
                                <p>{candidatoSelecionado.DesiredPosition}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Origem</p>
                                <p>{candidatoSelecionado.Origem}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-400">Resumo profissional</p>
                                <p>{candidatoSelecionado.ProfessionalSummary}</p>
                            </div>

                        </div>

                    </div>

                </div>
            )}

        </div>
    )
}

export default Candidates