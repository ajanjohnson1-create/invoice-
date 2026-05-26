/* ============================================
   NEMT Invoice — app.js
   ============================================ */

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  // Set today's date
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('invDate').value = today;
  document.getElementById('dateOfService').value = today;

  // Auto invoice number
  const stored = localStorage.getItem('nemt_inv_num');
  const num = stored ? parseInt(stored) + 1 : 1001;
  localStorage.setItem('nemt_inv_num', num);
  // Set into invoice # field (first inv-meta-val)
  const invNumEl = document.querySelector('.inv-meta-val');
  if (invNumEl) invNumEl.textContent = num;

  // Add 5 default empty rows
  for (let i = 0; i < 5; i++) addLineItem();

  // Tax rate listener
  document.getElementById('taxRate').addEventListener('input', recalc);
});

/* ── Add a line item row ── */
let rowCount = 0;

function addLineItem() {
  rowCount++;
  const n = rowCount;
  const tbody = document.getElementById('lineBody');

  const tr = document.createElement('tr');
  tr.id = `row_${n}`;
  tr.innerHTML = `
    <td>
      <div class="cell-edit" contenteditable="true" data-placeholder="Description" spellcheck="false"></div>
    </td>
    <td>
      <div class="cell-edit" contenteditable="true" data-placeholder="Breakdown / details" spellcheck="false"></div>
    </td>
    <td>
      <input type="number" class="cell-input" id="unit_${n}" placeholder="0.00"
        min="0" step="0.01" oninput="recalcRow(${n})" />
    </td>
    <td>
      <input type="number" class="cell-input center" id="qty_${n}" placeholder="1"
        min="0" step="1" value="1" oninput="recalcRow(${n})" />
    </td>
    <td>
      <span class="row-total" id="rowTotal_${n}">$0.00</span>
    </td>
    <td class="td-del no-print">
      <button class="btn-del-row" onclick="deleteRow(${n})" title="Remove row">✕</button>
    </td>
  `;
  tbody.appendChild(tr);
}

/* ── Delete a row ── */
function deleteRow(n) {
  const row = document.getElementById(`row_${n}`);
  if (row) row.remove();
  recalc();
}

/* ── Recalc a single row then totals ── */
function recalcRow(n) {
  const unit = parseFloat(document.getElementById(`unit_${n}`)?.value) || 0;
  const qty  = parseFloat(document.getElementById(`qty_${n}`)?.value)  || 0;
  const total = unit * qty;
  const el = document.getElementById(`rowTotal_${n}`);
  if (el) el.textContent = fmt(total);
  recalc();
}

/* ── Recalc all totals ── */
function recalc() {
  let subtotal = 0;
  document.querySelectorAll('[id^="rowTotal_"]').forEach(el => {
    const val = parseFloat(el.textContent.replace(/[$,]/g, '')) || 0;
    subtotal += val;
  });

  const taxPct = parseFloat(document.getElementById('taxRate')?.value) || 0;
  const tax    = subtotal * (taxPct / 100);
  const total  = subtotal + tax;

  setText('subtotalVal', fmt(subtotal));
  setText('taxVal', fmt(tax));
  setText('totalDueVal', fmt(total));
}

/* ── Helpers ── */
function fmt(n) {
  return '$' + n.toFixed(2);
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ── Reset ── */
function resetForm() {
  if (!confirm('Clear this invoice and start a new one?')) return;
  location.reload();
}
