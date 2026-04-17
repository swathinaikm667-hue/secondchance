const express = require("express");
const app = express();
const searchRoutes = require("./searchRoutes.js");

// ... middleware like bodyParser, etc.

// This line is what Task 7 wants:
app.use("/api/secondchance/search", searchRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});