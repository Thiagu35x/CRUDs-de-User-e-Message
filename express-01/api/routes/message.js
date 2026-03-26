import { Router } from "express";

const router = Router();

// LISTAR TODAS AS MENSAGENS
router.get("/", async (req, res) => {
  const messages = await req.context.models.Message.findAll();
  return res.send(messages);
});

// BUSCAR MENSAGEM POR ID
router.get("/:messageId", async (req, res) => {
  const message = await req.context.models.Message.findByPk(req.params.messageId);
  return res.send(message);
});

// CRIAR MENSAGEM
router.post("/", async (req, res) => {
  const message = await req.context.models.Message.create({
    text: req.body.text,
    userId: req.body.userId, // Relaciona a mensagem ao usuário
  });
  return res.send(message);
});

// DELETAR MENSAGEM
router.delete("/:messageId", async (req, res) => {
  const result = await req.context.models.Message.destroy({
    where: { id: req.params.messageId },
  });
  return res.send(result !== 0);
});

export default router;