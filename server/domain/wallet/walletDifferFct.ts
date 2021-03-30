export function walletDifferFct(a, b): boolean {
  if (!a || !b || !a.wallets || !b.wallets) {
    return true;
  }
  for (let i = 0; i < a.wallets.length; i++) {
    const walletA = a.wallets[i];
    const walletB = b.wallets[i];
    if (
      walletA.balance !== walletB.balance ||
      walletA.height !== walletB.height
    ) {
      return true;
    }
  }
  return false;
}
