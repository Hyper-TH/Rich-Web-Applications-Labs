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
import { GenerateExcusesPage } from './pages/GenerateExcusesPage';

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
						<CatFactsPage 
							subPageName="CatFactsPage"
							backTo="/"
						/>
					} 
				/>
				<Route 
					path="/generateExcuse" 
					element={
						<GenerateExcusesPage 
							subPageName="ExcusesPage"
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
