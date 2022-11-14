import uuid from 'react-uuid';

enum Direction {
  Up,
  Down,
  Left,
  Right,
  None
};

class Neighbors {
  direct: HomeSectionModel[] = [];
  all: HomeSectionModel[] = [];
}

class HomeSectionModel {
  short_name: string;
  section_key: string;
  width: number;
  start_width: number;
  left_neighbors: HomeSectionModel[] = [];
  all_left_neighbors: HomeSectionModel[] = [];
  right_neighbors: HomeSectionModel[] = [];
  all_right_neighbors: HomeSectionModel[] = [];
  up_neighbors: HomeSectionModel[] = [];
  all_up_neighbors: HomeSectionModel[] = [];
  down_neighbors: HomeSectionModel[] = [];
  all_down_neighbors: HomeSectionModel[] = [];
  not_resizable_edges: Direction[] = [];

  constructor(width: number, short_name: string, not_resizable_edges: Direction[]) {
    this.short_name = short_name;
    this.width = width;
    this.not_resizable_edges = not_resizable_edges;
    this.start_width = width;
    this.section_key = uuid();
  }

  neighbors = (edge: Direction): HomeSectionModel[] => {
    switch(edge) {
      case Direction.Left:
        return this.left_neighbors;
      case Direction.Right:
        return this.right_neighbors;
      case Direction.Up:
        return this.up_neighbors;
      case Direction.Down:
        return this.down_neighbors;
    }
  }

  set_all_neighbors = () => {
    this.find_neighbors(Direction.Up, this.all_up_neighbors);
    this.find_neighbors(Direction.Down, this.all_down_neighbors);
    this.find_neighbors(Direction.Left, this.all_left_neighbors);
    this.find_neighbors(Direction.Right, this.all_right_neighbors);
  };

  find_neighbors = (direction: Direction, neighbors: HomeSectionModel[])=> {
    const result: HomeSectionModel[] = [];
    switch(direction) {
      case Direction.Up:
        this.up_neighbors.forEach(n => {
          neighbors.push(n);
          n.find_neighbors(direction, neighbors);
        });
        break; 
      case Direction.Down:
        this.down_neighbors.forEach(n => {
          neighbors.push(n);
          n.find_neighbors(direction, neighbors);
        });
        break; 
      case Direction.Left:
        this.left_neighbors.forEach(n => {
          neighbors.push(n);
          n.find_neighbors(direction, neighbors);
        });
        break; 
      case Direction.Right:
        this.right_neighbors.forEach(n => {
          neighbors.push(n);
          n.find_neighbors(direction, neighbors);
        });
        break; 
    }
  };
}

export {HomeSectionModel, Direction};