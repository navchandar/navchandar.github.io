
import './App.css';
import { Header, Subtitle } from './components/Header';
import Footer from './components/Footer';
import Projects from './components/Projects';

function App() {
  return (
    <div className="App">
      <Header/>
      <Subtitle/>
      
      <Projects />
      
      <br/>
      <br/>

      <Footer/>
    </div>
  );
}

export default App;
