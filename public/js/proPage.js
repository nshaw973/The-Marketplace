const proPage = document.getElementById('proPage');
router.post('/productPage/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const selectedProduct = await Product.findByPk(productId);
  
      if (selectedProduct && selectedProduct.id === productId) {
        // Code to update the content on the page to match the selected product
        res.status(200).send('Product updated successfully.');
      } else {
        res.status(404).send('Product not found.');
      }
    } catch (err) {
      res.status(500).send('Error updating product.');
    }
  });


proPage.addEventListener('click', () => {
    console.log("hi")
});