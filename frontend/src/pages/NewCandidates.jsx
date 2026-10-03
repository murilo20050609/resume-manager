import Background from "../components/background"
import CandidateForm from "../components/CandidateForm"
import CandidatePdfUpload from "../components/CandidatePdfUpload"
import SuccessModal from "../components/SuccessModal"
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
                <SuccessModal
                    title="Cadastro realizado com sucesso"
                    message="O candidato foi salvo e já está disponível na listagem."
                    buttonLabel="Ver candidatos"
                    onConfirm={handleSuccessConfirm}
                />
            )}
        </Background>
    )
}

export default NewCandidate