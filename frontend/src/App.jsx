function App() {
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
              <tr className="border-t border-gray-700 bg-gray-900">
                <td className="p-4">Murilo Henrique</td>
                <td className="p-4">murilo@email.com</td>
                <td className="p-4">Desenvolvedor</td>
                <td className="p-4">PDF</td>
              </tr>

              <tr className="border-t border-gray-700 bg-gray-900">
                <td className="p-4">João Silva</td>
                <td className="p-4">joao@email.com</td>
                <td className="p-4">Full Stack</td>
                <td className="p-4">Manual</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Fim da tabela de candidatos */}
      </div>
      {/* Fim do header, input e botão de novo cadastro */}

    </>
  )
}

export default App