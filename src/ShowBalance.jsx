import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const ShowBalance = () => {
    const wallet = useWallet();
const {connection}=useConnection();
    const [value, setValue] = useState(null);
    const [click, setClick] = useState(0);

    async function handleClick() {
        // console.log("hii",wallet);
        if (wallet.publicKey == null) {
            setValue(null);
            return;
        }
if(click)return;
        setClick(1);

         await connection.getBalance(wallet.publicKey)
            .then((res) => {
                setValue(res/1e9);
            })
            .catch((error) =>{
          
                console.log(error)
            });


        setClick(0);
    }
useEffect(()=>{
    handleClick()
},[wallet.publicKey])
    return (
        <div className="flex flex-col items-center justify-center min-h-44 p-6 space-y-6 bg-white shadow-lg rounded-lg border border-gray-200">
        {value && (
            <p className="text-4xl font-bold text-blue-700 mb-4 animate-bounce">
                {value} SOL
            </p>
        )}
    
        <button
            onClick={handleClick}
            className={`w-full max-w-xs px-8 py-4 text-lg font-semibold text-white rounded-lg shadow-lg transform transition-all duration-300 ${
                click
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:scale-105 hover:from-blue-600 hover:to-blue-700'
            } focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50`}
            disabled={click}
        >
            {click ? 'Please wait ...' : 'Get Balance'}
        </button>
    </div>
    
    
    );
};
