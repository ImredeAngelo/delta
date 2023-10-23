import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from './routes.js'
import Navbar from '~components/navbar'
import Footer from '~components/footer'
import './style/global.pcss'
import User from '~components/user'

export default function App() {
	const routing = routes.map((r) => (
        <Route key={r.path} index={r.index || false} path={r.path} element={<r.element/>}/>
    ))

	return (
		<User>
			<Navbar/>
			<Routes>
				{ routing }
			</Routes>
			<Footer/>
		</User>
	)
}
