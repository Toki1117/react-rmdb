import { useParams, useNavigate } from 'react-router-dom';

// Convert time to hours and minutes
export const calcTime = time => {
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  return `${hours}h ${mins}m`;
};
// Convert a number to money formatting
export const convertMoney = money => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
};

export const isPersistedState = stateName => {
  const size = sessionStorage.length;
        if(size >=5) {
            sessionStorage.clear();
        }
  const sessionState = sessionStorage.getItem(stateName);
  return sessionState && JSON.parse(sessionState);
};

// HOC, Higher Order Component
export const withRouter = (Component) => (props) => ( 
  <Component {...props} params={useParams()} navigate={useNavigate()} />
);
