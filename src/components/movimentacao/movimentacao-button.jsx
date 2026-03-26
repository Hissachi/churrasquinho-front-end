function BotaoMovimentacao({ produto, tipo }) {
  const { mutate, isLoading } = useCriarMovimentacao();

  const handleClick = () => {
    mutate({
      produto_id: produto.id,
      tipo,
      quantidade: 1,
    });
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {tipo === "entrada" ? "➕" : "➖"}
    </button>
  );
}