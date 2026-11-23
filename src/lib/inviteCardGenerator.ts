import type { Guest } from '../types/wedding';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = src;
  });
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  focusY = 0.5
) {
  const imgRatio = img.width / img.height;
  const boxRatio = dw / dh;
  let sx = 0;
  let sy = 0;
  let sw = img.width;
  let sh = img.height;

  if (imgRatio > boxRatio) {
    sw = img.height * boxRatio;
    sx = (img.width - sw) / 2;
  } else {
    sh = img.width / boxRatio;
    sy = (img.height - sh) * focusY;
  }

  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

/**
 * Generates a high-resolution (1080x1350) personalized Chronicles of Narnia
 * wedding invitation card PNG tailored for a specific guest.
 */
export async function generateGuestInviteCard(guest: Guest): Promise<{
  dataUrl: string;
  blob: Blob;
  filename: string;
}> {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const W = 1080;
  const H = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D no disponible');

  const [bgImg, crestImg, coupleImg] = await Promise.all([
    loadImage('/media/narnia-forest-lantern.jpg'),
    loadImage('/media/narnia-aslan-crest.jpg'),
    loadImage('/media/foto-5.jpeg'),
  ]);

  // 1. Dark Snowy Narnia Forest Background
  drawCoverImage(ctx, bgImg, 0, 0, W, H, 0.5);

  const nightGrad = ctx.createLinearGradient(0, 0, 0, H);
  nightGrad.addColorStop(0, 'rgba(5, 16, 13, 0.72)');
  nightGrad.addColorStop(0.45, 'rgba(7, 20, 17, 0.58)');
  nightGrad.addColorStop(1, 'rgba(4, 12, 10, 0.90)');
  ctx.fillStyle = nightGrad;
  ctx.fillRect(0, 0, W, H);

  // Warm golden lantern halo
  const halo = ctx.createRadialGradient(W / 2, 470, 40, W / 2, 470, 520);
  halo.addColorStop(0, 'rgba(218, 180, 78, 0.24)');
  halo.addColorStop(1, 'rgba(218, 180, 78, 0)');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, W, H);

  // 2. Double Antique Gold Border + Corner Diamonds
  ctx.strokeStyle = 'rgba(218, 180, 78, 0.9)';
  ctx.lineWidth = 4;
  ctx.strokeRect(38, 38, W - 76, H - 76);

  ctx.strokeStyle = 'rgba(218, 180, 78, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(54, 54, W - 108, H - 108);

  const corners = [
    [54, 54],
    [W - 54, 54],
    [54, H - 54],
    [W - 54, H - 54],
  ];
  ctx.fillStyle = '#dab44e';
  for (const [cx, cy] of corners) {
    ctx.beginPath();
    ctx.moveTo(cx, cy - 10);
    ctx.lineTo(cx + 10, cy);
    ctx.lineTo(cx, cy + 10);
    ctx.lineTo(cx - 10, cy);
    ctx.closePath();
    ctx.fill();
  }

  // 3. Top Aslan Crest Medallion
  const crestSize = 132;
  const crestX = (W - crestSize) / 2;
  const crestY = 92;

  ctx.save();
  ctx.beginPath();
  ctx.arc(W / 2, crestY + crestSize / 2, crestSize / 2 + 5, 0, Math.PI * 2);
  ctx.fillStyle = '#dab44e';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(W / 2, crestY + crestSize / 2, crestSize / 2, 0, Math.PI * 2);
  ctx.clip();
  drawCoverImage(ctx, crestImg, crestX, crestY, crestSize, crestSize, 0.5);
  ctx.restore();

  // 4. Kicker & Names
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f8de91';
  ctx.font = '600 22px Cinzel, Georgia, serif';
  ctx.fillText('LAS CRÓNICAS DE NUESTRA BODA', W / 2, 272);

  // Gold divider rule
  const lineGrad = ctx.createLinearGradient(W / 2 - 240, 0, W / 2 + 240, 0);
  lineGrad.addColorStop(0, 'rgba(218,180,78,0)');
  lineGrad.addColorStop(0.5, 'rgba(218,180,78,0.85)');
  lineGrad.addColorStop(1, 'rgba(218,180,78,0)');
  ctx.strokeStyle = lineGrad;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 240, 296);
  ctx.lineTo(W / 2 + 240, 296);
  ctx.stroke();

  ctx.fillStyle = '#fcf5e4';
  ctx.font = '400 72px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('Raúl Ernesto & María Camila', W / 2, 376);

  ctx.fillStyle = '#e7c976';
  ctx.font = '600 23px Cinzel, Georgia, serif';
  ctx.fillText('31 DE ENERO DE 2027  ·  COPACABANA, ANTIOQUIA', W / 2, 424);

  // 5. Gilded Couple Portrait Frame
  const pw = 420;
  const ph = 460;
  const px = (W - pw) / 2;
  const py = 464;

  // Portrait shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetY = 14;
  drawRoundedRect(ctx, px - 10, py - 10, pw + 20, ph + 20, 28);
  const frameGrad = ctx.createLinearGradient(px, py, px + pw, py + ph);
  frameGrad.addColorStop(0, '#f5dc8c');
  frameGrad.addColorStop(0.35, '#9b7222');
  frameGrad.addColorStop(0.7, '#e8c468');
  frameGrad.addColorStop(1, '#8a641c');
  ctx.fillStyle = frameGrad;
  ctx.fill();
  ctx.restore();

  ctx.save();
  drawRoundedRect(ctx, px, py, pw, ph, 20);
  ctx.clip();
  drawCoverImage(ctx, coupleImg, px, py, pw, ph, 0.32);
  ctx.restore();

  // 6. Personalized Illuminated Parchment Card at Bottom
  const boxW = 840;
  const boxH = 264;
  const boxX = (W - boxW) / 2;
  const boxY = 964;

  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
  ctx.shadowBlur = 24;
  drawRoundedRect(ctx, boxX, boxY, boxW, boxH, 24);
  ctx.fillStyle = 'rgba(247, 239, 222, 0.96)';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#c9a227';
  ctx.stroke();
  ctx.restore();

  // Inner fine border
  drawRoundedRect(ctx, boxX + 12, boxY + 12, boxW - 24, boxH - 24, 16);
  ctx.strokeStyle = 'rgba(146, 108, 34, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#8b5e14';
  ctx.font = '600 20px Cinzel, Georgia, serif';
  ctx.fillText('INVITACIÓN EXCLUSIVA PARA', W / 2, boxY + 60);

  // Guest name (auto-shrink if long)
  let nameSize = 54;
  ctx.font = `600 ${nameSize}px "Cormorant Garamond", Georgia, serif`;
  while (ctx.measureText(guest.name).width > boxW - 90 && nameSize > 30) {
    nameSize -= 2;
    ctx.font = `600 ${nameSize}px "Cormorant Garamond", Georgia, serif`;
  }
  ctx.fillStyle = '#063326';
  ctx.fillText(guest.name, W / 2, boxY + 126);

  // Passes pill
  const passesLabel =
    guest.passes === 1 ? '1 PASE RESERVADO' : `${guest.passes} PASES RESERVADOS`;
  const pillW = 310;
  const pillH = 42;
  drawRoundedRect(ctx, W / 2 - pillW / 2, boxY + 150, pillW, pillH, 21);
  ctx.fillStyle = '#072a20';
  ctx.fill();
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#f8de91';
  ctx.font = '600 18px Cinzel, Georgia, serif';
  ctx.fillText(passesLabel, W / 2, boxY + 178);

  ctx.fillStyle = '#574d3d';
  ctx.font = 'italic 24px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(
    '«Abre tu enlace privado para cruzar las puertas del ropero»',
    W / 2,
    boxY + 230
  );

  // Footer note
  ctx.fillStyle = 'rgba(248, 222, 145, 0.78)';
  ctx.font = '500 18px Cinzel, Georgia, serif';
  ctx.fillText('5:00 P.M. · SEDE CAMPESTRE VEREDA EL NORAL', W / 2, 1272);

  const dataUrl = canvas.toDataURL('image/png');
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => {
      if (b) resolve(b);
      else reject(new Error('No se pudo exportar la imagen'));
    }, 'image/png');
  });

  const safeSlug = guest.name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  return {
    dataUrl,
    blob,
    filename: `invitacion-boda-${safeSlug || 'invitado'}.png`,
  };
}
