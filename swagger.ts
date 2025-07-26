import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express TS Starter API",
            version: "1.0.0",
            description: "Dokumentasi REST API untuk project Express + TypeScript. Berisi endpoint untuk autentikasi dan fitur lainnya.",
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local development server",
            },
            {
                url: "https://your-production-domain.com",
                description: "Production server",
            },
        ],
    },
    apis: ["./src/modules/**/*.ts"],
});

export default swaggerSpec;
