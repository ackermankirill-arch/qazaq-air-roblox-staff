/**
 * Optional Google Sheets receiver for Qazaq Air Roblox.
 * Set SHEET_ID to the spreadsheet ID, then deploy as a Web App.
 */
const SHEET_ID = 'PASTE_GOOGLE_SHEET_ID';
const TAB_NAME = 'Qazaq Air Events';
const HEADERS = ['Timestamp', 'Type', 'Flight ID', 'Flight Number', 'Route', 'Code', 'Date', 'Name', 'Email', 'UID', 'Role', 'Discipline Type', 'Details', 'By'];

function doPost(e) {
  try {
    const sheet = getSheet_();
    const data = JSON.parse(e.postData.contents || '{}');
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    sheet.appendRow([
      data.createdAt || new Date().toISOString(), data.type || '', data.flightId || '',
      data.number || data.flightNumber || '', data.route || '', data.code || '', data.date || '',
      data.displayName || data.name || '', data.email || '', data.uid || '', data.role || data.requestedRole || '',
      data.disciplineType || '', data.text || data.description || '', data.by || data.createdByEmail || ''
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}

function getSheet_() {
  if (SHEET_ID === 'PASTE_GOOGLE_SHEET_ID') throw new Error('Set SHEET_ID in apps-script.gs');
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  return spreadsheet.getSheetByName(TAB_NAME) || spreadsheet.insertSheet(TAB_NAME);
}
