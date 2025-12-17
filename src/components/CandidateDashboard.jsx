import React, { useState, useEffect, useMemo } from 'react';
import candidatesData from '../data/candidatos.json';
import './CandidateDashboard.css';

export default function CandidateDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [roleFilter, setRoleFilter] = useState('');
  const [documentationFilter, setDocumentationFilter] = useState('all');
  const [experienceSort, setExperienceSort] = useState('none');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Aplicar tema al documento
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setCandidates(candidatesData);
        setLoading(false);
      } catch (e) {
        setError("Ocurrió un error al cargar la información.");
        setLoading(false);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredCandidates = useMemo(() => {
    return candidates
      .filter(c => {
        if (roleFilter && c.role !== roleFilter) return false;
        if (documentationFilter === 'complete' && !c.hasRFC) return false;
        if (documentationFilter === 'in_progress' && c.hasRFC) return false;
        return true;
      })
      .sort((a, b) => {
        if (experienceSort === 'desc') {
          return b.experienceYears - a.experienceYears;
        } else if (experienceSort === 'asc') {
          return a.experienceYears - b.experienceYears;
        } else {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        }
      });
  }, [candidates, roleFilter, documentationFilter, experienceSort, sortOrder]);

  if (loading) return (
    <div style={{ padding: '5rem 1rem', textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
      <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Preparando el talento adecuado...</p>
    </div>
  );

  if (error) return (
    <div className="error-state">
      <div className="error-icon">❌</div>
      <h2>Algo salió mal</h2>
      <p>{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="error-retry-button"
      >
        Reintentar
      </button>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Dark Mode Toggle */}
        <div className="theme-toggle-container">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
            aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
          >
            {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
          </button>
        </div>

        {/* Filtros */}
        <section className="filters-section">
          <div className="filters-header">
            <h2>Filtros de Búsqueda Inclusiva</h2>
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="info-button"
              aria-label={showInfo ? 'Cerrar información' : 'Abrir información'}
            >
              {showInfo ? '✕ Cerrar' : '? Info'}
            </button>
          </div>

          {showInfo && (
            <div className="info-box">
              <p>💡 Búsqueda de talento sin sesgos:</p>
              <ul>
                <li>Valoramos <strong>talento emergente</strong> con alto potencial</li>
                <li>Consideramos documentación en proceso como oportunidad</li>
                <li>La diversidad de experiencias es un activo</li>
                <li>Más importante: actitud, capacidad de aprender y potencial</li>
              </ul>
            </div>
          )}

          <div className="filters-grid">
            <div className="filter-group">
              <label>Rol solicitado</label>
              <select 
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="">Todos los roles</option>
                <option value="ventas">Ventas</option>
                <option value="atención al cliente">Atención al cliente</option>
                <option value="operaciones">Operaciones</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Experiencia (años)</label>
              <select 
                onChange={(e) => setExperienceSort(e.target.value)}
              >
                <option value="none">Sin ordenar</option>
                <option value="desc">Mayor a menor</option>
                <option value="asc">Menor a mayor</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Documentación</label>
              <select 
                onChange={(e) => setDocumentationFilter(e.target.value)}
              >
                <option value="all">Todos (incluye en proceso)</option>
                <option value="complete">Documentación completa</option>
                <option value="in_progress">En proceso</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Ordenar por</label>
              <select 
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Más recientes</option>
                <option value="oldest">Antiguos</option>
              </select>
            </div>
          </div>
        </section>

        {/* Tabla */}
        {filteredCandidates.length === 0 ? (
          <div className="empty-state">
            <p>No se encontraron perfiles con estos criterios.</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Candidato</th>
                  <th>Habilidad / Rol</th>
                  <th style={{ textAlign: 'center' }}>Documentación</th>
                  <th>Registro</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <p className="candidate-name">{c.name}</p>
                      <p className="candidate-email">{c.email}</p>
                    </td>
                    <td>
                      <span className="role-badge">{c.role}</span>
                      <p className="experience-text">{c.experienceYears} años de experiencia</p>
                      {c.isMigrant && <span className="talent-tag">Talento global</span>}
                    </td>
                    <td>
                      <div className="status-column">
                        {c.hasRFC ? (
                          <span className="status-badge complete">✓ Completa</span>
                        ) : (
                          <span className="status-badge in-progress">⧗ En proceso</span>
                        )}
                        {c.isMigrant && <span className="status-badge diverse">🌍 Diverso</span>}
                      </div>
                    </td>
                    <td className="registration-date">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}