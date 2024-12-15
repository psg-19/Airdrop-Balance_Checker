import { useWallet } from '@solana/wallet-adapter-react';
import React, { useState } from 'react';
import axios from 'axios';

export const ShowBalance = () => {
    const wallet = useWallet();

    const [value, setValue] = useState(null);
    const [click, setClick] = useState(0);

    async function handleClick() {
        console.log(wallet);
        if (wallet.publicKey == null) {
            setValue(null);
            return;
        }

        setClick(1);

        await axios
            .post('https://api.devnet.solana.com', {
                jsonrpc: '2.0',
                id: 1,
                method: 'getAccountInfo',
                params: [wallet.publicKey, { encoding: 'base64' }],
            })
            .then((response) => {
                setValue(response.data.result.value.lamports / 1e9);
            })
            .catch((error) => alert('Error while fetching balance'));

        setClick(0);
    }

    return (
        <div className="flex flex-col items-center    justify-center  min-h-44 space-y-4 bg-gray-100">
            {value && (
                <p className="text-2xl font-semibold text-blue-600 mb-4">
                    {value} SOL
                </p>
            )}

            <button
                onClick={handleClick}
                className={`px-6 py-3 font-medium text-white rounded-lg transition ${
                    click ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                disabled={click}
            >
                {click ? 'Please wait ...' : 'Get Balance'}
            </button>
        </div>
    );
};
