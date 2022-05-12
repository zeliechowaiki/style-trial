import {React, useState, useEffect} from 'react';
import {v4 as uuid} from 'uuid';
import {NavLink, useLocation} from 'react-router-dom';

function BrowsePage({user}) {
  const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "Black", "Gray", "White", "Brown", "Tan", "Silver", "Gold", "Multi"];
  const location = useLocation();
  const [listings, setListings] = useState([]);
  const [formDisplay, setFormDisplay] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterBy, setFilterBy] = useState({
    fashion: [],
    sizes: [],
    colors: []
  });
  const [clickedFilters, setClickedFilters] = useState({...filterBy})
  const searchPath = location.search ? `${location.search.slice(1)}&` : "";
  const sortPath = `sort=${sortBy}`;
  const fashionPath = filterBy.fashion.length > 0 ? filterBy.fashion.map(f => `&fashion[]=${f}`).join('') : "";
  const sizesPath = filterBy.sizes.length > 0 ? filterBy.sizes.map(f => `&sizes[]=${f}`).join('') : "";
  const colorsPath = filterBy.colors.length > 0 ? filterBy.colors.map(f => `&colors[]=${f}`).join('') : "";
  const path = `?${searchPath}${sortPath}${fashionPath}${sizesPath}${colorsPath}`;
  console.log(path);

  useEffect(() => {
    fetch(`/clothing_sets${path}`)
    .then(response => response.json())
    .then(data => setListings(data));
  },[path]);

  function handleSortChange(e) {
    setSortBy(e.target.value);
  }

  function changeFilters(e, category) {
    const filtersCopy = {...clickedFilters};
    if (filtersCopy[category].includes(e.target.name)) {
      filtersCopy[category] = filtersCopy[category].filter(value => (value !== e.target.name && value !== `my-${category}`));
      setClickedFilters(filtersCopy);
    }
    else if (e.target.name === `my-${category}`) {
      console.log(user);
      filtersCopy[category] = [...user[category], `my-${category}`];
      setClickedFilters(filtersCopy);
    }
    else {
      filtersCopy[category] = [...filtersCopy[category].filter(value => value !== `my-${category}`), e.target.name];
      setClickedFilters(filtersCopy);
    }
  }

  function submitFilterForm() {
    setFormDisplay(false);
    setFilterBy({...clickedFilters});
  }
  
  function clearFilters() {
    setClickedFilters({
      fashion: [],
      sizes: [],
      colors: []
    });
  }

  return (
    <div>
      <h2>Explore</h2>
      <hr className="browse-line"></hr>
      <div className="filter-sort-container">
        <div className="filter-sort filter-button">
          <button name="filter" className="" onClick={() => setFormDisplay(true)}>Filter</button>
        </div>
        <div className="filter-sort sort-button">
          <p name="sort">Sort by:  </p>
          <div>
            <select name="sort" value={sortBy} onChange={handleSortChange}>
              <option value="recent">Most recent</option>
              <option value="all-popular">Most popular</option>
              <option value="low-price">Price: low to high</option>
              <option value="high-price">Price: high to low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="browse-page">
        {
          listings.map(listing => {
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
      <div className={formDisplay ? "filter-form" : "hidden"}>
        <h3>Filter</h3>
        <div>
          <label htmlFor="fashion">Fashion choice:</label><br></br>
          <button name="mens" onClick={e => changeFilters(e,"fashion")} className={clickedFilters.fashion.includes("mens") ? "clicked-preference" : ""}>Men's</button>
          <button name="womens" onClick={e => changeFilters(e,"fashion")} className={clickedFilters.fashion.includes("womens") ? "clicked-preference" : ""}>Women's</button>
          <button name="unisex" onClick={e => changeFilters(e,"fashion")} className={clickedFilters.fashion.includes("unisex") ? "clicked-preference" : ""}>Unisex</button><br></br>
          {
            user ? 
            <button name="my-fashion" onClick={e => changeFilters(e,"fashion")} className={clickedFilters.fashion.includes("my-fashion") ? "clicked-preference" : ""}>My Fashion Choices</button>
            : null
          }
        </div>
        <div>
          <label htmlFor="sizes">Size:</label><br></br>
          <button name="XS" onClick={e => changeFilters(e,"sizes")} className={clickedFilters.sizes.includes("XS") ? "clicked-preference" : ""}>XS</button>
          <button name="small" onClick={e => changeFilters(e,"sizes")} className={clickedFilters.sizes.includes("small") ? "clicked-preference" : ""}>Small</button>
          <button name="medium" onClick={e => changeFilters(e,"sizes")} className={clickedFilters.sizes.includes("medium") ? "clicked-preference" : ""}>Medium</button>
          <button name="large" onClick={e => changeFilters(e,"sizes")} className={clickedFilters.sizes.includes("large") ? "clicked-preference" : ""}>Large</button>
          <button name="XL" onClick={e => changeFilters(e,"sizes")} className={clickedFilters.sizes.includes("XL") ? "clicked-preference" : ""}>XL</button><br></br>
          {
            user ?
            <button name="my-sizes" onClick={e => changeFilters(e,"sizes")} className={clickedFilters.sizes.includes("my-sizes") ? "clicked-preference" : ""}>My Sizes</button>
            : null
          }
        </div>
        <div>
          <label htmlFor="colors">Color:</label><br></br>
          {
            colors.slice(0,5).map(color => {
              return <button key={uuid()} name={color.toLowerCase()} onClick={e => changeFilters(e,"colors")} className={clickedFilters.colors.includes(color.toLowerCase()) ? "clicked-preference" : ""}>{color}</button>
            })
          }
          <br></br>
          {
            colors.slice(5,10).map(color => {
              return <button key={uuid()} name={color.toLowerCase()} onClick={e => changeFilters(e,"colors")} className={clickedFilters.colors.includes(color.toLowerCase()) ? "clicked-preference" : ""}>{color}</button>
            })
          }
          <br></br>
          {
            colors.slice(10,15).map(color => {
              return <button key={uuid()} name={color.toLowerCase()} onClick={e => changeFilters(e,"colors")} className={clickedFilters.colors.includes(color.toLowerCase()) ? "clicked-preference" : ""}>{color}</button>
            })
          }
        </div>
        <button name="x" className="x-button" onClick={() => setFormDisplay(false)}>X</button>
        <button className="clear-filters" onClick={clearFilters}>Clear All</button><br></br>
        <button className="filter-form-submit" onClick={submitFilterForm}>View Items</button>
      </div>
    </div>
  )
}

export default BrowsePage