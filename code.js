function doGet(e) {
    var theHTML = HtmlService.createTemplateFromFile('Form.html')
    theHTML.photoUrl="";
    theHTML.userName ="";
    theHTML.jobTitle = "{Job Title}";
    theHTML.dept = "{Department}";
    theHTML.location = "{Location}";
    theHTML.address = "{Address}";
    theHTML.phoneNumber = "{Phone Number}";
    try {
      var person = People.People.get("people/me", {personFields: 'names,photos'});
      theHTML.photoUrl = person.photos[0].url.replace("=s100","=s128");
      theHTML.userName = person.names[0].displayName;
    }
    catch (e) {
      Logger.log(e);
    }
  
    return theHTML.evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1")
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
