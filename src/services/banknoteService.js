const API_BASE_URL = 'https://najshajs.mywire.org';

class BanknoteService {
  getImageUrl(imagePath) {
    if (!imagePath) return null;
    if (imagePath.startsWith('data:image')) return imagePath; // base64
    if (imagePath.startsWith('http')) return imagePath; // pełny URL
    
    // Sprawdzam czy to ścieżka z resources/
    if (imagePath.startsWith('resources/')) {
      // Dodaję domenę do względnej ścieżki
      const timestamp = Date.now();
      return `${API_BASE_URL}/${imagePath}?v=${timestamp}`;
    }
    
    // Fallback - zwracam ścieżkę bezpośrednio
    return imagePath;
  }

  async getBanknotes() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/banknotes`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching banknotes:', error);
      throw error;
    }
  }

  async getBanknote(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/banknotes/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching banknote:', error);
      throw error;
    }
  }

  async createBanknote(banknoteData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/banknotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(banknoteData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating banknote:', error);
      throw error;
    }
  }

  async updateBanknote(id, banknoteData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/banknotes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(banknoteData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating banknote:', error);
      throw error;
    }
  }

  async deleteBanknote(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/banknotes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting banknote:', error);
      throw error;
    }
  }
}

export default new BanknoteService();

