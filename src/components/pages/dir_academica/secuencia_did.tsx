import { useState, useCallback } from 'react';

const CommentBalloon = ({ initialText }) => {
  const [text, setText] = useState(initialText);

  const handleFocus = useCallback(() => {
    if (text === initialText) {
      setText('');
    }
  }, [text, initialText]);

  const handleBlur = useCallback(() => {
    if (text.trim() === '') {
      setText(initialText);
    }
  }, [initialText]);

  return (
    <div
      className="relative bg-yellow-100 rounded-lg p-2 mt-2 shadow-md"
      contentEditable
      onFocus={handleFocus}
      onBlur={handleBlur}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

const HoursCounter = ({ value, onChange }) => {
  const decrease = useCallback(() => {
    if (value > 0) {
      onChange(value - 1);
    }
  }, [value, onChange]);

  const increase = useCallback(() => {
    onChange(value + 1);
  }, [onChange]);

  return (
    <div className="flex items-center ">
      <button onClick={decrease} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-l">
        -
      </button>
      <span className="bg-gray-100 text-gray-700 font-bold py-2 px-4">{value}</span>
      <button onClick={increase} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-r">
        +
      </button>
    </div>
  );
};

export default function secuenciadidactica() {
  const [formData, setFormData] = useState({
    programa: '',
    ciclo: '',
    nombre: '',
    perfil: '',
    posgrado: '',
    asignatura: '',
    aprendizajes: '',
    horas: 0,
    impacto: '',
    competencia: '',
    criterio1: '',
    porcentaje1: 0,
    criterio2: '',
    porcentaje2: 0,
    criterio3: '',
    porcentaje3: 0,
    bienvenida: '',
    contextualizacion: '',
    introduccion: '',
    tema: '',
    subtema1: '',
    subtema2: '',
    objetivo: '',
    evidencia: '',
    instrumento: '',
    actividad_inicio: '',
    actividad_desarrollo: '',
    actividad_cierre: '',
    actividad_final: '',
    criterio_eval1: '',
    criterio_eval2: '',
    instrumento1: '',
    instrumento2: '',
    nombre_firma: '',
    firma_academia: '',
    firma_coordinacion: '',
    dia: 1,
    mes: '',
    anio: 2024,
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleHoursChange = useCallback((newHours) => {
    setFormData((prev) => ({ ...prev, horas: newHours }));
  }, []);

  return (
    <div className="text-black bg-white rounded-lg shadow-lg shadow-slate-400">
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-orange-500 text-white p-4 flex flex-wrap items-center justify-between mb-4">
          <img src="./logotipo_universidad.svg" alt="Logo" className="w-24 h-auto mb-2 md:mb-0" />
          <h1 className="text-xl md:text-2xl font-bold">UNIVERSIDAD PABLO GUARDADO CHÁVEZ</h1>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">FORMATO DE SECUENCIA DIDÁCTICA</h2>
        <p className="mb-4 text-center italic">Modelo educativo del Sistema UPGCH Competencias para la vida</p>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <div className="bg-gray-800 text-white p-2 font-bold">PROGRAMA EDUCATIVO (1) | CICLO (2) | DOCENTE (3)</div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="programa">Programa:</label>
              <input
                type="text"
                id="programa"
                name="programa"
                value={formData.programa}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="ciclo">Ciclo:</label>
              <input
                type="text"
                id="ciclo"
                name="ciclo"
                value={formData.ciclo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-2"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="perfil">Perfil Profesional:</label>
              <input
                type="text"
                id="perfil"
                name="perfil"
                value={formData.perfil}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mb-2"
              />
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="posgrado">Posgrado:</label>
              <input
                type="text"
                id="posgrado"
                name="posgrado"
                value={formData.posgrado}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <CommentBalloon initialText="Agregar comentario sobre Programa Educativo, Ciclo y Docente..." />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <div className="bg-gray-800 text-white p-2 font-bold">ASIGNATURA (4) | APRENDIZAJES ESPERADOS (5) | HORAS CLASE (6)</div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="asignatura">Asignatura:</label>
              <input
                type="text"
                id="asignatura"
                name="asignatura"
                value={formData.asignatura}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="aprendizajes">Aprendizajes esperados:</label>
              <textarea
                id="aprendizajes"
                name="aprendizajes"
                value={formData.aprendizajes}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="horas">Horas por semana:</label>
              <HoursCounter value={formData.horas} onChange={handleHoursChange} />
            </div>
          </div>
          <CommentBalloon initialText="Agregar comentario sobre Asignatura, Aprendizajes Esperados y Horas Clase..." />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <div className="bg-gray-800 text-white p-2 font-bold">IMPACTO EN EL PERFIL DE EGRESO (7)</div>
          <div className="p-4">
            <textarea
              id="impacto"
              name="impacto"
              value={formData.impacto}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-24"
            ></textarea>
          </div>
          <CommentBalloon initialText="Agregar comentario sobre Impacto en el Perfil de Egreso..." />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <div className="bg-gray-800 text-white p-2 font-bold">COMPETENCIA SELLO A LA QUE CONTRIBUYE (8)</div>
          <div className="p-4">
            <textarea
              id="competencia"
              name="competencia"
              value={formData.competencia}
              onChange={handleInputChange}
              className="w-full p-2 border rounded h-24"
            ></textarea>
          </div>
          <CommentBalloon initialText="Agregar comentario sobre Competencia Sello..." />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <div className="bg-gray-800 text-white p-2 font-bold">ESTRATEGIA DE EVALUACIÓN INTEGRAL (9)</div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="font-bold">CRITERIOS</div>
              <div className="font-bold">PORCENTAJE</div>
              <input
                type="text"
                id="criterio1"
                name="criterio1"
                value={formData.criterio1}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="number"
                id="porcentaje1"
                name="porcentaje1"
                value={formData.porcentaje1}
                onChange={handleInputChange}
                className="p-2 border rounded"
                min="0"
                max="100"
              />
              <input
                type="text"
                id="criterio2"
                name="criterio2"
                value={formData.criterio2}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="number"
                id="porcentaje2"
                name="porcentaje2"
                value={formData.porcentaje2}
                onChange={handleInputChange}
                className="p-2 border rounded"
                min="0"
                max="100"
              />
              <input
                type="text"
                id="criterio3"
                name="criterio3"
                value={formData.criterio3}
                onChange={handleInputChange}
                className="p-2 border rounded"
              />
              <input
                type="number"
                id="porcentaje3"
                name="porcentaje3"
                value={formData.porcentaje3}
                onChange={handleInputChange}
                className="p-2 border rounded"
                min="0"
                max="100"
              />
            </div>
          </div>
          <CommentBalloon initialText="Agregar comentario sobre Estrategia de Evaluación Integral..." />
        </div>

        <h3 className="text-xl font-bold mb-2">SECUENCIA DIDÁCTICA</h3>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <div className="bg-gray-800 text-white p-2 font-bold">BIENVENIDA (10) | CONTEXTUALIZACIÓN (11) | INTRODUCCIÓN (12)</div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bienvenida">Bienvenida:</label>
              <textarea
                id="bienvenida"
                name="bienvenida"
                value={formData.bienvenida}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contextualizacion">Contextualización:</label>
              <textarea
                id="contextualizacion"
                name="contextualizacion"
                value={formData.contextualizacion}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="introduccion">Introducción:</label>
              <textarea
                id="introduccion"
                name="introduccion"
                value={formData.introduccion}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
              ></textarea>
            </div>
          </div>
          <CommentBalloon initialText="Agregar comentario sobre Bienvenida, Contextualización e Introducción..." />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <div className="bg-gray-800 text-white p-2 font-bold">TEMA / SUBTEMAS (13)</div>
          <div className="p-4">
            <input
              type="text"
              id="tema"
              name="tema"
              value={formData.tema}
              onChange={handleInputChange}
              placeholder="Tema principal"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              id="subtema1"
              name="subtema1"
              value={formData.subtema1}
              onChange={handleInputChange}
              placeholder="Subtema 1"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              id="subtema2"
              name="subtema2"
              value={formData.subtema2}
              onChange={handleInputChange}
              placeholder="Subtema 2"
              className="w-full p-2 border rounded"
            />
          </div>
          <CommentBalloon initialText="Agregar comentario sobre Tema y Subtemas..." />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <div className="bg-gray-800 text-white p-2  font-bold">OBJETIVO DE APRENDIZAJE (14) | EVIDENCIA DE APRENDIZAJE (15) | ACTIVIDADES DE APRENDIZAJE (16)</div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="objetivo">Objetivo:</label>
              <textarea
                id="objetivo"
                name="objetivo"
                value={formData.objetivo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="evidencia">Evidencia:</label>
              <textarea
                id="evidencia"
                name="evidencia"
                value={formData.evidencia}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24 mb-2"
              ></textarea>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="instrumento">Instrumento de evaluación:</label>
              <input
                type="text"
                id="instrumento"
                name="instrumento"
                value={formData.instrumento}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <div className="bg-gray-200 p-2 mb-2 font-bold">INICIO</div>
              <textarea
                id="actividad_inicio"
                name="actividad_inicio"
                value={formData.actividad_inicio}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-16 mb-2"
              ></textarea>
              <div className="bg-gray-200 p-2 mb-2 font-bold">DESARROLLO</div>
              <textarea
                id="actividad_desarrollo"
                name="actividad_desarrollo"
                value={formData.actividad_desarrollo}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-16 mb-2"
              ></textarea>
              <div className="bg-gray-200 p-2 mb-2 font-bold">CIERRE</div>
              <textarea
                id="actividad_cierre"
                name="actividad_cierre"
                value={formData.actividad_cierre}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-16"
              ></textarea>
            </div>
          </div>
          <CommentBalloon initialText="Agregar comentario sobre Objetivo, Evidencia y Actividades de Aprendizaje..." />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <div className="bg-gray-800 text-white p-2 font-bold">ACTIVIDAD FINAL (17) | EVALUACIÓN (18)</div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="actividad_final">Actividad final:</label>
              <textarea
                id="actividad_final"
                name="actividad_final"
                value={formData.actividad_final}
                onChange={handleInputChange}
                className="w-full p-2 border rounded h-24"
              ></textarea>
            </div>
            <div>
              <div className="bg-gray-200 p-2 mb-2 font-bold">CRITERIOS</div>
              <input
                type="text"
                id="criterio_eval1"
                name="criterio_eval1"
                value={formData.criterio_eval1}
                onChange={handleInputChange}
                placeholder="Criterio 1"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                id="criterio_eval2"
                name="criterio_eval2"
                value={formData.criterio_eval2}
                onChange={handleInputChange}
                placeholder="Criterio 2"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <div className="bg-gray-200 p-2 mb-2 font-bold">INSTRUMENTOS</div>
              <input
                type="text"
                id="instrumento1"
                name="instrumento1"
                value={formData.instrumento1}
                onChange={handleInputChange}
                placeholder="Instrumento 1"
                className="w-full p-2 border rounded mb-2"
              />
              <input
                type="text"
                id="instrumento2"
                name="instrumento2"
                value={formData.instrumento2}
                onChange={handleInputChange}
                placeholder="Instrumento 2"
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <CommentBalloon initialText="Agregar comentario sobre Actividad Final y Evaluación..." />
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
          <div className="bg-gray-800 text-white p-2 font-bold">NOMBRE Y FIRMA DEL DOCENTE (19) | AUTORIZACIÓN (20)</div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nombre_firma">Nombre y firma:</label>
              <input
                type="text"
                id="nombre_firma"
                name="nombre_firma"
                value={formData.nombre_firma}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <div className="bg-gray-200 p-2 mb-2 font-bold">ACADEMIA</div>
              <input
                type="text"
                id="firma_academia"
                name="firma_academia"
                value={formData.firma_academia}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <div className="bg-gray-200 p-2 mb-2 font-bold">COORDINACIÓN ACADÉMICA</div>
              <input
                type="text"
                id="firma_coordinacion"
                name="firma_coordinacion"
                value={formData.firma_coordinacion}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <CommentBalloon initialText="Agregar comentario sobre Nombre y Firma del Docente y Autorización..." />
        </div>

        <div className="mb-4">
          <p className="mb-2">
            TUXTLA GUTIÉRREZ, CHIAPAS; A 
            <input
              type="number"
              id="dia"
              name="dia"
              min="1"
              max="31"
              value={formData.dia}
              onChange={handleInputChange}
              className="w-12 p-1 border rounded inline-block mx-1"
            /> DE 
            <input
              type="text"
              id="mes"
              name="mes"
              value={formData.mes}
              onChange={handleInputChange}
              className="w-32 p-1 border rounded inline-block mx-1"
            /> DE 
            <input
              type="number"
              id="anio"
              name="anio"
              min="2024"
              max="2100"
              value={formData.anio}
              onChange={handleInputChange}
              className="w-20 p-1 border rounded inline-block mx-1"
            />.
          </p>
          <div className="flex space-x-4">
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
              Borrador
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Enviar
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
              Correcciones
            </button>
          </div>
        </div>

        <footer className="text-center">
          <img src="./Modelo.svg" alt="Modelo Educativo Logo" className="w-52 mx-auto mb-2" />
          <p className="font-bold">WWW.UPGCH.MX</p>
          <p className="text-sm">Libramiento Norte Oriente No. 3450 Fracc. Residencial Las Palmas, Tuxtla Gutiérrez, Chiapas. Tel. (961)61 4 11 12</p>
        </footer>
      </div>
    </div>
  );
}