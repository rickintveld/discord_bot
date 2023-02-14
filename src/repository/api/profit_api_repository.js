import axios from "axios";
import dotenv from "dotenv";

const config = dotenv.config().parsed;
const api_uri = config.PROFIT_API_URI;

const add = async (data) => {
  const date = new Date();
  const date_format = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;

  const payload = {
    user_id: parseInt(data.user_id),
    profit: data.profit,
    risk_to_reward: data.roi,
    creation_date: date_format,
  };

  const request_uri = new URL("profits/create", api_uri);

  const response = await axios.post(request_uri.href, payload);

  const profit = response.data;

  return profit;
};

const get_by_user_id = async (user_id) => {
  const request_uri = new URL(`profits/${user_id}`, api_uri);

  const response = await axios.get(request_uri.href);

  const profit = response.data;

  return profit;
};

const profit_api_repository = { add, get_by_user_id };

export default profit_api_repository;
