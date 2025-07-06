// Google Apps Script for RSVP Form Integration
// Copy this code to your Google Apps Script project

function doPost(e) {
  try {
    // Parse the request data
    const data = JSON.parse(e.postData.contents);
    
    // Open your Google Sheet (replace with your sheet ID)
    const SHEET_ID = '1F5IU6FylloMdCeSmAWiEQhXKXeM9R-RLHJ7OW2Rit8E';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Prepare the row data
    const rowData = [
      new Date(), // Timestamp
      data.name,
      data.attendance,
      data.adults,
      data.kids,
      data.dogs
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('RSVP Handler is running');
}

// Optional: Function to set up the sheet headers (run once)
function setupSheetHeaders() {
  const SHEET_ID = '1F5IU6FylloMdCeSmAWiEQhXKXeM9R-RLHJ7OW2Rit8E';
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  
  const headers = [
    'Timestamp',
    'Name',
    'Attendance',
    'Adults',
    'Kids',
    'Dogs'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
}
