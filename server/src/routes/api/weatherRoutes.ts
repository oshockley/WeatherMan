import { Router } from 'express';
import { getWeatherData } from '../../service/weatherService';
import { getHistory, saveCity, deleteCity } from '../../service/historyService';

const router = Router();

// ✅ POST: Fetch weather and save city
router.post('/', async (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'City is required in request body.' });
  }

  try {
    const weatherData = await getWeatherData(city);
    saveCity(city); // Save to history
    return res.json(weatherData);  // Ensure that the response is returned
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to retrieve weather data.' });
  }
});

// ✅ GET: Return all previously searched cities
router.get('/history', (req, res) => {  // Removed unused `req`
  try {
    const history = getHistory();
    return res.json(history); // Return the response here
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to read search history.' });
  }
});

// ✅ BONUS DELETE: Remove a city by id
router.delete('/history/:id', (req, res) => {
  try {
    const { id } = req.params;
    deleteCity(id);
    return res.json({ message: `Deleted city with id ${id}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to delete city from history.' });
  }
});

export default router;
