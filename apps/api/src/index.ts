import { createApp } from "./app.js";
import { config } from "./config.js";
import { fileStore } from "./db/store.js";

const app = createApp(fileStore(config.dataFile));

app.listen(config.port, () => {
  console.log(`Cafetería API en http://localhost:${config.port}`);
});
