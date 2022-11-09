import { useEffect, useState } from "react";
import HomeSection from "../home_section/home_section";
import {HomeSectionModel} from "../home_section/home_section_model";
import styles from "./home.module.css";
import uuid from 'react-uuid';
import { boolean, e, matrix, number, sec } from 'mathjs'
import {Direction} from "../home_section/home_section_model";

function Home() {
  

  const [resizing_from, set_resizing_from] = useState<HomeSectionModel | undefined>(undefined);
  const [possible_resize, set_possible_resize] = useState(false);
  const [resizing, set_resizing] = useState(false);
  const [resizing_edge, set_resizing_edge] = useState(Direction.None);
  const [mouse_down_x, set_mouse_down_x] = useState(0);
  const [mouse_down_y, set_mouse_down_y] = useState(0);
  const [drag_dX, set_drag_dX] = useState(0);
  const [drag_dY, set_drag_dY] = useState(0);
  const [drag_iW, set_drag_iW] = useState(0);
  const [cursor_style, set_cursor_style] = useState('auto');

  const [sections, set_sections] = useState([]);
  const [needs_layout, set_needs_layout] = useState(0);
  // useEffect(() => {});

  // called once, strict mode is off
  useEffect(() => {
    const s1 = new HomeSectionModel(200);
    const s2 = new HomeSectionModel(300);
    const s3 = new HomeSectionModel(300);
    s1.right_neighbors.push(s2);
    s2.left_neighbors.push(s1);
    s2.right_neighbors.push(s3);
    s3.left_neighbors.push(s2);
    s1.set_all_neighbors();
    s2.set_all_neighbors();
    s3.set_all_neighbors();
    set_sections([s1, s2, s3]);
  }, []);

  useEffect(() => {
    if(!resizing) {
      sections.forEach(s => { s.start_width = s.width });
      set_resizing_from(undefined);
      set_resizing_edge(Direction.None);
      set_needs_layout(0);
    }
  }, [resizing]);

  function on_section_mouse_move(e: React.MouseEvent<HTMLDivElement>, m: HomeSectionModel) {
    e.preventDefault();
    const is_on_resize_edge = on_resize_edge(e, m);
    if(!resizing) {
      set_cursor_style(is_on_resize_edge !== Direction.None ? 'col-resize' : 'auto');
    }
    
    if(resizing === true) {
      const dX = e.nativeEvent.clientX - mouse_down_x;
        if(resizing_edge === Direction.Left) {
          resizing_from.width = resizing_from.start_width - dX;
          const num_left_neighbors = resizing_from.all_left_neighbors.length;
          const change_divided_equally = dX / num_left_neighbors;
          resizing_from.all_left_neighbors.forEach(n => { n.width = n.start_width + change_divided_equally; });
        } else if(resizing_edge === Direction.Right) {
          resizing_from.width = resizing_from.start_width + dX;
          const num_right_neighbors = resizing_from.all_right_neighbors.length; 
          const change_divided_equally = dX / num_right_neighbors;
          resizing_from.all_right_neighbors.forEach(n => { n.width = n.start_width - change_divided_equally; });
        }
      set_needs_layout(needs_layout+1);
    }
  }

  function on_section_mouse_down(e: React.MouseEvent<HTMLDivElement>, m: HomeSectionModel) {
    e.preventDefault();
    set_mouse_down_x(e.nativeEvent.clientX);
    set_mouse_down_y(e.nativeEvent.clientY);
    const edge = on_resize_edge(e, m);
    if(edge !== Direction.None) {
      set_resizing(true);
      set_resizing_from(m);
      set_resizing_edge(edge);
    }
  }
  

  function on_section_mouse_up(e: React.MouseEvent<HTMLDivElement>, m: HomeSectionModel) {
    e.preventDefault();
    set_resizing(false);
  }

  function on_resize_edge(e: React.MouseEvent<HTMLDivElement>, m: HomeSectionModel): Direction {
    const local_x = e.nativeEvent.clientX - e.currentTarget.offsetLeft;
    const local_x_left = local_x < 10;
    const local_x_right = local_x > e.currentTarget.clientWidth - 10;
    if(local_x_left || local_x_right) {
      return local_x_left ? Direction.Left : Direction.Right;
    }
    return Direction.None;
  }


  return (
    <div className={styles.home} style={{cursor: cursor_style}}>
      {
        sections.map(e => 
          <HomeSection
            key={e.section_key}
            model={e}
            mouse_move_callback={on_section_mouse_move}
            mouse_down_callback={on_section_mouse_down}
            mouse_up_callback={on_section_mouse_up}
          />
        )
      }
    </div>
  );
}

export default Home;
