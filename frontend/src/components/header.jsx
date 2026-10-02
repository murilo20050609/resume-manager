import { useNavigate, useLocation } from "react-router-dom"
export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <div className="w-full  bg-blue-950 flex p-4 flex-row items-center gap-5  ">
      <h1 className="text-2xl font-bold text-white">
        Recrutamento
      </h1>
      <div className="gap-4 flex  ">
        <button
          onClick={() => navigate('/candidates')}
          className={`px-3 py-2 ${location.pathname === '/candidates'
              ? 'border-b-2 border-white'
              : ''
            }`}
        >
          <h1 className="font-bold text-white">Candidatos</h1>
        </button>

        <button
          onClick={() => navigate('/new-candidate')}
          className={`px-3 py-2 ${location.pathname === '/new-candidate'
              ? 'border-b-2 border-white'
              : ''
            }`}
        >
          <h1 className="font-bold text-white">Novo cadastro</h1>
        </button>
      </div>
    </div>

  )
}