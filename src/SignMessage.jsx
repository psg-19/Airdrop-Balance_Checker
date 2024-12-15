import { useWallet } from '@solana/wallet-adapter-react'
import React from 'react'
import {ed25519} from '@noble/curves/ed25519'

export const SignMessage = () => {

    const wallet=useWallet();


    async function signMsg() {

        if(!wallet.publicKey){
            alert("Please Connect Wallet !!!");
            return;
        }

        if(!wallet.signMessage){
            alert("Wallet Doesn't Support Signing Messages !!")
            return
        }


let msg=document.getElementById("msg").value;

const encodeMsg=new TextEncoder().encode(msg);

const signature=await wallet.signMessage(encodeMsg);

if(!ed25519.verify(signature,encodeMsg,wallet.publicKey.toBytes()))alert("Invalid Message Signature !!!")
    else alert("Signature Successfull !!!")

    }


  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
    <input
        id="msg"
        type="text"
        placeholder="Enter Message"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
    />
    
    <button
        className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        onClick={signMsg}
    >
        Sign Message
    </button>
</div>

  )
}
