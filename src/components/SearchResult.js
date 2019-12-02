import React, {Component} from 'react';
import '../App.css';

class SearchResult extends Component {

  constructor(props){
   super(props);
  }

  render() {
    const { id, name } = this.props.searchResult;
    return (
    //   <form className="dropdown-item form-inline">
          
    //     <input className = "form-control-plaintext" value={name} readOnly></input>
    //     <input className="form-control btn"
    //        value={"follow"}>
                
    //         </input>
    //   </form>
    //   

    <form className="flex-fill dropdown-item">
        <div className="form-row">
            <div className="col-7">
                <input className = "form-control-plaintext" value={name} readOnly></input>

               
            </div>
            <div className="col">
                <input className="form-control btn"
                    value={"follow"} >
                
                </input>
            </div>
        </div>
 
   </form>
    )
  }
}



export default SearchResult;
