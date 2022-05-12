import {React, useState} from "react";
import { NavLink, useHistory} from "react-router-dom";
import {BiSearchAlt2} from "react-icons/bi";

function NavBar({user}) {
  let history = useHistory();
  const [search, setSearch] = useState("");

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  function submitSearch(e) {
    e.preventDefault();
    history.push(`/browse?q=${search.toLowerCase()}`);
    setSearch("");
  }

  console.log(search);
  return (
    <div className="navbar">
      <NavLink exact to='/' className="logo"><p><span className="style">Style</span><span className="swap">Swap</span></p></NavLink>
      <form className="search-bar">
        <input type="text" placeholder="Search for anything..." value={search} onChange={handleSearchChange}></input>
        <button type="submit" onClick={submitSearch}><BiSearchAlt2></BiSearchAlt2></button>
      </form>
      <NavLink exact to='/browse'><p>Browse</p></NavLink>
      {
        user ? 
        <>
        <NavLink exact to='/new-listing'><p>Sell</p></NavLink>
        </>
        : null
      }
      <NavLink className="nav-account" exact to={user ? `/account/${user.username}` : '/login'}>{user ? <img className="nav-avatar" src={user.avatar} alt="avatar"></img> : <p>Log in</p>}</NavLink>
    </div>
  )
}

export default NavBar