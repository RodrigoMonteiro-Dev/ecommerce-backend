

const ReviewService = require("./review.service");

class ReviewController {
    async create(req, res) {
        try {
            const review = await ReviewService.create({
                ...req.body,
            userId: req.user.id
            //nessa atualização passo a puxar do Token, não mais do body como inicialmente
            // 
        });
            res.status(201).json(review);
    } catch (error){
        res.status(400).json({ error: error.message });
    }
}

    async findByProduct(req, res) {
        const reviews = await reviewService.findByProduct(req.params.productId);
        res.json(reviews);
    }

  async update(req, res) {
    try {
      const review = await reviewService.update(req.params.id, req.body);
      res.json(review);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    await reviewService.delete(req.params.id);
    res.json({ message: "Avaliação deletada com sucesso" });
  }
}

module.exports = new ReviewController();