export default {
  server: {
    proxy: {
      '/api': 'http://localhost:3000',  // Assuming Rails backend on localhost:3000
    },
  },
};
