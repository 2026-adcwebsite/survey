// ═══════════════════════════════════════════════════════════
// WEBORA LEADS — Google Apps Script
// Merr të dhënat nga formulari dhe i shton në Google Sheet
// ═══════════════════════════════════════════════════════════

function doPost(e) {
  try {
    // Merr sheet-in aktiv
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse të dhënat e dërguara
    var data = JSON.parse(e.postData.contents);

    // Data aktuale në formatin shqip
    var now = new Date();
    var dataStr = Utilities.formatDate(now, "Europe/Tirane", "dd/MM/yyyy HH:mm");

    // Shto një rresht të ri me të dhënat
    sheet.appendRow([
      dataStr,
      data.name || '',
      data.phone || '',
      data.email || '',
      data.goal || '',
      data.timeline || '',
      data.budget || '',
      data.industry || '',
      data.calculatedLoss || '',
      data.yearlyLoss || '',
      data.source || 'website'
    ]);

    // Opsionale: Dërgo email njoftimi për çdo lead të ri
    // Hiq komentet për ta aktivizuar:
    /*
    MailApp.sendEmail({
      to: "email@yti.al",
      subject: "🎯 Lead i ri nga Webora — " + data.name,
      body: "Emri: " + data.name + "\n" +
            "Telefoni: " + data.phone + "\n" +
            "Email: " + (data.email || 'pa email') + "\n" +
            "Qëllimi: " + data.goal + "\n" +
            "Afati: " + data.timeline + "\n" +
            "Buxheti: " + data.budget + "\n" +
            "Humbja e llogaritur: " + data.calculatedLoss
    });
    */

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Lead u ruajt' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test funksion — mund ta ekzekutosh për të provuar
function testAppend() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        name: "Test Klienti",
        phone: "+355 69 123 4567",
        email: "test@test.al",
        goal: "rezervime",
        timeline: "muaj1",
        budget: "standard",
        industry: "Restorant",
        calculatedLoss: "€2,340",
        yearlyLoss: "€28,080",
        source: "test"
      })
    }
  };
  doPost(testData);
}
