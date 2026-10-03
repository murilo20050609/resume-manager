import Background from "../components/background"
import CandidateForm from "../components/CandidateForm"
import SuccessModal from "../components/SuccessModal"
import { useEditCandidate } from "../hooks/useEditCandidate"

export function EditCandidate() {
    const {
        form,
        setForm,
        errors,
        handleCancel,
        handleSubmit,
        handleSuccessConfirm,
        isSuccessModalOpen
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
            {isSuccessModalOpen && (
                <SuccessModal
                    title="Alterações salvas com sucesso"
                    message="Os dados do candidato foram atualizados."
                    buttonLabel="Ver candidatos"
                    onConfirm={handleSuccessConfirm}
                />
            )}
        </Background>
    )
}