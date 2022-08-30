import React, {useState} from 'react'
import {ethers, Wallet} from 'ethers'

export const DAppBook = (props) => {
 
//Contract Address
const contractAddress = "0x23dda0becc68e89e875b8cebff6cea3193356e91"; 

const abi =
[
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_downloadLink",
				"type": "string"
			}
		],
		"name": "addYourBook",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Books",
		"outputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "author",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "downloadLink",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

	// deploy simple storage contract and paste deployed contract address here. This value is local ganache chain
	// let contractAddress = '0x84735dFae9B8005011B85cb7799CEC5FFd715726';

	// Wallet Details 
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	// Provider details  
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [getContract, setContract] = useState(null);
 	

	// Dapp Book Details
    let [getBookId,setBookId] =  useState(null);
    const [getBookTitle, setBookTitle] = useState(null);
	const [getBookAuthor, setBookAuthor] = useState(null); 
	let [getLinkVal,setLinkVal] =  useState(null);
	let [getAddress,setAddress] =  useState(null);
	let [getQueryBookId,setQueryBookId] =  useState(null);
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
	// Start to call my contract method with  get input value 
	const deploySetData = async ()=>{ 
	 const contracts= new ethers.Contract(contractAddress, abi, signer);
     await contracts.addYourBook(getBookId,getBookTitle,getBookAuthor,getLinkVal).then((tx)=>{
		console.log(tx);
		let acutualTx = tx.hash;
		setTxLink("https://rinkeby.etherscan.io/tx/".concat(acutualTx))
		setTxHash(acutualTx);
		setSenderAddress(tx.from);
		setReciverAddress(tx.to);
  }); 
 }
	/*const QueryData = async ()=>{ 
		const contracts= new ethers.Contract(contractAddress, abi, provider);
	   const res= await contracts.Books.call(getAddress,getQueryBookId) 
	   console.log(res);
	}*/
	const bookId = event => {
		setBookId(event.target.value);
	};
	const bookTitle = event => {
		setBookTitle(event.target.value);
	};	
	const bookAuthor = event => {
		setBookAuthor(event.target.value);
	};
	const linkInout = event => {
		setLinkVal(event.target.value);
	 };
	/* const queryUserAddres = event => {
		setAddress(event.target.value);
	 };
	 const queryBookId = event => {
		setQueryBookId(event.target.value);
	 };*/


  // Using set interval to have text motevation with h1 element
  let count =0;
  let words = ' By using this service we will have more specific about using copywrite tools. this service help us to deploy our book with more validation and more trust.' ;
setInterval(() => {
  let dif = document.getElementById("text_dif_book");
  dif.innerHTML = words.substring(0, count);
	count++; 
	if(count>words.length){
		count=0;
	}
	
}, 100);
  return (
	<div id="bg" >
<hr className='mx-auto'/>
	{/* DApp Book Explaination*/}
	<div class ="container">
        <div class="row">

          <div className="col-xs-12 col-md-7">
            <div className="about-text">
              <h2>Dcecnter App Book</h2> 
			  <br/>
              <h4 id='text_dif_book'></h4> 
            </div>
          </div>

		  <div className="col-xs-12 col-md-5"> 
            <img src="img/DAppbook3.jpg" width="100%" className="img-responsive" alt="" /> 
          </div>

		</div>
	</div>	      
    <div id="dAppBook" className='mt-3'>
      <div class ="container">
        <div class="row">
          
          {/* decentralization App Book  code  */}
   
              <h1 class="mt-2 mb-3 bookTitle  m-auto mt-3 mb-3 col-lg-4 col-md-6 col-sm-8 col-8"> <span>Dapp</span> Book</h1>  
			
			  <div className='w-100'></div>
			 	
					<div class="mb-3">
						<label for="id" class="form-label">Book ID</label>
						<input type="number" onChange={bookId} class="form-control" id="id" placeholder='write code number'/>
					</div>

					<div class="mb-3">
						<label for="title" class="form-label">Book Title</label>
						<input type="text" onChange={bookTitle} class="form-control" id="title"  />
					</div>

					<div class="mb-3">
						<label for="author" class="form-label">Book Author</label>
						<input type="text" onChange={bookAuthor} class="form-control" id="author" aria-describedby="emailHelp"/>
					</div>

					<div class="mb-3">
						<label for="link" class="form-label">Book Linker </label>
						<input type="text"   onChange={linkInout}  placeholder="Write Your Contant Link "  class="form-control" id="link" aria-describedby="emailHelp"/>
					</div>
					<div className="w-100"></div>
					<div class="mb-3 row">
							{/* button to connect wallet  */}  
						<button class=" btn_book btn   col-md-5 mx-1 my-1 " onClick={connectWalletHandler}>{connButtonText}</button>
						<button onClick={deploySetData}  class="btn btn_book col-md-5 mx-1 my-1">Send Transaction</button>
				   </div>

				   {/*<div class="mb-3">
						 <input type="text"  class="form-control" onChange={queryUserAddres} value={defaultAccount} disabled/>
					</div>

					<div class="mb-3">
						<label for="bookCode" class="form-label">Book Code </label>
						<input type="text"   onChange={queryBookId}  placeholder="Write Yourn book Code "  class="form-control" id="bookCode" />
					</div>
					 <button onClick={QueryData}  class="btn  col-md-5">Query</button> */}

			      
         		 <div class="w-100"></div>

          {/* Transaction result */}
          <div className='table_bg'>
			<div class="col-md-12">
					<h2 className='m-auto mt-3 mb-3 col-lg-4 col-md-6 col-sm-8 col-8'>
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
					<a href={getTxLink} className="btn btn_book m-auto mt-3 mb-3 col-lg-5 col-md-6 col-sm-8 col-8">Check More Details</a>  
				</div>
			</div>        
          </div>

			</div>
		 </div>
       </div>
      </div>
    
  );
};
