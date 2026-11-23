import React, { useState } from 'react';
import { Mail, Copy, Check, Heart, Sparkles } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';
import { ChapterDivider, OrnateCorners } from './NarniaOrnaments';

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
    <section id="regalos" className="py-20 sm:py-24 px-4 narnia-night text-amber-50 relative overflow-hidden">
      {/* Warm golden candlelight glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fde68a_1px,transparent_1px)] [background-size:34px_34px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <ChapterDivider label="Capítulo V · Cofre Real" theme="dark" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/35 text-amber-200 text-xs font-cinzel uppercase tracking-widest mb-4">
          <Heart className="w-3.5 h-3.5 text-amber-400" />
          <span>Lluvia de Sobres</span>
        </div>

        {/* Título exacto solicitado por Camila */}
        <h2 className="font-serif-title text-3xl sm:text-5xl font-light text-amber-50 mb-3 max-w-2xl mx-auto leading-tight">
          Tu compañía y buenos deseos son nuestro mejor regalo
        </h2>

        {/* Subtítulo exacto solicitado por Camila */}
        <p className="text-amber-100/75 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed mb-12">
          Si además deseas tener un detalle con nosotros para dar inicio a nuestro nuevo hogar:
        </p>

        {/* Tarjetas del Cofre Real de Cair Paravel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {/* Lluvia de sobres */}
          <div className="relative bg-[#0c1f1a]/90 backdrop-blur-md p-7 sm:p-8 rounded-2xl border border-amber-400/35 shadow-[0_18px_45px_rgba(0,0,0,0.5)] flex flex-col justify-between items-center text-center">
            <OrnateCorners variant="gold" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-amber-400/15 border border-amber-300/45 text-amber-300 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-serif-title text-2xl font-normal text-amber-50 mb-2">
                Lluvia de Sobres
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/75 font-light leading-relaxed">
                Dispondremos de un cofre especial en la recepción para recibir sus sobres y cartas con dedicatorias de amor y bendiciones.
              </p>
            </div>
            <div className="relative z-10 mt-6 inline-flex items-center gap-1.5 text-xs font-cinzel text-amber-300 tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Cofre en la recepción</span>
            </div>
          </div>

          {/* Transferencia Digital */}
          <div className="relative bg-[#0c1f1a]/90 backdrop-blur-md p-7 sm:p-8 rounded-2xl border border-amber-400/35 shadow-[0_18px_45px_rgba(0,0,0,0.5)] flex flex-col justify-between items-center text-center">
            <OrnateCorners variant="gold" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full wax-seal text-amber-200 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif-title text-2xl font-normal text-amber-50 mb-2">
                Transferencia Digital
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/75 font-light leading-relaxed">
                Si prefieres hacernos llegar tu detalle de manera digital para nuestro nuevo hogar, ponemos a disposición nuestra cuenta de ahorros.
              </p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="relative z-10 mt-6 px-6 py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:brightness-110 text-emerald-950 font-semibold text-xs font-cinzel uppercase tracking-wider rounded-full transition-all shadow-lg cursor-pointer"
            >
              Ver Datos Bancarios
            </button>
          </div>
        </div>

        {/* Modal de Datos Bancarios — Estilo Pergamino Real */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative bg-[#fbf6ea] text-stone-800 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border-2 border-amber-600/45 text-left animate-in zoom-in-95 duration-200">
              <OrnateCorners variant="dark-gold" />

              <div className="relative z-10">
                <span className="text-[10px] font-cinzel uppercase tracking-[0.25em] text-amber-800 font-semibold block mb-1">
                  Cofre Digital · Cair Paravel
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-medium text-emerald-950 mb-1">
                  Datos de Transferencia
                </h3>
                <p className="text-xs text-stone-600 font-light mb-6">
                  Agradecemos de corazón tu cariño y apoyo para el inicio de nuestro nuevo hogar.
                </p>

                <div className="space-y-3.5 bg-[#f3ebd8] p-4 rounded-xl border border-amber-900/20 text-sm">
                  <div>
                    <span className="text-[11px] font-cinzel text-amber-900/70 block uppercase">Banco</span>
                    <span className="font-medium text-emerald-950">{bankInfo.bankName}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-cinzel text-amber-900/70 block uppercase">Tipo de Cuenta</span>
                    <span className="font-medium text-emerald-950">{bankInfo.accountType}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-cinzel text-amber-900/70 block uppercase">Número de Cuenta</span>
                      <span className="font-mono text-base font-semibold text-emerald-950 tracking-wider">
                        {bankInfo.accountNumber}
                      </span>
                    </div>
                    <button
                      onClick={handleCopy}
                      className="px-3 py-2 bg-emerald-950 hover:bg-emerald-900 text-amber-100 rounded-xl border border-amber-400/40 transition-colors shadow-sm flex items-center gap-1.5 text-xs cursor-pointer"
                      title="Copiar número"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-amber-300" />
                          <span className="font-medium">Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-amber-300" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div>
                    <span className="text-[11px] font-cinzel text-amber-900/70 block uppercase">Titular</span>
                    <span className="font-medium text-emerald-950">Raúl Ernesto & María Camila</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-cinzel text-amber-900/70 block uppercase">Identificación</span>
                    <span className="font-medium text-emerald-950">{bankInfo.idNumber}</span>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2.5 bg-emerald-950 hover:bg-emerald-900 text-amber-100 text-xs font-cinzel uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
