function doGet(e) {
  var theUser = DriveApp.getRootFolder().getOwner();
  var thePhotoUrl = theUser.getPhotoUrl().replace("=s64", "=s128");

  var theHTML = HtmlService.createTemplateFromFile("Form.html");
  theHTML.photoUrl = thePhotoUrl;
  theHTML.userName = theUser.getName();

  return theHTML
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setTitle("Gmail Signature")
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function setSignature(theHtml) {
  var theUser = Session.getActiveUser().getEmail();
  var sendAsSettings = Gmail.Users.Settings.SendAs.list(theUser).sendAs[0];
  sendAsSettings.signature = theHtml;

  Gmail.Users.Settings.SendAs.patch(sendAsSettings, theUser, theUser);
}
