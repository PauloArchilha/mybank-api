import express from "express";
import cors from "cors";
import AccountController from "../controllers/account_controller.js";

const router = express.Router();

router.post("/", AccountController.createAccount);
router.get("/", AccountController.getAccounts);
router.get("/:id", AccountController.getAccountId);
router.delete("/:id", AccountController.deleteAccount);
router.put("/", AccountController.updateAccount);
router.patch("/updateBalance", AccountController.updateBalance);

router.use((err, req, res, next) => {
    global.logger.error(`${req.method} ${req.baseURL} - ${err.message}`);

    res.status(400).send({ error: err.message });
});

export default router;
