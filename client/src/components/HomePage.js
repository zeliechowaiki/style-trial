import {React, useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {v4 as uuid} from 'uuid';

function HomePage({user}) {
  const [popularSets, setPopularSets] = useState([]);

  useEffect(() => {
    fetch('/popular')
    .then(response => response.json())
    .then(data => setPopularSets(data));
  },[]);

  return (
    <div>
      <div className="homepage-background-image-container">
        <img src="/homepage-background.jpg" alt="clothes" className="homepage-background-image"></img>
        <div className="homepage-image-buttons">
          <NavLink exact to="/browse?fashion[]=mens">
            <button>Menswear</button>
          </NavLink>
          <NavLink exact to="/browse?fashion[]=womens">
            <button>Womenswear</button>
          </NavLink>
        </div>
      </div>
      <br></br>
      <h4 className="popular-listings-header">Popular Listings</h4>
      <div className="popular-listings">
      {
        popularSets.map(listing => {
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
      
    </div>
  )
}

export default HomePage