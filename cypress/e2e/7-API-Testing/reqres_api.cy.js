describe("JSONPlaceholder API Automation Testing", () => {
  const baseUrl = "https://jsonplaceholder.typicode.com";

  it("GET - All Posts (Request 1)", () => {
    cy.request("GET", `${baseUrl}/posts`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length(100);
    });
  });

  it("GET - Single Post (Request 2)", () => {
    cy.request("GET", `${baseUrl}/posts/1`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
      expect(response.body).to.have.property("title");
    });
  });

  it("GET - Post Not Found (Request 3)", () => {
    cy.request({
      method: "GET",
      url: `${baseUrl}/posts/999`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("POST - Create New Post (Request 4)", () => {
    cy.request("POST", `${baseUrl}/posts`, {
      title: "Tugas QA Nada",
      body: "Belajar API Automation",
      userId: 1,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.title).to.eq("Tugas QA Nada");
    });
  });

  it("PUT - Update Full Post (Request 5)", () => {
    cy.request("PUT", `${baseUrl}/posts/1`, {
      id: 1,
      title: "Update Judul",
      body: "Update Body",
      userId: 1,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq("Update Judul");
    });
  });

  it("PATCH - Update Partial Post (Request 6)", () => {
    cy.request("PATCH", `${baseUrl}/posts/1`, {
      title: "Judul Baru Saja",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.title).to.eq("Judul Baru Saja");
    });
  });

  it("DELETE - Remove Post (Request 7)", () => {
    cy.request("DELETE", `${baseUrl}/posts/1`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
