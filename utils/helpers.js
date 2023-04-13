const goBack = `
<html>
  <head>
    <title>404 Not Found</title>
  </head>
  <body>
    <h1>404 Sorry, this page does not exist.</h1>
    <button onclick="goBack()">Go Back</button>
    <script>
      function goBack() {
        window.history.back();
      }
    </script>
  </body>
</html>
`;

module.exports = {
  generateId: (name) => {
    return `input-${name}-${Math.random().toString(36).substr(2, 9)}`;
  },
  format_date: (date) => {
    return date.toLocaleDateString();
  },

  goBack

};
