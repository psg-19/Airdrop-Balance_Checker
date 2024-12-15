import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useState } from 'react';
import axios from 'axios'
export const Airdrop = () => {
    const wallet = useWallet();
    const { connection } = useConnection();
    const [value, setValue] = useState();

    const [dropping,setDropping]=useState("https://api.devnet.solana.com")
   
    
const [loading,setLoading]=useState(0);
    const handleClick = async () => {

        if(loading){
            return
        }

        setLoading(1);
        if(!value){
            alert ("please enter value");
            setValue()
            setLoading(0);
            return 
        }
        if(!wallet.publicKey){
            alert ("please connect wallet !!!");
            setValue()
            setLoading(0);
            return 
        }
// console.log((dropping))
        await axios.post(dropping,{
            "jsonrpc":"2.0",
            "id":1,
            "method":"requestAirdrop",
           "params": [wallet.publicKey, value*1e9] 
        })
            .then((e) => {
                alert('Airdrop Sent!!!');
                console.log(e);
                console.log(e)
                setValue(0);
                setLoading(0);
            })
            .catch((e) => {
                alert('Error!!!');
                console.log(e.target.message);
                setLoading(0);
            });

            setLoading(0);
    };

    return (
        <div className="flex flex-col items-center w-[50%] space-y-4">
          
          <div  className="w-full flex flex-col items-center space-y-4 px-4 py-2 border border-black rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        >

<p className='  font-bold'>RPC URL Being Used ( Recommended :- Make your own rpc url <a className=' text-blue-500' href='https://dashboard.alchemy.com/apps/new'>here</a> and use it) </p>
<input  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                 value={dropping} onChange={(e)=>setDropping(e.target.value)} />
        

          </div>
          
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value )}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter amount of SOL"
            />
           
            <button
                onClick={handleClick}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
            >
               {loading ? "Please wait ...":" Send Airdrop"}
            </button>
        </div>
    );
};
