import React, { useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Airdrop } from './Airdrop';
import { ShowBalance } from './ShowBalance';
//  import {process} from "dotenv"
// Default styles for Solana wallet buttons
import '@solana/wallet-adapter-react-ui/styles.css';
import { SendSolana } from './SendSolana';
import { SignMessage } from './SignMessage';

function App() {
    const [check,setCheck]=useState(0)
 
    return (
        <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
        <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
                <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6">
                    
                    <div className="space-y-4 mb-8">
                        <WalletMultiButton className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all" />
                        <WalletDisconnectButton className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition-all" />
                    </div>
    
                    <div className="w-full flex flex-col items-center space-y-8">
                        {/* First Row of Components (Airdrop and SendSolana) */}
                        <div className="w-full max-w-[40%] flex flex-row justify-center items-center bg-white p-6 rounded-lg shadow-lg space-x-6">
                            <Airdrop check={check} setCheck={setCheck} />
                            <SendSolana check={check} setCheck={setCheck} />
                        </div>
    
                        {/* Second Row of Components (ShowBalance and SignMessage) */}
                        <div className="w-full max-w-[40%] flex flex-row justify-center items-center bg-white p-6 rounded-lg shadow-lg space-x-6">
                            <ShowBalance check={check} />
                            <SignMessage />
                        </div>
                    </div>
    
                </div>
            </WalletModalProvider>
        </WalletProvider>
    </ConnectionProvider>
    
    );
}

export default App;
