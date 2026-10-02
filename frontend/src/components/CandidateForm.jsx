function CandidateForm({ form, setForm, onSubmit, onCancel, errors }) {
    return (
        <div>
            <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
                <h1 className="text-2xl font-bold text-white">Dados do candidato</h1>
                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-white">Nome completo *</label>
                        <input
                            value={form.fullName}
                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                            type="text"
                            className="w-full mt-2 p-2 rounded-md bg-gray-900 text-white border border-gray-700"
                        />
                        {errors.fullName && (
                            <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-white">E-mail *</label>
                        <input
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            type="email"
                            className="w-full mt-2 p-2 rounded-md bg-gray-900 text-white border border-gray-700"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-white">Telefone</label>
                        <input
                            value={form.phone}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    phone: e.target.value.replace(/\D/g, "")
                                })
                            }
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
                        {errors.desiredPosition && (
                            <p className="mt-1 text-sm text-red-400">{errors.desiredPosition}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-white">Resumo profissional</label>
                        <textarea
                            value={form.professionalSummary}
                            onChange={(e) => setForm({ ...form, professionalSummary: e.target.value })}
                            className="w-full mt-2 p-2 rounded-md bg-gray-900 text-white border border-gray-700"
                            rows="4"
                        />
                        {errors.professionalSummary && (
                            <p className="mt-1 text-sm text-red-400">{errors.professionalSummary}</p>
                        )}
                    </div>
                    <div className="mt-6 flex justify-start">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Salvar
                        </button>
                        <button type="button" onClick={onCancel} className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CandidateForm