import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import configureStore from './Redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore();

root.render(
  <Provider store={store}>
      <App />
  </Provider>
)
