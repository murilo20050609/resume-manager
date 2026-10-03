function SuccessModal({ title, message, buttonLabel, onConfirm }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="success-modal-title"
                className="w-full max-w-md rounded-md border border-gray-700 bg-gray-800 p-6 text-white shadow-xl"
            >
                <h2 id="success-modal-title" className="text-xl font-bold">
                    {title}
                </h2>
                <p className="mt-3 text-gray-300">{message}</p>
                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                    >
                        {buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SuccessModal
