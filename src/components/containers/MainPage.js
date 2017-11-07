import React, { Component } from 'react'

class MainPage extends Component{
    render(){
        return(
            <div  >
                <div style={bgimg}>
                    <div >
                        <img style={img} src="https://images.unsplash.com/photo-1499377193864-82682aefed04?auto=format&fit=crop&w=1351&q=60&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D" alt=""/>
                    </div>
                    <div style={caption} >
                        <div style={{marginBottom:'30px'}} >
                            <span style={border}>Keep Track</span>
                        </div>
                        <br/>
                        <div style={{marginBottom:'30px'}} >
                            <span style={border}>Of Your</span>
                            <br/> <br/> <br/>
                            <span style={border} >Projects</span>
                        </div>
                        <br/>
                        <div style={{marginBottom:'30px'}} >
                            <span style={border}>Keep Track</span>
                        </div>
                        <br/>
                        <div style={{marginBottom:'30px'}} >
                            <span style={border}>Of Your Time</span>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const bgimg = { 
    
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    marginTop: '-20px'
}
    
const caption =  {
    position: 'absolute',
    left: 0,
    top: '20%',
    width: '100%',
    textAlign: 'center',
    color: '#000'
}
    
const border = {
    backgroundColor: '#111',
    color: '#fff',
    padding: '18px',
    fontSize: '25px',
    letterSpacing: '10px',
    opacity:'.70',
    marginTop:'20px'
}

const img = {
    maxWidth: '100%', height:'auto'
}

export default MainPage