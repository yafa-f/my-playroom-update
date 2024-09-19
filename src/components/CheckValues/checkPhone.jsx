export const isIsraeliPhoneNumber = (phone) => {
    const regex = /^05\d{8}$/;
    return regex.test(phone);
  };