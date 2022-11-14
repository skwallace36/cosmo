import {Direction} from "../home_section/home_section_model";
import {HomeSectionModel} from "../home_section/home_section_model";


class ResizingEvent {
  edge: Direction | undefined;
  model: HomeSectionModel | undefined;
  local_x: number | undefined;
  global_x: number | undefined;
  dX: number | undefined;
  cursor = `auto`;
  resizing = false;
  can_resize = Direction.None;
  needs_start_width_updates = false;
  

  on_section_mouse_down(e: React.MouseEvent<HTMLDivElement>, m: HomeSectionModel) {
    this.model = m;
    this.local_x = e.nativeEvent.clientX - e.currentTarget.offsetLeft;
    this.global_x = e.nativeEvent.clientX;
    if(this.local_x < 5 && !m.not_resizable_edges.includes(Direction.Left)) { this.edge = Direction.Left; }
    if(this.local_x > e.currentTarget.clientWidth - 5 && !m.not_resizable_edges.includes(Direction.Right)) { this.edge = Direction.Right; }
    if(this.edge !== undefined && this.edge !== Direction.None) {
      this.dX = 0;
      this.resizing = true;
    }
  }

  on_section_mouse_move(e: React.MouseEvent<HTMLDivElement>, m: HomeSectionModel) {
    this.can_resize = this.on_resize_edge(e, m);
    if(this.resizing === false) {
      this.cursor = this.can_resize !== Direction.None ? `col-resize`: `auto`;
    }
    if(this.resizing === true) {
      this.dX = e.nativeEvent.clientX - this.global_x;
    }
  }

  on_section_mouse_up(e: React.MouseEvent<HTMLDivElement>, m: HomeSectionModel) {
    if(this.resizing === true) {
      this.edge = undefined;
      this.model = undefined;
      this.global_x = undefined;
      this.local_x = undefined;
      this.dX = undefined;
      this.resizing = false;
      this.can_resize = this.on_resize_edge(e, m);
      this.cursor = this.can_resize !== Direction.None ? `col-resize`: `auto`;
      this.needs_start_width_updates = true;
    }
  }

  on_resize_edge( e: React.MouseEvent<HTMLDivElement>, m: HomeSectionModel) {
    const local_x = e.nativeEvent.clientX - e.currentTarget.offsetLeft;
    if(local_x < 5 && !m.not_resizable_edges.includes(Direction.Left)) { return Direction.Left }
    if(local_x > e.currentTarget.clientWidth - 5 && !m.not_resizable_edges.includes(Direction.Right)) { return Direction.Right;}
    return Direction.None;
  }
}

export default ResizingEvent;