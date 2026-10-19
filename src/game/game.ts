import {
  TABLE_SIZE,
  BOARD_SIZE,
  IMAGES_PATH,
  PIECE_LIST,
} from "@/constants/game";
import { Application, Assets, Container, Sprite } from "pixi.js";
import Piece from "./piece";

class Game {
  private app: Application | null;
  private board: Container;
  private tableRef: HTMLDivElement | null;
  private pieces: Piece[] = [];

  //
  constructor(tableRef: HTMLDivElement | null) {
    if (!tableRef) {
      return;
    }

    this.tableRef = tableRef;
    this.init();
  }

  async init() {
    this.app = new Application();

    // Initialize the application
    await this.app.init({
      background: "#111",
      width: TABLE_SIZE.WIDTH,
      height: TABLE_SIZE.HEIGHT,
    });

    this.tableRef.appendChild(this.app.canvas);

    this.board = new Container();
    this.board.x = BOARD_SIZE.X;
    this.board.y = BOARD_SIZE.Y;

    // Load and draw the board background image
    const mapTexture = await Assets.load(`${IMAGES_PATH}/map-1.jpg`);
    const mapSprite = new Sprite(mapTexture);
    mapSprite.width = BOARD_SIZE.WIDTH;
    mapSprite.height = BOARD_SIZE.HEIGHT;
    this.board.addChild(mapSprite);

    this.app.stage.addChild(this.board);

    // PIECES
    this.createPieces();
  }
  private createPieces() {
    PIECE_LIST.forEach((piece) => {
      const newPiece = new Piece(piece);
      this.app.stage.addChild(newPiece.piece);
      this.pieces.push(newPiece);
    });
  }

  destroy() {
    this.app?.destroy({ removeView: true });
    this.app = null;
  }
}

export default Game;
