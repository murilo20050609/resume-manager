import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createCandidate, parseCandidatePdf } from "../api/candidates"

export function useNewCandidate() {
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        desiredPosition: "",
        professionalSummary: ""
    })
    const [messagePdf, setMessagePdf] = useState("")
    const [pdfError, setPdfError] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    const [pdfPath, setPdfPath] = useState("")
    const navigate = useNavigate()
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    const [errors, setErrors] = useState({})

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0]

        if (!selectedFile) {
            return
        }

        if (selectedFile.size > 5 * 1024 * 1024) {
            setPdfError(true)
            setMessagePdf("O arquivo PDF deve ter no máximo 5 MB.")
            return
        }

        try {
            const formData = new FormData()
            formData.append("pdf", selectedFile)

            const responsePdf = await parseCandidatePdf(formData)
            const dataPdf = await responsePdf.json()

            console.log(dataPdf)

            if (!responsePdf.ok) {
                setPdfError(true)
                setMessagePdf(dataPdf.error)
                return
            }

            setPdfPath(dataPdf.pdfPath)
            if (dataPdf.candidate) {
                setPdfError(false)
                setMessagePdf("PDF lido com sucesso.")

                setForm({
                    ...form,
                    fullName: dataPdf.candidate.fullName,
                    email: dataPdf.candidate.email,
                    phone: dataPdf.candidate.phone,
                    desiredPosition: dataPdf.candidate.desiredPosition,
                    professionalSummary: dataPdf.candidate.professionalSummary
                })
            }
        } catch (error) {
            console.error(error)
            setPdfError(true)
            setMessagePdf("Não foi possível ler o PDF. Tente novamente.")
        }
    }

    const origin = pdfPath ? "PDF" : "Manual"

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newErrors = {}

        if (!form.fullName.trim()) {
            newErrors.fullName = "Informe o nome completo."
        }

        if (!form.email.trim()) {
            newErrors.email = "Informe o e-mail."
        } else if (!validEmail) {
            newErrors.email = "Informe um e-mail válido."
        }


        setErrors(newErrors)

        if (Object.keys(newErrors).length > 0) {
            return
        }

        try {
            const response = await createCandidate({ ...form, origin, pdfPath })
            const data = await response.json()

            if (!response.ok) {
                alert(data.error || "Não foi possível cadastrar o candidato.")
                return
            }

            setIsSuccessModalOpen(true)
        } catch (error) {
            console.error(error)
            alert("Não foi possível conectar ao servidor.")
        }
    }

    const handleCancel = () => navigate("/candidates")
    const handleSuccessConfirm = () => navigate("/candidates")

    return {
        form,
        setForm,
        messagePdf,
        pdfError,
        handleFileChange,
        handleSubmit,
        handleCancel,
        handleSuccessConfirm,
        isSuccessModalOpen,
        pdfPath,
        errors
    }
}