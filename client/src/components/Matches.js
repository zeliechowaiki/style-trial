import {React} from 'react';
import {NavLink} from 'react-router-dom';
import {v4 as uuid} from 'uuid';

function Matches({user, matches}) {

  if (!matches[0] || !matches[0]['my_set'] || !matches[0]['their_set']) return null;
  return (
    <div className="match-page">
      {
        matches.map(match => {
          return (
            <div key={uuid()}>
            <div className="match">
              <div className="browse-listing">
                <NavLink exact to={`/listings/${match['my_set'].id}`}>
                  <img src={match['my_set'].photo} alt={match['my_set'].description}></img>
                  <p className="listing-price">${match['my_set']['total_price']}.00</p>
                  <p>{match['my_set'].username}</p>
                </NavLink>
              </div>
              <div className="browse-listing">
              <NavLink exact to={`/listings/${match['their_set'].id}`}>
                <img src={match['their_set'].photo} alt={match['their_set'].description}></img>
                <p className="listing-price">${match['their_set']['total_price']}.00</p>
                <p>{match['their_set'].username}</p>
              </NavLink>
            </div>
          </div>
          <a className="bold" href={`mailto:${match['their_set'].email}`}>Contact {match['their_set'].name}</a>
          </div>
          )
        })
      }
    </div>
  )
}

export default Matches