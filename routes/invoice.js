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
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  addInvoice
);
router.get(
  "/get-invoices",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getInvoices
);
router.delete(
  "/delete-invoice/:invoice_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  deleteInvoice
);
router.delete(
  "/delete-invoice/:invoice_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  deleteInvoice
);
router.get(
  "/invoice-details/:invoice_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  readInvoice
);
router.put(
  "/update-activity/:invoice_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  updateActivity
);

router.put(
  "/invoice-update/:invoice_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  updateInvoiceRec
);

module.exports = router;
