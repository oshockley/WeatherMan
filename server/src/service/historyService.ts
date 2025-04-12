import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const historyPath = path.join(__dirname, '../db/db.json');

interface City {
  id: string;
  name: string;
}

class HistoryService {
  private read(): City[] {
    if (!fs.existsSync(historyPath)) return [];

    const data = fs.readFileSync(historyPath, 'utf8');
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  private write(cities: City[]): void {
    fs.writeFileSync(historyPath, JSON.stringify(cities, null, 2));
  }

  getCities(): City[] {
    return this.read();
  }

  addCity(name: string): City {
    const cities = this.read();
    const newCity: City = { id: uuidv4(), name };

    if (!cities.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      cities.push(newCity);
      this.write(cities);
    }

    return newCity;
  }

  removeCity(id: string): void {
    const cities = this.read();
    const updated = cities.filter((city) => city.id !== id);
    this.write(updated);
  }
}

export const getHistory = () => new HistoryService().getCities();
export const saveCity = (name: string) => new HistoryService().addCity(name);
export const deleteCity = (id: string) => new HistoryService().removeCity(id);
