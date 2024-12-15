import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import React, { useState } from 'react'

export const SendSolana = () => {
const [click ,setClick]=useState(0)

const {connection}=useConnection()
const wallet=useWallet()


    async function sendToken(){
        if(click){
            return
        }
        setClick(1)
        let public_key=document.getElementById("pub_key").value;
        let amt=document.getElementById("amt").value;
        alert(public_key,"joii")
        const transaction=new Transaction();

        transaction.add(SystemProgram.transfer({
fromPubkey:wallet.publicKey,
toPubkey:new PublicKey(public_key),
lamports:amt*1e9
        }))
alert("hello")
await wallet.sendTransaction(transaction,connection)
.then(()=>alert("Sent "+amt+" SOL to "+public_key))
.catch(()=>console.log("hiii"))

setClick(0)

 

    }


  return (
    <div className='w-[50%] p-6 bg-white rounded-lg shadow-lg mx-auto space-y-4 border border-gray-200'>
    <input 
        id="pub_key"  
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Public Key" 
        type='text'
    />
    
    <input 
        id="amt"  
        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mt-4"
        placeholder="Enter amount of SOL" 
        type='text'
    />
    
    <button
        className={`w-full px-6 py-3 font-medium text-white rounded-lg transition-all duration-300 ${
            click ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg'
        } focus:outline-none focus:ring-4 focus:ring-blue-300 mt-6`}
        onClick={() => sendToken()}
        disabled={click}
    >
        {click ? 'Sending...' : 'Send SOL'}
    </button>
</div>

  )
}
