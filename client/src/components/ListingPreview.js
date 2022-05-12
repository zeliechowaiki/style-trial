import React from 'react';
import { v4 as uuid } from 'uuid';
import {useHistory} from 'react-router-dom';

function ListingPreview({user, listingInfo, itemsInfo}) {
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
          // console.log(set);
          itemsInfo.forEach(item => createItemListing(item, set));
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
    <div>
      <h1>Preview Listing</h1>
      {/* <img src={URL.createObjectURL(listingInfo.photo)} alt="set"></img> */}
      <p>Total set value: ${totalValue}</p>
      {
        itemsInfo.map((item) => {
          return <img key={uuid()} src={URL.createObjectURL(item.photo)} alt="item"></img>
        })
      }
      <button onClick={cancelListing}>Cancel</button>
      <button onClick={createListing}>Create Listing</button>
    </div>
  )
}

export default ListingPreview