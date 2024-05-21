import Header from "./components/Header";
import MoneyBar from "./components/MoneyBar";
import Items from "./components/Items";
import Receipt from "./components/Receipt";
import "./App.css"


function App() {
  return (

    
    <div className="App">
        <div className="page">
     {/*all page width 900px*/}
     

     {/* width full*/}
     <Header />
     {/* width full*/}
     <MoneyBar/>
     {/* width 3 columns*/}
     <Items/>
     {/* width full, small box*/}
      <Receipt />
      

     
      </div>
      </div>
    
  );
}

export default App;
