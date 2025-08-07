import carsData from "@/services/mockData/cars.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const carService = {
  async getAll() {
    await delay(Math.random() * 300 + 200);
    return [...carsData];
  },

  async getById(id) {
    await delay(Math.random() * 300 + 200);
    const car = carsData.find(car => car.Id === id);
    if (!car) {
      throw new Error(`Car with ID ${id} not found`);
    }
    return { ...car };
  },

  async create(carData) {
    await delay(Math.random() * 300 + 200);
    const maxId = Math.max(...carsData.map(car => car.Id));
    const newCar = {
      ...carData,
      Id: maxId + 1
    };
    carsData.push(newCar);
    return { ...newCar };
  },

  async update(id, carData) {
    await delay(Math.random() * 300 + 200);
    const index = carsData.findIndex(car => car.Id === id);
    if (index === -1) {
      throw new Error(`Car with ID ${id} not found`);
    }
    carsData[index] = { ...carsData[index], ...carData, Id: id };
    return { ...carsData[index] };
  },

  async delete(id) {
    await delay(Math.random() * 300 + 200);
    const index = carsData.findIndex(car => car.Id === id);
    if (index === -1) {
      throw new Error(`Car with ID ${id} not found`);
    }
    const deletedCar = { ...carsData[index] };
    carsData.splice(index, 1);
    return deletedCar;
  },

  async search(query) {
    await delay(Math.random() * 300 + 200);
    const lowercaseQuery = query.toLowerCase();
    return carsData.filter(car =>
      car.make.toLowerCase().includes(lowercaseQuery) ||
      car.model.toLowerCase().includes(lowercaseQuery) ||
      car.type.toLowerCase().includes(lowercaseQuery) ||
      car.color.toLowerCase().includes(lowercaseQuery)
    );
  }
};