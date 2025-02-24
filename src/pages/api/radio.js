import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // URL của API bạn muốn fetch
    const apiUrl = 'http://all.api.radio-browser.info/json/servers';

    // Fetch dữ liệu từ API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Trả về dữ liệu cho client
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching radio stations:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}