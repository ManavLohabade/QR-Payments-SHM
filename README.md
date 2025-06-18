# SHM QR Payment System

A modular, modern web app for QR-based payments on the Shardeum (SHM) blockchain. Built with React, TypeScript, Vite, and Chakra UI.

## Features
- **Merchant Dashboard**: Generate QR codes for payment requests, view balance, and transaction history.
- **Customer View**: Scan QR codes and send payments easily.
- **Wallet Integration**: Connect wallet, view address and SHM balance.
- **Transaction Table**: See transaction history with status.
- **Modular UI**: Reusable components for wallet connection, amount input, QR code display, and transaction table.

## Technologies Used
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development
- [Chakra UI](https://chakra-ui.com/) for UI components
- [ethers.js](https://docs.ethers.org/) for blockchain interactions
- [qrcode.react](https://github.com/zpao/qrcode.react) for QR code generation

## Project Structure
```
qr-payment-app/
  src/
    components/
      common/
        WalletConnector.tsx
        AmountInput.tsx
        QRCodeDisplay.tsx
        TransactionTable.tsx
      MerchantView.tsx
      CustomerView.tsx
    utils/
      web3.ts
    App.tsx
    ...
```

## Getting Started

1. **Install dependencies:**
   ```bash
   cd qr-payment-app
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Usage
- **Merchant:**
  1. Connect your wallet.
  2. Enter an amount and click "Generate QR" to create a payment QR code.
  3. Share the QR code with customers.
  4. View transaction history below.
- **Customer:**
  1. Connect your wallet.
  2. Scan the merchant's QR code.
  3. Confirm and send payment.

## Customization
- UI components are modular and reusable (see `src/components/common/`).
- Blockchain logic is in `src/utils/web3.ts`.
- Easily extend for new features or different blockchains.

## License
MIT
