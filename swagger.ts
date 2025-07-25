import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express TS Starter API",
            version: "1.0.0",
        },
    },
    apis: ["./src/modules/**/*.ts"],
});

export default swaggerSpec;
