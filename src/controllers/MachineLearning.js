import axios from "axios";

export const recommendCollab = async (req, res) => {
  const user_id = req.body.user_id;
  const user_lat = req.body.user_lat;
  const user_long = req.body.user_long;

  const apiURL = 'https://tourista-model-api-bmvl7h45tq-et.a.run.app/recommendCollab';

  try {
    const payload = new URLSearchParams();
    payload.append('user_id', user_id);
    payload.append('user_lat', user_lat);
    payload.append('user_long', user_long);

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const response = await axios.post(apiURL, payload.toString(), { headers });

    const api_data = response.data;

    res.json(api_data);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const recommendContentBased = async (req, res) => {
    const user_id = req.body.user_id;
    const category = req.body.category;
    const city = req.body.city;
    const price = req.body.price;

    const apiURL = 'https://tourista-model-api-bmvl7h45tq-et.a.run.app/recommendContentBased';
  
    try {
      const payload = new URLSearchParams();
      payload.append('user_id', user_id);
      payload.append('category', category);
      payload.append('city', city);
      payload.append('price', price);

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
  
      const response = await axios.post(apiURL, payload.toString(), { headers });
  
      const api_data = response.data;
  
      res.json(api_data);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };

  export const recommendSimilarItem = async (req, res) => {
    const destination_name = req.body.destination_name;
  
    const apiURL = 'https://tourista-model-api-bmvl7h45tq-et.a.run.app/recommendSimilarItem';
  
    try {
      const payload = new URLSearchParams();
      payload.append('destination_name', destination_name);
  
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      };
  
      const response = await axios.post(apiURL, payload.toString(), { headers });
  
      const api_data = response.data;
  
      res.json(api_data);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  };