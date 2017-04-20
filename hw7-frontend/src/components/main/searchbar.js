import React from 'react'
import { connect } from 'react-redux'
import {search} from './articleAction'
const Searchbar = ({ search }) => {             
    let searchText;
    const _search = () => (
        search(searchText)
    )
    return (
        <div className="well"> 
                <div className="input-group text-center">
                    <input className="form-control input-md" ref={ node => searchText=node } 
                        placeholder="Search Post" id="inputSearch" onChange={_search} type="text"/>
                    <span className="input-group-btn">
                        <button id="btnSearchPost" className="btn btn-md btn-primary" 
                            onClick={_search} type="button">Search</button>
                    </span>
                </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({ search: (text) => dispatch(search(text.value))});

export default connect(null, mapDispatchToProps)(Searchbar);