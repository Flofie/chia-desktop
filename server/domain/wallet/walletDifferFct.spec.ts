import { walletDifferFct } from './walletDifferFct';
describe('walletDifferFct', () => {
  it('should return true if wallets differ in balance', () => {
    const wallet1 = {
      wallets: [{ id: 1, balance: 100, height: 500 }],
    };
    const wallet2 = {
      wallets: [{ id: 2, balance: 250, height: 500 }],
    };
    expect(walletDifferFct(wallet1, wallet2)).toBeTruthy();
  });
  it('should return true if wallets differ in height', () => {
    const wallet1 = {
      wallets: [{ id: 1, balance: 100, height: 100 }],
    };
    const wallet2 = {
      wallets: [{ id: 2, balance: 100, height: 500 }],
    };
    expect(walletDifferFct(wallet1, wallet2)).toBeTruthy();
  });

  it('should return true if wallet1 null', () => {
    const wallet1 = null;
    const wallet2 = {
      wallets: [{ id: 2, balance: 100, height: 500 }],
    };
    expect(walletDifferFct(wallet1, wallet2)).toBeTruthy();
  });
  it('should return true if wallet2 null', () => {
    const wallet1 = {
      wallets: [{ id: 1, balance: 100, height: 100 }],
    };
    const wallet2 = null;
    expect(walletDifferFct(wallet1, wallet2)).toBeTruthy();
  });
  it('should return true if both wallets null', () => {
    const wallet1 = null;
    const wallet2 = null;
    expect(walletDifferFct(wallet1, wallet2)).toBeTruthy();
  });

  it('should return false if wallets have same balance and same height', () => {
    const wallet1 = {
      wallets: [{ id: 1, balance: 100, height: 500 }],
    };
    const wallet2 = {
      wallets: [{ id: 2, balance: 100, height: 500 }],
    };
    expect(walletDifferFct(wallet1, wallet2)).toBeFalsy();
  });
});
