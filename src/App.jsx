import React, { useState } from 'react';
import { Search, Building2, User, Calendar, AlertCircle, Loader2, MapPin } from 'lucide-react';

export default function SRIConsulta() {
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!nombres.trim() || !apellidos.trim()) {
      setError('Debe ingresar al menos un nombre y un apellido');
      return;
    }

    setError('');
    setLoading(true);
    setResults(null);

    const apiBaseUrl = import.meta.env.VITE_SRI_API_URL;
    
    const denominacion = `${apellidos.trim().toUpperCase()} ${nombres.trim().toUpperCase()}`;
    const url = `${apiBaseUrl}${encodeURIComponent(denominacion)}/?tipoPersona=N&resultados=30`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 segundos
      
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error('Error en la conexión con el servidor');
      }

      const data = await response.json();
      
      if (!data || data.length === 0) {
        setError('No se encontraron registros');
        setResults([]);
      } else {
        setResults(data);
      }
    } catch (err) {
      setError(err.message || 'Error en la conexión');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getEstadoColor = (estado) => {
    if (!estado) return 'bg-gray-100 text-gray-800';
    const estadoLower = estado.toLowerCase();
    if (estadoLower.includes('activo')) return 'bg-green-100 text-green-800';
    if (estadoLower.includes('pasivo')) return 'bg-yellow-100 text-yellow-800';
    if (estadoLower.includes('suspendido')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="w-12 h-12 text-cyan-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">
              Consulta SRI Ecuador
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Sistema de búsqueda de contribuyentes registrados
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nombre(s)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Ej: JUAN CARLOS"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Apellido(s)
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={apellidos}
                    onChange={(e) => setApellidos(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Ej: GARCÍA LÓPEZ"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Buscar Contribuyente
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}
        </div>

        {results && results.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Search className="w-6 h-6 text-cyan-600" />
              Resultados encontrados: {results.length}
            </h2>

            {results.map((contrib, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Building2 className="w-6 h-6" />
                    Contribuyente #{idx + 1}
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-semibold">Razón Social</p>
                      <p className="text-lg font-bold text-gray-800">{contrib.razonSocial || 'N/A'}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-semibold">Nombre Comercial</p>
                      <p className="text-lg font-bold text-blue-600">{contrib.nombreComercial || 'N/A'}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-semibold">Identificación</p>
                      <p className="text-lg font-mono font-bold text-green-600">{contrib.identificacion || 'N/A'}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-semibold">Tipo de Identificación</p>
                      <p className="text-lg text-gray-700">{contrib.tipoIdentificacion || 'N/A'}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-semibold">Clase</p>
                      <p className="text-lg text-gray-700">{contrib.clase || 'N/A'}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-semibold">Estado del Contribuyente</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getEstadoColor(contrib.estadoContribuyente)}`}>
                        {contrib.estadoContribuyente || 'N/A'}
                      </span>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-semibold">Obligado a llevar contabilidad</p>
                      <p className="text-lg text-purple-600 font-semibold">{contrib.obligado || 'N/A'}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1 font-semibold">Fecha Inicio de Actividades</p>
                      <p className="text-lg text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {contrib.fechaInicioActividades || 'N/A'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-2 font-semibold">Actividad Económica Principal</p>
                    <p className="text-base text-gray-700 bg-cyan-50 p-3 rounded-lg">
                      {contrib.actividadEconomicaPrincipal || 'N/A'}
                    </p>
                  </div>

                  {contrib.establecimientos && contrib.establecimientos.length > 0 && (
                    <div className="pt-6 border-t border-gray-200">
                      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-cyan-600" />
                        Establecimientos ({contrib.establecimientos.length})
                      </h4>
                      <div className="space-y-3">
                        {contrib.establecimientos.map((est, estIdx) => (
                          <div key={estIdx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <div className="grid md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-xs text-gray-500 mb-1 font-semibold">Nombre Establecimiento</p>
                                <p className="text-sm font-bold text-cyan-700">{est.nombreFantasiaComercial || 'N/A'}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1 font-semibold">Dirección</p>
                                <p className="text-sm text-gray-700">{est.direccion || 'N/A'}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1 font-semibold">Estado</p>
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getEstadoColor(est.estado)}`}>
                                  {est.estado || 'N/A'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}