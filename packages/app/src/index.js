import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from './routes.js'
import '~style/global.pcss'
import Navbar from '~components/navbar/index.js'
import Footer from '~components/footer/index.js'

export default function App() {
	const routing = routes.map((r) => (
        <Route key={r.path} index={r.index || false} path={r.path} element={<r.element/>}/>
    ))

	return (
		<div>
			<Navbar/>
			<Routes>
				{ routing }
			</Routes>
			<Footer/>
		</div>
	)
}
