import { useState, useEffect } from "react";
import Error from "./Error";

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if( Object.keys(paciente).length > 0 ){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])




  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha
  }

  const handleSubmit = (e) => {
      e.preventDefault();

      //Validación de formulario 
      if([nombre, propietario, email, fecha, sintomas].includes ('') ){
        console.log('Todos los campos son obligatorios')
         
        setError(true)
        return;
      } 
      setError(false)

      //objeto de paciente
      const objetoPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas
      }

      if(paciente.id) {
        //Editando paciente
        objetoPaciente.id = paciente.id
        const pacienteActualizado = pacientes.map (pacienteState => pacienteState.id === paciente.id ?
          objetoPaciente : pacienteState )

          setPacientes(pacienteActualizado)
          setPaciente({})

      } else {
        //Agregando paciente
        objetoPaciente.id = generarId ();
        setPacientes([...pacientes, objetoPaciente])

      }

      

      //reiniciar el form
      setNombre('');
      setPropietario('');
      setEmail('');
      setFecha('');
      setSintomas('');
    }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5" >
      <h2 className="font-black text-3xl text-center"> Seguimiento Pacientes</h2>

      <p className="text-xl mt-5 text-center mb-5"  >
        Añade pacientes y {''}
        <span className="text-indigo-600 font-bold text-center">Administralos</span>
      </p>

      <form
          onSubmit={handleSubmit}  
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">

          {error && <Error><p>Todos los campos son obligatorio</p></Error> }
        <div className="mt-5">
          <label htmlFor="mascota" className="block font-bold uppercase text-gray-700">
            Nombre de la mascota:
          </label>
          
          <input 
            id="mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value) }
          />
        </div>

        <div className="mt-5">
          <label htmlFor="propietario" className="block font-bold uppercase text-gray-700">
            Nombre Propietario:
          </label>
          
          <input 
            id="propetario"
            type="text"
            placeholder="Nombre del propetario"
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value) }
          />
        </div>

        <div className="mt-5">
          <label htmlFor="correo" className="block font-bold uppercase text-gray-700">
            Email:
          </label>
          
          <input 
            id="correo"
            type="email"
            placeholder="@"
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value) }
          />
        </div>

        <div className="mt-5">
          <label htmlFor="fecha" className="block font-bold uppercase text-gray-700">
            Fecha:
          </label>
          
          <input 
            id="fecha"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.target.value) }
          />
        </div>
      
        <div className="mt-5">
        <label htmlFor="sintomas" className="block font-bold uppercase text-gray-700">
            Síntomas:
          </label>
          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder:text-gray-400 rounded-md mb-5"
            placeholder="Describe los síntomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value) }
          />
        </div>
        
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-900 cursor-pointer transition-colors"
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
        />
      </form>

    </div>
  )
}

export default Formulario;
