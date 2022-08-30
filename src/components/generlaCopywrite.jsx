import React, {useState} from 'react'
import {ethers, Wallet} from 'ethers'

export const Copywrite = (props) => {
 
//Contract Address
const contractAddress = "0x8c4e1387ca10623c456bfa746b66410c0bbd1308"; 

const abi =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "Inbox",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getData",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "ins_name",
				"type": "string"
			}
		],
		"name": "setData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
] 

	// deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
	// let contractAddress = '0x84735dFae9B8005011B85cb7799CEC5FFd715726';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

 
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [getContract, setContract] = useState(null);
 	let [getVal,setVal] =  useState(null);
  // TX details 
  let [getTxLink,setTxLink] =  useState(null);
   const [getTxHash, setTxHash] = useState(null);
  const [getSenderAddress, setSenderAddress] = useState(null);
  const [getReciverAddress, setReciverAddress] = useState(null);
  
	// Connect to wallet 
	const connectWalletHandler = () => {
		if (window.ethereum) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}
   // important to update account if we have, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers()
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}
	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);
	window.ethereum.on('chainChanged', chainChangedHandler);


	const updateEthers = () => {
		// Calling Net 
		  let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		 //let tempProvider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/bc36b26163404dd9b04cbab040d972ff");
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner); 

		let tempContract = new ethers.Contract(contractAddress, abi, signer);
		setContract(tempContract);
	
	}
	const getBalances = async ()=>{
		const balance = await signer.getBalance();
		console.log("Your balance is : " ,balance.toString());
	}  
	// Start to call my contract method with  get input value 
	const deploySetData = async ()=>{ 
	 const contracts= new ethers.Contract(contractAddress, abi, signer);
     await contracts.setData(getVal).then((tx)=>{
		console.log(tx);
		let acutualTx = tx.hash;
		setTxLink("https://rinkeby.etherscan.io/tx/".concat(acutualTx))
    setTxHash(acutualTx);
    setSenderAddress(tx.from);
    setReciverAddress(tx.to);
  }); 
 }
	const handleInput = event => {
		setVal(event.target.value);
	 };
  return (
    <div id="copywrite" className='mt-3'>
      <div class ="container">
        <div class="row">
          {/* Image content   */}
          <div class ="col-md-6">
            <img src="img/CopyWriteTx.jpg" width="100%" class="mt-2 mb-2" alt="Image not exist" /> 
          </div>
          {/* Copy write content code  */}
          <div class=" col-md-6"> 
              <h2 class="mt-2 mb-3">  <span>General</span> COPYWRITE </h2> 
              <div className="container">
                <div className="row">
                  {/* button to connect wallet  */}
                  <button class="btn  col-md-8 m-auto mt-2" onClick={connectWalletHandler}>{connButtonText}</button>
                  <div className='w-100'></div>
                  {/* print out user address connected to wallet */}
                  <input type='text' class="form-control mt-3" disabled value={defaultAccount} />
                 {/* -------------------------------------------------------- */}
                  <div className='w-100'></div>
                  {/* Start to create transaction for users */}
                  {/* take value from user wordes  */}
                  <input  
                    class="form-control mt-3"
                    onChange={handleInput}
                    type="text"
                    placeholder="Write Your Contant Link "
                  />
                    <div className='w-100'></div>
                   {/* Send transaction */}
				          <button onClick={deploySetData}  class=" btn form-control mt-3 mb-5" >Send Transaction</button>  
                </div>  
            </div>
          </div>
          <div class="w-100"></div>
          {/* Transaction result */}
          <div className='table_bg'>
        <div class="col-md-12">
                <h2 className='m-auto mt-3 mb-3 col-lg-5 col-md-6 col-sm-8 col-8'>
                  Transaction Details 
                </h2>
              <div class="w-100"></div>
              <table class="table">
              
                <tbody>
                  <tr>
                    <th scope="row">From:</th>
                    <td>{getSenderAddress}</td>
                  </tr>
                  <tr>
                    <th scope="row">To:</th>
                    <td>{getReciverAddress}</td>
                  </tr>
                  <tr>
                    <th scope="row">Transaction Hash:</th> 
                    <td>{getTxHash}</td>                
                  </tr>
                  <tr>
                    <th scope="row">Transaction Link:</th>    
                    <td>{getTxLink}</td>             
                  </tr>   
                </tbody>
              </table>  
            <div class="w-100"></div>
            <div className="row">
                <a href={getTxLink} className="btn m-auto mt-3 mb-3 col-lg-5 col-md-6 col-sm-8 col-8">Check More Details</a>  
            </div>
         </div>
        
          </div>
        </div>
      </div>
    </div>
  );
};
