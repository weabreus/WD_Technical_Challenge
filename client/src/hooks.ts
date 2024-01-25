import axios from "axios";
import { useEffect, useState } from "react";

export type PhoneType = {
  id: number;
  name: string;
  manufacturer: string;
  description: string;
  color: string;
  price: number;
  imageFileName: string;
  screen: string;
  processor: string;
  ram: number;
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const usePhoneList = () => {
  const [phones, setPhones] = useState<PhoneType[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<PhoneType | undefined>();
  const [isPhoneListLoading, setIsPhoneListLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false)
  const getPhones = async () => {
    try {
      setIsPhoneListLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/phones`
      );
      await delay(2000);
      setPhones(response.data);
      setIsPhoneListLoading(false);
    } catch (error) {
      console.log(error);
      setIsPhoneListLoading(false);
    }
  };

  useEffect(() => {
    getPhones();
  }, []);

  return { getPhones, phones, setPhones, isPhoneListLoading, open, setOpen, selectedPhone, setSelectedPhone };
};
