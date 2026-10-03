function CandidatesTable({ candidates, onSelectCandidate }) {
    return (
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
                    {candidates.map((candidate) => (
                        <tr
                            key={candidate.Id}
                            onClick={() => onSelectCandidate(candidate)}
                            className="cursor-pointer border-t border-gray-700 bg-gray-900 hover:bg-gray-800"
                        >
                            <td className="p-4">{candidate.FullName}</td>
                            <td className="p-4">{candidate.Email}</td>
                            <td className="p-4">{candidate.DesiredPosition}</td>
                            <td className="p-4">{candidate.Origin}</td>
                            <td className="p-4">
                                {new Date(candidate.CreatedAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CandidatesTable
