import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const VerCliente = () => {
  const { id } = useParams()
  const [cliente, setCliente] = useState({})
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    setCargando(true)
    const obtenerCliente = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        setCliente(resultado)
      } catch (error) {
        console.log(error)
      }
      setTimeout(() => {
        setCargando(false)
      }, 200)
    }
    obtenerCliente()
  }, [])

  return (

    cargando ? <Spinner/> : 
    Object.keys(cliente).length === 0 ? <p>No hay resultados</p> : (
    
    <div className="mt-5">
      <h1 className="uppercase font-bold "> ID Cliente: {cliente.id}</h1>
      <p className="mt-4">
        <span className="uppercase font-bold ">Cliente :</span> {cliente.nombre}
      </p>
      <p className="mt-4">
        <span className="uppercase font-bold ">Empresa :</span>{' '}
        {cliente.empresa}
      </p>
      <p className="mt-4">
        <span className="uppercase font-bold ">Correo :</span> {cliente.correo}
      </p>
      {
        /* Verifica que haya un numero de telefono */
        cliente.telefono && (
          <p className="mt-4">
            <span className="uppercase font-bold ">Telefono :</span>{' '}
            {cliente.telefono}
          </p>
        )
      }

      {
        /* Verifica que haya notas */
        cliente.notas && (
          <p className="mt-4">
            <span className="uppercase font-bold ">Notas :</span>{' '}
            {cliente.notas}
          </p>
        )
      }
    </div>
    
    )
  )
}
export default VerCliente
