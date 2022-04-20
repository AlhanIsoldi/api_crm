import { useNavigate } from 'react-router-dom'

const Cliente = ({ cliente, handleEliminar }) => {
  const navigate = useNavigate()

  const { nombre, empresa, correo, telefono, notas, id } = cliente

  return (
    <tr className="border-b hover:bg-blue-100">
      <td className="p-1 text-center">{nombre}</td>

      <td className="p-3">
        <p>
          <span className="uppercase font-bold">Email :</span>
          {correo}
        </p>
        <p>
          <span className="uppercase font-bold">Tel :</span>
          {telefono}
        </p>
      </td>

      <td className="p-3 text-center">{empresa}</td>

      <td>
        <button 
        className="bg-blue-600 hover:bg-blue-700 block w-full text-white font-bold py-1 mr-3 px-4 rounded uppercase text-sm"
        onClick={() => navigate(`/clientes/editar/${id}`)}
        >
          Editar
        </button>

        <button 
        className="bg-red-800 hover:bg-red-700 block w-full text-white font-bold py-1 mt-1  rounded uppercase text-sm"
        onClick={() => handleEliminar(id)}
        >
          Eliminar
        </button>
      </td>

      <td>
        <button
          className="bg-green-600 hover:bg-green-700   text-white font-bold py-5 px-3 ml-1 rounded uppercase text-sm "
          onClick={() => navigate(`/clientes/${id}`)}
        >
          Ver
        </button>
      </td>
    </tr>
  )
}

export default Cliente
