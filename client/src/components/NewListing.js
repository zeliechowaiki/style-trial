import {React, useState} from 'react';

function NewListing({user}) {
  const [pageNumber, setPageNumber] = useState(1);
  const defaultStyles = ["Vintage", "Chic", "Streetwear", "Artsy"];
  const [displayedStyles, setDisplayedStyles] = useState([...defaultStyles]);
  const [listingInfo, setListingInfo] = useState({
    photo: null,
    desciption: "",
    fashion: [],
    styles: [],
  });

  function handleListingChange(e, category) {
    const listingInfoCopy = { ...listingInfo };
    if (e.target.name === "set-photo" && e.target.files[0]) {
      listingInfoCopy.photo = e.target.files[0];
      setListingInfo(listingInfoCopy);
    }
    else if (category === "desc") {
      listingInfoCopy.desciption = e.target.value;
      setListingInfo(listingInfoCopy);
    }
    else if (listingInfo[category].includes(e.target.name)) {
      listingInfoCopy[category] = listingInfo[category].filter(tag => tag !== e.target.name);
      setListingInfo(listingInfoCopy);
    }
    else {
      listingInfoCopy[category] = [...listingInfo[category], e.target.name];
      setListingInfo(listingInfoCopy);
    }
  }

  function createOtherStyle(e) {
    e.preventDefault();
    if (e.target.displayedStyles.value.length > 1) {
      setDisplayedStyles([...displayedStyles, e.target.displayedStyles.value]);
    }
    e.target.reset();
  }

  function submitSet(e) {
    if (listingInfo.photo && listingInfo.desciption && listingInfo.fashion.length > 0 && listingInfo.styles.length > 0) {
      setPageNumber(2);
    }
  }

  if (pageNumber === 1) {
    return (
      <div className="new-listing-page">
        <div>
          <label htmlFor="set-photo">Photo of Entire Set</label>
          <div className="set-photo-button">
            <input type="file" name="set-photo"
            className="set-photo-input" onChange={handleListingChange}>
            </input>
            <img className="sample-set-photo" src={listingInfo.photo ? URL.createObjectURL(listingInfo.photo) : "/add-photo.png"} alt="profile"></img>
          </div>
        </div>
        <br></br>
        <div>
          <label htmlFor="desciption">Description</label>
          <br></br>
          <textarea type="text" name="desciption" placeholder="Describe the clothing set"
          className="big-description" onChange={e => handleListingChange(e,"desc")}
          ></textarea>
        </div>
        <br></br>
        <div>
          <label htmlFor="fashion">Select Fashion choice(s):</label>
          <button name="male" type="button" className={listingInfo.fashion.includes('male') ? "clicked-preference" : ""}
          onClick={e => handleListingChange(e,"fashion")}>Male</button>
          <button name="female" type="button" className={listingInfo.fashion.includes('female') ? "clicked-preference" : ""}
          onClick={e => handleListingChange(e,"fashion")}>Female</button>
          <button name="unisex" type="button" className={listingInfo.fashion.includes('unisex') ? "clicked-preference" : ""}
          onClick={e => handleListingChange(e,"fashion")}>Unisex</button>
        </div>
        <br></br>
        <div>
          <label htmlFor="styles">Select styles:</label>
          {
            displayedStyles.map(style => {
              return (
                <button key={style} name={style} type="button" className={listingInfo.styles.includes(style) ? "clicked-preference" : ""}
                onClick={e => handleListingChange(e,"styles")}>{style}</button>
              )
            })
          }
          <form onSubmit={e => createOtherStyle(e)}>
            <label htmlFor="displayedStyles">Other style:</label>
            <input type="text" name="displayedStyles"></input>
            <button type="submit">Add style</button>
          </form>
        </div>
        <button onClick={submitSet}>Continue</button>
        <p>*All fields reqiured</p>
      </div>
    )
  }
  else {
    return (
      <div>
        
      </div>
    )
  }
  
}

export default NewListing