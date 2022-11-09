import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Home from "../home/home";
import styles from "./index.module.css";
import HomeSectionModel from "../home_section/home_section_model";


function App() {


  return (<div className={styles.homeContainer}> <Home /> </div>);
}

export default App;
