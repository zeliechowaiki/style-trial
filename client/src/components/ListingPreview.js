import React from 'react';
import { v4 as uuid } from 'uuid';
import {useHistory} from 'react-router-dom';

function ListingPreview({user, listingInfo, itemsInfo}) {
  const listingPhotos = [listingInfo.photo,...itemsInfo.map(item => item.photo)]
  let history = useHistory();
  console.log(user,listingInfo, itemsInfo);
  const totalValue = itemsInfo.reduce((a,b) => a + parseInt(b.value), 0);

  function cancelListing() {
    history.push('/');
  }

  function createItemListing(item, set) {
    console.log(item)
    const formData = new FormData();
    formData.append('photo', item.photo);
    formData.append('item_type', item.type);
    formData.append('description', item.description);
    formData.append('color', item.color);
    formData.append('brand', item.brand);
    formData.append('size', item.size);
    formData.append('condition', item.condition);
    formData.append('value', parseInt(item.value));
    formData.append('clothing_set_id', set.id);

    fetch("/items", {
      method: "POST",
      body: formData,
    }).then(r => {
      if (r.ok) {
        r.json().then(item => {
          console.log(item);
        })
      }
      else {
        r.json().then(err => {
          console.log(err);
        })
      }
    })
  }

  function createListing() {
    const formData = new FormData();
    formData.append('photo', listingInfo.photo);
    formData.append('description', listingInfo.description);
    formData.append('user_id', user.id);
    for (let i = 0; i < listingInfo.fashion.length; i++) {
      formData.append('fashion[]', listingInfo.fashion[i])
    }
    for (let i = 0; i < listingInfo.styles.length; i++) {
      formData.append('styles[]', listingInfo.styles[i])
    }

    fetch("/clothing_sets", {
      method: "POST",
      body: formData,
    }).then(r => {
      if (r.ok) {
        r.json().then(set => {
          itemsInfo.forEach(item => createItemListing(item, set));
          history.push(`/`);
        })
      }
      else {
        r.json().then(err => {
          console.log(err);
        })
      }
    })
  }

  return (
    <div className="listing-page">
      <div className="side-photos-container">
        {
          listingPhotos.map(photo => {
            return <img key={uuid()} src={URL.createObjectURL(photo)} alt="item"></img>
          })
        }
      </div>
      <div className="big-photo-container">
        <img src={URL.createObjectURL(listingInfo.photo)} alt="large display"></img>
      </div>
      <div className="listing-info">
          <img src={user.avatar} alt="poster avatar"></img>
          <p className="listing-page-username">{user.username}</p>
        <p>{listingInfo.description}</p>
        <p className="listing-page-username">${totalValue}.00</p>
        <p>0 likes</p>
        <p>Items:</p>
        {
          itemsInfo.map(item => {
            return (
              <div key={uuid()}>
                <p>${item.value}.00: {[item.condition[0].toUpperCase(), item.condition.slice(1)]} {item.brand} {item.description.toLowerCase()} in {item.size}</p>
              </div>
            )
          })
        }
        <button onClick={createListing}>Create Listing</button>
        <div className="listing-previews-br" ></div>
        <button onClick={cancelListing}>Cancel</button>
      </div>
    </div>
  )
}

export default ListingPreview