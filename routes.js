//Routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const chatRoutes = require("./routes/chat");
const contactRoutes = require("./routes/contacts");
const emailRoutes = require("./routes/email");
const boardRoutes = require("./routes/boards");
const boardTeamRoutes = require("./routes/board_team");
const tasksRoutes = require("./routes/tasks");
const taskBoardRoutes = require("./routes/task-boards");
const callRoutes = require("./routes/call");
const todoRoutes = require("./routes/todo");
const galleryRoutes = require("./routes/gallery");
const postRoutes = require("./routes/post");
const calendarEventRoutes = require("./routes/calendar_events");
const invoiceRoutes = require("./routes/invoice");
const twilioRoutes = require("./routes/twilio");
const agentsRoutes = require("./routes/agents");
const paymentRoutes = require("./routes/payments");
const cardRoutes = require("./routes/cards");

app.use("/v1/auth", authRoutes);
app.use("/v1/user", usersRoutes);
app.use("/v1/user/chat", chatRoutes);
app.use("/v1/user/contact", contactRoutes);
app.use("/v1/user/email", emailRoutes);
app.use("/v1/user/board", boardRoutes);
app.use("/v1/user/board/team", boardTeamRoutes);
app.use("/v1/user/board/task", tasksRoutes);
app.use("/v1/user/board/task/board", taskBoardRoutes);
app.use("/v1/user/call", callRoutes);
app.use("/v1/user/todos", todoRoutes);
app.use("/v1/user/gallery", galleryRoutes);
app.use("/v1/user/post", postRoutes);
app.use("/v1/user/calendar", calendarEventRoutes);
app.use("/v1/user/invoice", invoiceRoutes);
app.use("/v1/user/calling", twilioRoutes);
app.use("/v1/user/agents", agentsRoutes);
app.use("/v1/user/payments", paymentRoutes);
app.use("/v1/user/cards", cardRoutes);
