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
router.post(
  "/post-invoice",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addInvoice
);
router.get(
  "/get-invoices",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getInvoices
);
router.delete(
  "/delete-invoice/:invoice_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteInvoice
);
router.delete(
  "/delete-invoice/:invoice_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteInvoice
);
router.get(
  "/invoice-details/:invoice_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readInvoice
);
router.put(
  "/update-activity/:invoice_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateActivity
);

router.put(
  "/invoice-update/:invoice_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateInvoiceRec
);

module.exports = router;
