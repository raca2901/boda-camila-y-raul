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
  ExternalLink,
  Sparkles,
  Image as ImageIcon,
  Share2,
} from 'lucide-react';
import type { Guest, RsvpStatus } from '../types/wedding';
import { generateUUID } from '../types/wedding';
import { isConfigured, saveSupabaseCredentials, clearSupabaseCredentials } from '../lib/supabase';
import { generateGuestInviteCard } from '../lib/inviteCardGenerator';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  guests: Guest[];
  onAddGuest: (guest: Guest) => Promise<boolean>;
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
  const [newPhone, setNewPhone] = useState('');
  const [newPasses, setNewPasses] = useState(2);
  const [newUuid, setNewUuid] = useState(generateUUID());
  const [isSavingGuest, setIsSavingGuest] = useState(false);
  const [justAddedGuest, setJustAddedGuest] = useState<Guest | null>(null);

  // Excel / CSV Import State
  const [showImportModal, setShowImportModal] = useState(false);
  const [importedPreview, setImportedPreview] = useState<Guest[]>([]);
  const [isImporting, setIsImporting] = useState(false);
  const [importFeedback, setImportFeedback] = useState<string | null>(null);

  // Supabase Config Modal
  const [showDbModal, setShowDbModal] = useState(false);
  const [supabaseUrl, setSupabaseUrl] = useState(localStorage.getItem('wedding_supabase_url') || '');
  const [supabaseKey, setSupabaseKey] = useState(localStorage.getItem('wedding_supabase_anon_key') || '');

  // Copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Personalized Narnia Visual Invitation Card modal state
  const [cardPreviewGuest, setCardPreviewGuest] = useState<Guest | null>(null);
  const [cardPreviewDataUrl, setCardPreviewDataUrl] = useState<string | null>(null);
  const [cardPreviewBlob, setCardPreviewBlob] = useState<Blob | null>(null);
  const [cardPreviewFilename, setCardPreviewFilename] = useState<string>('invitacion-boda.png');
  const [isGeneratingCard, setIsGeneratingCard] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle PIN unlock
  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pinInput.trim().toLowerCase();
    if (clean === '2027' || clean === 'camila2027' || clean === 'raul2027') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  // Helper to build full invitation URL for a guest
  const getGuestLink = (guest: Guest) => {
    const origin = window.location.origin;
    return `${origin}/?id=${guest.id}`;
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
      g.id.toLowerCase().includes(search.toLowerCase()) ||
      (g.phone && g.phone.toLowerCase().includes(search.toLowerCase())) ||
      (g.code && g.code.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenAddModal = () => {
    setNewName('');
    setNewPhone('');
    setNewPasses(2);
    setNewUuid(generateUUID());
    setJustAddedGuest(null);
    setShowAddModal(true);
  };

  const handleCreateGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    setIsSavingGuest(true);
    const code = newName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 10) || newUuid.slice(0, 8).toUpperCase();

    const createdGuest: Guest = {
      id: newUuid,
      code,
      name: newName.trim(),
      phone: newPhone.trim(),
      passes: newPasses,
      confirmedPasses: 0,
      status: 'pending',
      updatedAt: new Date().toISOString(),
    };

    const success = await onAddGuest(createdGuest);
    setIsSavingGuest(false);

    if (success) {
      setJustAddedGuest(createdGuest);
    }
  };

  const handleCopyLink = (guest: Guest) => {
    const link = getGuestLink(guest);
    navigator.clipboard.writeText(link);
    setCopiedId(guest.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const buildWhatsAppMessage = (guest: Guest) => {
    const link = getGuestLink(guest);
    const passesText =
      guest.passes === 1
        ? '1 pase reservado especialmente para ti'
        : `${guest.passes} pases reservados especialmente para ustedes`;

    return [
      `✦ *LAS CRÓNICAS DE NUESTRA BODA* ✦`,
      `_Raúl Ernesto & María Camila_`,
      ``,
      `¡Hola *${guest.name}*! ♡`,
      ``,
      `Con el corazón lleno de alegría, queremos invitarte a cruzar las puertas del ropero y acompañarnos en la gran aventura de unir nuestras vidas el próximo *31 de enero de 2027* en Copacabana, Antioquia.`,
      ``,
      `Hemos preparado una *invitación privada y exclusiva* (${passesText}), donde podrás descubrir nuestra historia, los detalles del gran día y confirmar tu asistencia:`,
      ``,
      `▸ *Abre tu invitación aquí:*`,
      `${link}`,
      ``,
      `_«A veces, abrir una puerta es el inicio de la mayor aventura de todas.»_`,
      ``,
      `¡Esperamos con todo el corazón celebrar juntos este día inolvidable! ✦`,
    ].join('\n');
  };

  const handleSendWhatsApp = (guest: Guest) => {
    const text = encodeURIComponent(buildWhatsAppMessage(guest));
    const cleanPhone = (guest.phone || '').replace(/\D/g, '');
    const url = cleanPhone
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${text}`
      : `https://api.whatsapp.com/send?text=${text}`;
    window.open(url, '_blank');
  };

  const handleOpenCardPreview = async (guest: Guest) => {
    setCardPreviewGuest(guest);
    setCardPreviewDataUrl(null);
    setCardPreviewBlob(null);
    setShareFeedback(null);
    setIsGeneratingCard(true);
    try {
      const { dataUrl, blob, filename } = await generateGuestInviteCard(guest);
      setCardPreviewDataUrl(dataUrl);
      setCardPreviewBlob(blob);
      setCardPreviewFilename(filename);
    } catch (err) {
      console.error('Error generating invitation card:', err);
      setShareFeedback('No se pudo generar la tarjeta en este navegador.');
    } finally {
      setIsGeneratingCard(false);
    }
  };

  const handleDownloadCard = () => {
    if (!cardPreviewDataUrl) return;
    const a = document.createElement('a');
    a.href = cardPreviewDataUrl;
    a.download = cardPreviewFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyCardImage = async () => {
    if (!cardPreviewBlob) return;
    try {
      if (navigator.clipboard && 'write' in navigator.clipboard && typeof ClipboardItem !== 'undefined') {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': cardPreviewBlob })]);
        setShareFeedback(
          '¡Imagen copiada! Ahora ve a WhatsApp, pégala (Ctrl+V), y luego presiona "Copiar Mensaje" para pegarlo en "Añade un comentario" debajo de la imagen.'
        );
        return;
      }
    } catch {
      // Fallback to download
    }
    handleDownloadCard();
    setShareFeedback(
      'Tarjeta descargada. Adjúntala primero en WhatsApp y pega el mensaje en "Añade un comentario" para que quede la imagen arriba y el texto debajo.'
    );
  };

  const handleCopyFormattedMessage = async () => {
    if (!cardPreviewGuest) return;
    const message = buildWhatsAppMessage(cardPreviewGuest);
    try {
      await navigator.clipboard.writeText(message);
      setShareFeedback(
        '¡Mensaje copiado! Pégalo en el campo "Añade un comentario..." justo debajo de la imagen en WhatsApp y envía.'
      );
    } catch {
      setShareFeedback('No se pudo copiar automáticamente el texto.');
    }
  };

  const handleNativeShareCard = async () => {
    if (!cardPreviewGuest || !cardPreviewBlob) return;
    const message = buildWhatsAppMessage(cardPreviewGuest);
    const file = new File([cardPreviewBlob], cardPreviewFilename, { type: 'image/png' });

    // Always copy the formatted text first so the user can paste it right below the image as a single caption
    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // Ignore if clipboard blocked
    }

    // Share ONLY the image file (not text+file together) so WhatsApp never sends text first as a separate bubble!
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        setShareFeedback(
          'El texto ya quedó copiado. Al abrirse la imagen en WhatsApp, solo pega el texto en "Añade un comentario..." para que quede la imagen arriba y el texto debajo en un solo mensaje.'
        );
        await navigator.share({
          files: [file],
        });
        return;
      } catch {
        // User cancelled or share failed; fall through
      }
    }

    // Desktop fallback: copy image directly to clipboard
    await handleCopyCardImage();
  };

  const handleExportCsv = () => {
    const headers = [
      'Nombre',
      'UUID_Identificador',
      'Enlace_Invitacion',
      'Telefono',
      'Pases_Asignados',
      'Estado',
      'Pases_Confirmados',
      'Menu_Alergias',
      'Dedicatoria',
    ];
    const rows = guests.map((g) => [
      `"${g.name}"`,
      `"${g.id}"`,
      `"${getGuestLink(g)}"`,
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
    const templateContent = '\uFEFFNombre;Telefono;Pases\nFamilia Gómez Restrepo;+573001234567;4\nCarlos Mario & Pareja;+573109876543;2\nValentina Ramírez;+573205551234;1';
    const blob = new Blob([templateContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'plantilla_invitados_boda.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Parse uploaded CSV / Excel file and generate UUIDs for each
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

        const firstLine = lines[0];
        const delimiter = firstLine.includes(';') ? ';' : ',';

        const parsed: Guest[] = [];

        // Skip header line
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(delimiter).map((c) => c.replace(/^["']|["']$/g, '').trim());
          if (cols.length >= 1 && cols[0]) {
            const name = cols[0];
            const phone = cols[1] || '';
            const passes = parseInt(cols[2]) || 2;
            const uuid = generateUUID();
            const code = name
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toUpperCase()
              .replace(/[^A-Z0-9]/g, '')
              .slice(0, 10) || uuid.slice(0, 8);

            parsed.push({
              id: uuid,
              code,
              name,
              phone,
              passes,
              confirmedPasses: 0,
              status: 'pending',
              updatedAt: new Date().toISOString(),
            });
          }
        }

        setImportedPreview(parsed);
        setImportFeedback(`Se detectaron ${parsed.length} invitados con enlaces UUID generados listos para importar.`);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] rounded-3xl w-full max-w-6xl max-h-[94vh] flex flex-col shadow-2xl border border-amber-900/20 overflow-hidden text-stone-800">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-emerald-950 text-amber-50 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif-title text-xl sm:text-2xl font-light text-amber-50">
                Panel de Invitaciones Privadas
              </h2>
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-amber-200/70 block">
                Exclusivo para Camila & Raúl · Gestión de Enlaces y Confirmaciones
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
              Acceso Exclusivo para los Novios
            </h3>
            <p className="text-stone-500 text-sm max-w-sm mb-6 font-light">
              Ingresa tu PIN de seguridad para gestionar la lista de invitados, enviar enlaces privados y revisar quién ha confirmado.
            </p>

            <form onSubmit={handlePinSubmit} className="w-full max-w-xs space-y-3">
              <input
                type="password"
                maxLength={10}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="PIN (por defecto: 2027)"
                className="w-full px-4 py-3 bg-white border border-stone-300 rounded-2xl text-center text-lg font-mono tracking-widest focus:ring-2 focus:ring-emerald-800 focus:outline-none shadow-xs"
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
                      {isConfigured ? 'Conectado en Tiempo Real' : 'Almacenamiento Local (Listo)'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 font-light mt-0.5">
                    {isConfigured
                      ? 'Cada confirmación y nuevo invitado se sincroniza al instante en Supabase.'
                      : 'Los enlaces y confirmaciones se guardan localmente. Puedes conectar Supabase en cualquier momento.'}
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
                  {isConfigured ? 'Configuración DB' : 'Conectar Supabase'}
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

              <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-sm bg-gradient-to-br from-white to-emerald-50/50">
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

              <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-sm bg-gradient-to-br from-white to-amber-50/50">
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

            {/* Actions Bar (Search, Status Filter, Import, Export, Add) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
              
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar por nombre, teléfono o UUID..."
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-800"
                  />
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="flex bg-stone-100 p-1 rounded-xl">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-2.5 py-1 text-[11px] font-cinzel uppercase rounded-lg transition-colors ${
                      statusFilter === 'all' ? 'bg-white text-emerald-950 font-bold shadow-xs' : 'text-stone-500'
                    }`}
                  >
                    Todos ({guests.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('confirmed')}
                    className={`px-2.5 py-1 text-[11px] font-cinzel uppercase rounded-lg transition-colors ${
                      statusFilter === 'confirmed' ? 'bg-emerald-100 text-emerald-900 font-bold shadow-xs' : 'text-stone-500'
                    }`}
                  >
                    Confirmados ({guests.filter((g) => g.status === 'confirmed').length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('pending')}
                    className={`px-2.5 py-1 text-[11px] font-cinzel uppercase rounded-lg transition-colors ${
                      statusFilter === 'pending' ? 'bg-amber-100 text-amber-900 font-bold shadow-xs' : 'text-stone-500'
                    }`}
                  >
                    Pendientes ({guests.filter((g) => g.status === 'pending').length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('declined')}
                    className={`px-2.5 py-1 text-[11px] font-cinzel uppercase rounded-lg transition-colors ${
                      statusFilter === 'declined' ? 'bg-rose-100 text-rose-900 font-bold shadow-xs' : 'text-stone-500'
                    }`}
                  >
                    No Asisten ({guests.filter((g) => g.status === 'declined').length})
                  </button>
                </div>
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
                  title="Descargar lista en formato Excel/CSV con todos los enlaces"
                  className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-cinzel uppercase tracking-wider transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span className="hidden sm:inline">Exportar</span>
                </button>

                <button
                  onClick={handleOpenAddModal}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-amber-50 rounded-xl text-xs font-cinzel uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Crear Invitación</span>
                </button>
              </div>

            </div>

            {/* Guests Table */}
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-cinzel uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Invitado / Familia</th>
                      <th className="py-3.5 px-3">Enlace Privado (UUID)</th>
                      <th className="py-3.5 px-3 text-center">Pases</th>
                      <th className="py-3.5 px-3 text-center">Estado</th>
                      <th className="py-3.5 px-4">Menú / Dedicatoria</th>
                      <th className="py-3.5 px-4 text-right">Enviar / Copiar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredGuests.length > 0 ? (
                      filteredGuests.map((guest) => {
                        const link = getGuestLink(guest);
                        return (
                          <tr key={guest.id} className="hover:bg-stone-50/70 transition-colors">
                            {/* Guest Name & Phone */}
                            <td className="py-3.5 px-4 font-medium text-stone-800">
                              <div className="text-sm font-serif-title">{guest.name}</div>
                              {guest.phone ? (
                                <div className="text-[10px] text-stone-400 font-mono mt-0.5">{guest.phone}</div>
                              ) : (
                                <div className="text-[10px] text-stone-300 italic">Sin teléfono</div>
                              )}
                            </td>

                            {/* UUID & Link */}
                            <td className="py-3.5 px-3">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[11px] text-emerald-950 bg-stone-100 px-2 py-1 rounded-lg border border-stone-200">
                                  {guest.id.slice(0, 8)}...{guest.id.slice(-4)}
                                </span>
                                <button
                                  onClick={() => handleCopyLink(guest)}
                                  title="Copiar enlace único de invitación"
                                  className="p-1 hover:bg-stone-200 rounded text-stone-500"
                                >
                                  {copiedId === guest.id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            </td>

                            {/* Passes */}
                            <td className="py-3.5 px-3 text-center">
                              <span className="font-semibold text-stone-800 text-sm">
                                {guest.status === 'confirmed' ? guest.confirmedPasses : guest.passes}
                              </span>
                              <span className="text-[10px] text-stone-400">/{guest.passes}</span>
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-3 text-center">
                              {guest.status === 'confirmed' && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300">
                                  ✓ Confirmado ({guest.confirmedPasses})
                                </span>
                              )}
                              {guest.status === 'declined' && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-900 border border-rose-300">
                                  ✕ No Asistirá
                                </span>
                              )}
                              {guest.status === 'pending' && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                                  ⏳ Pendiente
                                </span>
                              )}
                            </td>

                            {/* Dietary & Notes */}
                            <td className="py-3.5 px-4 max-w-xs text-stone-600">
                              {guest.dietaryPreference && guest.dietaryPreference !== 'standard' && (
                                <span className="text-amber-800 font-semibold block text-[11px]">
                                  🍽️ Menú: {guest.dietaryPreference} {guest.dietaryNotes && `(${guest.dietaryNotes})`}
                                </span>
                              )}
                              {guest.notes ? (
                                <span className="italic text-stone-500 text-xs line-clamp-2">
                                  "{guest.notes}"
                                </span>
                              ) : (
                                <span className="text-stone-300 text-xs">—</span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right space-x-1 shrink-0 whitespace-nowrap">
                              {/* Personalized Visual Invitation Card */}
                              <button
                                onClick={() => handleOpenCardPreview(guest)}
                                title="Generar tarjeta visual personalizada (imagen para WhatsApp)"
                                className="p-2 text-amber-950 bg-amber-200 hover:bg-amber-300 rounded-xl transition-all shadow-xs inline-block cursor-pointer"
                              >
                                <ImageIcon className="w-4 h-4" />
                              </button>

                              {/* Send WhatsApp */}
                              <button
                                onClick={() => handleSendWhatsApp(guest)}
                                title="Enviar invitación personalizada por WhatsApp"
                                className="p-2 text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-xs inline-block cursor-pointer"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </button>

                              {/* Copy Link */}
                              <button
                                onClick={() => handleCopyLink(guest)}
                                title="Copiar enlace con UUID"
                                className="p-2 text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors inline-block"
                              >
                                {copiedId === guest.id ? (
                                  <Check className="w-4 h-4 text-emerald-600" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>

                              {/* Open Guest View */}
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Ver cómo ve el invitado su invitación"
                                className="p-2 text-stone-500 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors inline-block"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>

                              {/* Delete */}
                              <button
                                onClick={() => {
                                  if (confirm(`¿Eliminar la invitación de ${guest.name}?`)) {
                                    onDeleteGuest(guest.id);
                                  }
                                }}
                                title="Eliminar invitado"
                                className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors inline-block"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-10 text-center text-stone-400 text-sm">
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

        {/* Modal: Create Single Guest / Invite */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
              
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <h3 className="font-serif-title text-2xl font-medium text-emerald-950">
                    Crear Nueva Invitación Privada
                  </h3>
                </div>
                <button onClick={() => setShowAddModal(false)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!justAddedGuest ? (
                <form onSubmit={handleCreateGuest} className="space-y-4">
                  <div>
                    <label className="block text-xs font-cinzel uppercase tracking-wider text-stone-700 mb-1">
                      Nombre o Familia del Invitado *
                    </label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Ej. Familia Rodríguez Gómez o Mariana Restrepo"
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
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
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-cinzel uppercase tracking-wider text-stone-700 mb-1">
                        WhatsApp (opcional)
                      </label>
                      <input
                        type="text"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        placeholder="+57 300 000 0000"
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-cinzel uppercase tracking-wider text-stone-500">
                        UUID Único Asignado Automáticamente:
                      </label>
                      <button
                        type="button"
                        onClick={() => setNewUuid(generateUUID())}
                        className="text-[10px] text-emerald-800 hover:underline font-mono"
                      >
                        Generar otro
                      </button>
                    </div>
                    <div className="w-full px-3 py-2 bg-stone-100 rounded-xl text-xs font-mono text-stone-600 select-all border border-stone-200">
                      {newUuid}
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end gap-2 border-t border-stone-100">
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
                      className="px-5 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-amber-50 rounded-xl text-xs font-cinzel uppercase tracking-wider transition-all disabled:opacity-50 shadow-md"
                    >
                      {isSavingGuest ? 'Creando enlace...' : 'Guardar y Generar Enlace'}
                    </button>
                  </div>
                </form>
              ) : (
                /* Success Card with 1-click send / copy */
                <div className="space-y-4 py-2">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2">
                    <CheckCircle className="w-10 h-10 text-emerald-700 mx-auto" />
                    <h4 className="font-serif-title text-xl text-emerald-950 font-medium">
                      ¡Invitación Creada con Éxito!
                    </h4>
                    <p className="text-xs text-stone-600">
                      Se ha generado el enlace privado único para <strong>{justAddedGuest.name}</strong> ({justAddedGuest.passes} pases).
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-cinzel uppercase tracking-wider text-stone-600 mb-1">
                      Enlace Personalizado:
                    </label>
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs font-mono text-stone-800 break-all select-all">
                      {getGuestLink(justAddedGuest)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                    <button
                      onClick={() => handleOpenCardPreview(justAddedGuest)}
                      className="py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-semibold rounded-xl text-xs font-cinzel uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <ImageIcon className="w-4 h-4" />
                      <span>Ver Tarjeta</span>
                    </button>

                    <button
                      onClick={() => handleSendWhatsApp(justAddedGuest)}
                      className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-cinzel uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>

                    <button
                      onClick={() => handleCopyLink(justAddedGuest)}
                      className="py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-cinzel uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      {copiedId === justAddedGuest.id ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-stone-600" />
                          <span>Copiar Link</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      onClick={() => handleOpenAddModal()}
                      className="text-xs text-emerald-900 hover:underline font-cinzel font-semibold"
                    >
                      + Crear Otro Invitado
                    </button>

                    <button
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-cinzel uppercase tracking-wider"
                    >
                      Listo / Cerrar
                    </button>
                  </div>
                </div>
              )}

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
                  Sube tu archivo de Excel guardado como <strong>.CSV</strong>. El sistema le asignará automáticamente un UUID único y un enlace privado a cada invitado.
                </p>

                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-stone-800">
                      ¿Necesitas el formato de ejemplo?
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
                    Columnas: <code>Nombre</code>, <code>Telefono</code> y <code>Pases</code>.
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
                    className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-xl text-xs file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-cinzel file:bg-emerald-950 file:text-amber-50 hover:file:bg-emerald-900 cursor-pointer"
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
                      Vista previa ({importedPreview.length} encontrados):
                    </span>
                    <ul className="divide-y divide-stone-200 text-xs">
                      {importedPreview.slice(0, 5).map((p, idx) => (
                        <li key={idx} className="py-1.5 flex justify-between">
                          <span className="font-medium text-stone-800">{p.name}</span>
                          <span className="text-stone-500">{p.passes} pases · UUID asignado</span>
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
                  className="px-5 py-2 bg-emerald-950 hover:bg-emerald-900 text-amber-50 rounded-xl text-xs font-cinzel uppercase tracking-wider transition-all disabled:opacity-50 shadow-sm"
                >
                  {isImporting ? 'Importando...' : `Importar ${importedPreview.length} Invitados`}
                </button>
              </div>
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
                  Para conectar tu base de datos en Supabase y sincronizar las confirmaciones en tiempo real:
                </p>
                <ol className="list-decimal list-inside space-y-2 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                  <li>Inicia sesión en tu cuenta de <strong>supabase.com</strong>.</li>
                  <li>Ve a tu proyecto y copia el script <code>supabase_schema.sql</code> en el <strong>SQL Editor</strong>.</li>
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
                    className="px-5 py-2 bg-emerald-950 hover:bg-emerald-900 text-amber-50 rounded-xl text-xs font-cinzel uppercase tracking-wider transition-all shadow-sm"
                  >
                    Guardar y Conectar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Personalized Narnia Invitation Card Preview & Share */}
        {cardPreviewGuest && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
            <div className="bg-[#fbf6ea] rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border-2 border-amber-500/45 max-h-[94vh] overflow-y-auto space-y-4">
              <div className="flex items-center justify-between border-b border-amber-900/15 pb-3">
                <div>
                  <span className="text-[10px] font-cinzel uppercase tracking-widest text-amber-800 font-semibold block">
                    Tarjeta Personalizada de Narnia
                  </span>
                  <h3 className="font-serif-title text-xl sm:text-2xl font-medium text-emerald-950">
                    Para: {cardPreviewGuest.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCardPreviewGuest(null);
                    setShareFeedback(null);
                  }}
                  className="p-1.5 rounded-full hover:bg-amber-900/10 text-stone-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Generated Card Preview */}
              <div className="rounded-2xl overflow-hidden bg-[#071411] border border-amber-500/40 shadow-xl flex items-center justify-center min-h-[320px]">
                {isGeneratingCard ? (
                  <div className="py-16 text-center space-y-2 text-amber-200">
                    <Sparkles className="w-7 h-7 mx-auto animate-spin text-amber-400" />
                    <p className="text-xs font-cinzel uppercase tracking-wider">
                      Ilustrando tarjeta real...
                    </p>
                  </div>
                ) : cardPreviewDataUrl ? (
                  <img
                    src={cardPreviewDataUrl}
                    alt={`Invitación personalizada para ${cardPreviewGuest.name}`}
                    className="w-full h-auto block"
                  />
                ) : (
                  <p className="text-xs text-amber-200/70 p-6 text-center">
                    No se pudo cargar la vista previa.
                  </p>
                )}
              </div>

              {shareFeedback && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs leading-relaxed">
                  {shareFeedback}
                </div>
              )}

              {/* Action Buttons — Image FIRST on top, Text BELOW as caption in 1 single WhatsApp bubble */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-amber-100/70 border border-amber-400/40 text-[11px] text-amber-950 leading-relaxed">
                  <strong>Para enviar en 1 solo mensaje (Imagen arriba + Texto debajo):</strong> envía o pega primero la <strong>imagen</strong> y pega el <strong>texto</strong> en <em>«Añade un comentario...»</em> antes de enviar.
                </div>

                <button
                  type="button"
                  disabled={!cardPreviewBlob}
                  onClick={handleNativeShareCard}
                  className="w-full py-3 px-4 bg-emerald-950 hover:bg-emerald-900 disabled:opacity-50 text-amber-100 border border-amber-400/50 rounded-xl text-xs font-cinzel uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-amber-300" />
                  <span>1. Enviar / Copiar Imagen (copia el texto)</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={!cardPreviewGuest}
                    onClick={handleCopyFormattedMessage}
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-cinzel uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>2. Copiar Texto</span>
                  </button>

                  <button
                    type="button"
                    disabled={!cardPreviewDataUrl}
                    onClick={handleDownloadCard}
                    className="py-2.5 px-3 bg-amber-100 hover:bg-amber-200 disabled:opacity-50 text-amber-950 border border-amber-400/40 rounded-xl text-xs font-cinzel uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar PNG</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleSendWhatsApp(cardPreviewGuest)}
                  className="w-full py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-[11px] font-cinzel uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Solo abrir WhatsApp con enlace y portada</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
