import './App.css';
import { useState } from "react";

function App() {
  const [result, setResult] = useState({});
  async function fetchData(val) {
    const searchtext = val.trim().toLowerCase();
    console.log(searchtext);
    if (searchtext.length > 0) {
      const apistring = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchtext}`;
        const response = await fetch(apistring);
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return await response.json();
    }
}

async function handleSearch(e) {
  const { value } = e.target;
  setResult({ result: await fetchData(value) })
  console.log(result)
}

  return (
    
    <div className="App">
      <h1 style={{fontfamily:'Arial', fontweight:'normal'}} >Wiki Search</h1>
    <input style={{width:'800px',height:'30px'}}type="text" className="search" onKeyUp={handleSearch} />
   
    <ul>
    {result.result && result.result.query.search.map((data,i) =>{
    let url=  `https://en.wikipedia.org/wiki/${data.title}`.trim();
      console.log(url);
      return(<div>
        <center>
        <table style={{width:'980px'}}>

      <tr><a href={url} style={{marginLeft:'20px',textDecoration:'none',paddingTop:'10px',paddingBottom:'10px',color:'blue',fontfamily:'sans-serif',
      fontweight:'normal',fontsize:'18px'}}>{data.title}</a></tr>  
        </table>
        </center>
        </div>
        
        )})}
 </ul>
    </div>
  );
}

export default App;