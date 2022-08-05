import { createConnection } from "typeorm";
import { cpf } from 'cpf-cnpj-validator';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

async function create() {
  const connection = await createConnection();

  const findIdCidade = await connection.query(
    `SELECT "idCidade" FROM cidade`
  );

  const getLengthOfObject = (obj: Object) => { 
    let lengthOfObject = Object.keys(obj).length; 
    return lengthOfObject;
  }

  await connection.query(
    `INSERT INTO paciente("cpf", "nomeCompleto", "telefone", "dtNascimento", "numeroEndereco", "logradouroEndereco", "cepEndereco", "cidade")
      VALUES('${cpf.generate()}', 'Gabriela Louise Aurora Mendes', '027987346152', '17/05/1994', '23', 'Rua Albieiro, Centro da Serra', '29179-380', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'Helena Isabella Beatriz Silva', '027984887613', '06/01/1994', '871', 'Rua Projetada Dois, Civit I', '29168-037', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'Evelyn Elza Nunes', '027985478059', '12/03/1994', '705', 'Rua Doutor Antônio Honório, Bento Ferreira', '29050-770', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'Luiza Benedita Vieira', '027994170036', '03/08/1994', '384', 'Comunidade de Pau Amarelo, Biriricas Setor 6', '29158-470', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'Lucca Luís Bruno Lopes', '027983597535', '11/02/1994', '382', 'Rua Luiz Nunes Loureiro, Parque Tropical', '29192-640', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'Paulo Ryan Rodrigo da Silva', '027999775780', '20/02/1999', '731', 'Rua Platino, Jardim Marilândia', '29112-060', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'Hugo Edson Joaquim Melo', '027988111471', '23/09/2002', '693', 'Rua Cidade de Belém, Itaputera', '29193-332', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'Vanessa Mirella Sophia Lima', '027999000383', '11/11/2004', '248', 'Beco Dom João, Itacibá', '29150-035', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'Ian Pietro da Paz', '027984906308', '30/02/2000', '325', 'Rua dos Canoeiros, Estrelinha', '29023-533', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'José Rodrigo da Rocha', '027986466259', '10/04/2001', '396', 'Rua Flor de Maio, Jardins', '29190-353', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'Vitor Pietro Cláudio Gomes', '027982363355', '15/03/2002', '457', 'Praça Hildenette Patrocínio Nascimento, Bonfim', '29047-028', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'Gustavo Anderson Enrico Rocha', '027983186577', '20/04/2000', '290', 'Rua Espírito Santo Praia do, Riacho', '29201-412', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'Emanuelly Lavínia Moreira', '027983994469', '24/02/2001', '412', 'Rua Frederico Pretti, Mata da Praia', '29065-410', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'Benedita Simone Elisa Lima', '027999108900', '11/01/1998', '494', 'Travessa Brasil II, Novo Horizonte', '29163-296', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}'),
      ('${cpf.generate()}', 'Mário Levi Fogaça', '027995584918', '17/07/1999', '956', 'Rua Viana, Barcelona', '29166-025', '${findIdCidade[getRandomInt(0, getLengthOfObject(findIdCidade) - 1)].idCidade}')
    `
  );
  await connection.close();
}
create().then(() => console.log("A tabela 'paciente' foi populada com sucesso!"));
