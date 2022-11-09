import { homeDir } from "@tauri-apps/api/path";
import { e, Matrix, size } from "mathjs";
import React, {MouseEvent, useEffect, useState } from "react";
import styles from "./home_section.module.css";
import {HomeSectionModel} from "./home_section_model";



interface HomeSectionProps {
  model: HomeSectionModel;
  mouse_move_callback: (e: React.MouseEvent<HTMLDivElement>, m: HomeSectionModel) => void;
  mouse_down_callback: (e: React.MouseEvent<HTMLDivElement>, m: HomeSectionModel) => void;
  mouse_up_callback: (e: React.MouseEvent<HTMLDivElement>, m: HomeSectionModel) => void;
}

function HomeSection(props: HomeSectionProps) {

  return (
    <div
      className={styles.homeSection}
      key={props.model.section_key} 
      style={{width: `${props.model.width}px`}}
      onMouseMove={e => props.mouse_move_callback(e, props.model)}
      onMouseDown={e => props.mouse_down_callback(e, props.model)}
      onMouseUp={e => props.mouse_up_callback(e, props.model)}
    />
  );
}

export default HomeSection;
