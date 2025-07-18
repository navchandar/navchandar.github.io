
import './App.css';
import { Header, Subtitle } from './components/Header';
import Footer from './components/Footer';
import WorkHistory from './components/WorkHistory';
import Projects from './components/Projects';

function App() {
  return (
    <div className="App fade-in">
      <Header/>
      <Subtitle/>
      
      <WorkHistory />
      <Projects />

      <br/>
      <br/>

      <Footer/>
    </div>
  );
}

export default App;
