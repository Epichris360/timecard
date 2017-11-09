import React, { Component } from 'react'

class DangerAlert extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                {
                    this.props.error ? 
                    <div className="alert alert-danger">
                        <strong>Danger!</strong> {this.props.errorMessage}
                    </div> : null
                }
            </div>
        )
    }
}

export default DangerAlert