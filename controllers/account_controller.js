import AccountService from "../services/account_service.js";

async function createAccount(req, res, next) {
    try {
        let account = req.body;
        if (!account.name || !account.balance == null) {
            throw new Error("Name e Balance is required");
        }
        account = await AccountService.createAccount(account);
        res.send(account);
        global.logger.info(`POST/ Account: ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
}

async function getAccounts(req, res, next) {
    try {
        res.send(await AccountService.getAccounts());
        global.logger.info("GET/ Account");
    } catch (err) {
        next(err);
    }
}

async function getAccountId(req, res, next) {
    try {
        res.send(await AccountService.getAccountId(req.params.id));
        global.logger.info("GET/ Account/:id ");
    } catch (err) {
        next(err);
    }
}

async function deleteAccount(req, res, next) {
    try {
        await AccountService.deleteAccount(req.params.id);
        res.end();
        global.logger.info("DELETE/ Account/:id " + req.params.id);
    } catch (err) {
        next(err);
    }
}

async function updateAccount(req, res, next) {
    try {
        let account = req.body;

        if (!account.id || !account.name || account.balance == null) {
            throw new Error("Id, Name and Balance is required!");
        }

        res.send(await AccountService.updateAccount(account));
        global.logger.info(`PUT/ Account: ${JSON.stringify(account)}`);
    } catch (err) {
        next(err);
    }
}

async function updateBalance(req, res, next) {
    try {
        let account = req.body;
        if (!account.id || account.balance == null) {
            throw new Error("Id and Balance is required!");
        }

        res.send(await AccountService.updateBalance(account));
        global.logger.info("PATCH/ Account/updateBalance : " + account);
    } catch (err) {
        next(err);
    }
}

export default {
    createAccount,
    getAccounts,
    getAccountId,
    deleteAccount,
    updateAccount,
    updateBalance,
};
