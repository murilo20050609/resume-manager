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
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)

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

        setFile(selectedFile)

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

    const origin = file ? "PDF" : "Manual"

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.fullName.trim() || !form.email.trim()) {
            alert("Por favor, preencha os campos obrigatórios.")
            return
        }

        if (!validEmail) {
            alert("Por favor, insira um e-mail válido.")
            return
        }

        const response = await createCandidate({ ...form, origin })
        const data = await response.json()

        console.log(data)
        navigate("/candidates")
    }

    const handleCancel = () => navigate("/candidates")

    return {
        form,
        setForm,
        messagePdf,
        pdfError,
        handleFileChange,
        handleSubmit,
        handleCancel
    }
}