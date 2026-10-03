import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCandidate, updateCandidate } from "../api/candidates"

export function useEditCandidate() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        desiredPosition: "",
        professionalSummary: ""
    })

    const [errors, setErrors] = useState({})
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

    useEffect(() => {
        async function loadCandidate() {
            const response = await getCandidate(id)
            const data = await response.json()

            setForm({
                fullName: data.FullName,
                email: data.Email,
                phone: data.Phone || "",
                desiredPosition: data.DesiredPosition || "",
                professionalSummary: data.ProfessionalSummary || ""
            })
        }

        loadCandidate()
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = {}

        if (!form.fullName.trim()) {
            newErrors.fullName = "Informe o nome completo."
        }

        if (!form.email.trim()) {
            newErrors.email = "Informe o e-mail."
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Informe um e-mail válido."
        }

        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            return
        }

        const response = await updateCandidate(id, form)

        if (!response.ok) {
            const data = await response.json()
            console.error(data)
            return
        }

        setIsSuccessModalOpen(true)
    }

    const handleCancel = () => {
        navigate("/candidates")
    }

    const handleSuccessConfirm = () => {
        navigate("/candidates")
    }

    return {
        form,
        setForm,
        errors,
        handleSubmit,
        handleCancel,
        handleSuccessConfirm,
        isSuccessModalOpen
    }
}