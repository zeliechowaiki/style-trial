import {React, useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

function Setup({setUser,user}) {
  const defaultBrands = ["Nike", "Gucci", "Louis Vuitton", "Adidas"];
  const defaultStyles = ["Vintage", "Chic", "Streetwear", "Artsy"];
  let history = useHistory();
  const [displayedChoices, setDisplayedChoices] = useState({
    displayedBrands: [...defaultBrands],
    displayedStyles: [...defaultStyles]
  })
  const [accountPreferences, setAccountPreferences] = useState({
    fashion: [],
    brands: [],
    sizes: [],
    styles: []
  });
  
  useEffect(() => {
    if (user && user.brands && user.styles) {
      const customBrands = user.brands.filter(brand => !defaultBrands.includes(brand));
      const customStyles = user.styles.filter(style => !defaultStyles.includes(style));
      setDisplayedChoices({
        displayedBrands: [...defaultBrands, ...customBrands],
        displayedStyles: [...defaultStyles, ...customStyles]
      });
      setAccountPreferences({
        fashion: user.fashion,
        brands: user.brands,
        sizes: user.sizes,
        styles: user.styles
      });
    }
  },[user]);

  function onSetupSubmit(e) {
    e.preventDefault();
    fetch("/users/0", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fashion: accountPreferences.fashion,
        sizes: accountPreferences.sizes,
        brands: accountPreferences.brands,
        styles: accountPreferences.styles,
      }),
    })
    .then(response => response.json())
    .then(user => {
      setUser(user);
      history.push(`/account/${user.username}`);
    })
  }

  function changeAccountPreference(e,category) {
    const accountPreferencesCopy = {...accountPreferences};
    if (accountPreferences[category].includes(e.target.name)) {
      accountPreferencesCopy[category] = accountPreferences[category].filter(preference => preference !== e.target.name);
      setAccountPreferences(accountPreferencesCopy);
    }
    else {
      accountPreferencesCopy[category] = [...accountPreferencesCopy[category], e.target.name];
      setAccountPreferences(accountPreferencesCopy);
    }
  }

  function createOther(e,category) {
    e.preventDefault();
    if (e.target[category].value.length > 1) {
      const displayedChoicesCopy = {...displayedChoices};
      displayedChoicesCopy[category] = [...displayedChoicesCopy[category], e.target[category].value];
      setDisplayedChoices(displayedChoicesCopy);
    }
    e.target.reset();
  }

  return (
    <div>
      <div>
        <label htmlFor="fashion">Select fashion choice(s):</label>
        <button name="mens" type="button" className={accountPreferences.fashion.includes("mens") ? "clicked-preference" : ""}
        onClick={e => changeAccountPreference(e,"fashion")}>Men's</button>
        <button name="womens" type="button" className={accountPreferences.fashion.includes("womens") ? "clicked-preference" : ""}
        onClick={e => changeAccountPreference(e,"fashion")}>Women's</button>
        <button name="unisex" type="button" className={accountPreferences.fashion.includes('unisex') ? "clicked-preference" : ""}
        onClick={e => changeAccountPreference(e,"fashion")}>Unisex</button>
      </div>
      <div>
        <label htmlFor="sizes">Select sizes:</label>
        <button name="XS" type="button" className={accountPreferences.sizes.includes('XS') ? "clicked-preference" : ""}
        onClick={e => changeAccountPreference(e,"sizes")}>XS</button>
        <button name="small" type="button" className={accountPreferences.sizes.includes('small') ? "clicked-preference" : ""}
        onClick={e => changeAccountPreference(e,"sizes")}>Small</button>
        <button name="medium" type="button" className={accountPreferences.sizes.includes('medium') ? "clicked-preference" : ""}
        onClick={e => changeAccountPreference(e,"sizes")}>Medium</button>
        <button name="large" type="button" className={accountPreferences.sizes.includes('large') ? "clicked-preference" : ""}
        onClick={e => changeAccountPreference(e,"sizes")}>Large</button>
        <button name="XL" type="button" className={accountPreferences.sizes.includes('XL') ? "clicked-preference" : ""}
        onClick={e => changeAccountPreference(e,"sizes")}>XL</button>
      </div>
      <div>
        <label htmlFor="brands">Select brands:</label>
        {
          displayedChoices.displayedBrands.map(brand => {
            return (
              <button key={brand} name={brand} type="button" className={accountPreferences.brands.includes(brand) ? "clicked-preference" : ""}
              onClick={e => changeAccountPreference(e,"brands")}>{brand}</button>
            )
          })
        }
        <form onSubmit={e => createOther(e,"displayedBrands")}>
          <label htmlFor="displayedBrands">Other brand:</label>
          <input type="text" name="displayedBrands"></input>
          <button type="submit">Add brand</button>
        </form>
      </div>
      <div>
        <label htmlFor="styles">Select styles:</label>
        {
          displayedChoices.displayedStyles.map(style => {
            return (
              <button key={style} name={style} type="button" className={accountPreferences.styles.includes(style) ? "clicked-preference" : ""}
              onClick={e => changeAccountPreference(e,"styles")}>{style}</button>
            )
          })
        }
        <form onSubmit={e => createOther(e,"displayedStyles")}>
          <label htmlFor="displayedStyles">Other style:</label>
          <input type="text" name="displayedStyles"></input>
          <button type="submit">Add style</button>
        </form>
      </div>
      <button onClick={onSetupSubmit}>Complete</button>
      <br></br>
      <button onClick={() => history.push(`/account/${user.username}`)}>Skip</button>
    </div>
  )
}

export default Setup