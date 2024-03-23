const express = require("express");
const router = express.Router();
const {
  addInvoice,
  deleteInvoice,
  readInvoice,
  getInvoices,
  updateActivity,
  updateInvoiceRec,
} = require("../controllers/invoice");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/post-invoice", IsAuth, addInvoice);
router.get("/get-invoices", IsAuth, getInvoices);
router.delete("/delete-invoice/:invoice_id", IsAuth, deleteInvoice);
router.delete("/delete-invoice/:invoice_id", IsAuth, deleteInvoice);
router.get("/invoice-details/:invoice_id", IsAuth, readInvoice);
router.put("/update-activity/:invoice_id", IsAuth, updateActivity);

router.put("/invoice-update/:invoice_id", IsAuth, updateInvoiceRec);

module.exports = router;
