import React, { Component } from 'react'

class Loader extends Component{
    render(){
        return(
            <div className="container" >
                <div className="row">
                    <div className="col-md-7 col-md-offset-5 col-sm-6 col-sm-offset-4 col-xs-10 col-xs-offset-2">
                        <div className="loader" style={{width:'240px', height:'240px'}}></div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Loader