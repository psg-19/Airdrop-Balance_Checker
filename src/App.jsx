import React, { useState } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Airdrop } from './Airdrop';
import { ShowBalance } from './ShowBalance';
//  import {process} from "dotenv"
// Default styles for Solana wallet buttons
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
 
    const [dropping,setDropping]=useState("https://api.devnet.solana.com")
   
    return (
        <ConnectionProvider endpoint={dropping}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
                        
                        <div className="space-y-4 mb-8">
                            <WalletMultiButton className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all" />
                            <WalletDisconnectButton className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-all" />
                        </div>

                       
                        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                            <Airdrop dropping={dropping} setDropping={setDropping} />
                        </div>

                        <div className="w-full max-w-md bg-white p-6 mt-6 rounded-lg shadow-md">
                            <ShowBalance />
                        </div>
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}

export default App;
