# DescontroladaFrontend

Trata-se de um CRUD de Catálogo de Produtos de uma varejista chamada Descontrolada®.
O projeto contém o FrontEnd da aplicação, enquanto o BackEnd está no repositório DescontroladaAPI (https://github.com/onequeiroz/DescontroladaAPI)

# Demanda

1. Página para o cadastro dos produtos, que deve apresentar os campos: nome, preço de venda, descrição, quantidade, tipo* e data de cadastro.
  * *A varejista comercializa dois tipos de produto:
    * Orgânico, e;
    * Não orgânico.

2. Página para exibição dos produtos cadastrados, que deverá mostrar apenas 5 itens por página (de uma grid/tabela).
3. O sistema também deve possuir um menu que permita a navegação entre as duas páginas.

# Rodando a aplicação

Para que a aplicação seja executada, é preciso que tanto o FrontEnd quanto o BackEnd estejam rodando. 
No arquivo environment.ts encontra-se o link da API : http://localhost:18798/api. Este deve ser alterado caso necessário.
Execute o comando 'ng serve --open' no terminal para buildar a aplicação.

# Informações adicionais
Este projeto foi gerado com Angular CLI na versão 13.2.0. 
