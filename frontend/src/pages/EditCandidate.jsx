import Background from "../components/background"
import CandidateForm from "../components/CandidateForm"
import { useEditCandidate } from "../hooks/useEditCandidate"

export function EditCandidate() {
    const {
        form,
        setForm,
        errors,
        handleCancel,
        handleSubmit,
    } = useEditCandidate()

    return (
        <Background>
            <h1 className="text-2xl font-bold text-white">
                Editar candidato
            </h1>

            <div className="mt-6">
                <CandidateForm
                    form={form}
                    setForm={setForm}
                    onSubmit={handleSubmit} 
                    onCancel={handleCancel}
                    errors={errors}
                />
            </div>
        </Background>
    )
}