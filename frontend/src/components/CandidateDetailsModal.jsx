function CandidateDetailsModal({ candidate, onClose, onEdit, onDelete }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="candidate-details-title"
                className="w-full max-w-lg rounded-lg bg-gray-800 p-6 text-white"
            >
                <div className="mb-6 flex items-center justify-between">
                    <h2 id="candidate-details-title" className="text-2xl font-bold">
                        Detalhes do candidato
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fechar detalhes do candidato"
                        className="text-xl text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    <CandidateDetail label="Nome" value={candidate.FullName} bold />
                    <CandidateDetail label="E-mail" value={candidate.Email} />
                    <CandidateDetail label="Telefone" value={candidate.Phone} />
                    <CandidateDetail label="Área desejada" value={candidate.DesiredPosition} />
                    <CandidateDetail label="Origem" value={candidate.Origin} />
                    <CandidateDetail
                        label="Resumo profissional"
                        value={candidate.ProfessionalSummary}
                    />

                    <div className="flex flex-wrap gap-2 pt-2">
                        {candidate.PdfPath && (
                            <button
                                type="button"
                                onClick={() =>
                                    window.open(
                                        `http://localhost:3000${candidate.PdfPath}`,
                                        "_blank"
                                    )
                                }
                                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                Visualizar PDF
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={onEdit}
                            className="rounded-md bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
                        >
                            Editar
                        </button>
                        <button
                            type="button"
                            onClick={onDelete}
                            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

function CandidateDetail({ label, value, bold = false }) {
    return (
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className={bold ? "font-bold" : ""}>{value}</p>
        </div>
    )
}

export default CandidateDetailsModal
