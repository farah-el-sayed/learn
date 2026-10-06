export function downloadCertificatePdf({ course, student, date, code }) {
  const pdf = buildCertificatePdf({ course, student, date, code });
  const bytes = new TextEncoder().encode(pdf);
  const blob = new Blob([bytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safe = String(course || 'certificate').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'certificate';
  a.href = url;
  a.download = `certificate-${safe}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function printCertificate({ course, student, date, code }) {
  const w = window.open('', '_blank', 'width=1000,height=700');
  if (!w) return;
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Certificate - ${escapeHtml(
    course
  )}</title><style>
      body{font-family:Georgia,serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f7f5f0}
      .card{border:2px solid #294a3a;padding:56px 64px;text-align:center;background:#fff;max-width:640px}
      .kicker{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#888}
      h1{font-size:34px;margin:14px 0 8px}
      p{color:#555;font-size:14px}
      .code{margin-top:18px;font-size:11px;color:#999}
    </style></head><body><div class="card">
      <div class="kicker">Certificate of completion</div>
      <h1>${escapeHtml(course)}</h1>
      <p>Awarded to <strong>${escapeHtml(student)}</strong> &middot; ${escapeHtml(date)}</p>
      <div class="code">Ref ${escapeHtml(code)}</div>
    </div><script>window.onload=()=>{window.print()}</script></body></html>`);
  w.document.close();
}

// Minimal single-page PDF builder (no dependency): Helvetica text on A4 landscape.
function buildCertificatePdf({ course, student, date, code }) {
  const esc = s => String(s ?? '').replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
  const content = [
    'BT /F1 13 Tf 60 500 Td (Certificate of completion) Tj ET',
    `BT /F1 26 Tf 60 460 Td (${esc(course)}) Tj ET`,
    `BT /F1 12 Tf 60 430 Td (Awarded to ${esc(student)} - ${esc(date)}) Tj ET`,
    `BT /F1 10 Tf 60 410 Td (Ref ${esc(code)}) Tj ET`,
    '0.16 0.29 0.23 RG 2 w 40 370 762 160 re S',
  ].join('\n');

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 842 595] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
  ];

  let out = '%PDF-1.4\n';
  const offsets = [];
  objects.forEach((body, i) => {
    offsets.push(out.length);
    out += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefAt = out.length;
  out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach(o => {
    out += `${String(o).padStart(10, '0')} 00000 n \n`;
  });
  out += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF`;
  return out;
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
