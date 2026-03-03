

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class ReviewService {
  async create({ nota, descricao, produto_id, usuario_id}) {

    const notaNumber = Number(nota);
    const produtoIdNumber = Number(produto_id);
    const usuarioIdNumber = Number(usuario_id);

    //Validar Nota
    if (!notaNumber < 1 || notaNumber > 5) {
      throw new Error("Nota deve ser entre 1 e 5");
    }

    //Verificar se usuário comprou o produto
    const hasPurchased = await prisma.orderItem.findFirst({
      where: {
        productId: produtoIdNumber,
        order: {
          userId: usuarioIdNumber
        }
      }
    });

    if (!hasPurchased) {
      throw new Error("Você só pode avaliar produtos que comprou");
    }

    //Criar avaliacao
  

    return await prisma.avaliacoes.create({
      data: { 
        nota: notaNumber,
        descricao: descricao,
        produto_id: produtoIdNumber,
        usuario_id: usuarioIdNumber
    }
  });
}

  //cálculo de média de avaliação
  async findByProduct(produto_id) {
    return await prisma.avaliacoes.findMany({
      where: { produto_id: Number(produto_id) },
      include: { usuarios: true }
    });
  }

  async update(id, data) {
    return await prisma.avaliacoes.update({
      where: { id: Number(id) },
      data
    });
  }

  async delete(id) {
    return await prisma.avaliacoes.delete({
      where: { id: Number(id) }
    });
  }
}

module.exports = new ReviewService();
