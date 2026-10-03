import Background from "../components/background"
import CandidateForm from "../components/CandidateForm"
import CandidatePdfUpload from "../components/CandidatePdfUpload"
import { useNewCandidate } from "../hooks/useNewCandidate"

function NewCandidate() {
    const {
        form,
        setForm,
        messagePdf,
        pdfError,
        handleFileChange,
        handleSubmit,
        handleCancel,
        handleSuccessConfirm,
        isSuccessModalOpen,
        errors
    } = useNewCandidate()

    return (
        <Background>
            <h1 className="text-2xl font-bold text-white">Novo cadastro</h1>
            <div className="mt-6" />
            <CandidatePdfUpload
                onFileChange={handleFileChange}
                message={messagePdf}
                hasError={pdfError}
            />
            <div className="mt-6" />
            <CandidateForm
                form={form}
                setForm={setForm}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                errors={errors}
            />
            {isSuccessModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="candidate-success-title"
                        className="w-full max-w-md rounded-md border border-gray-700 bg-gray-800 p-6 text-white shadow-xl"
                    >
                        <h2 id="candidate-success-title" className="text-xl font-bold">
                            Cadastro realizado com sucesso
                        </h2>
                        <p className="mt-3 text-gray-300">
                            O candidato foi salvo e já está disponível na listagem.
                        </p>
                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={handleSuccessConfirm}
                                className="rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                            >
                                Ver candidatos
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Background>
    )
}

export default NewCandidate