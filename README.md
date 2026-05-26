# NEMT Invoice Generator

A local, offline invoice generator for Non-Emergency Medical Transportation.

## How to Use

1. Open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).
   - No internet connection required after first load (fonts load from Google Fonts once).
   - No installation needed.

2. Fill in your **Company Information** on the left panel — this saves to the preview in real time.

3. Fill in **Patient / Trip Information**: name, phone, date of service, appointment time, pick-up time, and addresses.

4. Add **Line Items** — description, breakdown/details, and amount. Click "+ Add Line Item" for each charge.

5. Check the **Payment Method** box(es) that apply.

6. Add any **Notes** at the bottom (e.g. payment terms, thank-you message).

7. Click **🖨 Print / Save PDF** — your browser's print dialog will open. Choose "Save as PDF" as the destination to save a PDF copy, or select your printer to print directly.

## Tips

- The editor panel (left) is hidden when printing — only the invoice sheet is printed.
- Use **↺ Reset** to clear all fields and start a new invoice.
- The invoice number is auto-generated each time you reset or reload.
- Works fully offline — just keep the three files together in the same folder:
  - `index.html`
  - `style.css`
  - `app.js`
