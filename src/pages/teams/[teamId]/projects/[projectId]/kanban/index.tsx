import React from "react";

import { BoardGuard } from "@/page-implementations/boards/guards/board.guard";

const KanbanPage = () => {
  return <BoardGuard>KanbanPage</BoardGuard>;
};

export default KanbanPage;
