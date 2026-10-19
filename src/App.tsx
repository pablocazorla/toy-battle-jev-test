import { useEffect, useRef } from "react";
import Game from "@/game/game";
import Table from "@/Table";

function App() {
  const tableRef = useRef<HTMLDivElement>(null);

  const game = useRef<Game | null>(null);

  useEffect(() => {
    if (!tableRef.current) return;

    game.current = new Game(tableRef.current);

    return () => {
      game.current?.destroy();
      game.current = null;
    };
  }, []);

  return (
    <div>
      <Table reference={tableRef} />
    </div>
  );
}

export default App;
