import axios from "axios";
import dotenv from "dotenv";

const config = dotenv.config().parsed;
const api_uri = new URL(config.PROFIT_API_URI);

const add = async (data) => {
  const date = new Date();
  const date_format = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()})`;

  const payload = {
    date: date_format,
    ...data,
  };

  const response = await axios.post(`${api_uri.href}/add`, payload);

  const profit = response.data;

  return profit;
};

const get_by_id = async (user_id) => {
  const response = await axios.get(`${api_uri.href}/user/${user_id}`, payload);

  const profit = response.data;

  return profit;
};

const get_all = async (date) => {
  const response = await axios.get(`${api_uri.href}/date/${date}`, payload);

  const users = response.data;

  return users;
};

const profit_api_repository = { add, get_all, get_by_id };

export default profit_api_repository;
