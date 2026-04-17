import { createGateway } from "ai";
const provider = createGateway({ apiKey: "test", baseURL: "test" });
const model = provider.languageModel("test");
console.log(model.doGenerate);
