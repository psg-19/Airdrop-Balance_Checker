import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useState } from 'react';

export const Airdrop = ({dropping,setDropping}) => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [value, setValue] = useState(0);

    const handleClick = async () => {
        await connection.requestAirdrop(wallet.publicKey, value*1e9)
            .then((e) => {
                alert('Airdrop Sent!!!');
                console.log(e);
                setValue(0);
            })
            .catch((e) => {
                alert('Error!!!');
                console.log(e.target.message);
            });
    };

    return (
        <div className="flex flex-col items-center space-y-4">
          
          <div  className="w-full flex flex-col items-center space-y-4 px-4 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        >

<p className='  font-bold'>RPC URL Being Used ( Recommended :- Make your own rpc url <a className=' text-blue-500' href='https://dashboard.alchemy.com/apps/new'>here</a> and use it) </p>
<input  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                 value={dropping} onChange={(e)=>setDropping(e.target.value)} />
        

          </div>
          
              <input
                type="text"
                value={value+" SOL"}
                onChange={(e) => setValue(e.target.value )}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter amount"
            />
           
            <button
                onClick={handleClick}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
            >
                Send Airdrop
            </button>
        </div>
    );
};
