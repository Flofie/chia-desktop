"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletDifferFct = void 0;
function walletDifferFct(a, b) {
    if (!a || !b || !a.wallets || !b.wallets) {
        return true;
    }
    for (let i = 0; i < a.wallets.length; i++) {
        const walletA = a.wallets[i];
        const walletB = b.wallets[i];
        if (walletA.balance !== walletB.balance ||
            walletA.height !== walletB.height) {
            return true;
        }
    }
    return false;
}
exports.walletDifferFct = walletDifferFct;
