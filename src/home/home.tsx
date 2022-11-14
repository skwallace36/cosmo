import React, { useEffect, useState } from "react";
import HomeSection from "../home_section/home_section";
import {HomeSectionModel} from "../home_section/home_section_model";
import styles from "./home.module.css";
import {Direction} from "../home_section/home_section_model";
import ResizingEvent from "../home/resizing_event";
import { sec, string } from "mathjs";
import { invoke } from '@tauri-apps/api/tauri';
import { listen } from '@tauri-apps/api/event'


function Home() {

  function sendOutput(msg) {
    invoke('js2rs', { message: msg });
  }

  // const [cursor_style, set_cursor_style] = useState('auto');
  // const [needs_layout, set_needs_layout] = useState(0);
  // const [handle_resizing_event, set_handle_resizing_event] = useState(0);
  // const [resizing_event, set_resizing_event] = useState(new ResizingEvent());
  // const [sections, set_sections] = useState([]);
  // var resize_timer;
  // const [window_start_width, set_window_start_width] = useState<number>(-1);
  // const [window_width, set_window_width] = useState<number>();

  // const setWindowDimensions = () => {
  //   clearTimeout(resize_timer);
  //   set_window_width(window.innerWidth);
  //   resize_timer = setTimeout(resize_over, 100);
  // }
  // useEffect(() => {
  //   if(window_start_width === -1) {
  //     sections.forEach(s => { s.start_width = s.width; });
  //     set_window_start_width(window.innerWidth);
  //   }
  //   const width_change = window_width / window_start_width;
  //   sections.forEach(s => {
  //     s.width = s.start_width * width_change;
  //   });
  // }, [window_width]);

  // // called once, strict mode is off
  // useEffect(() => {
  //   const s1 = new HomeSectionModel(window.innerWidth * .20, "one", [Direction.Left]);
  //   const s2 = new HomeSectionModel(window.innerWidth * .40, "two", []);
  //   const s3 = new HomeSectionModel(window.innerWidth * .40, "three", [Direction.Right]);
  //   s1.right_neighbors.push(s2);
  //   s2.left_neighbors.push(s1);
  //   s2.right_neighbors.push(s3);
  //   s3.left_neighbors.push(s2);
  //   set_sections([s1, s2, s3]);
  //   window.addEventListener('resize', setWindowDimensions);
  //   return () => {
  //     window.removeEventListener('resize', setWindowDimensions)
  //   }
  // }, []);

  // useEffect(() => {
  //   set_cursor_style(resizing_event.cursor);
  //   if(resizing_event.resizing === true) {
  //     if(resizing_event.edge === Direction.Left) {
  //         resizing_event.model.width = resizing_event.model.start_width - resizing_event.dX;
  //         resizing_event.model.left_neighbors.forEach(m => { m.width = m.start_width + resizing_event.dX; }); 
  //     }
  //     if(resizing_event.edge === Direction.Right) {
  //       resizing_event.model.width = resizing_event.model.start_width + resizing_event.dX;
  //       resizing_event.model.right_neighbors.forEach(m => { m.width = m.start_width - resizing_event.dX; }); 
  //     } 
  //   }
  // }, [handle_resizing_event]);

  const [sections, set_sections] = useState([
    <HomeSection
      key={0}
      width={100}
      section_key={0}
      mouse_move_callback={on_section_mouse_move}
      mouse_down_callback={on_section_mouse_down}
      mouse_up_callback={on_section_mouse_up}
    />,
    <HomeSection
      key={1}
      width={100}
      section_key={1}
      mouse_move_callback={on_section_mouse_move}
      mouse_down_callback={on_section_mouse_down}
      mouse_up_callback={on_section_mouse_up}
    />
  ]);

  function on_section_mouse_down(e: React.MouseEvent<HTMLDivElement>, key: number) {
    e.preventDefault();
  }

  function on_section_mouse_move(e: React.MouseEvent<HTMLDivElement>, key: number) {
    e.preventDefault();
  }

  function on_section_mouse_up(e: React.MouseEvent<HTMLDivElement>, key: number) {
    e.preventDefault();
  }
// style={{cursor: cursor_style}
  // function resize_over() {
  //   console.log(`resize over`);
  // }

  return (
    <div className={styles.home}>
      {sections.map(element => { return <div>{element}</div>; })}
    </div>
  );
}

export default Home;
