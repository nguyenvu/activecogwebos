import Cors from 'cors';

// Khởi tạo middleware CORS
const cors = Cors({
  methods: ['GET', 'HEAD'], // Chỉ cho phép các phương thức GET và HEAD
  origin: '*', // Cho phép tất cả các domain truy cập
});

// Hàm helper để chạy middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Chạy middleware CORS
  await runMiddleware(req, res, cors);

  try {
    const apiUrl = 'http://all.api.radio-browser.info/json/servers';
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching radio stations:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}