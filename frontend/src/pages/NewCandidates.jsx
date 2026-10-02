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
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:3000/candidates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
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
                    type="file"
                    accept=".pdf"
                    className="mt-2 p-2 rounded-md bg-gray-900 text-white border border-gray-700"
                />
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
                                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-white">E-mail *</label>
                            <input
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                type="email"
                                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-white">Telefone</label>
                            <input
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                type="tel"
                                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-white">Área ou cargo de interesse</label>
                            <input
                                value={form.desiredPosition}
                                onChange={(e) => setForm({ ...form, desiredPosition: e.target.value })}
                                type="text"
                                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                            />
                        </div>
                        <div>
                            <label className="block text-white">Resumo profissional</label>
                            <textarea
                                value={form.professionalSummary}
                                onChange={(e) => setForm({ ...form, professionalSummary: e.target.value })}
                                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700"
                                rows="4"
                            />
                        </div>
                        <div className="mt-6 flex justify-start">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Salvar
                            </button>
                            <button className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
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