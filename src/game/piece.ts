import type { PieceT } from "@/interfaces/piece";
import { IMAGES_PATH, PIECE_SIZE } from "@/constants/game";

import { Container, Assets, Sprite, Graphics } from "pixi.js";

class Piece {
  piece: Container;
  private front: Container;
  private back: Container;

  private x: number;
  private y: number;
  private id: string;
  private faceUp: boolean;
  private value: number;
  private color: "red" | "blue";

  constructor(piece: PieceT) {
    this.x = piece.x;
    this.y = piece.y;
    this.id = piece.id;
    this.color = piece.color;
    this.faceUp = piece.faceUp;
    this.value = piece.value;
    //

    this.piece = new Container();
    this.front = new Container();
    this.back = new Container();
    this.piece.x = this.x;
    this.piece.y = this.y;
    this.addShadow();
    this.piece.addChild(this.front);
    this.piece.addChild(this.back);

    if (this.faceUp) {
      this.front.visible = true;
      this.back.visible = false;
    } else {
      this.front.visible = false;
      this.back.visible = true;
    }

    this.loadPiece();
  }
  addShadow() {
    const shadow = new Graphics();

    const wp = 4;
    const hp = 3;
    shadow.roundRect(
      -0.5 * (PIECE_SIZE.WIDTH + wp),
      -0.5 * PIECE_SIZE.WIDTH - (PIECE_SIZE.WIDTH - PIECE_SIZE.HEIGHT) / 2 + hp,
      PIECE_SIZE.WIDTH + wp,
      PIECE_SIZE.WIDTH,
      6,
    );
    shadow.fill({
      color: 0x000000,
      alpha: 0.7,
    });
    this.piece.addChild(shadow);
  }
  async loadPiece() {
    const textureFront = await Assets.load(
      `${IMAGES_PATH}/${this.color}-${this.value}.png`,
    );
    const spriteFront = new Sprite(textureFront);
    spriteFront.width = PIECE_SIZE.WIDTH;
    spriteFront.height = PIECE_SIZE.HEIGHT;
    spriteFront.x = -0.5 * PIECE_SIZE.WIDTH;
    spriteFront.y = -0.5 * PIECE_SIZE.HEIGHT;
    this.front.addChild(spriteFront);

    const textureBack = await Assets.load(
      `${IMAGES_PATH}/${this.color}-back.png`,
    );
    const spriteBack = new Sprite(textureBack);
    spriteBack.width = PIECE_SIZE.WIDTH;
    spriteBack.height = PIECE_SIZE.HEIGHT;
    spriteBack.x = -0.5 * PIECE_SIZE.WIDTH;
    spriteBack.y = -0.5 * PIECE_SIZE.HEIGHT;
    this.back.addChild(spriteBack);
  }
}

export default Piece;
