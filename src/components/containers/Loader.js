import React, { Component } from 'react'

class Loader extends Component{
    render(){
        return(
            <div className="row">
                <div className="col-md-7 col-md-offset-5">
                    <div className="loader" style={{width:'240px', height:'240px'}}></div>
                </div>
            </div>
        )
    }
}


export default Loader