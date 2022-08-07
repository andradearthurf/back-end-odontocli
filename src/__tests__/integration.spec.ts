import request from "supertest";
import { Connection } from "typeorm";
import { app } from "../app";

import createConnection from "../database/index";

let connection: Connection;

beforeAll(async () =>{
  connection = await createConnection();
  await connection.runMigrations();
});

afterAll(async () =>{
  await connection.dropDatabase();
  await connection.close();
});

describe("Create Cidade Controller",  () => {

  it("should be able to create a new cidade", async () => {
    const response = await request(app).post("/cidade/create")
    .send({
      nomeCidade: "Cidade Teste",
      uf: "CT" 
    });

    expect(response.status).toBe(200);
  });

  it("should not be able to create a new cidade with an existing nomeCidade", async () => {
    const response = await request(app).post("/cidade/create")
    .send({
      nomeCidade: "Cidade Teste",
      uf: "CT" 
    });

    expect(response.status).toBe(400);
  });
});

describe("Get All Cidades Controller", () => {

  it("should be able to list all cidades",  async () => {
    await request(app)
    .get("/cidade/list")
    .expect(200);
  });
});

describe("Count Pacientes Controller", () => {

  it("should be able to count all pacientes",  async () => {
    await request(app)
    .get("/paciente/count")
    .expect(200);
  });
});

describe("Create Paciente Controller", () => {

  it("should be able to create a new paciente", async () => {
    const responseCidade = await request(app).post("/cidade/create")
    .send({
      nomeCidade: "Cidade Novo Teste",
      uf: "CT" 
    });

    const response = await request(app).post("/paciente/create")
    .send({
      cpf: "89865046008",
      nomeCompleto: "Nome de Teste",
      telefone: "027996397221",
      dtNascimento: "01/01/2001",
      numeroEndereco: 123,
      logradouroEndereco: "Rua de Teste",
      cepEndereco: "29700-100",
      cidade: responseCidade.body.idCidade
    });

    expect(response.status).toBe(200);
  });

  it("should not be able to create a new paciente with an existing cpf", async () => {
    const responseCidade = await request(app).post("/cidade/create")
    .send({
      nomeCidade: "Cidade Novo Teste",
      uf: "CT" 
    });

    const response = await request(app).post("/paciente/create")
    .send({
      cpf: "89865046008",
      nomeCompleto: "Nome de Teste",
      telefone: "027996397221",
      dtNascimento: "01/01/2001",
      numeroEndereco: 123,
      logradouroEndereco: "Rua de Teste",
      cepEndereco: "29700-100",
      cidade: responseCidade.body.idCidade
    });

    expect(response.status).toBe(400);
  });

  it("should not be able to create a new paciente with an not existing cidade", async () => {
    const response = await request(app).post("/paciente/create")
    .send({
      cpf: "01580714099",
      nomeCompleto: "Nome de Teste",
      telefone: "027996397221",
      dtNascimento: "01/01/2001",
      numeroEndereco: 123,
      logradouroEndereco: "Rua de Teste",
      cepEndereco: "29700-100",
      cidade: "4aa195a0-f9fa-467e-ba22-a2f4b96abc2d"
    });

    expect(response.status).toBe(400);
  });
});

describe("Delete Paciente Controller", () => {

  it("should be able to delete an existing paciente", async () => {
    const responseCidade = await request(app).post("/cidade/create")
    .send({
      nomeCidade: "Cidade Novo Teste 1",
      uf: "CT" 
    });

    const responsePaciente = await request(app).post("/paciente/create")
    .send({
      cpf: "95631104040",
      nomeCompleto: "Nome de Teste",
      telefone: "027996397221",
      dtNascimento: "01/01/2001",
      numeroEndereco: 123,
      logradouroEndereco: "Rua de Teste",
      cepEndereco: "29700-100",
      cidade: responseCidade.body.idCidade
    });

    await request(app)
    .delete(`/paciente/delete/${responsePaciente.body.cpf}`)
    .expect(204);
  });

  it("should not be able to delete an not existing paciente", async () => {
    await request(app)
    .delete("/paciente/delete/1234567890")
    .expect(400);
  });
});

describe("Update Paciente Controller", () => {

  it("should be able to update an existing paciente", async () => {
    const responseCidade = await request(app).post("/cidade/create")
    .send({
      nomeCidade: "Cidade Novo Teste 2",
      uf: "CT" 
    });

    const responsePaciente = await request(app).post("/paciente/create")
    .send({
      cpf: "95631104040",
      nomeCompleto: "Nome de Teste",
      telefone: "027996397221",
      dtNascimento: "01/01/2001",
      numeroEndereco: 123,
      logradouroEndereco: "Rua de Teste",
      cepEndereco: "29700-100",
      cidade: responseCidade.body.idCidade
    });

    const response = await request(app).put(`/paciente/update/${responsePaciente.body.cpf}`)
    .send({
      cpf: "95631104040",
      nomeCompleto: "Nome de Teste Atualizado",
      telefone: "027996397221",
      dtNascimento: "01/01/2001",
      numeroEndereco: 123,
      logradouroEndereco: "Rua de Teste",
      cepEndereco: "29700-100",
      cidade: responseCidade.body.idCidade
    });

    expect(response.status).toBe(200);
  });

  it("should not be able to update an not existing paciente", async () => {
    await request(app)
    .put("/paciente/update/1234567890")
    .expect(400);
  });
});
