import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import Spinner from '../components/Spinner'

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object({
    nombre: Yup.string()
      .required('El nombre es obligatorio')
      .min(3, 'El nombre es muy corto')
      .max(20, 'El nombre es muy largo'),
    empresa: Yup.string().required('La empresa es obligatoria'),
    telefono: Yup.number()
      .positive('El teléfono no es valido')
      .integer('El teléfono no es valido')
      .typeError('El teléfono no es valido'),
    correo: Yup.string()
      .email('El correo no es válido')
      .required('El correo es obligatorio'),
  })

  const handleSubmit = async (valores) => {
    try {
      let respuesta
      if (cliente.id) {
        const url = `http://localhost:4000/clientes/${cliente.id}`
        respuesta = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      } else {
        const url = 'http://localhost:4000/clientes'
        respuesta = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(valores),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      }
      await respuesta.json()
      navigate('/clientes')
    } catch (error) {
      console.log(error)
    }
  }
  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className=" font-bold text-xl uppercase text-center">
        {cliente?.nombre ? 'Editar cliente' : 'Nuevo cliente'}
      </h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? '',
          empresa: cliente?.empresa ?? '',
          correo: cliente?.correo ?? '',
          telefono: cliente?.telefono ?? '',
          notas: cliente?.notas ?? '',
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values)

          resetForm()
        }}
        validationSchema={nuevoClienteSchema}
      >
        {(errors) => {
          //console.log(errors)
          return (
            <Form className="mt-10">
              {/* NOMBRE CLIENTE */}
              <div className="mb-4">
                <label htmlFor="nombre" className="text-gray-800">
                  Nombre :
                </label>
                <Field
                  placeholder="Nombre del cliente"
                  id="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-200 rounded-md"
                  name="nombre"
                />
                <ErrorMessage
                  name="nombre"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {/* EMPRESA CLIENTE */}
              <div className="mb-4">
                <label htmlFor="empresa" className="text-gray-800">
                  Empresa :
                </label>
                <Field
                  placeholder="Empresa del cliente"
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-200 rounded-md"
                  name="empresa"
                />
                <ErrorMessage
                  name="empresa"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {/* EMAIL CLIENTE */}
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-800">
                  Correo :
                </label>
                <Field
                  placeholder="Correo del cliente"
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-200 rounded-md"
                  name="correo"
                />
                <ErrorMessage
                  name="correo"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {/* TELEFONO CLIENTE */}
              <div className="mb-4">
                <label htmlFor="telefono" className="text-gray-800">
                  Telefono :
                </label>
                <Field
                  placeholder="Telefono del cliente"
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-200 rounded-md"
                  name="telefono"
                />
                <ErrorMessage
                  name="telefono"
                  component="div"
                  className="text-red-500"
                />
              </div>
              {/* NOTAS DEL CLIENTE */}
              <div className="mb-4">
                <label htmlFor="notas" className="text-gray-800">
                  NOTAS :
                </label>
                <Field
                  as="textarea"
                  placeholder="Notas sobre cliente"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-200 rounded-md h-40"
                  name="notas"
                />
                <ErrorMessage
                  name="notas"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <input
                type="submit"
                value={cliente?.nombre ? 'Editar cliente' : 'Nuevo cliente'}
                className="mt-5 w-full bg-blue-800 p-3 text-white font-bold text-lg uppercase rounded-md"
              />
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
}

export default Formulario
