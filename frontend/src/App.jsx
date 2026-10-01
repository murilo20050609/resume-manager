import { useState } from "react"
function App() {

  const [candidatoSelecionado, setCandidatoSelecionado] = useState(null)
  const candidatos = [
    {
      id: 1,
      nome: 'Murilo Henrique',
      email: 'murilo@email.com',
      area: 'Desenvolvedor',
      origem: 'PDF',
      telefone: '(41) 99999-9999',
      resumo: 'Desenvolvedor com experiência em desenvolvimento web.'
    },
    {
      id: 2,
      nome: 'João Silva',
      email: 'joao@email.com',
      area: 'Full Stack',
      origem: 'Manual',
      telefone: '(41) 98888-8888',
      resumo: 'Profissional com experiência em desenvolvimento Full Stack.'
    }
  ]
  return (
    <>
      {/* header */}
      <div className="w-full  bg-blue-950 flex p-4 flex-row items-center gap-5  ">
        <h1 className="text-2xl font-bold text-white">
          Recrutamento
        </h1>
        <div className="gap-4 flex  ">
          <button>
            <h1 className="font-bold text-white">Candidatos</h1>
          </button>

          <button>
            <h1 className="font-bold text-white">Novo cadastro</h1>
          </button>
        </div>
      </div>
      {/* fim do header - futuramente vou componetizar o header e o footer para ficar mais organizado */}
      {/* header, input e botão de novo cadastro */}
      <div className=" w-full min-h-screen bg-gray-900 flex p-4 flex-col">
        <div className="items-top justify-start">
          <h1 className="text-2xl font-bold text-white">Candidatos</h1>
        </div>
        <div className="flex flex-row gap-4 items-center justify-start mt-4 ">
          <input placeholder="Busca por nome, email ou área"
            className="w-full p-2 bg-gray-800 text-white placeholder:text-gray-500 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
          <button className="w-40 bg-blue-950 p-2.5 rounded-md hover:bg-blue-800 transition-colors">
            <h1 className="font-bold text-white">Novo cadastro</h1>
          </button>
        </div>
        {/* Tabela de candidatos */}
        <div className="mt-6 overflow-hidden rounded-lg border border-gray-700">
          <table className="w-full text-left text-white">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4">Nome</th>
                <th className="p-4">E-mail</th>
                <th className="p-4">Área</th>
                <th className="p-4">Origem</th>
              </tr>
            </thead>

            <tbody>
              {candidatos.map((candidato) => {
                return (
                  <tr key={candidato.id} onClick={() => setCandidatoSelecionado(candidato)} className="border-t border-gray-700 bg-gray-900 hover:bg-gray-800 cursor-pointer">
                    <td className="p-4">{candidato.nome}</td>
                    <td className="p-4">{candidato.email}</td>
                    <td className="p-4">{candidato.area}</td>
                    <td className="p-4">{candidato.origem}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {candidatoSelecionado && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="bg-gray-800 w-full max-w-lg rounded-lg p-6 text-white">

              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  Detalhes do candidato
                </h2>

                <button
                  onClick={() => setCandidatoSelecionado(null)}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Nome</p>
                  <p className="font-bold">{candidatoSelecionado.nome}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">E-mail</p>
                  <p>{candidatoSelecionado.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Telefone</p>
                  <p>{candidatoSelecionado.telefone}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Área desejada</p>
                  <p>{candidatoSelecionado.area}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Origem</p>
                  <p>{candidatoSelecionado.origem}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Resumo profissional</p>
                  <p>{candidatoSelecionado.resumo}</p>
                </div>
              </div>

            </div>
          </div>
        )}
        {/* Fim da tabela de candidatos */}
      </div>
      {/* Fim do header, input e botão de novo cadastro */}

    </>
  )
}

export default App