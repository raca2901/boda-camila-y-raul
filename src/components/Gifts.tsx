import React, { useState } from 'react';
import { Mail, Copy, Check, Heart, Sparkles } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';

interface GiftsProps {
  bankInfo: WeddingConfig['bankAccountInfo'];
}

export const Gifts: React.FC<GiftsProps> = ({ bankInfo }) => {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bankInfo.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="regalos" className="py-20 px-4 bg-[#F5F2EB]/50">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-cinzel uppercase tracking-widest mb-3">
          <Heart className="w-3.5 h-3.5 text-amber-700" />
          <span>Lluvia de Sobres</span>
        </div>

        {/* Título exacto solicitado por Camila */}
        <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-emerald-950 mb-3 max-w-2xl mx-auto leading-tight">
          Tu compañía y buenos deseos son nuestro mejor regalo
        </h2>
        
        {/* Subtítulo exacto solicitado por Camila */}
        <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed mb-10">
          Si además deseas tener un detalle con nosotros para dar inicio a nuestro nuevo hogar:
        </p>

        {/* Gift Options Cards (Sin mención de regalos físicos) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          
          {/* Lluvia de sobres */}
          <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm flex flex-col justify-between items-center text-center">
            <div>
              <div className="w-14 h-14 rounded-full bg-amber-100/70 text-amber-800 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-serif-title text-2xl font-normal text-emerald-950 mb-2">
                Lluvia de Sobres
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Dispondremos de un cofre especial en la recepción para recibir sus sobres y cartas con dedicatorias de amor y bendiciones.
              </p>
            </div>
            <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-cinzel text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Cofre en la recepción</span>
            </div>
          </div>

          {/* Transferencia Bancaria */}
          <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm flex flex-col justify-between items-center text-center">
            <div>
              <div className="w-14 h-14 rounded-full bg-emerald-100/70 text-emerald-900 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-emerald-800" />
              </div>
              <h3 className="font-serif-title text-2xl font-normal text-emerald-950 mb-2">
                Transferencia Digital
              </h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Si prefieres hacernos llegar tu detalle de manera digital para nuestro nuevo hogar, ponemos a disposición nuestra cuenta de ahorros.
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="mt-6 px-6 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-50 text-xs font-cinzel uppercase tracking-wider rounded-full transition-all shadow-sm"
            >
              Ver Datos Bancarios
            </button>
          </div>

        </div>

        {/* Modal de Datos Bancarios */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-amber-900/20 text-left relative animate-in zoom-in-95 duration-200">
              <h3 className="font-serif-title text-2xl font-normal text-emerald-950 mb-1">
                Datos de Transferencia
              </h3>
              <p className="text-xs text-stone-500 font-light mb-6">
                Agradecemos de corazón tu cariño y apoyo para el inicio de nuestro nuevo hogar.
              </p>

              <div className="space-y-3.5 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-sm">
                <div>
                  <span className="text-[11px] font-cinzel text-stone-400 block uppercase">Banco</span>
                  <span className="font-medium text-stone-800">{bankInfo.bankName}</span>
                </div>
                <div>
                  <span className="text-[11px] font-cinzel text-stone-400 block uppercase">Tipo de Cuenta</span>
                  <span className="font-medium text-stone-800">{bankInfo.accountType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-cinzel text-stone-400 block uppercase">Número de Cuenta</span>
                    <span className="font-mono text-base font-semibold text-emerald-950 tracking-wider">
                      {bankInfo.accountNumber}
                    </span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-2 bg-white rounded-xl border border-stone-200 hover:border-amber-700 text-stone-700 hover:text-amber-800 transition-colors shadow-sm flex items-center gap-1 text-xs"
                    title="Copiar número"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-medium">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <div>
                  <span className="text-[11px] font-cinzel text-stone-400 block uppercase">Titular</span>
                  <span className="font-medium text-stone-800">Raúl Ernesto & María Camila</span>
                </div>
                <div>
                  <span className="text-[11px] font-cinzel text-stone-400 block uppercase">Identificación</span>
                  <span className="font-medium text-stone-800">{bankInfo.idNumber}</span>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-cinzel uppercase tracking-wider rounded-xl transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
