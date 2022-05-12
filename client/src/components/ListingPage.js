import {React, useState, useEffect} from 'react';
import {useLocation, NavLink} from 'react-router-dom';
import {v4 as uuid} from 'uuid';

function ListingPage({user}) {
  const location = useLocation();
  const listingId = location.pathname.split('/')[location.pathname.split('/').length-1];
  const [listing, setListing] = useState({});
  const listingPhotos = listing && listing.items ? [listing.photo, ...listing.items.map(item => item.photo)] : null;
  const userLiked = user && listing && listing['clothing_set_likes'] && listing['clothing_set_likes'].map(like => like.user_id).includes(user.id) ? true : false
  const [bigPhoto, setBigPhoto] = useState(null);

  useEffect(() => {
    fetch(`/clothing_sets/${listingId}`)
    .then(response => response.json())
    .then(data => {
      setListing(data);
      setBigPhoto(data.photo);
    });
  },[listingId]);

  function likeListing() {
    fetch('/clothing_set_likes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        clothing_set_id: listingId,
        user_id: user.id
      })
    })
    .then(response => response.json())
    .then(like => {
      const listingCopy = {...listing};
      listingCopy['clothing_set_likes'] = [...listing['clothing_set_likes'], like];
      listingCopy['like_count'] = listing['like_count'] + 1;
      setListing(listingCopy);
    });
  }

  function dislikeListing() {
    fetch(`/clothing_set_likes/${listing['clothing_set_likes'].find(like => like.user_id === user.id).id}`, {
      method: 'DELETE'
    })
    .then(() => {
      const listingCopy = {...listing};
      listingCopy['clothing_set_likes'] = listing['clothing_set_likes'].filter(like => like.user_id !== user.id);
      setListing(listingCopy);
    })
  }

  if (!listing || !listing.items || !bigPhoto) return null;
  return (
    <div className="listing-page">
      <div className="side-photos-container">
        {
          listingPhotos.map(photo => {
            return <img key={uuid()} name={photo} src={photo} alt="item" onClick={e => setBigPhoto(e.target.name)}></img>
          })
        }
      </div>
      <div className="big-photo-container">
        <img src={bigPhoto} alt="large display"></img>
      </div>
      <div className="listing-info">
        <NavLink exact to={`/account/${listing.username}`}>
          <img src={listing.avatar} alt="poster avatar"></img>
          <p className="listing-page-username">{listing.username}</p>
        </NavLink>
        <p>{listing.description}</p>
        <p className="listing-page-username">${listing['total_price']}.00</p>
        <p>{listing['clothing_set_likes'].length === 1 ? "1 like" : `${listing['clothing_set_likes'].length} likes`}</p>
        <button onClick={userLiked ? dislikeListing : likeListing} className={user && user.id !== listing.user_id ? "" : "hidden"}>{userLiked ? 'Liked' : 'Like'}</button>
        <p>Items:</p>
        {
          listing.items.map(item => {
            return (
              <div key={item.id}>
                <p>${item.value}.00: {[item.condition[0].toUpperCase(), item.condition.slice(1)]} {item.brand} {item.description.toLowerCase()} in {item.size}</p>
              </div>
            )
          })
        }
      </div>
      
    </div>
  )
}

export default ListingPage