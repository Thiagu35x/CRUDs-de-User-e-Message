import { Router } from "express";

const router = Router();

// LISTAR TODOS
router.get("/", async (req, res) => {
  const users = await req.context.models.User.findAll();
  return res.send(users);
});

// BUSCAR POR ID
router.get("/:userId", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  return res.send(user);
});

// CRIAR USUÁRIO
router.post("/", async (req, res) => {
  const user = await req.context.models.User.create({
    username: req.body.username,
  });
  return res.send(user);
});

// ATUALIZAR USUÁRIO
router.put("/:userId", async (req, res) => {
  const user = await req.context.models.User.findByPk(req.params.userId);
  if (user) {
    await user.update({ username: req.body.username });
  }
  return res.send(user);
});

// DELETAR USUÁRIO
router.delete("/:userId", async (req, res) => {
  const result = await req.context.models.User.destroy({
    where: { id: req.params.userId },
  });
  return res.send(result !== 0);
});

export default router;