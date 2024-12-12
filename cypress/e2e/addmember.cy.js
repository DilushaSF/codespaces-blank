describe("Add Member Tests", () => {
  it("should successfully add a new member", () => {
    cy.visit("https://ichurch-fe.vercel.app/addmembers.html");
    cy.wait(2000);

    cy.get("#firstName").type("JohnDoe");
    cy.get("#middleName").type("john.doe@example.com");
    cy.get("#sirName").type("Kenny");
    cy.get("#nameOfMother").type("John Doe");
    cy.get("#nameOfFather").type("john.doe@example.com");
    cy.get("#birthPlace").type("1234567890");
    cy.get("#dob").type("2000-01-05");
    cy.get("#address").type("john.doe@example.com");
    cy.get("#contactNo").type("1235");
    cy.get("#marriedDate").type("2020-01-05");
    cy.get("#marriedChurch").type("john.doe@example.com");

    // Submit the form
    cy.get("#contactNo").clear().type("12345");
    cy.get(".btn-success").click();
    cy.get("#contactNo:invalid").should("exist");

    cy.get("#contactNo").clear().type("1234567890");
    cy.get(".btn-success").click();

    cy.url().should("include", "/members.html");
  });
});
