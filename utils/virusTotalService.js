import axios from 'axios';

const VIRUSTOTAL_API_BASE_URL = 'https://www.virustotal.com/api/v3';

const virusTotalService = {
  scanUrl: async (url) => {
    try {
      const response = await axios.post(
        `${VIRUSTOTAL_API_BASE_URL}/urls`,
        new URLSearchParams({ url }),
        {
          headers: {
            'x-apikey': process.env.VIRUSTOTAL_API_KEY,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('VirusTotal Scan Error:', error);
      throw error;
    }
  },

  getScanReport: async (id) => {
    try {
      const response = await axios.get(
        `${VIRUSTOTAL_API_BASE_URL}/analyses/${id}`,
        {
          headers: {
            'x-apikey': process.env.VIRUSTOTAL_API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('VirusTotal Report Error:', error);
      throw error;
    }
  },
};

export default virusTotalService;
