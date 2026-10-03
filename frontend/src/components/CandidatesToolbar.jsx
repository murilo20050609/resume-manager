function CandidatesToolbar({ search, onSearchChange, onCreateCandidate }) {
    return (
        <div className="mt-4 flex flex-row items-center justify-start gap-4">
            <input
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Busca por nome, email ou área"
                aria-label="Buscar candidatos por nome, email ou área"
                className="w-full border border-gray-600 bg-gray-800 p-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
                type="button"
                onClick={onCreateCandidate}
                className="w-40 rounded-md bg-blue-950 p-2.5 transition-colors hover:bg-blue-800"
            >
                <span className="font-bold text-white">Novo cadastro</span>
            </button>
        </div>
    )
}

export default CandidatesToolbar
