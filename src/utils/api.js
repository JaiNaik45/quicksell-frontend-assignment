export const fetchData = async () => {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };