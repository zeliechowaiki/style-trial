import {React, useEffect, useState} from 'react';
import { useHistory, useLocation, NavLink } from "react-router-dom";
import {v4 as uuid} from 'uuid';

function Account({me, onLogin}) {
  const location = useLocation();
  let history = useHistory();
  const [user, setUser] = useState(null);
  const pathUsername = location.pathname.split("/")[location.pathname.split("/").length - 1];
  const [accountDisplay, setAccountDisplay] = useState("listings");
  const [displayedListings, setDisplayedListings] = useState([]);

  useEffect(() => {
    if (me && me.username === pathUsername) {
      setUser(me);
    }
    else {
      fetch(`/users/${pathUsername}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
      });
    }
  },[me, pathUsername]);

  useEffect(() => {
    if (!user) {
       setDisplayedListings([]);
    }
    else if (accountDisplay === "listings") {
      setDisplayedListings(user['clothing_sets']);
    }
    else if (accountDisplay === "likes") {
      fetch(`/likes?user_id=${user.id}`)
      .then(response => response.json())
      .then(data => setDisplayedListings(data));
    }
    else if (accountDisplay === "notifications") {
      fetch('/notifications')
      .then(response => response.json())
      .then(data => setDisplayedListings(data));
    }
    else if (accountDisplay === "matches") {
      fetch('/matches')
      .then(response => response.json())
      .then(data => setDisplayedListings(data))
    }
  },[user, accountDisplay]);

  function logOut() {
    fetch("/sessions/0", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        onLogin(null);
        history.push("/");
      }
    });
  }

  function deleteAccount() {
    fetch("users/0", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        onLogin(null);
        history.push("/");
      }
    });
  }

  if (!user || !me) return null;
  return (
    <div>
      <div className="main-account-info">
        <img className='account-avatar' src={user && user.avatar ? user.avatar : null} alt="profile"></img>
        <div className="account-names">
          <p className="account-name">{user.name}</p>
          <p>@{user.username}</p>
        </div>
      </div>
      <p className="account-bio">{user.bio}Hi I'm Zelie and this is my very cool account on Style Swap. Feel free to swap clothes with me, as that is the purpose of this site.</p>
      <div className="account-display-options">
        <button name="listings" className={accountDisplay === "listings" ? "bold" : ""} onClick={e => setAccountDisplay(e.target.name)} >Listings</button>
        <button name="likes" className={accountDisplay === "likes" ? "bold" : ""} onClick={e => setAccountDisplay(e.target.name)}>Likes</button>
        {
          user === me ? 
          <>
          <button name="matches" className={accountDisplay === "matches" ? "bold" : ""} onClick={e => setAccountDisplay(e.target.name)}>Matches</button>
        <button name="notifications" className={accountDisplay === "notifications" ? "bold" : ""} onClick={e => setAccountDisplay(e.target.name)}>Notifications</button>
          </>
          : null
        }
      </div>
      {
        accountDisplay === "notifications" ? 
        <div className="notifications-container">
          {
            displayedListings.map(listing => {
              return (
                <div key={uuid()} className="notification">
                  <NavLink exact to={`/account/${listing['user_username']}`}>
                    <img src={listing.avatar} alt="avatar"></img>
                  </NavLink>
                  
                  <p><span className="bold">{listing['user_name']}</span> liked your listing:
                  <NavLink exact to={`/listings/${listing['clothing_set_id']}`}>
                    <span className="bold"> {listing['set_name']}</span>
                  </NavLink>
                  </p>
                </div>
              )
            })
          }
        </div>
        : 
        <div className="browse-page">
          {
            displayedListings.map(listing => {
              return (
                <div className="browse-listing" key={uuid()}>
                  <NavLink exact to={`/listings/${listing.id}`}>
                    <img src={listing.photo} alt={listing.description}></img>
                    <p className="listing-price">${listing['total_price']}.00</p>
                    <p>{listing.username}</p>
                  </NavLink>
                </div>
              )
            })
          }
        </div>
      }
      <div className={user === me ? "account-settings" : "hidden"}>
      <button onClick={() => history.push("/setup")}>
          Edit Clothing Preferences
        </button>
        <div></div>
        <button onClick={logOut}>
          Log Out
        </button>
        <div></div>
        <button onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  )
}

export default Account