import {React, useState} from 'react';

function NewItem({user, setPageNumber, defaultItem, itemsInfo, setItemsInfo}) {
  const [itemNumber, setItemNumber] = useState(0);

  function handleItemChange(e) {
    const itemsInfoCopy = [...itemsInfo];
    if (e.target.name === "item-photo" && e.target.files[0]) {
      itemsInfoCopy[itemNumber].photo = e.target.files[0];
      setItemsInfo(itemsInfoCopy);
    }
    else {
      itemsInfoCopy[itemNumber][e.target.name] = e.target.value;
      setItemsInfo(itemsInfoCopy);
    }
  }

  function onContinue(e) {
    if (itemsInfo[itemNumber].photo && itemsInfo[itemNumber].description && itemsInfo[itemNumber].brand && itemsInfo[itemNumber].value > 0) {
      if (e.target.name === 'complete-set') {
      setPageNumber(3);
    }
      else {
        const itemsInfoCopy = [...itemsInfo];
        itemsInfoCopy[itemNumber + 1] = defaultItem;
        setItemsInfo(itemsInfoCopy);
        setItemNumber(itemNumber + 1);
      }
    }
  }

  return (
    <div className="new-listing-page">
      <div>
        <label htmlFor="item-photo">Photo of Item</label>
        <div className="set-photo-button">
          <input type="file" name="item-photo"
          className="set-photo-input" onChange={handleItemChange}>
          </input>
          <img className="sample-set-photo" src={itemsInfo[itemNumber].photo ? URL.createObjectURL(itemsInfo[itemNumber].photo) : "/add-photo.jpeg"} alt="profile"></img>
        </div>
      </div>
      <br></br>
      <div>
        <label htmlFor="type">Select clothing category:</label>
        <select name="type" onChange={handleItemChange} value={itemsInfo[itemNumber].type}>
          <option value="tops">Tops</option>
          <option value="bottoms">Bottoms</option>
          <option value="dresses">Dresses</option>
          <option value="outerwear">Outerwear</option>
          <option value="accessories">Accessories</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>
      <br></br>
      <div>
        <label htmlFor="description">Description</label>
        <br></br>
        <textarea type="text" name="description" 
        placeholder="Describe the item"
        className="big-description" 
        onChange={e => handleItemChange(e,"desc")}
        value={itemsInfo[itemNumber].description}
        ></textarea>
      </div>
      <br></br>
      <div>
        <label htmlFor="size">Select clothing size:</label>
        <select name="size" onChange={handleItemChange} value={itemsInfo[itemNumber].size}>
          <option value="XS">XS</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="XL">XL</option>
          <option value="other">Other</option>
        </select>
      </div>
      <br></br>
      <div>
        <label htmlFor="brand">Clothing brand:</label>
        <input type="text" name="brand" 
        onChange={handleItemChange} 
        value={itemsInfo[itemNumber].brand}
        placeholder="Enter brand name">
        </input>
      </div>
      <br></br>
      <div>
        <label htmlFor="color">Select clothing color:</label>
        <select name="color" onChange={handleItemChange} value={itemsInfo[itemNumber].color}>
          <option value="red">Red</option>
          <option value="orange">Orange</option>
          <option value="yellow">Yellow</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="pink">Pink</option>
          <option value="black">Black</option>
          <option value="gray">Gray</option>
          <option value="white">White</option>
          <option value="brown">Brown</option>
          <option value="tan">Tan</option>
          <option value="gold">Gold</option>
          <option value="silver">Silver</option>
          <option value="multi">Multi</option>
        </select>
      </div>
      <br></br>
      <div>
        <label htmlFor="condition">Select clothing size:</label>
        <select name="condition" onChange={handleItemChange} value={itemsInfo[itemNumber].condition}>
          <option value="brand-new">Brand New</option>
          <option value="like-new">Like New</option>
          <option value="used-excellent">Used - Excellent</option>
          <option value="used-good">Used - Good</option>
          <option value="used-fair">Used - Fair</option>
        </select>
      </div>
      <br></br>
      <div>
        <label htmlFor="value">Approximate item value: $</label>
        <input type="number" name="value" 
        onChange={handleItemChange} 
        value={itemsInfo[itemNumber].value}
        min="0" max="5000"
        ></input>
      </div>
      <br></br>
      <button name="add-item" onClick={onContinue}>Next item</button>
      <button name="complete-set" onClick={onContinue}>Complete set</button>
      <p>*All fields reqiured</p>
    </div>
  )
}

export default NewItem