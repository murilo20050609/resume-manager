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
        </Background>
    )
}

export default NewCandidate