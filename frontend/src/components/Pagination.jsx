function Pagination({ page, totalPage, onPreviousPage, onNextPage }) {
    return (
        <div className="flex items-center justify-center gap-4 mt-4">
            <button
                onClick={onPreviousPage}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
            >
                Anterior
            </button>

            <span className="text-white">
                Página {page} de {totalPage}
            </span>

            <button
                onClick={onNextPage}
                disabled={page === totalPage}
                className="px-4 py-2 bg-gray-800 text-white rounded-md disabled:opacity-50"
            >
                Próxima
            </button>
        </div>
    )
}

export default Pagination