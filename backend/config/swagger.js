//http://localhost:3000/api-docs/
export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Tutor Pro",
      version: "1.0.0",
      description: "Documentation de l'API",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Serveur de dev",
      },
    ],
  },
  apis: ["./routes/*.js"], // Fichiers contenant les commentaires JSDoc
};
