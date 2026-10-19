import type { PieceT } from "@/interfaces/piece";

export const IMAGES_PATH = "/images/";

export const TABLE_SIZE = {
  WIDTH: 1024,
  HEIGHT: 950,
};

const IMAGE_BOARD_SIZE = {
  WIDTH: 2452,
  HEIGHT: 4096,
};

const BOARD_SIZE_HEIGHT = TABLE_SIZE.HEIGHT - 40;

const ratio = BOARD_SIZE_HEIGHT / IMAGE_BOARD_SIZE.HEIGHT;

const BOARD_SIZE_WIDTH = ratio * IMAGE_BOARD_SIZE.WIDTH;

export const BOARD_SIZE = {
  X: (TABLE_SIZE.WIDTH - BOARD_SIZE_WIDTH) / 2,
  Y: (TABLE_SIZE.HEIGHT - BOARD_SIZE_HEIGHT) / 2,
  WIDTH: BOARD_SIZE_WIDTH,
  HEIGHT: BOARD_SIZE_HEIGHT,
};

const IMAGE_PIECE_SIZE = {
  WIDTH: 240,
  HEIGHT: 320,
};

export const PIECE_SIZE = {
  WIDTH: IMAGE_PIECE_SIZE.WIDTH * ratio,
  HEIGHT: IMAGE_PIECE_SIZE.HEIGHT * ratio,
};

export const PIECE_LIST: PieceT[] = Array.from(
  {
    length: 1,
  },
  (_, index) => {
    return {
      id: `red-${index}`,
      color: "red",
      value: index,
      faceUp: true,
      x: 400,
      y: 300,
    };
  },
);
