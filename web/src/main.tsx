import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'
import './index.css'
import AuthRouter from './routes/authRouter'
import { store } from './store/index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <AuthRouter>
          <App />
        </AuthRouter>
      </BrowserRouter>
    </Provider>
  </>
)
