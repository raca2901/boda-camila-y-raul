import React, { useState } from 'react';
import {
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Trash2,
  Download,
  Upload,
  Database,
  Key,
  X,
  Search,
  MessageCircle,
  Copy,
  Check,
  RefreshCw,
  FileSpreadsheet,
} from 'lucide-react';
import type { Guest, RsvpStatus } from '../types/wedding';
import { isConfigured, saveSupabaseCredentials, clearSupabaseCredentials } from '../lib/supabase';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  guests: Guest[];
  onAddGuest: (guest: Omit<Guest, 'id'>) => Promise<boolean>;
  onDeleteGuest: (id: string) => Promise<boolean>;
  onRefreshFromDb: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  guests,
  onAddGuest,
  onDeleteGuest,
  onRefreshFromDb,
}) => {
  // Authentication PIN state (PIN: 2027)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Filter & Search
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | RsvpStatus>('all');

  // New Guest Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPasses, setNewPasses] = useState(2);
  const [isSavingGuest, setIsSavingGuest] = useState(false);

  // Excel / CSV Import State
  const [showImportModal, setShowImportModal] = useState(false);
  const [importedPreview, setImportedPreview] = useState<Array<Omit<Guest, 'id'>>>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importFeedback, setImportFeedback] = useState<string | null>(null);

  // Supabase Config Modal
  const [showDbModal, setShowDbModal] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState(localStorage.getItem('wedding_supabase_url') || '');
  const [supabaseKey, setSupabaseKey] = useState(localStorage.getItem('wedding_supabase_anon_key') || '');

  // Copy feedback
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle PIN unlock
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '2027' || pinInput === 'camila2027' || pinInput === 'raul2027') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Metrics calculations
  const totalInvitations = guests.length;
  const totalPassesAllowed = guests.reduce((sum, g) => sum + g.passes, 0);
  const totalConfirmedPeople = guests
    .filter((g) => g.status === 'confirmed')
    .reduce((sum, g) => sum + (g.confirmedPasses || g.passes), 0);
  const totalDeclinedPeople = guests
    .filter((g) => g.status === 'declined')
    .reduce((sum, g) => sum + g.passes, 0);
  const totalPendingPeople = totalPassesAllowed - totalConfirmedPeople - totalDeclinedPeople;

  // Filtered guest list
  const filteredGuests = guests.filter((g) => {
    const matchesSearch =
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle auto-generating code from name
  const handleNameChange = (val: string) => {
    setNewName(val);
    const cleanCode = val
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 10);
    setNewCode(cleanCode);
  };

  const handleCreateGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim()) return;

    setIsSavingGuest(true);
    const success = await onAddGuest({
      code: newCode.toUpperCase().trim(),
      name: newName.trim(),
      phone: newPhone.trim(),
      passes: newPasses,
      confirmedPasses: 0,
      status: 'pending',
    });
    setIsSavingGuest(false);

    if (success) {
      setNewName('');
      setNewCode('');
      setNewPhone('');
      setNewPasses(2);
      setShowAddModal(false);
    }
  };

  const handleCopyLink = (guest: Guest) => {
    const origin = window.location.origin;
    const link = `${origin}?invitado=${encodeURIComponent(guest.code)}`;
    navigator.clipboard.writeText(link);
    setCopiedCode(guest.code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSendWhatsApp = (guest: Guest) => {
    const origin = window.location.origin;
    const link = `${origin}?invitado=${encodeURIComponent(guest.code)}`;
    const text = encodeURIComponent(
      `¡Hola ${guest.name}! ✨\n\nCon mucha emoción y cariño, Camila y Raúl te invitamos a celebrar nuestra boda el 31 de Enero de 2027 en Copacabana (Medellín).\n\nPuedes ver todos los detalles de la invitación y confirmar tu asistencia en el siguiente enlace:\n${link}\n\n¡Esperamos contar contigo!`
    );
    const cleanPhone = (guest.phone || '').replace(/\D/g, '');
    const url = cleanPhone ? `https://wa.me/${cleanPhone}?text=${text}` : `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
  };

  const handleExportCsv = () => {
    const headers = ['Nombre', 'Codigo', 'Telefono', 'Pases Asignados', 'Estado', 'Pases Confirmados', 'Menu / Alergias', 'Dedicatoria'];
    const rows = guests.map((g) => [
      `"${g.name}"`,
      `"${g.code}"`,
      `"${g.phone || ''}"`,
      g.passes,
      `"${g.status}"`,
      g.confirmedPasses || 0,
      `"${g.dietaryPreference || ''} ${g.dietaryNotes || ''}"`.trim(),
      `"${(g.notes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(';'), ...rows.map((r) => r.join(';'))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `invitados_boda_camila_y_raul_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download template for Excel / CSV import
  const handleDownloadTemplate = () => {
    const templateContent = '\uFEFFNombre;Telefono;Pases;Codigo\nFamilia Gómez Restrepo;+573001234567;4;FLIAGOMEZ\nCarlos Mario & Pareja;+573109876543;2;CARLOSM\nValentina Ramírez;+573205551234;1;VALENTINAR';
    const blob = new Blob([templateContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'plantilla_invitados_boda.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Parse uploaded CSV / Excel file
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split(/\r\n|\n/).filter((l) => l.trim().length > 0);
        if (lines.length <= 1) {
          setImportFeedback('El archivo parece estar vacío.');
          return;
        }

        // Detect delimiter (semicolon or comma)
        const firstLine = lines[0];
        const delimiter = firstLine.includes(';') ? ';' : ',';

        const parsed: Array<Omit<Guest, 'id'>> = [];

        // Skip header line
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(delimiter).map((c) => c.replace(/^["']|["']$/g, '').trim());
          if (cols.length >= 1 && cols[0]) {
            const name = cols[0];
            const phone = cols[1] || '';
            const passes = parseInt(cols[2]) || 2;
            const customCode = cols[3] || name
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toUpperCase()
              .replace(/[^A-Z0-9]/g, '')
              .slice(0, 10);

            parsed.push({
              name,
              phone,
              passes,
              confirmedPasses: 0,
              code: customCode,
              status: 'pending',
            });
          }
        }

        setImportedPreview(parsed);
        setImportFeedback(`Se detectaron ${parsed.length} invitados listos para importar.`);
      } catch (err) {
        console.error(err);
        setImportFeedback('Error al procesar el archivo. Asegúrate de que sea formato CSV.');
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = async () => {
    if (importedPreview.length === 0) return;
    setIsImporting(true);
    for (const g of importedPreview) {
      await onAddGuest(g);
    }
    setIsImporting(false);
    setShowImportModal(false);
    setImportedPreview([]);
    setImportFeedback(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-3xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl border border-amber-900/20 overflow-hidden text-stone-800">
        
        {/* Top Bar */}
        <div className="px-6 py-4 bg-emerald-950 text-amber-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-title text-xl sm:text-2xl font-light text-amber-50">
                Panel de Control de Invitados
              </h2>
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-amber-200/60 block">
                Exclusivo para Camila & Raúl
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PIN Screen if not authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-16 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center mb-4">
              <Key className="w-8 h-8" />
            </div>
            <h3 className="font-serif-title text-3xl font-medium text-emerald-950 mb-2">
              Acceso Privado para los Novios
            </h3>
            <p className="text-stone-500 text-sm max-w-sm mb-6 font-light">
              Ingresa el PIN de seguridad para acceder a la gestión de invitados y configuración de la boda.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-3">
              <input
                type="password"
                maxLength={10}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="PIN (por defecto: 2027)"
                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-2xl text-center text-lg font-mono tracking-widest focus:ring-2 focus:ring-emerald-800 focus:outline-none"
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-medium">
                  PIN incorrecto. Prueba con el año de la boda: <strong>2027</strong>
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3 bg-emerald-900 hover:bg-emerald-800 text-amber-50 font-cinzel text-xs uppercase tracking-wider rounded-2xl transition-all shadow-md"
              >
                Ingresar al Panel
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Supabase Status Banner */}
            <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
              isConfigured
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}>
              <div className="flex items-center gap-3">
                <Database className={`w-5 h-5 shrink-0 ${isConfigured ? 'text-emerald-700' : 'text-amber-700'}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider font-cinzel">
                      Base de Datos Supabase:
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      isConfigured ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-800'
                    }`}>
                      {isConfigured ? 'Conectado en Tiempo Real' : 'Modo Demostración Local'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 font-light mt-0.5">
                    {isConfigured
                      ? 'Las confirmaciones de los invitados se sincronizan directamente con tu proyecto en Supabase.'
                      : 'Puedes vincular tus credenciales de Supabase en cualquier momento para sincronizar en la nube.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isConfigured && (
                  <button
                    onClick={onRefreshFromDb}
                    title="Sincronizar lista con Supabase"
                    className="p-2 bg-white text-emerald-800 rounded-xl border border-emerald-200 text-xs hover:bg-emerald-50 transition-colors shadow-sm"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setShowDbModal(true)}
                  className="px-4 py-2 bg-white text-stone-800 rounded-xl border border-stone-200 text-xs font-cinzel uppercase tracking-wider hover:bg-stone-50 transition-colors shadow-sm"
                >
                  {isConfigured ? 'Gestionar Conexión' : 'Conectar Supabase'}
                </button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              
              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 mb-1">
                  <span className="text-[10px] font-cinzel uppercase tracking-wider">Invitaciones</span>
                  <Users className="w-4 h-4 text-emerald-800" />
                </div>
                <div className="font-serif-title text-3xl font-medium text-emerald-950">
                  {totalInvitations}
                </div>
                <span className="text-[10px] text-stone-400">
                  {totalPassesAllowed} pases totales
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm bg-gradient-to-br from-white to-emerald-50/40">
                <div className="flex items-center justify-between text-emerald-700 mb-1">
                  <span className="text-[10px] font-cinzel uppercase tracking-wider">Confirmados</span>
                  <CheckCircle className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="font-serif-title text-3xl font-medium text-emerald-800">
                  {totalConfirmedPeople}
                </div>
                <span className="text-[10px] text-emerald-600 font-medium">
                  {totalPassesAllowed > 0 ? Math.round((totalConfirmedPeople / totalPassesAllowed) * 100) : 0}% de asistencia
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
                <div className="flex items-center justify-between text-stone-500 mb-1">
                  <span className="text-[10px] font-cinzel uppercase tracking-wider">No Asistirán</span>
                  <XCircle className="w-4 h-4 text-stone-400" />
                </div>
                <div className="font-serif-title text-3xl font-medium text-stone-600">
                  {totalDeclinedPeople}
                </div>
                <span className="text-[10px] text-stone-400">Pases liberados</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-amber-100 shadow-sm bg-gradient-to-br from-white to-amber-50/40">
                <div className="flex items-center justify-between text-amber-700 mb-1">
                  <span className="text-[10px] font-cinzel uppercase tracking-wider">Pendientes</span>
                  <Clock className="w-4 h-4 text-amber-700" />
                </div>
                <div className="font-serif-title text-3xl font-medium text-amber-900">
                  {totalPendingPeople}
                </div>
                <span className="text-[10px] text-amber-700">Por responder</span>
              </div>

            </div>

            {/* Actions Bar (Search, Filter, Import, Export, Add) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-stone-200">
              
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nombre o código..."
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-800"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none text-stone-700 font-cinzel"
                >
                  <option value="all">Todos los Estados</option>
                  <option value="confirmed">Confirmados</option>
                  <option value="pending">Pendientes</option>
                  <option value="declined">No Asistirán</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowImportModal(true)}
                  title="Cargar lista de invitados desde archivo Excel / CSV"
                  className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-cinzel uppercase tracking-wider transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cargar Excel</span>
                </button>

                <button
                  onClick={handleExportCsv}
                  title="Descargar lista en formato Excel/CSV para el banquete"
                  className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-cinzel uppercase tracking-wider transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span className="hidden sm:inline">Exportar</span>
                </button>

                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-amber-50 rounded-xl text-xs font-cinzel uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nuevo</span>
                </button>
              </div>

            </div>

            {/* Guests Table */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-cinzel uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Invitado / Familia</th>
                      <th className="py-3 px-3">Código</th>
                      <th className="py-3 px-3 text-center">Pases</th>
                      <th className="py-3 px-3 text-center">Estado</th>
                      <th className="py-3 px-4">Notas / Alergias</th>
                      <th className="py-3 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredGuests.length > 0 ? (
                      filteredGuests.map((guest) => (
                        <tr key={guest.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-medium text-stone-800">
                            <div>{guest.name}</div>
                            {guest.phone && (
                              <div className="text-[10px] text-stone-400 font-light">{guest.phone}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-3 font-mono text-emerald-900 font-semibold">
                            {guest.code}
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className="font-semibold text-stone-800">
                              {guest.status === 'confirmed' ? guest.confirmedPasses : guest.passes}
                            </span>
                            <span className="text-[10px] text-stone-400">/{guest.passes}</span>
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            {guest.status === 'confirmed' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                                Confirmado
                              </span>
                            )}
                            {guest.status === 'declined' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-800">
                                No Asistirá
                              </span>
                            )}
                            {guest.status === 'pending' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
                                Pendiente
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 max-w-xs truncate text-stone-600">
                            {guest.dietaryPreference && guest.dietaryPreference !== 'standard' && (
                              <span className="text-amber-800 font-medium block">
                                [Menú: {guest.dietaryPreference}]
                              </span>
                            )}
                            {guest.notes ? (
                              <span className="italic text-stone-500">"{guest.notes}"</span>
                            ) : (
                              <span className="text-stone-300">—</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1">
                            <button
                              onClick={() => handleSendWhatsApp(guest)}
                              title="Enviar invitación por WhatsApp"
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors inline-block"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleCopyLink(guest)}
                              title="Copiar enlace único de la invitación"
                              className="p-1.5 text-stone-500 hover:bg-stone-100 rounded-lg transition-colors inline-block"
                            >
                              {copiedCode === guest.code ? (
                                <Check className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => onDeleteGuest(guest.id)}
                              title="Eliminar invitado"
                              className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors inline-block"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-stone-400 text-sm">
                          No se encontraron invitados con los filtros seleccionados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Modal: Import Excel / CSV */}
        {showImportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-800" />
                  <h3 className="font-serif-title text-2xl font-medium text-emerald-950">
                    Cargar Invitados desde Excel / CSV
                  </h3>
                </div>
                <button onClick={() => setShowImportModal(false)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-stone-600 mb-6">
                <p>
                  Sube tu archivo de Excel (guardado como formato <strong>.CSV</strong>) para registrar tus invitados masivamente.
                </p>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-stone-800">
                      ¿Aún no tienes la lista en formato?
                    </span>
                    <button
                      type="button"
                      onClick={handleDownloadTemplate}
                      className="px-3 py-1.5 bg-white text-emerald-900 border border-emerald-300 rounded-xl hover:bg-emerald-50 text-[11px] font-cinzel font-semibold uppercase tracking-wider"
                    >
                      Descargar Plantilla
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    La plantilla contiene las columnas: <code>Nombre</code>, <code>Telefono</code>, <code>Pases</code> y <code>Codigo</code>.
                  </p>
                </div>

                <div>
                  <label className="block font-cinzel uppercase tracking-wider text-stone-700 mb-1">
                    Selecciona tu archivo .CSV:
                  </label>
                  <input
                    type="file"
                    accept=".csv,text/csv,text/plain"
                    onChange={handleFileSelect}
                    className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-cinzel file:bg-emerald-900 file:text-amber-50 hover:file:bg-emerald-800 cursor-pointer"
                  />
                </div>

                {importFeedback && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs">
                    {importFeedback}
                  </div>
                )}

                {importedPreview.length > 0 && (
                  <div className="border border-stone-200 rounded-xl p-3 max-h-48 overflow-y-auto bg-stone-50">
                    <span className="text-[10px] font-cinzel uppercase text-stone-500 block mb-2 font-semibold">
                      Vista previa de los primeros invitados:
                    </span>
                    <ul className="divide-y divide-stone-200 text-xs">
                      {importedPreview.slice(0, 5).map((p, idx) => (
                        <li key={idx} className="py-1.5 flex justify-between">
                          <span className="font-medium text-stone-800">{p.name}</span>
                          <span className="text-stone-500">{p.passes} pases · {p.code}</span>
                        </li>
                      ))}
                      {importedPreview.length > 5 && (
                        <li className="pt-2 text-center text-[11px] text-stone-400 italic">
                          ... y {importedPreview.length - 5} invitados más
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-cinzel uppercase text-stone-600 hover:bg-stone-100"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={importedPreview.length === 0 || isImporting}
                  onClick={handleConfirmImport}
                  className="px-5 py-2 bg-emerald-900 hover:bg-emerald-800 text-amber-50 rounded-xl text-xs font-cinzel uppercase tracking-wider transition-all disabled:opacity-50 shadow-sm"
                >
                  {isImporting ? 'Importando...' : `Confirmar e Importar (${importedPreview.length})`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add New Single Guest */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-stone-200">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                <h3 className="font-serif-title text-2xl font-medium text-emerald-950">
                  Agregar Invitado
                </h3>
                <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateGuest} className="space-y-4">
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-stone-700 mb-1">
                    Nombre o Familia *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Ej. Familia Rodríguez o Sofía Morales"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-cinzel uppercase tracking-wider text-stone-700 mb-1">
                      Código Único *
                    </label>
                    <input
                      type="text"
                      required
                      value={newCode}
                      onChange={(e) => setNewCode(e.target.value.toUpperCase())}
                      placeholder="Ej. FAMRODRIGUEZ"
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono font-semibold focus:ring-1 focus:ring-emerald-800 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-cinzel uppercase tracking-wider text-stone-700 mb-1">
                      Pases Reservados *
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      required
                      value={newPasses}
                      onChange={(e) => setNewPasses(parseInt(e.target.value) || 1)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-stone-700 mb-1">
                    WhatsApp / Teléfono (opcional)
                  </label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+57 300 000 0000"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-cinzel uppercase text-stone-600 hover:bg-stone-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSavingGuest}
                    className="px-5 py-2 bg-emerald-900 hover:bg-emerald-800 text-amber-50 rounded-xl text-xs font-cinzel uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    {isSavingGuest ? 'Guardando...' : 'Guardar Invitado'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Supabase Credentials Config */}
        {showDbModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-800" />
                  <h3 className="font-serif-title text-2xl font-medium text-emerald-950">
                    Conectar con Supabase
                  </h3>
                </div>
                <button onClick={() => setShowDbModal(false)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs text-stone-600 space-y-4 mb-6">
                <p>
                  Para conectar tu base de datos en Supabase y guardar las confirmaciones en tiempo real:
                </p>
                <ol className="list-decimal list-inside space-y-2 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <li>Inicia sesión en tu cuenta de <strong>supabase.com</strong>.</li>
                  <li>Ve a tu proyecto y copia el script <code>supabase_schema.sql</code> que preparamos en la carpeta de este proyecto y córrelo en el <strong>SQL Editor</strong>.</li>
                  <li>Copia tu <strong>Project URL</strong> y tu <strong>Anon Key</strong> (en <em>Project Settings ➔ API</em>) y pégalos aquí abajo:</li>
                </ol>

                <div className="space-y-3">
                  <div>
                    <label className="block font-cinzel uppercase tracking-wider text-stone-700 mb-1">
                      Project URL
                    </label>
                    <input
                      type="text"
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                      placeholder="https://xyz.supabase.co"
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-mono focus:ring-1 focus:ring-emerald-800 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-cinzel uppercase tracking-wider text-stone-700 mb-1">
                      Anon Public Key
                    </label>
                    <input
                      type="password"
                      value={supabaseKey}
                      onChange={(e) => setSupabaseKey(e.target.value)}
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..."
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-mono focus:ring-1 focus:ring-emerald-800 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center gap-2 border-t border-stone-100">
                {isConfigured && (
                  <button
                    type="button"
                    onClick={clearSupabaseCredentials}
                    className="text-xs text-rose-600 hover:underline font-cinzel"
                  >
                    Desconectar Supabase
                  </button>
                )}
                <div className="flex gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={() => setShowDbModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-cinzel uppercase text-stone-600 hover:bg-stone-100"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    onClick={() => saveSupabaseCredentials(supabaseUrl, supabaseKey)}
                    className="px-5 py-2 bg-emerald-900 hover:bg-emerald-800 text-amber-50 rounded-xl text-xs font-cinzel uppercase tracking-wider transition-all shadow-sm"
                  >
                    Guardar y Conectar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
