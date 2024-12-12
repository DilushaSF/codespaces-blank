describe("Edit Member Tests", () => {
  it("should successfully edit an existing member", () => {
    cy.visit("https://ichurch-fe.vercel.app/editmembers.html");
    cy.wait(2000);

    cy.get("#firstName").clear().type("JaneDoe");
    cy.get("#middleName").clear().type("jane.doe@example.com");
    cy.get("#sirName").clear().type("Kenny");
    cy.get("#nameOfMother").clear().type("Jane's Mother");
    cy.get("#nameOfFather").clear().type("Jane's Father");
    cy.get("#birthPlace").clear().type("New York");
    cy.get("#dob").clear().type("1990-05-10");
    cy.get("#address").clear().type("1234 Elm Street");
    cy.get("#contactNo").clear().type("9876543210");
    cy.get("#marriedDate").clear().type("2015-06-20");
    cy.get("#marriedChurch").clear().type("St. Patrick's Church");

    // Submit the form
    cy.get(".btn-primary").click();

    // application redirects to the members list page
    cy.visit("https://ichurch-fe.vercel.app/members.html");

    cy.get("#membersTableBody").should("contain", "JaneDoe");
  });
});
