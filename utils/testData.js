function uniqueEmail(prefix = "qa.automation") {
  return `${prefix}+${Date.now()}@examplemail.com`;
}

function buildUser() {
  const firstName = "QA";
  const lastName = "Lead";
  const fullName = `${firstName} ${lastName}`;

  return {
    name: fullName,
    firstName,
    lastName,
    email: uniqueEmail(),
    password: "P@ssword12345",
    birthDay: "10",
    birthMonth: "5",
    birthYear: "1990",
    address: "100 Test Avenue",
    country: "India",
    state: "Karnataka",
    city: "Bengaluru",
    zipCode: "560001",
    mobileNumber: "9999999999",
  };
}

function contactData() {
  return {
    name: "QA Automation",
    email: uniqueEmail("contact.case"),
    subject: "Automation framework validation",
    message: "This is an automated contact form submission to validate the regression path.",
  };
}

module.exports = {
  uniqueEmail,
  buildUser,
  contactData,
};
