import AuthRouter from './routes/authRouter'
import Router from './routes/index'

const App = () => {
  return (
    <AuthRouter>
      <Router />
    </AuthRouter>
  )
}

export default App
