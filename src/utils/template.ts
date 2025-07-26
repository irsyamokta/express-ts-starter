import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

export const renderEmailTemplate = (templateName: string, data: Record<string, any>): string => {
    const templatePath = path.join(__dirname, "..", "views", "emails", `${templateName}.html`);
    const templateSource = fs.readFileSync(templatePath, "utf8");
    const template = Handlebars.compile(templateSource);
    return template(data);
};
