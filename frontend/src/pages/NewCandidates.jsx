import { useState } from "react"
import Background from "../components/background"
import { useNavigate } from "react-router-dom"
function NewCandidate() {

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phone: "",
        desiredPosition: "",
        professionalSummary: ""
    })
    const [messagePdf, setMessagePdf] = useState("")
    const [pdfError, setPdfError] = useState(false)
    const navigate = useNavigate()
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    const [file, setFile] = useState(null)

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

        const responsePdf = await fetch('http://localhost:3000/candidates/parse-pdf', {
            method: "POST",
            body: formData
        })

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
        const response = await fetch('http://localhost:3000/candidates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...form, origin })
        })

        const data = await response.json()

        console.log(data)
        navigate('/candidates')
    }

    return (
        <Background>
            <h1 className="text-2xl font-bold text-white">Novo cadastro</h1>
            <div className="mt-6" />
            <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                <h1 className="text-lg font-semibold text-white">Somente PDF, até 5 MB. Sem arquivo, preencha os campos manualmente.</h1>
                <input
                    onChange={handleFileChange}
                    type="file"
                    accept=".pdf"
                    className="mt-2 p-2 rounded-md bg-gray-900 text-white border border-gray-700"
                />
                {messagePdf && (
                    <p className={`mt-2 text-sm ${pdfError ? "text-red-400" : "text-green-400"}`}>
                        {messagePdf}
                    </p>
                )}
            </div>
            <div className="mt-6" />
            <div>
                <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                    <h1 className="text-2xl font-bold text-white">Dados do candidato</h1>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-white">Nome completo *</label>
                            <input
                                value={form.fullName}
                                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                type="text"
                                className="w-full mt-2 p-2 rounded-md bg-gray-900 text-white border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-white">E-mail *</label>
                            <input
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                type="email"
                                className="w-full mt-2 p-2 rounded-md bg-gray-900 text-white border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-white">Telefone</label>
                            <input
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                type="tel"
                                className="w-full mt-2 p-2 rounded-md bg-gray-900 text-white border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-white">Área ou cargo de interesse</label>
                            <input
                                value={form.desiredPosition}
                                onChange={(e) => setForm({ ...form, desiredPosition: e.target.value })}
                                type="text"
                                className="w-full mt-2 p-2 rounded-md bg-gray-900 text-white border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-white">Resumo profissional</label>
                            <textarea
                                value={form.professionalSummary}
                                onChange={(e) => setForm({ ...form, professionalSummary: e.target.value })}
                                className="w-full mt-2 p-2 rounded-md bg-gray-900 text-white border border-gray-700"
                                rows="4"
                            />
                        </div>
                        <div className="mt-6 flex justify-start">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Salvar
                            </button>
                            <button type="button" onClick={() => navigate('/candidates')} className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Cancelar
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </Background>
    )
}

export default NewCandidate