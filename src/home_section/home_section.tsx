import { homeDir } from "@tauri-apps/api/path";
import { e, Matrix, size } from "mathjs";
import React, {MouseEvent, useEffect, useState } from "react";
import styles from "./home_section.module.css";
import {HomeSectionModel} from "./home_section_model";

import { invoke } from '@tauri-apps/api/tauri';


interface HomeSectionProps {
  // model: HomeSectionModel;
  width: number;
  section_key: number;
  mouse_move_callback: (e: React.MouseEvent<HTMLDivElement>, key: number) => void;
  mouse_down_callback: (e: React.MouseEvent<HTMLDivElement>, key: number) => void;
  mouse_up_callback: (e: React.MouseEvent<HTMLDivElement>, key: number) => void;
}

function HomeSection(props: HomeSectionProps) {

  function sendOutput(msg) {
    invoke('js2rs', { message: msg });
  }

  const handle_mouse_enter = (e) => {
    
  }
  return (
    <div
      className={styles.homeSection}
      key={props.section_key} 
      style={{width: `${props.width}px`}}
      onMouseMove={e => props.mouse_move_callback(e, props.section_key)}
      onMouseDown={e => props.mouse_down_callback(e, props.section_key)}
      onMouseUp={e => props.mouse_up_callback(e, props.section_key)}
      onMouseEnter={handle_mouse_enter}
    ></div>
  );
}

export default HomeSection;
