function CandidatePdfUpload({ onFileChange, message, hasError }) {
    return (
        <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
            <h1 className="text-lg font-semibold text-white">Somente PDF, até 5 MB. Sem arquivo, preencha os campos manualmente.</h1>
            <input
                onChange={onFileChange}
                type="file"
                accept=".pdf"
                className="mt-2 p-2 rounded-md bg-gray-900 text-white border border-gray-700"
            />
            {message && (
                <p className={`mt-2 text-sm ${hasError ? "text-red-400" : "text-green-400"}`}>
                    {message}
                </p>
            )}
        </div>
    )
}

export default CandidatePdfUpload