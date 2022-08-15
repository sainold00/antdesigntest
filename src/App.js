import GoogleMap from "./components/GoogleMap";
//antdesign
import { Layout } from "antd";
import "antd/dist/antd.css";
//css
import "./App.css";

const { Header, Content } = Layout;

function App() {
  return (
    <>
      <div className="App">
        <Header>
          <h1>Google Map</h1>
        </Header>
       
        <Content>
          <GoogleMap />
        </Content>
        
      </div>
    </>
  );
}

export default App;
