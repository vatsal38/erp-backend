const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const customerRoutes = require("./routes/customer.routes");
const salesRoutes = require("./routes/sales.routes");
const purchaseOrderRoutes = require("./routes/purchaseOrder.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const { authenticate } = require("./middleware/auth");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/products", authenticate, productRoutes);
app.use("/api/customers", authenticate, customerRoutes);
app.use("/api/sales", authenticate, salesRoutes);
app.use("/api/purchase", authenticate, purchaseOrderRoutes);
app.use("/api/dashboard", authenticate, dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
