

export const GOOGLE_ID = "";

export const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const handleError = (error:any, rejectWithValue : any) => {
  if (error.response && error.response.data.error) {
    console.log(error.response.data.error);

    return rejectWithValue(error.response.data.error);
  } else {
    return rejectWithValue(error.message);
  }
};
