import React, {useState} from 'react'
export const Header = (props) => {
  
  const [errorMessage, setErrorMessage] = useState(null);
	let [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet'); 

  // Using set interval to have text motevation with h1 element
    let count =0;
    let words = 'Decentralized Blockchain Apps' ;
  setInterval(() => {
    let dif = document.getElementById("text_dif");
    dif.innerHTML = words.substring(0, count);
      count++; 
      
  }, 200);

  // Using set interval to have text motevation with h1 element
  // let countAddr =0;
  // let Addr = 'Decentralized Blockchain Apps' ;
  // setInterval(() => {
  // let dif = document.getElementById("text_addr");
  // dif.innerHTML = words.substring(0, count);
  //   count++; 
    
  // }, 200);
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
	 
	}
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12 col-sm-6 mb-5 pb-5 mx-auto intro-text '   >
                <h1 id='text_dif' class=" fs-1 mt-5 pt-5" >       
                </h1> 
                <br/>
                <button id='btn-custom' className='btn    ' onClick={connectWalletHandler}>{connButtonText}</button>
                <h4 id='text_addr' class="fs-4 pt-2 pb-5 mb-5 my-5 py-5"> {defaultAccount}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
