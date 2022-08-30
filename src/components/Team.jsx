export const Team = (props) => {
  return (
    <div id='team' className='text-center'>
      <div className='container'>
        <div className="row">

        <div className='col-md-7 m-auto section-title'>
          <h2>Meet the Team</h2>
          <p>
          Computer science is one of the most interesting and exciting fields to work in. However, it’s not easy to become a master in this field. To do so, you need to devote significant time and energy toward improving your coding abilities.We have finish from this project with happy mood and we hope to help every body in the future.
          </p>
        </div>

        <div id='row' className="row">

          {/* {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className='col-md-6 col-sm-6 team'>
                  <div className='thumbnail'>
                    {' '}
                    <img src={d.img} alt='...' className='team-img' />
                    <div className='caption'>
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                    </div>
                  </div>
                </div>
              ))
            : 'loading'} */}
                <div className='col-md-6 col-sm-6 team'>
                  <div className='thumbnail'>
                    
                    <img src="img/team/hamza.jpg"  alt='...' className='team-img' />
                    <div className='caption'>
                      <h4> Hamza Moustafa </h4>
                      <p> Blockchain cloud infrastructure </p>
                    </div>
                  </div>
                </div>

                <div className='col-md-6 col-sm-6 team'>
                  <div className='thumbnail'>
                    
                    <img src="img/team/anas.jpg"  alt='...' className='team-img' />
                    <div className='caption'>
                      <h4> Anas Ahmed </h4>
                      <p> Blockchain Application Developer </p>
                    </div>
                  </div>
                </div>
        </div>
        </div>
      </div>
    </div>
  )
}
