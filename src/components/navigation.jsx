import { render } from "@testing-library/react";
import { Header } from "./header";

export const Navigation = (props) => {
   
  return (
 // <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
    //   <div className='container'>
    //     <div className='navbar-header'>
          
    //       <a className='navbar-brand page-scroll' href='#page-top'>
    //         React Landing Page
    //       </a>{' '}
    //     </div>

    //     <div
    //       className='collapse navbar-collapse'
    //       id='bs-example-navbar-collapse-1'
    //     >
    //       <ul className='nav navbar-nav navbar-right'>
    //         <li>
    //           <a href='#features' className='page-scroll'>
    //             Features
    //           </a>
    //         </li>
    //         <li>
    //           <a href='#about' className='page-scroll'>
    //             About
    //           </a>
    //         </li>
    //         <li>
    //           <a href='#services' className='page-scroll'>
    //             Services
    //           </a>
    //         </li>
    //         <li>
    //           <a href='#portfolio' className='page-scroll'>
    //             Gallery
    //           </a>
    //         </li>
    //         <li>
    //           <a href='#testimonials' className='page-scroll'>
    //             Testimonials
    //           </a>
    //         </li>
    //         <li>
    //           <a href='#team' className='page-scroll'>
    //             Team
    //           </a>
    //         </li>
          
    //       </ul>
    //     </div>
    //   </div>
    // </nav>

    <nav class="navbar navbar-expand-lg bg-light">
  <div class="container">
    <a class="navbar-brand" href="#page-top">React Landing Page</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav m-auto mb-2 mb-lg-0"> 
        
         <li class="nav-item">
          <a class="nav-link " href="#services">services</a>
        </li> 
        <li class="nav-item">
             <a class="nav-link " href='#team'>
              Team
             </a>
         </li>
         <li class="nav-item">
             <a class="nav-link " href='https://web3-docs.azurewebsites.net/'>
             Document
             </a>
         </li>
          
         <li class="nav-item">
             <a class="nav-link " href='#generlaCopywrite'>
             Copywrite
             </a>
         </li>
      </ul>
      
    </div>
  </div>
</nav>
  )
}
