import Header from './components/Header'
import './App.css';
import ArticleList from "./components/ArticleList";
import { Fragment } from "react";

function App() {
  return (
      <Fragment>
        <Header />
        <ArticleList />
      </Fragment>
  );
}

export default App;
