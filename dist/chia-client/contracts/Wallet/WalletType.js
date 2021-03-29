"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletType = void 0;
var WalletType;
(function (WalletType) {
    WalletType[WalletType["STANDARD_WALLET"] = 0] = "STANDARD_WALLET";
    WalletType[WalletType["RATE_LIMITED"] = 1] = "RATE_LIMITED";
    WalletType[WalletType["ATOMIC_SWAP"] = 2] = "ATOMIC_SWAP";
    WalletType[WalletType["AUTHORIZED_PAYEE"] = 3] = "AUTHORIZED_PAYEE";
    WalletType[WalletType["MULTI_SIG"] = 4] = "MULTI_SIG";
    WalletType[WalletType["CUSTODY"] = 5] = "CUSTODY";
    WalletType[WalletType["COLOURED_COIN"] = 6] = "COLOURED_COIN";
    WalletType[WalletType["RECOVERABLE"] = 7] = "RECOVERABLE";
})(WalletType = exports.WalletType || (exports.WalletType = {}));
