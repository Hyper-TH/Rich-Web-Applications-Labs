import './App.css';
import {
	BrowserRouter as
	Router,
	Routes,
	Route
} from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotesPage } from './pages/NotesPage';
import { CatFactsPage } from './pages/CatFactsPage';

function App() {
	return (
		<>
		<Router>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route 
					path="/notes" 
					element={
						<NotesPage 
							subPageName="NotesPage"
							backTo="/"
						/>
					} 
				/>
				<Route 
					path="/catfacts" 
					element={
						<NotesPage 
							subPageName="CatFactsPage"
							backTo="/"
						/>
					} 
				/>
			</Routes>
		</Router>
		</>
	);
}

export default App;
