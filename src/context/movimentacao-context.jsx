"use client";

import { createContext, useContext, useState } from "react";

const MovimentacaoContext = createContext();

export function MovimentacaoProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [produto, setProduto] = useState(null);
  const [tipo, setTipo] = useState("entrada");

  const abrir = (produto = null, novoTipo = "entrada") => {
    setProduto(produto);
    setTipo(novoTipo);
    setOpen(true);
  };

  const fechar = () => {
    setOpen(false);
    setProduto(null);
    setTipo("entrada");
  };

  return (
    <MovimentacaoContext.Provider
      value={{ open, produto, tipo, abrir, fechar }}
    >
      {children}
    </MovimentacaoContext.Provider>
  );
}

export function useMovimentacaoModal() {
  return useContext(MovimentacaoContext);
}