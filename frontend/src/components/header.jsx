import {useNavigate} from "react-router-dom"
export function Header() {  
const navigate = useNavigate()
  return (
<div className="w-full  bg-blue-950 flex p-4 flex-row items-center gap-5  ">
        <h1 className="text-2xl font-bold text-white">
          Recrutamento
        </h1>
        <div className="gap-4 flex  ">
          <button onClick={() => navigate('/candidates')}>
            <h1 className="font-bold text-white">Candidatos</h1>
          </button>

          <button onClick={() => navigate('/new-candidate')}>
            <h1 className="font-bold text-white">Novo cadastro</h1>
          </button>
        </div>
      </div>

)}