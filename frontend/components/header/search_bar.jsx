import React from 'react';

class SearchBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {field: ''};
    }

    onChange(field){
        return e => this.setState({[field]: e.target.value})
    }

    render() {
        return  (
            <div className='search-bar-main'>
                <input className='search-bar-form' 
                type='text' 
                placeholder='Search lyrics & more'
                value={this.state.field} 
                onChange={this.onChange('field')} 
                />
                <img className='search-bar-glass' src={window.search} />
            </div>
            
            
        )
    }
}

export default SearchBar;