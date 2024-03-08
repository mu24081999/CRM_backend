const express = require("express");
const router = express.Router();
const {
  addInvoice,
  deleteInvoice,
  readInvoice,
  getInvoices,
  updateStatus,
} = require("../controllers/invoice");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/post-invoice", IsAuth, addInvoice);
router.get("/get-invoices", IsAuth, getInvoices);
router.delete("/delete-invoice/:invoice_id", IsAuth, deleteInvoice);
router.delete("/delete-invoice/:invoice_id", IsAuth, deleteInvoice);
router.get("/invoice-details/:invoice_id", IsAuth, readInvoice);
router.put("/update-status/:invoice_id", IsAuth, updateStatus);

// router.put("/board-update/:board_id", IsAuth, updateBoard);

module.exports = router;
