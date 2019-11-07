import React from 'react';

class ExampleAdmin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <Authorization allowed={this.props.allowed} user={this.state.user}>
            {
                
            }
        </Authorization>
    }
}

export default ExampleAdmin;