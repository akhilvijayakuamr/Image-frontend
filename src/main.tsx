import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import store from './Redux/store/store.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider } from 'react-redux'


let persistor = persistStore(store)

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
)
