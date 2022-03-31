import repositorio from "../repositorio/itens.repositorio";

function adicionarItem(item) {
  const itensAtuais = repositorio.getItens();
  // Existe um item igual já registrado?
  const idItem = itensAtuais.findIndex(
    (itemRegistrado) => item.nome === itemRegistrado.nome);
  if (idItem > -1) {
    throw Error("Não são permitidos itens iguais");
  }
  if(item.estoque <= 0){
    throw Error("Não há estoque desse item");
  }
  for (const atributo in item) {
    if(item[atributo] === null || item[atributo] === ""){
      throw Error("Não são permitidos valores nulos ou vazios");
    }
  }
  
  repositorio.adicionarItem(item);
}


function verificaEstoque(item) {
  if(item.estoque <= 0){
    throw Error("Não há estoque desse item");
  }
  return true
}


function removerItem(itemARemover) {
  const idItem = repositorio.getId(itemARemover);
  repositorio.removerItem(idItem);
}


function getQtdeItens() {
  return repositorio.getQtdeItens();
}

export default {
  verificaEstoque,
  adicionarItem,
  removerItem,
  getQtdeItens,
};
