const carrinho = [];

function adicionarItem(item) {
  carrinho.push(item);
}

function removerItem(indiceItem) {
  carrinho.splice(indiceItem, 1);
}

function limpaCarrinho() {
  carrinho = [];
}


function alteraItem(indiceItem, item) {
  carrinho[indiceItem] = item;
}

function getId(itemARemover) {
  return carrinho.findIndex(
    (itemNoCarrinho) =>
      itemNoCarrinho.nome === itemARemover.nome
  );
}

function getItens() {
  return carrinho;
}

function getItem(index) {
  return carrinho[index];
}



function getQtdeItens() {
  return carrinho.length;
}

export default {
  adicionarItem,
  removerItem,
  getId,
  getItens,
  getQtdeItens,
  alteraItem,
  getItem,
  limpaCarrinho,
};
