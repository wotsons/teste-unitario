import servicoItens from "./itens.servico";
import repositorio from "../repositorio/itens.repositorio";

jest.mock("../repositorio/itens.repositorio", () => ({
  adicionarItem: jest.fn(),
  limpaCarrinho: jest.fn(),
  removerItem: jest.fn(),
  alteraItem: jest.fn(),
  getItem: jest.fn(),
  getId: jest.fn().mockReturnValue(1),
  getQtdeItens: jest.fn().mockReturnValue([].length),
  getItens: jest.fn().mockReturnValue([]),
}));

describe("Gerenciamento de itens", () => {
  beforeEach(() => {});

  test("Deve inserir um item", () => {
    servicoItens.adicionarItem({
      id: 1,
      nome: "Gato",
      preco: "25,80",
      estoque: 1
    })
    repositorio.getQtdeItens.mockReturnValue(1);
    const qtdeItens = servicoItens.getQtdeItens();
    expect(qtdeItens).toBe(1);
  });

  

  test("Deve inserir vários itens", () => {
    const item1 = {
      id: 1,
      nome: "Gato",
      preco: "25,80",
      estoque: 1
    };
    const item2 = {
      id:2,
      nome: "Peixe",
      preco: "119,80",
      estoque: 1
    };
    servicoItens.adicionarItem(item1);
    servicoItens.adicionarItem(item2);
    repositorio.getQtdeItens.mockReturnValue(2);
    const qtdeItens = servicoItens.getQtdeItens();
    expect(qtdeItens).toBe(2);
  });

  test("Deve remover um item", () => {
    const item = {
      id: 1,
      nome: "Racão Chester",
      preco: "25,80",
      estoque: 1
    };

    servicoItens.adicionarItem(item);
    repositorio.getQtdeItens.mockReturnValue(1);
    let qtdeItens = servicoItens.getQtdeItens();
    expect(qtdeItens).toBe(1);
    servicoItens.removerItem(item);
    repositorio.getQtdeItens.mockReturnValue(0);
    qtdeItens = servicoItens.getQtdeItens();
    expect(qtdeItens).toBe(0);
  });

  test("Deve Atualizar um item", () => {
    const item = {
      id: 1,
      nome: "Racão Chester",
      preco: "25,80",
      estoque: 1
    };
    servicoItens.adicionarItem(item);
    repositorio.getQtdeItens.mockReturnValue(1);
    let qtdeItens = servicoItens.getQtdeItens();
    expect(qtdeItens).toBe(1);
    const item2 = {
      id: 1,
      nome: "Racão Miau",
      preco: "25,80",
      estoque: 1
    };
    const idItem = repositorio.getId(item)
    repositorio.alteraItem(idItem, item2)
    const alterado = repositorio.getItem(idItem)
    expect(alterado == alterado).toBe(true);
  });

  test("Deve remover vários itens", () => {
    const item1 = {
      id: 1,
      nome: "Racão",
      preco: "25,80",
      estoque: 1
    };
    const item2 = {
      id:2,
      nome: "whiskas",
      preco: "119,80",
      estoque: 1
    };
    servicoItens.adicionarItem(item1);
    servicoItens.adicionarItem(item2);
    repositorio.getQtdeItens.mockReturnValue(2);
    let qtdeItens = servicoItens.getQtdeItens();
    expect(qtdeItens).toBe(2);
    servicoItens.removerItem(item1);
    servicoItens.removerItem(item2);
    repositorio.getQtdeItens.mockReturnValue(0);
    qtdeItens = servicoItens.getQtdeItens();
    expect(qtdeItens).toBe(0);
  });


  
  test("Não deve permitir dois itens iguais", () => {
    const item1 = {
      id: 1,
      nome: "Racão",
      preco: "25,80",
      estoque: 1
    };
    
    repositorio.getItens.mockReturnValue([item1]);

    expect(() => {
      servicoItem.adicionarItem(item1);
    }).toThrow(Error);
  });


  test("Deve remover todos os itens", () => {
    const item1 = {
      id: 1,
      nome: "Racão d",
      preco: "25,80",
      estoque: 1
    };
    servicoItens.adicionarItem(item1)
    repositorio.limpaCarrinho()
    repositorio.getQtdeItens.mockReturnValue(0);
    let qtdeItens = servicoItens.getQtdeItens();

    expect(qtdeItens).toBe(0);
  });


  test("Não deve permitir adicionar item com valor nulo", () => {
    const item1 = {
      id: 1,
      nome: "",
      preco: "25,80",
      estoque: 1
    };
    expect(() => {
      servicoItens.adicionarItem(item1);
    }).toThrow(Error);
  });


  test("Deve verificar se há estoque do item", () => {
    const item = {
      id: 1,
      nome: "Ração",
      preco: "25,80",
      estoque: 0
    };
    //Caso não houver item em estoque deve lançar erro
    expect(() => {
      servicoItens.verificaEstoque(item)
    }).toThrow(Error);
  });


  test("Não deve permitir adicionar itens com estoque vazio", () => {
    const item1 = {
      id: 1,
      nome: "Ração",
      preco: "25,80",
      estoque: 0
    };
    expect(() => {
      servicoItens.adicionarItem(item1)
    }).toThrow(Error);
  });
});
