//Routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const chatRoutes = require("./routes/chat");
const contactRoutes = require("./routes/contacts");
const emailRoutes = require("./routes/email");

app.use("/v1/auth", authRoutes);
app.use("/v1/user", usersRoutes);
app.use("/v1/user/chat", chatRoutes);
app.use("/v1/user/contact", contactRoutes);
app.use("/v1/user/email", emailRoutes);
